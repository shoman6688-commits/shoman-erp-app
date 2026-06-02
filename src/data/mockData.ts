export const mockDashboard = {
  yearTarget: 202000000,
  yearActual: 123449065,
  achieveRate: 61.11,
  bestMonth: { name: '3月', rate: 132.8 },
  worstMonth: { name: '11月', rate: 5.1 },
  currentMonth: '6月',
  kpis: {
    foreignRevenue: 8583449,
    foreignRevenueTrend: -20.93,
    profit: 8583449,
    profitTrend: 252.32,
    externalCollection: 593310,
    externalCollectionTrend: 1.98,
  },
};

export const mockOrders = {
  JP: [
    { id: '85254aa6', orderNo: 'TYO01AF260601A', customer: '郭晉佑', pax: 3, departure: '2026/06/01', return: '2026/06/01', vehicle: '阿爾法', company: '駿途株式会社', region: '關東地區', amount: 62000, currency: 'JPY', agent: '黃煒楷KEN' },
    { id: 'f54211b0', orderNo: 'SDJ01HA260601A', customer: '林美玲', pax: 7, departure: '2026/06/01', return: '2026/06/03', vehicle: 'Hiace', company: '北日本交通', region: '東北地區', amount: 72000, currency: 'JPY', agent: '蔡潔萱JENNY' },
    { id: '1f48957f', orderNo: 'FUK03HA260601A', customer: '張家豪', pax: 6, departure: '2026/06/01', return: '2026/06/04', vehicle: 'Hiace', company: '九州ドライブ', region: '九州地區', amount: 243000, currency: 'JPY', agent: '張琳青RITA' },
    { id: '2fe0861a', orderNo: 'SPK06AF260604A', customer: 'VIP-王文明', pax: 8, departure: '2026/06/04', return: '2026/06/10', vehicle: '阿爾法', company: '北海道観光', region: '北海道', amount: 383000, currency: 'JPY', agent: '黃煒楷KEN' },
    { id: 'd67815d8', orderNo: 'VIP-SPK06HA260613A', customer: 'VIP-陳立群', pax: 12, departure: '2026/06/13', return: '2026/06/19', vehicle: 'Hiace', company: '北海道観光', region: '北海道', amount: 1250000, currency: 'JPY', agent: '蔡潔萱JENNY' },
  ],
  KR: [
    { id: 'kr001', orderNo: 'SEL01ST260602A', customer: '許雅婷', pax: 5, departure: '2026/06/02', return: '2026/06/05', vehicle: 'Staria', company: 'Korea Drive', region: '首爾', amount: 1200000, currency: 'KRW', agent: '戴耀輝DYSON' },
    { id: 'kr002', orderNo: 'PUS02SO260610A', customer: '陳建志', pax: 9, departure: '2026/06/10', return: '2026/06/13', vehicle: 'Solati', company: 'Busan Tour', region: '釜山', amount: 2100000, currency: 'KRW', agent: '戴耀輝DYSON' },
    { id: 'kr003', orderNo: 'JEJ03ST260615A', customer: '黃美芳', pax: 4, departure: '2026/06/15', return: '2026/06/18', vehicle: 'Staria', company: 'Jeju Rent', region: '濟州', amount: 980000, currency: 'KRW', agent: '戴耀輝DYSON' },
  ],
  TH: [
    { id: 'th001', orderNo: 'BKK01VN260605A', customer: '劉志遠', pax: 6, departure: '2026/06/05', return: '2026/06/08', vehicle: 'Vans', company: 'Bangkok Tour', region: '曼谷', amount: 18000, currency: 'THB', agent: '張琳青RITA' },
    { id: 'th002', orderNo: 'PKT02VN260620A', customer: '吳淑芬', pax: 8, departure: '2026/06/20', return: '2026/06/24', vehicle: 'Vans', company: 'Phuket Drive', region: '普吉', amount: 24000, currency: 'THB', agent: '張琳青RITA' },
  ],
  CN: [
    { id: 'cn001', orderNo: 'SHA01BU260603A', customer: '趙志強', pax: 15, departure: '2026/06/03', return: '2026/06/06', vehicle: '商務車', company: '上海包車', region: '上海', amount: 8800, currency: 'CNY', agent: '蔡潔萱JENNY' },
    { id: 'cn002', orderNo: 'BJG02BU260618A', customer: '孫麗娟', pax: 20, departure: '2026/06/18', return: '2026/06/22', vehicle: '大巴', company: '北京旅遊車', region: '北京', amount: 15600, currency: 'CNY', agent: '蔡潔萱JENNY' },
  ],
};

