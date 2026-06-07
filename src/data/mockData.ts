export const mockAccounts = [
  { username: 'dyson', role: 'sales', name: '戴耀輝DYSON' },
  { username: 'ken', role: 'sales', name: '黃煒楷KEN' },
  { username: 'jenny', role: 'sales', name: '蔡潔萱JENNY' },
  { username: 'rita', role: 'sales', name: '張琳青RITA' },
  { username: 'yurong', role: 'sales', name: '陳宥融YURONG' },
  { username: 'accounting', role: 'accounting', name: '財務審核' },
];

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

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Order {
  id: string;
  orderNo: string;
  customer: string;
  pax: number;
  departure: string;
  return: string;
  vehicle: string;
  company: string;
  region: string;
  amount: number;
  currency: string;
  agent: string;
  reviewStatus: ReviewStatus;
  reviewNote?: string;
  reviewedAt?: string;
}

export const mockOrders: { JP: Order[]; KR: Order[]; TH: Order[]; CN: Order[] } = {
  JP: [
    { id: '85254aa6', orderNo: 'TYO01AF260601A', customer: '郭晉佑', pax: 3, departure: '2026/06/01', return: '2026/06/01', vehicle: '阿爾法', company: '駿途株式会社', region: '關東地區', amount: 62000, currency: 'JPY', agent: '黃煒楷KEN', reviewStatus: 'approved', reviewedAt: '2026/05/28' },
    { id: 'f54211b0', orderNo: 'SDJ01HA260601A', customer: '林美玲', pax: 7, departure: '2026/06/01', return: '2026/06/03', vehicle: 'Hiace', company: '北日本交通', region: '東北地區', amount: 72000, currency: 'JPY', agent: '蔡潔萱JENNY', reviewStatus: 'pending' },
    { id: '1f48957f', orderNo: 'FUK03HA260601A', customer: '張家豪', pax: 6, departure: '2026/06/01', return: '2026/06/04', vehicle: 'Hiace', company: '九州ドライブ', region: '九州地區', amount: 243000, currency: 'JPY', agent: '張琳青RITA', reviewStatus: 'pending' },
    { id: '2fe0861a', orderNo: 'SPK06AF260604A', customer: 'VIP-王文明', pax: 8, departure: '2026/06/04', return: '2026/06/10', vehicle: '阿爾法', company: '北海道観光', region: '北海道', amount: 383000, currency: 'JPY', agent: '黃煒楷KEN', reviewStatus: 'pending' },
    { id: 'd67815d8', orderNo: 'VIP-SPK06HA260613A', customer: 'VIP-陳立群', pax: 12, departure: '2026/06/13', return: '2026/06/19', vehicle: 'Hiace', company: '北海道観光', region: '北海道', amount: 1250000, currency: 'JPY', agent: '蔡潔萱JENNY', reviewStatus: 'rejected', reviewNote: '金額有誤，請重新確認', reviewedAt: '2026/05/30' },
  ],
  KR: [
    { id: 'kr001', orderNo: 'SEL01ST260602A', customer: '許雅婷', pax: 5, departure: '2026/06/02', return: '2026/06/05', vehicle: 'Staria', company: 'Korea Drive', region: '首爾', amount: 1200000, currency: 'KRW', agent: '戴耀輝DYSON', reviewStatus: 'approved', reviewedAt: '2026/05/29' },
    { id: 'kr002', orderNo: 'PUS02SO260610A', customer: '陳建志', pax: 9, departure: '2026/06/10', return: '2026/06/13', vehicle: 'Solati', company: 'Busan Tour', region: '釜山', amount: 2100000, currency: 'KRW', agent: '戴耀輝DYSON', reviewStatus: 'pending' },
    { id: 'kr003', orderNo: 'JEJ03ST260615A', customer: '黃美芳', pax: 4, departure: '2026/06/15', return: '2026/06/18', vehicle: 'Staria', company: 'Jeju Rent', region: '濟州', amount: 980000, currency: 'KRW', agent: '戴耀輝DYSON', reviewStatus: 'pending' },
  ],
  TH: [
    { id: 'th001', orderNo: 'BKK01VN260605A', customer: '劉志遠', pax: 6, departure: '2026/06/05', return: '2026/06/08', vehicle: 'Vans', company: 'Bangkok Tour', region: '曼谷', amount: 18000, currency: 'THB', agent: '張琳青RITA', reviewStatus: 'pending' },
    { id: 'th002', orderNo: 'PKT02VN260620A', customer: '吳淑芬', pax: 8, departure: '2026/06/20', return: '2026/06/24', vehicle: 'Vans', company: 'Phuket Drive', region: '普吉', amount: 24000, currency: 'THB', agent: '張琳青RITA', reviewStatus: 'approved', reviewedAt: '2026/05/31' },
  ],
  CN: [
    { id: 'cn001', orderNo: 'SHA01BU260603A', customer: '趙志強', pax: 15, departure: '2026/06/03', return: '2026/06/06', vehicle: '商務車', company: '上海包車', region: '上海', amount: 8800, currency: 'CNY', agent: '蔡潔萱JENNY', reviewStatus: 'pending' },
    { id: 'cn002', orderNo: 'BJG02BU260618A', customer: '孫麗娟', pax: 20, departure: '2026/06/18', return: '2026/06/22', vehicle: '大巴', company: '北京旅遊車', region: '北京', amount: 15600, currency: 'CNY', agent: '蔡潔萱JENNY', reviewStatus: 'approved', reviewedAt: '2026/06/01' },
  ],
};

