// おいでや 宿泊者名簿フォーム
// 入力内容はこの端末内で暗号化（AES-256-GCM、鍵は自宅PCの公開鍵 RSA-OAEP-4096 で包む）してから送信する。
// 個人情報はブラウザの保存領域（localStorage 等）には一切書き込まない。
(() => {
  "use strict";

  const LANGS = ["ja", "en", "zh", "ko"];
  const MAX_GUESTS = 8;
  const PHOTO_MAX_EDGE = 1800; // 長辺px
  const PHOTO_QUALITY = 0.85;
  const TERMS_VERSION = "2026-10-29";

  const state = {
    lang: pickLang(),
    step: 0,
    guests: 0,
    checkin: "",
    checkout: "",
    people: Array.from({ length: MAX_GUESTS }, () => ({
      name: "", nationality: "", residence: "", address: "", contact: "", passport_no: "", photo: null,
    })),
    agreed: false,
    tsToken: "",
    sending: false,
    done: false,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const t = () => window.I18N[state.lang];

  // ------------------------------------------------------------ 言語

  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.includes(q)) return q;
    for (const l of navigator.languages || [navigator.language || "en"]) {
      const s = l.toLowerCase();
      if (s.startsWith("ja")) return "ja";
      if (s.startsWith("zh")) return "zh";
      if (s.startsWith("ko")) return "ko";
      if (s.startsWith("en")) return "en";
    }
    return "en";
  }

  function setupLangSelect() {
    const sel = $("#lang");
    sel.innerHTML = LANGS.map((l) => `<option value="${l}">${window.I18N[l].langName}</option>`).join("");
    sel.value = state.lang;
    sel.addEventListener("change", () => {
      state.lang = sel.value;
      const u = new URL(location.href);
      u.searchParams.set("lang", state.lang);
      history.replaceState(null, "", u);
      render();
    });
  }

  // ------------------------------------------------------------ ステップ

  // 0: 宿泊情報 / 1..N: 宿泊者 / N+1: 規約
  const totalSteps = () => (state.guests || 1) + 2;
  const isGuestStep = (s) => s >= 1 && s <= state.guests;
  const isTermsStep = (s) => state.guests > 0 && s === state.guests + 1;

  function render() {
    const L = t();
    document.documentElement.lang = { ja: "ja", en: "en", zh: "zh-Hans", ko: "ko" }[state.lang];
    $("#title").textContent = L.title;
    $("#lead").textContent = L.lead;
    $("#secure").textContent = L.secure;
    const app = $("#app");

    if (state.done) {
      $("#progressRow").style.visibility = "hidden";
      app.innerHTML = `<div class="done"><div class="mark">✓</div><h2 style="border:0">${esc(L.doneTitle)}</h2><p>${esc(L.doneBody)}</p></div>`;
      return;
    }

    $("#progressRow").style.visibility = "visible";
    const n = totalSteps();
    $("#bar").style.width = `${((state.step + 1) / n) * 100}%`;
    $("#stepLabel").textContent = L.step(state.step + 1, n);

    if (state.step === 0) app.innerHTML = stayHTML(L);
    else if (isGuestStep(state.step)) app.innerHTML = guestHTML(L, state.step - 1);
    else app.innerHTML = termsHTML(L);

    bind(app);
    if (isTermsStep(state.step)) mountTurnstile();
    app.querySelector("h2")?.focus?.();
  }

  const reqTag = (L) => `<span class="req">${esc(L.required)}</span>`;

  function stayHTML(L) {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const min = today.toISOString().slice(0, 10);
    const opts = [`<option value="" disabled ${state.guests ? "" : "selected"}>—</option>`]
      .concat(Array.from({ length: MAX_GUESTS }, (_, i) => `<option value="${i + 1}" ${state.guests === i + 1 ? "selected" : ""}>${esc(L.guestsUnit(i + 1))}</option>`))
      .join("");
    return `
      <h2 tabindex="-1">${esc(L.stepStay)}</h2>
      <div class="field" data-f="guests">
        <label for="f-guests">${esc(L.guests)} ${reqTag(L)}</label>
        <select id="f-guests" class="input" data-bind="guests">${opts}</select>
        <div class="err">${esc(L.errChoose)}</div>
      </div>
      <div class="field" data-f="checkin">
        <label for="f-checkin">${esc(L.checkin)} ${reqTag(L)}</label>
        <input type="date" id="f-checkin" min="${min}" value="${esc(state.checkin)}" data-bind="checkin">
        <div class="err">${esc(L.errRequired)}</div>
      </div>
      <div class="field" data-f="checkout">
        <label for="f-checkout">${esc(L.checkout)} ${reqTag(L)}</label>
        <input type="date" id="f-checkout" min="${min}" value="${esc(state.checkout)}" data-bind="checkout">
        <div class="err" data-msg>${esc(L.errRequired)}</div>
      </div>
      ${navHTML(L, false)}`;
  }

  function guestHTML(L, i) {
    const p = state.people[i];
    const heading = i === 0 ? `${L.representative}` : L.guest(i + 1);
    const overseas = p.residence === "overseas";
    const id = (k) => `f-${k}-${i}`;
    const text = (k, label, type = "text", ac = "") => `
      <div class="field" data-f="${k}">
        <label for="${id(k)}">${esc(label)} ${reqTag(L)}</label>
        <input type="${type}" id="${id(k)}" value="${esc(p[k])}" data-bind="p.${k}" maxlength="200" ${ac ? `autocomplete="${ac}"` : ""}>
        <div class="err" data-msg>${esc(L.errRequired)}</div>
      </div>`;
    return `
      <h2 tabindex="-1">${esc(heading)}</h2>
      ${text("name", L.name, "text", i === 0 ? "name" : "off")}
      ${text("nationality", L.nationality, "text", "off")}
      <div class="field" data-f="residence">
        <div class="label">${esc(L.residence)} ${reqTag(L)}</div>
        <div class="radios" role="radiogroup" aria-label="${esc(L.residence)}">
          <label><input type="radio" name="res-${i}" value="japan" ${p.residence === "japan" ? "checked" : ""} data-bind="p.residence"> ${esc(L.resJapan)}</label>
          <label><input type="radio" name="res-${i}" value="overseas" ${overseas ? "checked" : ""} data-bind="p.residence"> ${esc(L.resOverseas)}</label>
        </div>
        <div class="err">${esc(L.errChoose)}</div>
      </div>
      ${text("address", L.address, "text", i === 0 ? "street-address" : "off")}
      ${text("contact", L.contact, "tel", i === 0 ? "tel" : "off")}
      <div class="passport-only" ${overseas ? "" : "hidden"}>
        <div class="field" data-f="passport_no">
          <label for="${id("passport_no")}">${esc(L.passportNo)} ${reqTag(L)}</label>
          <input type="text" id="${id("passport_no")}" value="${esc(p.passport_no)}" data-bind="p.passport_no" maxlength="20" autocapitalize="characters" autocomplete="off" spellcheck="false">
          <div class="err" data-msg>${esc(L.errRequired)}</div>
        </div>
        <div class="field ${p.photo ? "has-photo" : ""}" data-f="photo">
          <div class="label">${esc(L.passportPhoto)} ${reqTag(L)}</div>
          <p class="hint">${esc(L.photoHint)}</p>
          <input type="file" id="${id("photo")}" accept="image/*" class="sr" data-photo>
          <button type="button" class="photo-btn" data-pick>📷 <span>${esc(p.photo ? L.changePhoto : L.choosePhoto)}</span></button>
          <div class="photo-preview">${p.photo ? `<img alt="" src="${p.photo.url}">` : ""}</div>
          <div class="err">${esc(L.errPhoto)}</div>
        </div>
        <p class="note">${esc(L.passportNote)}</p>
      </div>
      ${navHTML(L, true)}`;
  }

  function termsHTML(L) {
    return `
      <h2 tabindex="-1">${esc(L.stepTerms)}</h2>
      <div class="terms" tabindex="0">${window.TERMS[state.lang]}</div>
      <div class="field" data-f="agreed" style="margin:0">
        <label class="check"><input type="checkbox" ${state.agreed ? "checked" : ""} data-bind="agreed"> ${esc(L.agree)}</label>
        <div class="err">${esc(L.errAgree)}</div>
      </div>
      <div id="turnstile"></div>
      <div class="alert" id="alert"></div>
      <div class="nav">
        <button type="button" class="btn ghost" data-back>${esc(L.back)}</button>
        <button type="button" class="btn primary" data-submit ${state.sending ? "disabled" : ""}>${esc(state.sending ? L.sending : L.submit)}</button>
      </div>`;
  }

  function navHTML(L, withBack) {
    return `<div class="nav">${withBack ? `<button type="button" class="btn ghost" data-back>${esc(L.back)}</button>` : ""}
      <button type="button" class="btn primary" data-next>${esc(L.next)}</button></div>`;
  }

  // ------------------------------------------------------------ 入力の反映

  function bind(root) {
    const i = state.step - 1;
    root.querySelectorAll("[data-bind]").forEach((el) => {
      const key = el.dataset.bind;
      const ev = el.type === "radio" || el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(ev, () => {
        let v = el.type === "checkbox" ? el.checked : el.value;
        if (key === "guests") state.guests = Number(v);
        else if (key.startsWith("p.")) {
          const k = key.slice(2);
          if (k === "passport_no") {
            const pos = el.selectionStart;
            const nv = v.toUpperCase().replace(/\s+/g, "");
            if (nv !== v) {
              el.value = nv;
              try { el.setSelectionRange(pos - (v.length - nv.length), pos - (v.length - nv.length)); } catch {}
            }
            v = nv;
          }
          state.people[i][k] = typeof v === "string" ? v.trimStart() : v;
          if (k === "residence") {
            root.querySelector(".passport-only").hidden = v !== "overseas";
          }
        } else state[key] = v;
        el.closest(".field")?.classList.remove("invalid");
      });
    });

    root.querySelector("[data-pick]")?.addEventListener("click", () => root.querySelector("[data-photo]").click());
    root.querySelector("[data-photo]")?.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!file) return;
      const field = root.querySelector('[data-f="photo"]');
      const btn = root.querySelector("[data-pick] span");
      btn.textContent = "…";
      try {
        const photo = await processPhoto(file);
        const old = state.people[i].photo;
        if (old && old.url) URL.revokeObjectURL(old.url);
        state.people[i].photo = photo;
        field.classList.add("has-photo");
        field.classList.remove("invalid");
        field.querySelector(".photo-preview").innerHTML = `<img alt="" src="${photo.url}">`;
        btn.textContent = t().changePhoto;
      } catch {
        btn.textContent = t().choosePhoto;
        field.classList.add("invalid");
      }
    });

    root.querySelector("[data-next]")?.addEventListener("click", () => {
      if (!validate(root)) return;
      state.step += 1;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    root.querySelector("[data-back]")?.addEventListener("click", () => {
      state.step = Math.max(0, state.step - 1);
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    root.querySelector("[data-submit]")?.addEventListener("click", submit);
  }

  // ------------------------------------------------------------ 入力チェック

  function validate(root) {
    const L = t();
    let firstBad = null;
    const fail = (f, msg) => {
      const el = root.querySelector(`[data-f="${f}"]`);
      if (!el) return;
      el.classList.add("invalid");
      if (msg) {
        const m = el.querySelector("[data-msg]");
        if (m) m.textContent = msg;
      }
      firstBad = firstBad || el;
    };
    root.querySelectorAll(".field.invalid").forEach((e) => e.classList.remove("invalid"));

    if (state.step === 0) {
      if (!state.guests) fail("guests");
      if (!state.checkin) fail("checkin");
      if (!state.checkout) fail("checkout", L.errRequired);
      else if (state.checkin && state.checkout <= state.checkin) fail("checkout", L.errDates);
    } else if (isGuestStep(state.step)) {
      const p = state.people[state.step - 1];
      for (const k of ["name", "nationality", "address", "contact"]) {
        p[k] = (p[k] || "").trim();
        if (!p[k]) fail(k, L.errRequired);
      }
      if (!p.residence) fail("residence");
      if (p.residence === "overseas") {
        if (!p.passport_no) fail("passport_no", L.errRequired);
        else if (!/^[A-Z0-9]{5,20}$/.test(p.passport_no)) fail("passport_no", L.errPassport);
        if (!p.photo) fail("photo");
      }
    } else if (isTermsStep(state.step)) {
      if (!state.agreed) fail("agreed");
    }

    if (firstBad) {
      firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
      firstBad.querySelector("input,select,button")?.focus({ preventScroll: true });
      return false;
    }
    return true;
  }

  // ------------------------------------------------------------ 写真（縮小してJPEGに）

  async function processPhoto(file) {
    if (!file.type.startsWith("image/")) throw new Error("not image");
    let bmp;
    try {
      bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      bmp = await new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = URL.createObjectURL(file);
      });
    }
    const w = bmp.width, h = bmp.height;
    const scale = Math.min(1, PHOTO_MAX_EDGE / Math.max(w, h));
    const cw = Math.round(w * scale), ch = Math.round(h * scale);
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(bmp, 0, 0, cw, ch);
    if (bmp.close) bmp.close();
    const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", PHOTO_QUALITY));
    if (!blob) throw new Error("encode failed");
    const buf = new Uint8Array(await blob.arrayBuffer());
    canvas.width = canvas.height = 0;
    return { type: "image/jpeg", data: b64(buf), url: URL.createObjectURL(blob) };
  }

  // ------------------------------------------------------------ 暗号化と送信

  async function encryptPayload(payload, meta) {
    const C = window.CONFIG;
    if (!C.PUBLIC_KEY || !C.WORKER_URL) throw new Error("not configured");
    const pub = await crypto.subtle.importKey("jwk", C.PUBLIC_KEY, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
    const aes = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
    const raw = new Uint8Array(await crypto.subtle.exportKey("raw", aes));
    const ek = new Uint8Array(await crypto.subtle.encrypt({ name: "RSA-OAEP" }, pub, raw));
    raw.fill(0);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const m = JSON.stringify(meta);
    const pt = new TextEncoder().encode(JSON.stringify(payload));
    const ct = new Uint8Array(
      await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: new TextEncoder().encode(m) }, aes, pt)
    );
    pt.fill(0);
    return { v: 1, alg: "RSA-OAEP-256+A256GCM", ek: b64(ek), iv: b64(iv), ct: b64(ct), m };
  }

  function buildPayload() {
    const people = state.people.slice(0, state.guests).map((p) => {
      const o = {
        name: p.name.trim(),
        nationality: p.nationality.trim(),
        residence: p.residence,
        address: p.address.trim(),
        contact: p.contact.trim(),
      };
      if (p.residence === "overseas") {
        o.passport_no = p.passport_no;
        o.passport_photo = { type: p.photo.type, data: p.photo.data };
      }
      return o;
    });
    return {
      v: 1,
      lang: state.lang,
      guests: state.guests,
      checkin: state.checkin,
      checkout: state.checkout,
      people,
      agreed: true,
      terms_version: TERMS_VERSION,
      submitted_at: new Date().toISOString(),
    };
  }

  async function submit() {
    const app = $("#app");
    if (state.sending || !validate(app)) return;
    const L = t();
    const alert = $("#alert");
    alert.classList.remove("show");
    if (window.CONFIG.TURNSTILE_SITEKEY && !state.tsToken) {
      alert.textContent = L.errCaptcha;
      alert.classList.add("show");
      return;
    }
    state.sending = true;
    const btn = app.querySelector("[data-submit]");
    btn.disabled = true;
    btn.textContent = L.sending;
    try {
      const meta = { checkin: state.checkin, checkout: state.checkout, guests: state.guests, lang: state.lang };
      const body = await encryptPayload(buildPayload(), meta);
      body.ts = state.tsToken;
      const res = await fetch(`${window.CONFIG.WORKER_URL.replace(/\/$/, "")}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      wipe();
      state.done = true;
      state.sending = false;
      render();
      window.scrollTo({ top: 0 });
    } catch (e) {
      state.sending = false;
      state.tsToken = "";
      if (window.turnstile && turnstileId !== null) window.turnstile.reset(turnstileId);
      btn.disabled = false;
      btn.textContent = L.retry;
      alert.textContent = L.errSend;
      alert.classList.add("show");
    }
  }

  // 送信後は入力内容をメモリから消す
  function wipe() {
    for (const p of state.people) {
      if (p.photo && p.photo.url) URL.revokeObjectURL(p.photo.url);
      for (const k of Object.keys(p)) p[k] = k === "photo" ? null : "";
    }
    state.checkin = state.checkout = "";
  }

  // ------------------------------------------------------------ Turnstile

  let turnstileId = null;
  let turnstileLoading = null;
  function mountTurnstile() {
    const key = window.CONFIG.TURNSTILE_SITEKEY;
    if (!key) return;
    const ready = () => {
      const el = $("#turnstile");
      if (!el) return;
      turnstileId = window.turnstile.render(el, {
        sitekey: key,
        language: { ja: "ja", en: "en", zh: "zh-cn", ko: "ko" }[state.lang],
        callback: (tok) => { state.tsToken = tok; $("#alert")?.classList.remove("show"); },
        "expired-callback": () => { state.tsToken = ""; },
      });
    };
    if (window.turnstile) return ready();
    if (!turnstileLoading) {
      turnstileLoading = new Promise((res) => {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.onload = res;
        document.head.appendChild(s);
      });
    }
    turnstileLoading.then(ready);
  }

  // ------------------------------------------------------------ util

  function b64(u8) {
    let s = "";
    const CH = 0x8000;
    for (let i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
    return btoa(s);
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  window.addEventListener("beforeunload", (e) => {
    if (!state.done && (state.guests || state.people[0].name)) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // テスト用に内部関数を公開（本番動作には影響しない）
  window.__oideya = { state, encryptPayload, buildPayload, processPhoto, render };

  setupLangSelect();
  render();
})();