export const mockOrderDetail = {
  id: '85254aa6',
  orderNo: 'TYO01AF260601A',
  customer: { name: '郭晉佑', phone: '+886975807195', line: 'xburner1245', email: 'xburner1245@gmail.com' },
  order: {
    agent: '黃煒楷KEN',
    pax: 3,
    departure: '2026/06/01',
    return: '2026/06/01',
    charterType: '旅遊包車',
    company: '駿途株式会社',
    vehicle: '阿爾法',
    vehicleCount: 1,
    region: '關東地區',
    driverStay: 0,
    totalCurrency: 'JPY',
    totalAmount: 62000,
    fullPayDue: '2026/03/23',
    arrivalFlight: 'CI105',
    departureFlight: 'CI106',
  },
  itinerary: [
    {
      day: 1,
      date: '2026/06/01',
      pickupTime: '上午 09:20',
      serviceType: '全日包車',
      hotelInfo: '客人自訂',
      route: 'シノン蔵前 CINON Kuramae / 合味道紀念館 / 横濱八島景海島樂園 / 鶴岡八幡宮 / 鎌倉大都會酒店',
      hotel: '鎌倉大都會酒店',
      hotelPhone: '+81 467-60-1111',
      note: '我們的車庫在東京，鎌倉大都會酒店結束需給司機二小時回車庫\n實際用車時間為8小時（最早接待時間為08:00，最晚用車時間為18:00）',
    },
  ],
  passengers: [
    { name: '郭晉佑', passport: 'A12345678', birthday: '1985/03/15', type: '成人' },
    { name: '郭小明', passport: 'A87654321', birthday: '1988/07/22', type: '成人' },
    { name: '郭小玲', passport: 'A11223344', birthday: '2015/11/05', type: '兒童' },
  ],
};

export const mockAnnouncements = [
  {
    id: '1',
    title: '富士山全景纜車（富士山パノラマロープウェイ）因設施翻新施工，目前暫停營業。',
    content: '富士山全景纜車（富士山パノラマロープウェイ）因設施翻新施工，目前暫停營業。【停運期間】2026年5月11日 ～ 2026年7月15日。近期如有客人想前往河口湖地區時，請提前確認行程並做好客人說明。',
    type: 'important',
    pinned: true,
    expiry: '永久有效',
    author: '戴耀輝DYSON',
    publishedAt: '2026/05/20',
  },
  {
    id: '2',
    title: '特休管理辦法',
    content: '特別休假管理辦法為保障員工休假權益並兼顧公司營運，依勞動基準法第38條訂定如下：\n一、給假標準\n• 滿6個月：3日\n• 滿1年：7日\n• 滿2年：10日\n• 滿3年：14日\n• 滿5年：15日\n• 滿10年：16日',
    type: 'important',
    pinned: true,
    expiry: '剩餘 284 天',
    author: '琳青RITA',
    publishedAt: '2026/03/12',
  },
  {
    id: '3',
    title: '2026春節注意事項',
    content: '2026春節期間提醒注意事項\n1.請再仔細檢查一次手上的團是否都已派司機\n2.休假期間請隨時注意公務機留言\n3.春節期間如有需訂金記得於群組上公告\n4.春節期間公務機電話接聽請務必要接聽',
    type: 'important',
    pinned: true,
    expiry: '永久有效',
    author: '戴耀輝DYSON',
    publishedAt: '2026/01/19',
  },
  {
    id: '4',
    title: '🚗 福岡車資通知',
    content: '📉 淡季價格調整：\n連團價（多日行程）\n原：¥54,500 → 現：¥53,000\n\n一日遊\n原：¥55,000 → 現：¥53,000',
    type: 'normal',
    pinned: false,
    expiry: '永久有效',
    author: '蔡潔萱JENNY',
    publishedAt: '2025/05/28',
  },
  {
    id: '5',
    title: '【必看】東北巴士派車須知',
    content: '因應到東北旅行的客人行李較多，一團人數在10-15人請直接用中型巴士報價。若為同定點一天來回包車，則可用小巴士報價（客人不帶行李）。中巴價錢請再向佐藤阿北確認。',
    type: 'normal',
    pinned: false,
    expiry: '永久有效',
    author: '蔡潔萱JENNY',
    publishedAt: '2025/04/17',
  },
  {
    id: '6',
    title: '客訴案件處理辦法',
    content: '遇客訴處理辦法\n1.傾聽（了解客訴原因）\n2.換位思考（站在客戶立場思考並主動提出公司錯誤）\n3.安撫消費者情緒後主動提出公司最快速的彌補方式\n4.了解客戶訴求並開出彌補方案',
    type: 'normal',
    pinned: false,
    expiry: '永久有效',
    author: '戴耀輝DYSON',
    publishedAt: '2024/08/26',
  },
];

export const mockUser = {
  name: '戴耀輝DYSON',
  role: '管理員',
  avatar: null,
};
