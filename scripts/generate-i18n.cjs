const fs = require('fs');
const path = require('path');

const en = require('../src/i18n/en.json');
const zhCN = require('../src/i18n/zh-CN.json');

const translations = {
  'zh-TW': {
    "nav": {
      "products": "產品功能",
      "security": "安全保障",
      "partners": "合夥人",
      "about": "關於我們",
      "getStarted": "開始使用"
    },
    "hero": {
      "title_part1": "您的數字資產，",
      "title_part2": "現在可以做更多。",
      "subtitle": "新一代數字支付解決方案。支持 Visa & Mastercard 虛擬卡與實體卡、全球 eSIM 以及合规法幣提現。",
      "cta_start": "立即開始",
      "cta_download": "下載 App"
    },
    "features": {
      "title": "釋放加密貨幣的真正力量",
      "subtitle": "全球消費與數字資產管理所需的一切，盡在一個 App 掌握。",
      "card1_title": "加密貨幣卡",
      "card1_desc": "支持 Visa 與 Mastercard，在全球數千萬家商戶即刷即付，即開即用。",
      "card2_title": "全球 eSIM",
      "card2_desc": "覆蓋全球 137+ 國家和地區，支持加密貨幣支付並即時激活，落地即聯網。",
      "card3_title": "大額出金",
      "card3_desc": "持牌銀行直連，合規出金，大額資金無憂，享受極速安全出金體驗。",
      "card4_title": "聊天即轉賬",
      "card4_desc": "像聊天一樣發送資金，支持紅包、禮品和用戶間免手續費的同名劃轉。"
    },
    "cardShowcase": {
      "title": "選擇專屬您的卡片",
      "subtitle": "實體卡或虛擬卡，Visa 或 Mastercard。雙卡組織，滿足您的多樣消費需求。",
      "virtual_title": "靈活便捷的虛擬卡",
      "virtual_desc": "1分鐘極速開卡，即刻綁定，完美支持各類海淘消費和全球主流 SaaS 服務訂閱。",
      "physical_title": "尊貴啞光黑實體卡",
      "physical_desc": "高級啞光黑色實體卡。在全球支持 Visa 的 ATM 和 POS 機消費，尊享無境外交易費優惠。"
    },
    "stats": {
      "countries": "覆蓋國家與地區",
      "partners": "全球合作伙伴",
      "rewards": "已發放佣金總額"
    },
    "esim": {
      "title": "使用 eSIM 連接世界",
      "subtitle": "免實體卡，免漫遊費。落地即刻聯網，隨時暢享高速網絡。",
      "desc1": "支持全球 137+ 國家和地區網絡連接。",
      "desc2": "支持 USDT 支付，掃碼秒級激活啟用。",
      "desc3": "專為數字遊民量身打造的多樣流量套餐。"
    },
    "partners": {
      "title": "UUPAY 推介合夥人計劃",
      "subtitle": "推薦好友開卡消費，即可獲得最高 50% 比例的返傭獎勵。",
      "earn": "開始賺取佣金",
      "apply": "申請加入合夥人"
    },
    "promotions": {
      "title": "限時特惠活動",
      "subtitle": "專為早期用戶準備的專屬福利。",
      "promo1_title": "1 USDT 開虛擬卡",
      "promo1_desc": "活動期間僅需 1 USDT 即可開卡，開卡即送 1 USDT 消費金。",
      "promo2_title": "充值手續費全免",
      "promo2_desc": "活動期間所有充值與劃轉通道尊享 0 手續費優惠。"
    },
    "download": {
      "title": "下載 UUPAY App",
      "subtitle": "掃描下方二維碼或前往應用商店下載官方 App 體驗。",
      "ios": "App Store 下載",
      "android": "Google Play 下載",
      "apk": "Android APK 下載"
    },
    "footer": {
      "desc": "讓支付回歸簡單，讓世界觸手可達。新一代加密金融卡服務平台。",
      "company": "公司",
      "legal": "法律政策",
      "support": "客戶支持",
      "rights": "版權所有。"
    }
  },
  'ja': {
    "nav": {
      "products": "サービス",
      "security": "セキュリティ",
      "partners": "パートナー",
      "about": "会社概要",
      "getStarted": "今すぐ開始"
    },
    "hero": {
      "title_part1": "デジタル資産を、",
      "title_part2": "もっと自由に使えるように。",
      "subtitle": "次世代の暗号資産決済プラットフォーム。Visa＆Mastercard仮想カード、グローバルeSIM、シームレスな法定通貨への出金をサポート。",
      "cta_start": "今すぐ開始",
      "cta_download": "アプリをダウンロード"
    },
    "features": {
      "title": "暗号資産の真の力を解き放つ",
      "subtitle": "世界中での支払いとデジタル資産の管理に必要なすべてが、1つのアプリに集約されています。",
      "card1_title": "暗号資産カード",
      "card1_desc": "VisaとMastercardをサポート。世界中の何千万もの加盟店で即座に決済が可能です。",
      "card2_title": "グローバルeSIM",
      "card2_desc": "世界137カ国以上をカバー。暗号資産で購入し、すぐにアクティベートしてネットに接続。",
      "card3_title": "大口出金サービス",
      "card3_desc": "ライセンス銀行との直接連携により、安心・安全に大口の暗号資産から法定通貨への換金を実現。",
      "card4_title": "チャット送金",
      "card4_desc": "メッセージを送るように簡単に送金。お年玉、ギフト、手数料無料のP2P送金をサポート。"
    },
    "cardShowcase": {
      "title": "あなただけのカードを選択",
      "subtitle": "リアルカードか仮想カード、VisaかMastercard。ニーズに合わせてお選びいただけます。",
      "virtual_title": "柔軟で便利な仮想カード",
      "virtual_desc": "1分で即時発行。オンラインショッピングやグローバルSaaSサブスクリプションに最適です。",
      "physical_title": "プレミアムマットブラック実体カード",
      "physical_desc": "高級感のあるマットブラックVisaカード。世界中のATMやPOS端末での取引で海外手数料が無料に。"
    },
    "stats": {
      "countries": "カバー国・地域",
      "partners": "グローバルパートナー",
      "rewards": "累計報酬支払額"
    },
    "esim": {
      "title": "eSIMで世界とつながる",
      "subtitle": "物理カード不要、ローミング料金不要。到着後すぐに高速インターネットをご利用いただけます。",
      "desc1": "世界137カ国・地域のネットワーク接続に対応。",
      "desc2": "USDTでの支払いに対応、QRコードスキャンで即座にアクティベート。",
      "desc3": "デジタルノマドに最適な多様なデータプラン。"
    },
    "partners": {
      "title": "UUPAYパートナープログラム",
      "subtitle": "友人を紹介してカードを開設・利用してもらうことで、最大50%の報酬を獲得できます。",
      "earn": "報酬獲得を開始",
      "apply": "パートナー登録申請"
    },
    "promotions": {
      "title": "期間限定キャンペーン",
      "subtitle": "早期ユーザー向けの特別な限定特典。",
      "promo1_title": "1 USDTで仮想カード発行",
      "promo1_desc": "キャンペーン期間中、わずか1 USDTでカード発行、さらに1 USDTの消費クレジットを即時プレゼント。",
      "promo2_title": "チャージ手数料無料",
      "promo2_desc": "期間中、すべてのチャージおよび送金チャンネルで手数料が無料になります。"
    },
    "download": {
      "title": "UUPAYアプリのダウンロード",
      "subtitle": "以下のQRコードをスキャンするか、公式アプリストアからダウンロードして体験してください。",
      "ios": "App Storeでダウンロード",
      "android": "Google Playでダウンロード",
      "apk": "Android APKダウンロード"
    },
    "footer": {
      "desc": "決済をシンプルに、世界をもっと身近に。次世代の暗号資産金融カードプラットフォーム。",
      "company": "会社",
      "legal": "法的ポリシー",
      "support": "サポート",
      "rights": "All rights reserved."
    }
  },
  'ko': {
    "nav": {
      "products": "서비스 기능",
      "security": "보안 지원",
      "partners": "파트너",
      "about": "회사 소개",
      "getStarted": "시작하기"
    },
    "hero": {
      "title_part1": "귀하의 디지털 자산,",
      "title_part2": "이제 더 많은 것을 할 수 있습니다.",
      "subtitle": "차세대 암호화폐 결제 플랫폼. Visa 및 Mastercard 가상 카드, 글로벌 eSIM, 원활한 법정화폐 인출 지원.",
      "cta_start": "지금 시작하기",
      "cta_download": "앱 다운로드"
    },
    "features": {
      "title": "암호화폐의 진정한 힘을 발휘하다",
      "subtitle": "글로벌 소비와 디지털 자산 관리에 필요한 모든 것을 하나의 앱에서 경험하세요.",
      "card1_title": "암호화폐 카드",
      "card1_desc": "Visa 및 Mastercard 지원. 전 세계 수천만 가맹점에서 즉시 암호화폐 결제 사용 가능.",
      "card2_title": "글로벌 eSIM",
      "card2_desc": "전 세계 137개국 이상 커버. 암호화폐로 결제하고 즉시 활성화하여 도착 즉시 연결.",
      "card3_title": "대액 인출",
      "card3_desc": "라이선스 은행 직접 연동으로 안전하고 법규를 준수하는 대용량 암호화폐-법정화폐 변환.",
      "card4_title": "채팅 송금",
      "card4_desc": "메시지 보내듯 간편하게 송금. 홍바오(붉은 봉투), 선물 및 수수료 없는 P2P 전송 지원."
    },
    "cardShowcase": {
      "title": "귀하만의 카드 선택",
      "subtitle": "실물 카드 또는 가상 카드, Visa 또는 Mastercard. 다양한 필요를 충족합니다.",
      "virtual_title": "유연하고 편리한 가상 카드",
      "virtual_desc": "1분 내 즉시 발급. 온라인 쇼핑 및 글로벌 SaaS 구독에 이상적입니다.",
      "physical_title": "프리미엄 매트 블랙 실물 카드",
      "physical_desc": "고급 매트 블랙 Visa 카드. 전 세계 ATM 및 POS에서 해외 거래 수수료 없이 사용하세요."
    },
    "stats": {
      "countries": "지원 국가 및 지역",
      "partners": "글로벌 파트너",
      "rewards": "누적 수수료 지급액"
    },
    "esim": {
      "title": "eSIM으로 세계를 연결하다",
      "subtitle": "실물 카드 없이, 로밍 요금 없이. 도착 즉시 초고속 인터넷을 즐겨보세요.",
      "desc1": "전 세계 137개국 이상의 네트워크 지원.",
      "desc2": "USDT 결제 가능, QR 코드 스캔으로 즉시 활성화.",
      "desc3": "디지털 노마드를 위한 맞춤형 다양한 데이터 요금제."
    },
    "partners": {
      "title": "UUPAY 추천 파트너 프로그램",
      "subtitle": "친구에게 카드를 추천하여 개설하고 사용하면 최대 50%의 보상을 받을 수 있습니다.",
      "earn": "수수료 수익 시작",
      "apply": "파트너 신청하기"
    },
    "promotions": {
      "title": "기간 한정 캠페인",
      "subtitle": "초기 가입 고객만을 위한 특별한 혜택.",
      "promo1_title": "1 USDT 가상 카드 발급",
      "promo1_desc": "이벤트 기간 동안 단 1 USDT로 카드를 발급하고, 1 USDT 소비금을 즉시 증정.",
      "promo2_title": "충전 수수료 완전 면제",
      "promo2_desc": "이벤트 기간 내 모든 충전 및 이체 채널에 대해 수수료 0% 혜택 적용."
    },
    "download": {
      "title": "UUPAY 앱 다운로드",
      "subtitle": "아래 QR 코드를 스캔하거나 공식 앱 스토어에서 다운로드하여 시작해보세요.",
      "ios": "App Store 다운로드",
      "android": "Google Play 다운로드",
      "apk": "Android APK 다운로드"
    },
    "footer": {
      "desc": "결제를 간단하게, 세상을 더 가깝게. 차세대 암호화폐 결제 금융 카드 플랫폼.",
      "company": "회사",
      "legal": "법률 정책",
      "support": "고객 지원",
      "rights": "All rights reserved."
    }
  },
  'vi': {
    "nav": {
      "products": "Tính năng sản phẩm",
      "security": "Bảo mật",
      "partners": "Đối tác",
      "about": "Giới thiệu",
      "getStarted": "Bắt đầu ngay"
    },
    "hero": {
      "title_part1": "Tài sản kỹ thuật số của bạn,",
      "title_part2": "Giờ đây có thể làm nhiều hơn thế.",
      "subtitle": "Nền tảng thanh toán tiền điện tử thế hệ mới. Thẻ ảo Visa & Mastercard, eSIM toàn cầu và rút tiền fiat liền mạch.",
      "cta_start": "Bắt đầu ngay",
      "cta_download": "Tải App"
    },
    "features": {
      "title": "Giải phóng sức mạnh thực sự của Crypto",
      "subtitle": "Mọi thứ bạn cần cho chi tiêu toàn cầu và quản lý tài sản kỹ thuật số chỉ trong một ứng dụng.",
      "card1_title": "Thẻ Crypto",
      "card1_desc": "Hỗ trợ Visa & Mastercard. Chi tiêu crypto toàn cầu tại hàng triệu điểm chấp nhận thẻ. Phát hành ngay lập tức.",
      "card2_title": "eSIM toàn cầu",
      "card2_desc": "Kết nối tại 137+ quốc gia. Mua bằng crypto, kích hoạt ngay không cần SIM vật lý.",
      "card3_title": "Rút tiền Fiat lớn",
      "card3_desc": "Kết nối trực tiếp ngân hàng được cấp phép. Chuyển đổi crypto sang fiat khối lượng lớn an toàn và tuân thủ pháp luật.",
      "card4_title": "Trò chuyện & Chuyển tiền",
      "card4_desc": "Gửi tiền dễ dàng như gửi tin nhắn. Lì xì, quà tặng và chuyển khoản P2P không mất phí."
    },
    "cardShowcase": {
      "title": "Chọn thẻ của riêng bạn",
      "subtitle": "Thẻ vật lý hoặc thẻ ảo, Visa hoặc Mastercard. Đáp ứng đa dạng nhu cầu tiêu dùng của bạn.",
      "virtual_title": "Thẻ ảo linh hoạt và tiện lợi",
      "virtual_desc": "Phát hành thẻ nhanh chóng trong 1 phút, liên kết tức thì, hỗ trợ tuyệt vời cho mua sắm trực tuyến toàn cầu và đăng ký SaaS.",
      "physical_title": "Thẻ vật lý đen mờ sang trọng",
      "physical_desc": "Thẻ Visa vật lý cao cấp. Rút tiền tại ATM và thanh toán POS trên toàn cầu mà không mất phí giao dịch quốc tế."
    },
    "stats": {
      "countries": "Quốc gia và khu vực được hỗ trợ",
      "partners": "Đối tác toàn cầu",
      "rewards": "Tổng hoa hồng đã chi trả"
    },
    "esim": {
      "title": "Kết nối thế giới với eSIM",
      "subtitle": "Không cần thẻ vật lý, không phí chuyển vùng. Kết nối internet tốc độ cao ngay khi đáp máy bay.",
      "desc1": "Hỗ trợ kết nối mạng tại 137+ quốc gia và vùng lãnh thổ.",
      "desc2": "Hỗ trợ thanh toán bằng USDT, quét mã QR kích hoạt trong vài giây.",
      "desc3": "Các gói cước đa dạng được thiết kế riêng cho các Digital Nomad."
    },
    "partners": {
      "title": "Chương trình đối tác giới thiệu UUPAY",
      "subtitle": "Giới thiệu bạn bè mở thẻ và chi tiêu để nhận phần thưởng hoa hồng lên tới 50%.",
      "earn": "Bắt đầu kiếm hoa hồng",
      "apply": "Đăng ký tham gia đối tác"
    },
    "promotions": {
      "title": "Chương trình ưu đãi có hạn",
      "subtitle": "Phần thưởng độc quyền dành cho những người dùng đầu tiên.",
      "promo1_title": "Mở thẻ ảo chỉ với 1 USDT",
      "promo1_desc": "Trong thời gian diễn ra hoạt động, chỉ cần 1 USDT để mở thẻ và nhận ngay 1 USDT tiêu dùng.",
      "promo2_title": "Miễn phí nạp tiền",
      "promo2_desc": "Miễn phí 100% phí giao dịch nạp tiền và chuyển tiền trong suốt thời gian khuyến mãi."
    },
    "download": {
      "title": "Tải ứng dụng UUPAY",
      "subtitle": "Quét mã QR dưới đây hoặc truy cập cửa hàng ứng dụng chính thức để tải và trải nghiệm ngay.",
      "ios": "Tải trên App Store",
      "android": "Tải trên Google Play",
      "apk": "Tải APK cho Android"
    },
    "footer": {
      "desc": "Thanh toán đơn giản hơn, thế giới gần hơn. Nền tảng thẻ tài chính tiền điện tử thế hệ mới.",
      "company": "Công ty",
      "legal": "Chính sách pháp lý",
      "support": "Hỗ trợ",
      "rights": "All rights reserved."
    }
  },
  'th': {
    "nav": {
      "products": "ฟีเจอร์สินค้า",
      "security": "การรักษาความปลอดภัย",
      "partners": "พันธมิตร",
      "about": "เกี่ยวกับเรา",
      "getStarted": "เริ่มต้นใช้งาน"
    },
    "hero": {
      "title_part1": "สินทรัพย์ดิจิทัลของคุณ",
      "title_part2": "ตอนนี้สามารถทำสิ่งต่างๆ ได้มากขึ้น",
      "subtitle": "แพลตฟอร์มการชำระเงินคริปโตยุคใหม่ การ์ดเสมือนจริง Visa & Mastercard, eSIM ทั่วโลก และการถอนเงินเฟียตที่สะดวกสบาย",
      "cta_start": "เริ่มต้นใช้งานทันที",
      "cta_download": "ดาวน์โหลดแอป"
    },
    "features": {
      "title": "ปลดปล่อยพลังที่แท้จริงของคริปโต",
      "subtitle": "ทุกสิ่งที่คุณต้องการสำหรับการใช้จ่ายทั่วโลกและการจัดการสินทรัพย์ดิจิทัลในแอปเดียว",
      "card1_title": "บัตรคริปโต",
      "card1_desc": "รองรับ Visa และ Mastercard ใช้จ่ายคริปโตของคุณทั่วโลกกับร้านค้าหลายล้านแห่ง ออกบัตรได้ทันที",
      "card2_title": "eSIM ทั่วโลก",
      "card2_desc": "ครอบคลุมกว่า 137 ประเทศ ซื้อด้วยคริปโตและเปิดใช้งานได้ทันทีโดยไม่ต้องใช้ซิมการ์ดปกติ",
      "card3_title": "การถอนเงินจำนวนมาก",
      "card3_desc": "เชื่อมต่อตรงกับธนาคารที่ได้รับใบอนุญาต การแปลงคริปโตเป็นเงินเฟียตจำนวนมากอย่างปลอดภัยและเป็นไปตามกฎหมาย",
      "card4_title": "แชทและโอนเงิน",
      "card4_desc": "ส่งเงินง่ายเหมือนการส่งข้อความ รองรับอั่งเปา ของขวัญ และการโอนเงิน P2P แบบไม่มีค่าธรรมเนียม"
    },
    "cardShowcase": {
      "title": "เลือกบัตรที่คุณต้องการ",
      "subtitle": "บัตรจริงหรือบัตรเสมือน Visa หรือ Mastercard ครอบคลุมทุกความต้องการใช้จ่ายของคุณ",
      "virtual_title": "บัตรเสมือนที่ยืดหยุ่นและสะดวกสบาย",
      "virtual_desc": "ออกบัตรได้ทันทีใน 1 นาที พร้อมใช้งานสำหรับการช้อปปิ้งออนไลน์และการสมัครบริการ SaaS ทั่วโลก",
      "physical_title": "บัตรจริงสีดำด้านพรีเมียม",
      "physical_desc": "บัตร Visa จริงระดับพรีเมียม ใช้ถอนเงินที่ตู้ ATM และรูดซื้อสินค้าที่เครื่อง POS ทั่วโลกโดยไม่มีค่าธรรมเนียมธุรกรรมระหว่างประเทศ"
    },
    "stats": {
      "countries": "ประเทศและภูมิภาคที่รองรับ",
      "partners": "พันธมิตรระดับโลก",
      "rewards": "ยอดรวมค่าแนะนำที่จ่ายแล้ว"
    },
    "esim": {
      "title": "เชื่อมต่อโลกด้วย eSIM",
      "subtitle": "ไม่ต้องใช้บัตรจริง ไม่ต้องเสียค่าโรมมิ่ง เชื่อมต่ออินเทอร์เน็ตความเร็วสูงทันทีเมื่อเดินทางถึง",
      "desc1": "รองรับการเชื่อมต่อเครือข่ายในกว่า 137 ประเทศและภูมิภาคทั่วโลก",
      "desc2": "รองรับการชำระเงินด้วย USDT สแกน QR Code เพื่อเปิดใช้งานทันทีในไม่กี่วินาที",
      "desc3": "แพ็กเกจข้อมูลที่หลากหลาย ออกแบบมาเป็นพิเศษสำหรับ Digital Nomad"
    },
    "partners": {
      "title": "โปรแกรมพันธมิตรผู้แนะนำ UUPAY",
      "subtitle": "แนะนำเพื่อนให้เปิดบัตรและใช้จ่ายเพื่อรับรางวัลค่าแนะนำสูงสุดถึง 50%",
      "earn": "เริ่มสร้างรายได้ค่าแนะนำ",
      "apply": "สมัครเข้าร่วมเป็นพันธมิตร"
    },
    "promotions": {
      "title": "ข้อเสนอพิเศษระยะเวลาจำกัด",
      "subtitle": "รางวัลพิเศษสำหรับผู้ใช้งานกลุ่มแรก",
      "promo1_title": "เปิดบัตรเสมือนเพียง 1 USDT",
      "promo1_desc": "ในช่วงระยะเวลากิจกรรม เปิดบัตรเพียง 1 USDT และรับโบนัสการใช้จ่าย 1 USDT คืนทันที",
      "promo2_title": "ฟรีค่าธรรมเนียมการเติมเงิน",
      "promo2_desc": "ฟรีค่าธรรมเนียมการทำธุรกรรมการฝากและเติมเงิน 100% ตลอดระยะเวลาโปรโมชั่น"
    },
    "download": {
      "title": "ดาวน์โหลดแอป UUPAY",
      "subtitle": "สแกน QR Code ด้านล่างหรือไปที่ร้านค้าแอปพลิเคชันอย่างเป็นทางการเพื่อดาวน์โหลดและเริ่มใช้งาน",
      "ios": "ดาวน์โหลดจาก App Store",
      "android": "ดาวน์โหลดจาก Google Play",
      "apk": "ดาวน์โหลดไฟล์ Android APK"
    },
    "footer": {
      "desc": "ให้การชำระเงินเป็นเรื่องง่าย ให้โลกอยู่ใกล้แค่เอื้อม แพลตฟอร์มบัตรคริปโตยุคใหม่",
      "company": "บริษัท",
      "legal": "นโยบายกฎหมาย",
      "support": "ช่วยเหลือ",
      "rights": "All rights reserved."
    }
  },
  'ms': {
    "nav": {
      "products": "Ciri Produk",
      "security": "Keselamatan",
      "partners": "Rakan Kongsi",
      "about": "Tentang Kami",
      "getStarted": "Mulakan"
    },
    "hero": {
      "title_part1": "Aset Digital Anda,",
      "title_part2": "Kini Boleh Melakukan Lebih Banyak Lagi.",
      "subtitle": "Platform pembayaran kripto generasi akan datang. Kad maya Visa & Mastercard, eSIM global, dan pengeluaran fiat yang lancar.",
      "cta_start": "Mula Sekarang",
      "cta_download": "Muat Turun App"
    },
    "features": {
      "title": "Bebaskan Kuasa Sebenar Kripto",
      "subtitle": "Semua yang anda perlukan untuk perbelanjaan global dan pengurusan aset digital dalam satu aplikasi.",
      "card1_title": "Kad Kripto",
      "card1_desc": "Menyokong Visa & Mastercard. Belanjakan kripto anda secara global di jutaan pedagang. Pengeluaran kad segera.",
      "card2_title": "eSIM Global",
      "card2_desc": "Sambungan di 137+ negara. Beli dengan kripto dan aktifkan serta-merta tanpa kad SIM fizikal.",
      "card3_title": "Pengeluaran Fiat Besar",
      "card3_desc": "Sambungan bank terus berlesen. Penukaran kripto kepada fiat jumlah besar yang selamat dan patuh undang-undang.",
      "card4_title": "Sembang & Bayar",
      "card4_desc": "Hantar wang semudah menghantar mesej. Sampul merah, hadiah, dan pemindahan P2P tanpa yuran."
    },
    "cardShowcase": {
      "title": "Pilih Kad Anda",
      "subtitle": "Kad fizikal atau kad maya, Visa atau Mastercard. Memenuhi pelbagai keperluan perbelanjaan anda.",
      "virtual_title": "Kad Maya Fleksibel dan Selesa",
      "virtual_desc": "Pengeluaran kad segera dalam 1 minit, pautkan terus, sokongan hebat untuk beli-belah dalam talian global dan langganan SaaS.",
      "physical_title": "Kad Fizikal Hitam Pusam Premium",
      "physical_desc": "Kad Visa fizikal premium. Keluarkan tunai di ATM dan bayar di POS di seluruh dunia tanpa yuran transaksi antarabangsa."
    },
    "stats": {
      "countries": "Negara dan Wilayah Disokong",
      "partners": "Rakan Kongsi Global",
      "rewards": "Jumlah Komisen Dibayar"
    },
    "esim": {
      "title": "Hubungkan Dunia dengan eSIM",
      "subtitle": "Tiada kad fizikal, tiada yuran perayauan. Sambungkan internet berkelajuan tinggi sebaik sahaja anda mendarat.",
      "desc1": "Sokongan sambungan rangkaian di 137+ negara dan wilayah di seluruh dunia.",
      "desc2": "Sokongan pembayaran dengan USDT, imbas kod QR untuk aktifkan serta-merta.",
      "desc3": "Pelbagai pakej data yang direka khas untuk Digital Nomad."
    },
    "partners": {
      "title": "Program Rakan Kongsi Rujukan UUPAY",
      "subtitle": "Rujuk rakan untuk membuka kad dan berbelanja untuk menerima ganjaran komisen sehingga 50%.",
      "earn": "Mula Menjana Komisen",
      "apply": "Mohon Menyertai Rakan Kongsi"
    },
    "promotions": {
      "title": "Tawaran Had Masa",
      "subtitle": "Ganjaran eksklusif untuk pengguna terawal.",
      "promo1_title": "Buka Kad Maya hanya 1 USDT",
      "promo1_desc": "Dalam tempoh kempen, buka kad dengan hanya 1 USDT dan terima ganjaran perbelanjaan 1 USDT serta-merta.",
      "promo2_title": "Percuma Yuran Tambah Nilai",
      "promo2_desc": "Percuma 100% yuran transaksi deposit dan tambah nilai sepanjang tempoh promosi."
    },
    "download": {
      "title": "Muat Turun Aplikasi UUPAY",
      "subtitle": "Imbas kod QR di bawah atau lawati stor aplikasi rasmi untuk memuat turun dan mula mengalami.",
      "ios": "Muat turun di App Store",
      "android": "Muat turun di Google Play",
      "apk": "Muat turun APK Android"
    },
    "footer": {
      "desc": "Permudah pembayaran, dekatkan dunia. Platform kad kewangan kripto generasi akan datang.",
      "company": "Syarikat",
      "legal": "Dasar Undang-undang",
      "support": "Sokongan",
      "rights": "All rights reserved."
    }
  },
  'id': {
    "nav": {
      "products": "Fitur Produk",
      "security": "Keamanan",
      "partners": "Kemitraan",
      "about": "Tentang Kami",
      "getStarted": "Mulai"
    },
    "hero": {
      "title_part1": "Aset Digital Anda,",
      "title_part2": "Kini Bisa Melakukan Lebih Banyak Hal.",
      "subtitle": "Platform pembayaran kripto generasi masa depan. Kartu virtual Visa & Mastercard, eSIM global, dan penarikan fiat yang lancar.",
      "cta_start": "Mulai Sekarang",
      "cta_download": "Unduh Aplikasi"
    },
    "features": {
      "title": "Bebaskan Kekuatan Sejati Kripto",
      "subtitle": "Semua yang Anda butuhkan untuk belanja global dan pengelolaan aset digital dalam satu aplikasi.",
      "card1_title": "Kartu Kripto",
      "card1_desc": "Mendukung Visa & Mastercard. Belanjakan kripto Anda secara global di jutaan merchant. Penerbitan kartu instan.",
      "card2_title": "eSIM Global",
      "card2_desc": "Koneksi di 137+ negara. Beli dengan kripto, aktifkan instan tanpa kartu SIM fisik.",
      "card3_title": "Penarikan Fiat Besar",
      "card3_desc": "Koneksi bank berlisensi langsung. Konversi kripto ke fiat volume besar yang aman dan patuh hukum.",
      "card4_title": "Obrolan & Kirim Uang",
      "card4_desc": "Kirim uang semudah mengirim pesan. Angpao, hadiah, dan transfer P2P tanpa biaya."
    },
    "cardShowcase": {
      "title": "Pilih Kartu Anda",
      "subtitle": "Kartu fisik atau kartu virtual, Visa atau Mastercard. Memenuhi berbagai kebutuhan belanja Anda.",
      "virtual_title": "Kartu Virtual yang Fleksibel dan Nyaman",
      "virtual_desc": "Penerbitan kartu instan dalam 1 menit, langsung tautkan, dukungan luar biasa untuk belanja online global dan langganan SaaS.",
      "physical_title": "Kartu Fisik Hitam Doff Premium",
      "physical_desc": "Kartu Visa fisik premium. Tarik tunai di ATM dan bayar di POS di seluruh dunia tanpa biaya transaksi internasional."
    },
    "stats": {
      "countries": "Negara dan Wilayah yang Didukung",
      "partners": "Mitra Global",
      "rewards": "Total Komisi yang Dibayarkan"
    },
    "esim": {
      "title": "Hubungkan Dunia dengan eSIM",
      "subtitle": "Tanpa kartu fisik, tanpa biaya roaming. Hubungkan internet berkecepatan tinggi begitu Anda mendarat.",
      "desc1": "Mendukung koneksi jaringan di 137+ negara dan wilayah di seluruh dunia.",
      "desc2": "Mendukung pembayaran dengan USDT, pindai kode QR untuk aktifkan instan.",
      "desc3": "Berbagai paket data yang dirancang khusus untuk Digital Nomad."
    },
    "partners": {
      "title": "Program Kemitraan Referensi UUPAY",
      "subtitle": "Rujuk teman untuk membuka kartu dan berbelanja untuk menerima hadiah komisi hingga 50%.",
      "earn": "Mulai Menghasilkan Komisi",
      "apply": "Ajukan Bergabung dengan Mitra"
    },
    "promotions": {
      "title": "Penawaran Batas Waktu",
      "subtitle": "Hadiah eksklusif untuk pengguna awal.",
      "promo1_title": "Buka Kartu Virtual hanya 1 USDT",
      "promo1_desc": "Selama periode kampanye, buka kartu hanya dengan 1 USDT dan terima hadiah belanja 1 USDT instan.",
      "promo2_title": "Gratis Biaya Isi Ulang",
      "promo2_desc": "Gratis 100% biaya transaksi deposit dan isi ulang selama periode promosi."
    },
    "download": {
      "title": "Unduh Aplikasi UUPAY",
      "subtitle": "Pindai kode QR di bawah ini atau kunjungi toko aplikasi resmi untuk mengunduh dan mulai merasakan.",
      "ios": "Unduh di App Store",
      "android": "Unduh di Google Play",
      "apk": "Unduh APK Android"
    },
    "footer": {
      "desc": "Sederhanakan pembayaran, dekatkan dunia. Platform kartu keuangan kripto generasi masa depan.",
      "company": "Perusahaan",
      "legal": "Kebijakan Hukum",
      "support": "Dukungan",
      "rights": "All rights reserved."
    }
  },
  'es': {
    "nav": {
      "products": "Funciones",
      "security": "Seguridad",
      "partners": "Socios",
      "about": "Nosotros",
      "getStarted": "Empezar"
    },
    "hero": {
      "title_part1": "Tus activos digitales,",
      "title_part2": "Ahora pueden hacer más.",
      "subtitle": "La plataforma de pago criptográfico de próxima generación. Tarjetas virtuales Visa y Mastercard, eSIM global y retiros de fiat sin problemas.",
      "cta_start": "Empezar ahora",
      "cta_download": "Descargar App"
    },
    "features": {
      "title": "Libera el verdadero poder de las criptomonedas",
      "subtitle": "Todo lo que necesitas para gastar globalmente y gestionar activos digitales en una sola aplicación.",
      "card1_title": "Tarjetas Crypto",
      "card1_desc": "Soporte para Visa y Mastercard. Gasta tus criptomonedas globalmente en millones de comercios. Emisión instantánea.",
      "card2_title": "eSIM Global",
      "card2_desc": "Conexión en más de 137 países. Compra con criptomonedas y activa al instante sin tarjetas SIM físicas.",
      "card3_title": "Retiros de Fiat Grandes",
      "card3_desc": "Conexión directa con bancos autorizados. Conversión segura y conforme de criptomonedas a fiat de gran volumen.",
      "card4_title": "Chat y Transferencia",
      "card4_desc": "Envía dinero tan fácil como enviar un mensaje. Sobres rojos, regalos y transferencias P2P sin comisiones."
    },
    "cardShowcase": {
      "title": "Elige tu tarjeta",
      "subtitle": "Física o virtual, Visa o Mastercard. Cubriendo tus diversas necesidades de gasto.",
      "virtual_title": "Tarjeta virtual flexible y conveniente",
      "virtual_desc": "Emisión instantánea en 1 minuto, vinculación inmediata, soporte excelente para compras internacionales en línea y suscripciones SaaS.",
      "physical_title": "Tarjeta física negra mate premium",
      "physical_desc": "Tarjeta Visa física de primera calidad. Retira efectivo en cajeros automáticos y paga en terminales POS en todo el mundo sin comisiones por transacciones internacionales."
    },
    "stats": {
      "countries": "Países y regiones cubiertos",
      "partners": "Socios globales",
      "rewards": "Total de comisiones pagadas"
    },
    "esim": {
      "title": "Conéctate al mundo con eSIM",
      "subtitle": "Sin tarjeta física, sin cargos de roaming. Conéctate a internet de alta velocidad tan pronto como aterrices.",
      "desc1": "Soporte de conexión de red en más de 137 países y regiones de todo el mundo.",
      "desc2": "Soporte de pago con USDT, escanea el código QR para activar al instante.",
      "desc3": "Múltiples paquetes de datos diseñados especialmente para nómadas digitales."
    },
    "partners": {
      "title": "Programa de socios de recomendación de UUPAY",
      "subtitle": "Recomienda a amigos para abrir tarjetas y gastar para recibir recompensas de comisión de hasta el 50%.",
      "earn": "Comenzar a ganar comisiones",
      "apply": "Solicitar unirse a socios"
    },
    "promotions": {
      "title": "Ofertas por tiempo limitado",
      "subtitle": "Recompensas exclusivas para los primeros usuarios.",
      "promo1_title": "Abre tarjeta virtual por solo 1 USDT",
      "promo1_desc": "Durante el periodo de la campaña, abre la tarjeta con solo 1 USDT y recibe una recompensa de consumo de 1 USDT al instante.",
      "promo2_title": "Tarifas de recarga gratuitas",
      "promo2_desc": "100% gratis de comisión de transacciones de depósito y recarga durante todo el periodo promocional."
    },
    "download": {
      "title": "Descargar la aplicación UUPAY",
      "subtitle": "Escanea el código QR a continuación o visita la tienda de aplicaciones oficial para descargarla y comenzar a experimentar.",
      "ios": "Descargar en App Store",
      "android": "Descargar en Google Play",
      "apk": "Descargar APK para Android"
    },
    "footer": {
      "desc": "Simplifica los pagos, acerca el mundo. La plataforma de tarjeta financiera criptográfica de próxima generación.",
      "company": "Empresa",
      "legal": "Políticas legales",
      "support": "Soporte",
      "rights": "All rights reserved."
    }
  },
  'ar': {
    "nav": {
      "products": "المنتجات",
      "security": "الأمان",
      "partners": "الشركاء",
      "about": "من نحن",
      "getStarted": "ابدأ الآن"
    },
    "hero": {
      "title_part1": "أصولك الرقمية،",
      "title_part2": "يمكنها الآن فعل المزيد.",
      "subtitle": "الجيل القادم من منصات الدفع بالعملات المشفرة. بطاقات افتراضية من Visa و Mastercard، خدمة eSIM عالمية، وسحب نقدي سلس للعملات الورقية.",
      "cta_start": "ابدأ الآن",
      "cta_download": "تنزيل التطبيق"
    },
    "features": {
      "title": "أطلق القوة الحقيقية للعملات المشفرة",
      "subtitle": "كل ما تحتاجه للإنفاق العالمي وإدارة الأصول الرقمية في تطبيق واحد.",
      "card1_title": "بطاقات العملات المشفرة",
      "card1_desc": "دعم Visa و Mastercard. أنفق عملاتك المشفرة عالميًا لدى ملايين التجار. إصدار فوري.",
      "card2_title": "eSIM العالمية",
      "card2_desc": "تغطية في أكثر من 137 دولة. اشترِ بالعملات المشفرة وفعّل الخدمة فورًا بدون بطاقات SIM الفعلية.",
      "card3_title": "سحوبات مالية كبيرة",
      "card3_desc": "اتصال مباشر بالبنوك المرخصة. تحويل آمن ومتوافق للمبالغ الكبيرة من العملات المشفرة إلى عملات ورقية.",
      "card4_title": "الدردشة والتحويل",
      "card4_desc": "أرسل الأموال بسهولة إرسال رسالة. مظاريف حمراء، هدايا، وتحويلات P2P بدون رسوم."
    },
    "cardShowcase": {
      "title": "اختر بطاقتك",
      "subtitle": "بطاقة فعلية أو افتراضية، Visa أو Mastercard. تغطي جميع احتياجات الإنفاق الخاصة بك.",
      "virtual_title": "بطاقة افتراضية مرنة ومريحة",
      "virtual_desc": "إصدار فوري في دقيقة واحدة، ربط مباشر، دعم رائع للتسوق الإلكتروني العالمي واشتراكات SaaS.",
      "physical_title": "بطاقة فعلية فاخرة بلون أسود مطفي",
      "physical_desc": "بطاقة Visa فعلية فاخرة. اسحب النقود من أجهزة الصراف الآلي وادفع في نقاط البيع حول العالم بدون رسوم معاملات دولية."
    },
    "stats": {
      "countries": "الدول والمناطق المغطاة",
      "partners": "الشركاء العالميون",
      "rewards": "إجمالي العمولات المدفوعة"
    },
    "esim": {
      "title": "تواصل مع العالم باستخدام eSIM",
      "subtitle": "لا بطاقة فعلية، لا رسوم تجوال. اتصل بالإنترنت فائق السرعة بمجرد وصولك.",
      "desc1": "دعم الاتصال بالشبكة في أكثر من 137 دولة ومنطقة حول العالم.",
      "desc2": "دعم الدفع باستخدام USDT، امسح رمز QR للتفعيل الفوري.",
      "desc3": "باقات بيانات متنوعة مصممة خصيصًا للرحالة الرقميين."
    },
    "partners": {
      "title": "برنامج شركاء الإحالة UUPAY",
      "subtitle": "أوصِ الأصدقاء بفتح البطاقات والإنفاق للحصول على مكافآت عمولة تصل إلى 50%.",
      "earn": "ابدأ في كسب العمولات",
      "apply": "طلب الانضمام كشريك"
    },
    "promotions": {
      "title": "عروض لفترة محدودة",
      "subtitle": "مكافآت حصرية للمستخدمين الأوائل.",
      "promo1_title": "افتح بطاقة افتراضية مقابل 1 USDT فقط",
      "promo1_desc": "خلال فترة الحملة، افتح البطاقة بـ 1 USDT فقط واحصل على مكافأة استهلاك بقيمة 1 USDT فورًا.",
      "promo2_title": "رسوم شحن مجانية",
      "promo2_desc": "مجاني 100% من رسوم معاملات الإيداع والشحن طوال فترة العرض الترويجي."
    },
    "download": {
      "title": "تنزيل تطبيق UUPAY",
      "subtitle": "امسح رمز QR أدناه أو قم بزيارة متجر التطبيقات الرسمي للتنزيل والبدء في التجربة.",
      "ios": "تنزيل من App Store",
      "android": "تنزيل من Google Play",
      "apk": "تنزيل ملف Android APK"
    },
    "footer": {
      "desc": "تبسيط المدفوعات، تقريب العالم. منصة البطاقة المالية الرقمية من الجيل القادم.",
      "company": "الشركة",
      "legal": "السياسات القانونية",
      "support": "الدعم",
      "rights": "جميع الحقوق محفوظة."
    }
  }
};

const i18nDir = path.join(__dirname, '../src/i18n');

if (!fs.existsSync(i18nDir)) {
  fs.mkdirSync(i18nDir, { recursive: true });
}

Object.entries(translations).forEach(([lang, data]) => {
  const filePath = path.join(i18nDir, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Generated: ${filePath}`);
});

console.log('All multilingual translations generated successfully!');
