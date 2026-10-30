// ここだけ書き換えて公開します（README の手順を参照）
window.CONFIG = {
  // Cloudflare Worker のURL
  WORKER_URL: "https://oideya-guest-registry.oideya-osaka.workers.dev",
  // Cloudflare Turnstile のサイトキー（空欄ならスパム対策なし。テスト後に設定）
  TURNSTILE_SITEKEY: "",
  // 自宅PCで `python vault.py init` を実行したときに表示された公開鍵
  PUBLIC_KEY: {"kty": "RSA", "n": "uEMwWNz_JLLQaxZsGnToxPbw2dOXapn5DmNMq1qUSr4C5BG-yZAAdlMIm3rG7PO76PJOhqO4U4GI5NMyi_esws9mXfTv4XTtdh1IgWt1ljG8tKtd6pSyVyJl4akyVuEvactjPf58mRm3F7wAjpNdBDw3EgEMGZ6ALbn90RQaMPEIxcFs-_u_L1Ekgo-s6ivZTlTg9i1zfPpKYCzUzEA6_ikZx_gGsobip00pojnJcTSFyYCPAEtU-vh80MgyoututBg5_ZM3NqqLQBZ_d-Rll2h-vNEOFnPiGA8UuanTUcfwmBSm7ZyoBCL93MqIXfvV30Oq4HLQw3qTVtWvEWE_8Up380zZ9Smvv5tXqVCpjm3ljPXNPxZrFJkYYp3-7FDbvNoVY7kyTchAccAxtm7KzSs0UH65RcL5Bihk-QCZDLGmTwCWvPBjkKDdcsV6a76ljfqBGv0himlwgcAjG8OgElfvYysb_vokZ1mi1Wdf4VrnZosniLuunLGqxHcRUlXp_mvRfBWLZyVhRDcwNOyNJvoyBAracd7_-8GLigw-ESu_Tp7eApUtP4omwsfCaSdnUhjSha63IoiWrpgZmkiEoOt0B-wZFH5KuwchvXXKuAuLAsWnkjaMccIEITMHdyZsyitZxA-STmYvEv50UOAcG4otSihkETsHXrTWV79i4fU", "e": "AQAB", "alg": "RSA-OAEP-256", "ext": true, "key_ops": ["encrypt"]},
};
