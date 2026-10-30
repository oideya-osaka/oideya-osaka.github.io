// おいでや 宿泊者名簿フォーム 文言（日本語 / English / 简体中文 / 한국어）
window.I18N = {
  ja: {
    langName: "日本語",
    title: "宿泊者名簿",
    lead: "宿泊者全員の情報を入力してください。入力内容はお使いの端末で暗号化してから送信されます。",
    stepStay: "宿泊人数・宿泊予定日",
    guests: "宿泊人数",
    guestsUnit: (n) => `${n}名`,
    checkin: "チェックイン日",
    checkout: "チェックアウト日",
    representative: "代表者",
    guest: (n) => `宿泊者 ${n}`,
    name: "お名前",
    nationality: "国籍",
    residence: "居住地",
    resJapan: "日本",
    resOverseas: "日本以外",
    address: "ご自宅の住所",
    contact: "連絡先（例：電話番号）",
    passportNo: "パスポート番号",
    passportPhoto: "パスポート写真",
    photoHint: "顔写真のあるページ全体が写るように撮影してください。",
    choosePhoto: "写真を撮る・選ぶ",
    changePhoto: "写真を変更",
    passportNote: "※日本国外にお住まいの方は、日本の法令によりパスポートの提示が求められます。ご提示いただけない場合はご宿泊いただけませんので、ご協力をお願いいたします。",
    stepTerms: "利用規約",
    agree: "利用規約に同意します。",
    required: "必須",
    next: "次へ",
    back: "戻る",
    submit: "送信する",
    sending: "暗号化して送信しています…",
    errRequired: "入力してください。",
    errChoose: "選択してください。",
    errPhoto: "写真を追加してください。",
    errPassport: "英数字で入力してください。",
    errDates: "チェックアウト日はチェックイン日より後にしてください。",
    errAgree: "同意が必要です。",
    errSend: "送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。",
    errCaptcha: "ロボットでないことの確認を完了してください。",
    retry: "もう一度送信",
    doneTitle: "送信が完了しました",
    doneBody: "ご協力ありがとうございました。おいでやでお待ちしております。",
    step: (i, n) => `${i} / ${n}`,
    secure: "通信と内容は暗号化されています",
  },
  en: {
    langName: "English",
    title: "Guest Registration",
    lead: "Please enter the information for every guest. Your entries are encrypted on your device before they are sent.",
    stepStay: "Number of guests & dates of stay",
    guests: "Number of guests",
    guestsUnit: (n) => (n === 1 ? "1 person" : `${n} people`),
    checkin: "Check-in date",
    checkout: "Check-out date",
    representative: "Lead guest",
    guest: (n) => `Guest ${n}`,
    name: "Full name",
    nationality: "Nationality",
    residence: "Place of residence",
    resJapan: "Japan",
    resOverseas: "Outside Japan",
    address: "Home address",
    contact: "Contact details (e.g. phone number)",
    passportNo: "Passport number",
    passportPhoto: "Passport photo",
    photoHint: "Please capture the whole photo page of the passport.",
    choosePhoto: "Take or choose a photo",
    changePhoto: "Change photo",
    passportNote: "*Guests who do not live in Japan are required by Japanese law to present their passport. If you cannot present it, we will not be able to accommodate you. Thank you for your cooperation.",
    stepTerms: "Terms of service",
    agree: "I agree to the terms and conditions.",
    required: "Required",
    next: "Next",
    back: "Back",
    submit: "Submit",
    sending: "Encrypting and sending…",
    errRequired: "This field is required.",
    errChoose: "Please choose one.",
    errPhoto: "Please add a photo.",
    errPassport: "Please use letters and numbers only.",
    errDates: "Check-out must be after check-in.",
    errAgree: "You must agree to continue.",
    errSend: "We couldn't send your registration. Please check your connection and try again.",
    errCaptcha: "Please complete the verification.",
    retry: "Try again",
    doneTitle: "Registration complete",
    doneBody: "Thank you. We look forward to welcoming you at Oideya.",
    step: (i, n) => `${i} / ${n}`,
    secure: "Your connection and entries are encrypted",
  },
  zh: {
    langName: "简体中文",
    title: "住宿登记",
    lead: "请填写所有入住人员的信息。您填写的内容会先在您的设备上加密，然后再发送。",
    stepStay: "入住人数与入住日期",
    guests: "入住人数",
    guestsUnit: (n) => `${n}人`,
    checkin: "入住日期",
    checkout: "退房日期",
    representative: "代表人",
    guest: (n) => `入住人 ${n}`,
    name: "姓名",
    nationality: "国籍",
    residence: "居住地",
    resJapan: "日本",
    resOverseas: "日本以外",
    address: "家庭住址",
    contact: "联系方式（例：电话号码）",
    passportNo: "护照号码",
    passportPhoto: "护照照片",
    photoHint: "请拍摄护照带有照片的整页。",
    choosePhoto: "拍照或选择照片",
    changePhoto: "更换照片",
    passportNote: "※根据日本法律，居住在日本境外的客人须出示护照。如无法出示，我们将无法为您提供住宿，敬请配合。",
    stepTerms: "使用条款",
    agree: "我同意使用条款。",
    required: "必填",
    next: "下一步",
    back: "返回",
    submit: "提交",
    sending: "正在加密并发送…",
    errRequired: "请填写此项。",
    errChoose: "请选择。",
    errPhoto: "请添加照片。",
    errPassport: "请仅使用字母和数字。",
    errDates: "退房日期须晚于入住日期。",
    errAgree: "需要同意后才能继续。",
    errSend: "发送失败。请检查网络连接后重试。",
    errCaptcha: "请完成验证。",
    retry: "重新发送",
    doneTitle: "提交完成",
    doneBody: "感谢您的配合。期待您光临 Oideya。",
    step: (i, n) => `${i} / ${n}`,
    secure: "通信和内容均已加密",
  },
  ko: {
    langName: "한국어",
    title: "숙박자 명부",
    lead: "숙박하시는 모든 분의 정보를 입력해 주세요. 입력하신 내용은 사용하시는 기기에서 암호화된 후 전송됩니다.",
    stepStay: "숙박 인원 및 숙박 예정일",
    guests: "숙박 인원",
    guestsUnit: (n) => `${n}명`,
    checkin: "체크인 날짜",
    checkout: "체크아웃 날짜",
    representative: "대표자",
    guest: (n) => `숙박자 ${n}`,
    name: "성명",
    nationality: "국적",
    residence: "거주지",
    resJapan: "일본",
    resOverseas: "일본 이외",
    address: "자택 주소",
    contact: "연락처 (예: 전화번호)",
    passportNo: "여권 번호",
    passportPhoto: "여권 사진",
    photoHint: "사진이 있는 여권 페이지 전체가 보이도록 촬영해 주세요.",
    choosePhoto: "사진 촬영 또는 선택",
    changePhoto: "사진 변경",
    passportNote: "※일본 국외에 거주하시는 분은 일본 법령에 따라 여권 제시가 필요합니다. 제시하지 않으시면 숙박하실 수 없으니 협조 부탁드립니다.",
    stepTerms: "이용 약관",
    agree: "이용 약관에 동의합니다.",
    required: "필수",
    next: "다음",
    back: "이전",
    submit: "제출",
    sending: "암호화하여 전송 중…",
    errRequired: "입력해 주세요.",
    errChoose: "선택해 주세요.",
    errPhoto: "사진을 추가해 주세요.",
    errPassport: "영문자와 숫자만 입력해 주세요.",
    errDates: "체크아웃 날짜는 체크인 날짜 이후여야 합니다.",
    errAgree: "동의가 필요합니다.",
    errSend: "전송하지 못했습니다. 인터넷 연결을 확인한 후 다시 시도해 주세요.",
    errCaptcha: "인증을 완료해 주세요.",
    retry: "다시 전송",
    doneTitle: "제출이 완료되었습니다",
    doneBody: "협조해 주셔서 감사합니다. Oideya에서 기다리고 있겠습니다.",
    step: (i, n) => `${i} / ${n}`,
    secure: "통신과 내용은 암호화되어 있습니다",
  },
};