export const mockFinance = {
  monthly: [
    { month: '1月', revenue: 12800000, collected: 11200000, orders: 18 },
    { month: '2月', revenue: 9500000, collected: 9500000, orders: 14 },
    { month: '3月', revenue: 18600000, collected: 16800000, orders: 26 },
    { month: '4月', revenue: 15200000, collected: 13500000, orders: 21 },
    { month: '5月', revenue: 14300000, collected: 12900000, orders: 19 },
    { month: '6月', revenue: 8583449, collected: 593310, orders: 12 },
  ],
  byAgent: [
    { name: '戴耀輝DYSON', orders: 18, revenue: 12400000, currency: 'TWD' },
    { name: '黃煒楷KEN', orders: 22, revenue: 18600000, currency: 'TWD' },
    { name: '蔡潔萱JENNY', orders: 25, revenue: 21300000, currency: 'TWD' },
    { name: '張琳青RITA', orders: 16, revenue: 9800000, currency: 'TWD' },
    { name: '陳宥融YURONG', orders: 11, revenue: 7200000, currency: 'TWD' },
  ],
  byCountry: [
    { country: '🇯🇵 日本', revenue: 38400000, rate: 31.1 },
    { country: '🇰🇷 韓國', revenue: 28700000, rate: 23.3 },
    { country: '🇹🇭 泰國', revenue: 18200000, rate: 14.8 },
    { country: '🇨🇳 中國', revenue: 22100000, rate: 17.9 },
    { country: '其他', revenue: 16049065, rate: 13.0 },
  ],
  pendingCollection: [
    { orderNo: 'TYO01AF260601A', customer: '郭晉佑', amount: 56000, currency: 'TWD', dueDate: '2026/06/15', agent: '黃煒楷KEN' },
    { orderNo: 'FUK03HA260601A', customer: '張家豪', amount: 72000, currency: 'TWD', dueDate: '2026/06/10', agent: '張琳青RITA' },
    { orderNo: 'PUS02SO260610A', customer: '陳建志', amount: 168000, currency: 'TWD', dueDate: '2026/06/08', agent: '戴耀輝DYSON' },
    { orderNo: 'BKK01VN260605A', customer: '劉志遠', amount: 16800, currency: 'TWD', dueDate: '2026/06/20', agent: '張琳青RITA' },
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
      note: '實際用車時間為8小時（最早接待時間為08:00，最晚用車時間為18:00）',
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
    title: '富士山全景纜車因設施翻新施工，目前暫停營業。',
    content: '富士山全景纜車（富士山パノラマロープウェイ）因設施翻新施工，目前暫停營業。【停運期間】2026年5月11日 ～ 2026年7月15日。',
    type: 'important',
    pinned: true,
    expiry: '永久有效',
    author: '戴耀輝DYSON',
    publishedAt: '2026/05/20',
  },
  {
    id: '2',
    title: '特休管理辦法',
    content: '特別休假管理辦法為保障員工休假權益並兼顧公司營運，依勞動基準法第38條訂定如下：\n一、給假標準\n• 滿6個月：3日\n• 滿1年：7日\n• 滿2年：10日',
    type: 'important',
    pinned: true,
    expiry: '剩餘 284 天',
    author: '琳青RITA',
    publishedAt: '2026/03/12',
  },
  {
    id: '3',
    title: '2026春節注意事項',
    content: '2026春節期間提醒注意事項\n1.請再仔細檢查一次手上的團是否都已派司機\n2.休假期間請隨時注意公務機留言',
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
];

export const mockUser = {
  name: '戴耀輝DYSON',
  role: '管理員',
  avatar: null,
};