// 利用規約（生年月日の記載を削除済み。英語版に電話番号を追加済み）
window.TERMS = {
  ja: `<h3>【利用規約・個人情報の取り扱いについて】</h3>
<p>当施設（おいでや）は、本フォームを通じて取得した個人情報（氏名・住所・連絡先など）を、以下に定める目的・範囲において取り扱います。</p>
<h4>1. 収集目的と利用範囲</h4>
<ul><li>宿泊予約やチェックイン手続き、本人確認のため</li><li>法令に定められた宿泊者名簿の作成・保管のため</li><li>お客様へのサービス提供・緊急時の連絡・トラブル対応のため</li></ul>
<p>取得した個人情報は、上記利用目的の範囲内でのみ利用し、それ以外の目的で利用することはありません。</p>
<h4>2. 個人情報の保管・管理</h4>
<p>当施設は、取得した個人情報を適切なセキュリティ対策を施した環境に保管し、外部への漏えいを防止します。個人情報は、法令に定める保管期間もしくは当施設の必要と判断する期間、適切に管理し、保管期間終了後は速やかに削除または破棄いたします。</p>
<h4>3. 第三者提供</h4>
<p>本人の同意なく、法令に基づく場合を除き、第三者に提供することはありません。業務委託（予約システム、決済サービスなど）を行う場合は、委託先と適切な契約を締結し、安全管理に努めます。</p>
<h4>4. ゲストの権利</h4>
<p>当施設が保有する個人情報について、お客様は開示、訂正等を請求する権利があります。これらの請求を希望される場合は、下記【お問い合わせ窓口】までご連絡ください。</p>
<h4>5. 施設利用時の注意事項</h4>
<p><strong>施設内ルール</strong></p>
<ul><li>チェックイン・チェックアウト時間を厳守いただきます。</li><li>施設や設備の利用方法、騒音、喫煙等のルールを守ってください。</li><li>故意または過失により施設や備品を破損・紛失した場合、修繕・弁償費用を負担いただくことがあります。</li></ul>
<p><strong>緊急時対応</strong></p>
<ul><li>火災、地震などの災害発生時は、避難経路の指示に従って避難してください。</li><li>紛失物・盗難などのトラブルについては、速やかに当施設スタッフまでご連絡ください。</li></ul>
<h4>6. キャンセルポリシー等</h4>
<p>予約のキャンセルや変更は、当施設のキャンセルポリシーに基づき、所定のキャンセル料を請求する場合があります。レイトチェックアウトや宿泊人数増加に伴う追加料金の発生など、事前に通知・相談を行ってください。</p>
<h4>7. 免責事項</h4>
<p>当施設は、お客様がルール違反または不注意により生じたトラブル・損害について、一切の責任を負いかねます。自然災害や不可抗力による営業停止、サービス中断が生じた場合、その損害に関して当施設は責任を負いません。当施設ホームページ等に記載された情報の正確性・完全性について、細心の注意を払っていますが、これを完全に保証するものではありません。</p>
<h4>8. お問い合わせ窓口</h4>
<p>事業者名：おいでや<br>所在地：大阪市淀川区三津屋北1-9-15<br>電話番号：080-5765-3275<br>メールアドレス：hazy.hajime@gmail.com</p>
<p>本規約の内容や個人情報保護に関するご不明点などがございましたら、上記お問い合わせ先までご連絡ください。</p>`,

  en: `<h3>[Terms of Use and Personal Information Handling]</h3>
<p>Our facility (Oideya) will handle the personal information obtained through this form (such as name, address and contact information) for the purposes and within the scope set out below.</p>
<h4>1. Purpose of collection and scope of use</h4>
<ul><li>For accommodation reservations, check-in procedures and identity verification</li><li>For creating and storing the guest register required by law</li><li>For providing services, contacting guests in emergencies and handling problems</li></ul>
<p>The personal information obtained will be used only within the scope of the purposes above and will not be used for any other purpose.</p>
<h4>2. Storage and management of personal information</h4>
<p>Our facility stores the personal information obtained in an environment with appropriate security measures to prevent leakage. Personal information will be properly managed for the storage period stipulated by law or for the period our facility deems necessary, and will be promptly deleted or destroyed once that period has ended.</p>
<h4>3. Provision to third parties</h4>
<p>We will not provide personal information to third parties without your consent, except where required by law. When we outsource services (reservation systems, payment services, etc.), we enter into appropriate contracts with the contractors and strive to ensure safe management.</p>
<h4>4. Guest rights</h4>
<p>You have the right to request disclosure, correction, etc. of the personal information held by our facility. If you wish to make such a request, please contact us using the [Contact information] below.</p>
<h4>5. Notes on using the facility</h4>
<p><strong>Facility rules</strong></p>
<ul><li>Please strictly observe the check-in and check-out times.</li><li>Please follow the rules on the use of the facility and equipment, noise, smoking, etc.</li><li>If the facility or its fixtures are damaged or lost intentionally or through negligence, you may be required to pay for repairs or compensation.</li></ul>
<p><strong>Emergencies</strong></p>
<ul><li>In the event of a disaster such as a fire or earthquake, please evacuate by following the evacuation route instructions.</li><li>In case of lost property, theft or other trouble, please contact our staff immediately.</li></ul>
<h4>6. Cancellation policy, etc.</h4>
<p>If you cancel or change your reservation, we may charge a cancellation fee in accordance with our cancellation policy. Please notify and consult us in advance about late check-out or additional charges due to an increase in the number of guests.</p>
<h4>7. Disclaimer</h4>
<p>Our facility accepts no responsibility for any trouble or damage caused by a guest's violation of the rules or carelessness. We are not responsible for damages resulting from suspension of business or interruption of service due to natural disasters or force majeure. While we pay close attention to the accuracy and completeness of the information on our website, we cannot fully guarantee it.</p>
<h4>8. Contact information</h4>
<p>Business name: Oideya<br>Address: 1-9-15 Mitsuyakita, Yodogawa-ku, Osaka<br>Phone: +81-80-5765-3275<br>Email: hazy.hajime@gmail.com</p>
<p>If you have any questions about these terms or the protection of personal information, please contact us using the information above.</p>`,

  zh: `<h3>【使用条款及个人信息处理】</h3>
<p>本设施（Oideya）将按照以下规定的目的和范围，处理通过本表格获取的个人信息（姓名、住址、联系方式等）。</p>
<h4>1. 收集目的与使用范围</h4>
<ul><li>用于住宿预订、入住手续及身份确认</li><li>用于制作和保存法律规定的住宿登记簿</li><li>用于向客人提供服务、紧急联络及处理纠纷</li></ul>
<p>所获取的个人信息仅在上述使用目的范围内使用，不会用于其他任何目的。</p>
<h4>2. 个人信息的保管与管理</h4>
<p>本设施将所获取的个人信息保存在采取了适当安全措施的环境中，防止向外部泄露。个人信息将在法律规定的保存期限或本设施认为必要的期限内妥善管理，保存期满后将及时删除或销毁。</p>
<h4>3. 向第三方提供</h4>
<p>除法律规定的情况外，未经本人同意，不会向第三方提供个人信息。如委托外部业务（预订系统、支付服务等），将与受托方签订适当的合同，并努力确保安全管理。</p>
<h4>4. 客人的权利</h4>
<p>对于本设施持有的个人信息，客人有权要求披露、更正等。如需提出此类要求，请通过下方【联系方式】与我们联系。</p>
<h4>5. 使用设施时的注意事项</h4>
<p><strong>设施规则</strong></p>
<ul><li>请严格遵守入住和退房时间。</li><li>请遵守设施和设备的使用方法、噪音、吸烟等相关规定。</li><li>如因故意或过失造成设施或物品损坏、丢失，可能需要承担修理或赔偿费用。</li></ul>
<p><strong>紧急情况应对</strong></p>
<ul><li>发生火灾、地震等灾害时，请按照疏散路线指示进行避难。</li><li>如遇物品遗失、被盗等情况，请立即联系本设施工作人员。</li></ul>
<h4>6. 取消政策等</h4>
<p>取消或变更预订时，本设施可能会根据取消政策收取规定的取消费用。如需延迟退房或因入住人数增加而产生额外费用，请事先通知并与我们协商。</p>
<h4>7. 免责声明</h4>
<p>对于因客人违反规则或疏忽而造成的纠纷或损失，本设施概不负责。因自然灾害或不可抗力导致停业或服务中断时，本设施不对由此造成的损失承担责任。本设施网站等所刊载的信息，我们会尽力确保其准确性和完整性，但不作完全保证。</p>
<h4>8. 联系方式</h4>
<p>经营者名称：Oideya（おいでや）<br>地址：大阪市淀川区三津屋北1-9-15<br>电话：+81-80-5765-3275<br>电子邮件：hazy.hajime@gmail.com</p>
<p>如对本条款内容或个人信息保护有任何疑问，请通过上述联系方式与我们联系。</p>
<p class="small">※本条款以日文版为准，中文译文仅供参考。</p>`,

  ko: `<h3>【이용 약관 및 개인정보 취급에 관하여】</h3>
<p>당 시설(Oideya)은 본 양식을 통해 취득한 개인정보(성명, 주소, 연락처 등)를 아래에 정한 목적과 범위 내에서 취급합니다.</p>
<h4>1. 수집 목적 및 이용 범위</h4>
<ul><li>숙박 예약, 체크인 절차 및 본인 확인을 위해</li><li>법령에서 정한 숙박자 명부의 작성 및 보관을 위해</li><li>고객 서비스 제공, 긴급 시 연락 및 문제 대응을 위해</li></ul>
<p>취득한 개인정보는 위 이용 목적의 범위 내에서만 이용하며, 그 외의 목적으로 이용하지 않습니다.</p>
<h4>2. 개인정보의 보관 및 관리</h4>
<p>당 시설은 취득한 개인정보를 적절한 보안 조치를 갖춘 환경에 보관하여 외부 유출을 방지합니다. 개인정보는 법령에서 정한 보관 기간 또는 당 시설이 필요하다고 판단하는 기간 동안 적절히 관리하며, 보관 기간이 끝나면 신속하게 삭제 또는 파기합니다.</p>
<h4>3. 제3자 제공</h4>
<p>법령에 근거한 경우를 제외하고, 본인의 동의 없이 제3자에게 제공하지 않습니다. 업무를 위탁하는 경우(예약 시스템, 결제 서비스 등)에는 위탁처와 적절한 계약을 체결하고 안전 관리에 힘씁니다.</p>
<h4>4. 고객의 권리</h4>
<p>당 시설이 보유한 개인정보에 대해 고객은 공개, 정정 등을 청구할 권리가 있습니다. 이러한 청구를 희망하시는 경우 아래 【문의처】로 연락해 주십시오.</p>
<h4>5. 시설 이용 시 주의 사항</h4>
<p><strong>시설 내 규칙</strong></p>
<ul><li>체크인 및 체크아웃 시간을 반드시 지켜 주십시오.</li><li>시설 및 설비의 이용 방법, 소음, 흡연 등에 관한 규칙을 지켜 주십시오.</li><li>고의 또는 과실로 시설이나 비품을 파손·분실한 경우 수리·변상 비용을 부담하실 수 있습니다.</li></ul>
<p><strong>긴급 시 대응</strong></p>
<ul><li>화재, 지진 등 재해 발생 시에는 대피 경로 안내에 따라 대피해 주십시오.</li><li>분실물, 도난 등의 문제가 발생하면 즉시 당 시설 직원에게 연락해 주십시오.</li></ul>
<h4>6. 취소 정책 등</h4>
<p>예약을 취소하거나 변경하는 경우, 당 시설의 취소 정책에 따라 소정의 취소 수수료를 청구할 수 있습니다. 레이트 체크아웃이나 숙박 인원 증가에 따른 추가 요금 발생 등은 사전에 알리고 상담해 주십시오.</p>
<h4>7. 면책 사항</h4>
<p>당 시설은 고객의 규칙 위반 또는 부주의로 발생한 문제나 손해에 대해 일절 책임을 지지 않습니다. 자연재해나 불가항력으로 인한 영업 정지 또는 서비스 중단이 발생한 경우, 그로 인한 손해에 대해 당 시설은 책임을 지지 않습니다. 당 시설 홈페이지 등에 게재된 정보의 정확성과 완전성에 대해 세심한 주의를 기울이고 있으나, 이를 완전히 보증하지는 않습니다.</p>
<h4>8. 문의처</h4>
<p>사업자명: Oideya(おいでや)<br>소재지: 오사카시 요도가와구 미쓰야키타 1-9-15<br>전화: +81-80-5765-3275<br>이메일: hazy.hajime@gmail.com</p>
<p>본 약관의 내용이나 개인정보 보호에 관해 궁금하신 점이 있으시면 위 문의처로 연락해 주십시오.</p>
<p class="small">※본 약관은 일본어판을 정본으로 하며, 한국어 번역은 참고용입니다.</p>`,
};
