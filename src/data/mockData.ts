export const mockAccounts = [
  { username: 'dyson', role: 'sales', name: '戴耀輝DYSON' },
  { username: 'ken', role: 'sales', name: '黃煒楷KEN' },
  { username: 'jenny', role: 'sales', name: '蔡潔萱JENNY' },
  { username: 'rita', role: 'sales', name: '張琳青RITA' },
  { username: 'yurong', role: 'sales', name: '陳宥融YURONG' },
  { username: 'accounting', role: 'accounting', name: '財務審核' },
  { username: 'jp001', role: 'supplier', name: '駿途株式会社', lang: 'ja', company: '駿途株式会社', region: '關東・東北' },
  { username: 'jp002', role: 'supplier', name: '北海道観光', lang: 'ja', company: '北海道観光株式会社', region: '北海道' },
  { username: 'th001', role: 'supplier', name: 'Bangkok Tour Co.', lang: 'th', company: 'Bangkok Tour Co., Ltd.', region: 'กรุงเทพฯ / พัทยา' },
  { username: 'tw001', role: 'supplier', name: '台灣地接', lang: 'zh', company: '台灣地接有限公司', region: '全台灣' },
  { username: 'kr001', role: 'supplier', name: 'Seoul Drive Co.', lang: 'zh', company: 'Seoul Drive Co., Ltd.', region: '首爾/京畿道/江原道' },
];

export type SupplierOrderStatus = 'pending' | 'confirmed' | 'departed' | 'in_service' | 'completed' | 'cancelled';

export interface DayItinerary {
  day: number;
  date: string;
  pickupTime: string;
  receivingCompany: string;
  driverName: string;
  hotelBooking: string;
  serviceType: string;
  route: string;
  hotelInfo: string;
  note: string;
}

export interface SupplierOrder {
  id: string;
  orderNo: string;
  customer: string;
  pax: number;
  departure: string;
  return: string;
  vehicle: string;
  region: string;
  route: string;
  note: string;
  salesContact: string;
  status: SupplierOrderStatus;
  country: string;
  supplierUsername: string;
  receiptUploaded: boolean;
  transferConfirmed: boolean;
  groupConfirmed: boolean;
  itinerary: DayItinerary[];
}

export const mockSupplierOrders: SupplierOrder[] = [
  {
    id: 'so001', orderNo: 'TYO01AF260615A', customer: '林志豪', pax: 4,
    departure: '2026/06/15', return: '2026/06/15', vehicle: 'アルファード',
    region: '関東地区', route: '成田空港 → 浅草 → 東京スカイツリー → 新宿',
    note: '客人攜帶大型行李 x4，請提前確認行李廂空間',
    salesContact: '黃煒楷KEN', status: 'pending', country: 'JP',
    supplierUsername: 'jp001', receiptUploaded: false,
    transferConfirmed: false, groupConfirmed: false,
    itinerary: [
      {
        day: 1, date: '2026/06/15', pickupTime: '09:20',
        receivingCompany: '駿途株式会社', driverName: '',
        hotelBooking: '新宿パークハイアット',
        serviceType: '全日包車',
        route: '成田空港 → 浅草寺 → 東京スカイツリー → 秋葉原 → 新宿パークハイアット',
        hotelInfo: '新宿パークハイアット | TEL: 03-5322-1234',
        note: '實際用車時間10小時，最早08:00，最晚18:00',
      },
    ],
  },
  {
    id: 'so002', orderNo: 'TYO02AF260618A', customer: 'VIP-陳家明', pax: 6,
    departure: '2026/06/18', return: '2026/06/21', vehicle: 'アルファード',
    region: '関東地区', route: '羽田空港 → 鎌倉 → 箱根 → 富士山五合目 → 東京',
    note: 'VIP客戶，請司機著正式服裝。全程需要英語或中文服務',
    salesContact: '黃煒楷KEN', status: 'pending', country: 'JP',
    supplierUsername: 'jp001', receiptUploaded: false,
    transferConfirmed: false, groupConfirmed: false,
    itinerary: [
      {
        day: 1, date: '2026/06/18', pickupTime: '10:00',
        receivingCompany: '駿途株式会社', driverName: '',
        hotelBooking: '鎌倉プリンスホテル',
        serviceType: '全日包車',
        route: '羽田空港 → 鶴岡八幡宮 → 鎌倉大仏 → 長谷寺 → 鎌倉プリンスホテル',
        hotelInfo: '鎌倉プリンスホテル | TEL: 0467-32-1111',
        note: 'VIP：司機請著正式服裝，備礦泉水與濕紙巾',
      },
      {
        day: 2, date: '2026/06/19', pickupTime: '09:00',
        receivingCompany: '駿途株式会社', driverName: '',
        hotelBooking: '箱根強羅環翠楼',
        serviceType: '全日包車',
        route: '鎌倉プリンスホテル → 箱根彫刻の森美術館 → 大涌谷 → 芦ノ湖 → 強羅環翠楼',
        hotelInfo: '箱根強羅環翠楼 | TEL: 0460-82-3141',
        note: '大涌谷視空氣品質決定是否前往，請司機提前確認',
      },
      {
        day: 3, date: '2026/06/20', pickupTime: '07:30',
        receivingCompany: '駿途株式会社', driverName: '',
        hotelBooking: '富士マリオット山中湖',
        serviceType: '全日包車',
        route: '強羅環翠楼 → 富士山五合目 → 忍野八海 → 富士マリオット山中湖',
        hotelInfo: '富士マリオット山中湖 | TEL: 0555-62-0111',
        note: '富士山五合目視天候決定，備選河口湖遊覧',
      },
      {
        day: 4, date: '2026/06/21', pickupTime: '10:00',
        receivingCompany: '駿途株式会社', driverName: '',
        hotelBooking: '',
        serviceType: '機場送機',
        route: '富士マリオット山中湖 → 羽田空港',
        hotelInfo: '',
        note: '航班 CI108 13:45 出發，請10:00準時出發',
      },
    ],
  },
  {
    id: 'so003', orderNo: 'SDJ01HA260616A', customer: '王美玲', pax: 7,
    departure: '2026/06/16', return: '2026/06/18', vehicle: 'ハイエース',
    region: '東北地区', route: '仙台駅 → 松島 → 平泉 → 花巻温泉',
    note: '2泊3日、ドライバー宿泊費含む',
    salesContact: '蔡潔萱JENNY', status: 'confirmed', country: 'JP',
    supplierUsername: 'jp001', receiptUploaded: false,
    transferConfirmed: true, groupConfirmed: false,
    itinerary: [
      {
        day: 1, date: '2026/06/16', pickupTime: '09:00',
        receivingCompany: '駿途株式会社', driverName: '田中 健一',
        hotelBooking: '松島海岸温泉ホテル',
        serviceType: '全日包車',
        route: '仙台駅 → 塩竈神社 → 松島湾クルーズ → 松島海岸温泉ホテル',
        hotelInfo: '松島海岸温泉ホテル | TEL: 022-354-2121',
        note: '',
      },
      {
        day: 2, date: '2026/06/17', pickupTime: '09:00',
        receivingCompany: '駿途株式会社', driverName: '田中 健一',
        hotelBooking: '花巻温泉ホテル千秋閣',
        serviceType: '全日包車',
        route: '松島 → 中尊寺金色堂 → 毛越寺 → 花巻温泉ホテル千秋閣',
        hotelInfo: '花巻温泉ホテル千秋閣 | TEL: 0198-37-2111',
        note: '中尊寺は高台のため足腰が弱い方はご注意ください',
      },
      {
        day: 3, date: '2026/06/18', pickupTime: '10:00',
        receivingCompany: '駿途株式会社', driverName: '田中 健一',
        hotelBooking: '',
        serviceType: '半日包車',
        route: '花巻温泉 → 花巻空港',
        hotelInfo: '',
        note: '花巻空港 NH781 12:40 出發',
      },
    ],
  },
  {
    id: 'so004', orderNo: 'SPK03AF260610A', customer: '張志強', pax: 5,
    departure: '2026/06/10', return: '2026/06/14', vehicle: 'アルファード',
    region: '北海道', route: '新千歳空港 → 小樽 → 富良野 → 旭川動物園 → 札幌',
    note: '花季行程，請確認薰衣草開花狀況',
    salesContact: '黃煒楷KEN', status: 'completed', country: 'JP',
    supplierUsername: 'jp002', receiptUploaded: true,
    transferConfirmed: true, groupConfirmed: true,
    itinerary: [
      {
        day: 1, date: '2026/06/10', pickupTime: '14:00',
        receivingCompany: '北海道観光株式会社', driverName: '佐藤 博',
        hotelBooking: '小樽朝里クラッセホテル',
        serviceType: '機場接送',
        route: '新千歳空港 → 小樽運河 → 小樽朝里クラッセホテル',
        hotelInfo: '小樽朝里クラッセホテル | TEL: 0134-52-3800',
        note: '',
      },
      {
        day: 2, date: '2026/06/11', pickupTime: '09:00',
        receivingCompany: '北海道観光株式会社', driverName: '佐藤 博',
        hotelBooking: '富良野ナチュラル温泉ホテル',
        serviceType: '全日包車',
        route: '小樽 → ファーム富田（薰衣草） → 四季彩の丘 → 富良野ナチュラル温泉',
        hotelInfo: '富良野ナチュラル温泉ホテル | TEL: 0167-23-4567',
        note: '薰衣草6月中旬開花約7成，實況以現場為準',
      },
    ],
  },
  {
    id: 'so005', orderNo: 'BKK01VN260620A', customer: '劉志遠', pax: 6,
    departure: '2026/06/20', return: '2026/06/23', vehicle: 'Van',
    region: 'กรุงเทพฯ', route: 'สนามบินสุวรรณภูมิ → วัดพระแก้ว → อยุธยา',
    note: 'ลูกค้าต้องการมัคคุเทศก์ที่พูดภาษาจีนได้',
    salesContact: '張琳青RITA', status: 'pending', country: 'TH',
    supplierUsername: 'th001', receiptUploaded: false,
    transferConfirmed: false, groupConfirmed: false,
    itinerary: [
      {
        day: 1, date: '2026/06/20', pickupTime: '13:00',
        receivingCompany: 'Bangkok Tour Co., Ltd.', driverName: '',
        hotelBooking: 'Centara Grand CentralWorld',
        serviceType: 'รับจากสนามบิน',
        route: 'สนามบินสุวรรณภูมิ → Centara Grand CentralWorld',
        hotelInfo: 'Centara Grand CentralWorld | TEL: 02-100-1234',
        note: 'ไฟลท์ CI837 ถึง 11:20 รอรับสัมภาระก่อน',
      },
      {
        day: 2, date: '2026/06/21', pickupTime: '08:00',
        receivingCompany: 'Bangkok Tour Co., Ltd.', driverName: '',
        hotelBooking: 'Centara Grand CentralWorld',
        serviceType: 'รถเช่าทั้งวัน',
        route: 'โรงแรม → วัดพระแก้ว → วัดโพธิ์ → วัดอรุณ → ล่องเรือเจ้าพระยา → โรงแรม',
        hotelInfo: 'Centara Grand CentralWorld | TEL: 02-100-1234',
        note: 'วัดพระแก้วแต่งกายสุภาพ ต้องคลุมไหล่และขา',
      },
      {
        day: 3, date: '2026/06/22', pickupTime: '07:00',
        receivingCompany: 'Bangkok Tour Co., Ltd.', driverName: '',
        hotelBooking: 'อยุธยาริเวอร์ไซด์ รีสอร์ท',
        serviceType: 'รถเช่าทั้งวัน',
        route: 'กรุงเทพฯ → พระนครศรีอยุธยา → วัดมหาธาตุ → วัดพระศรีสรรเพชญ์ → โรงแรม',
        hotelInfo: 'อยุธยาริเวอร์ไซด์ รีสอร์ท | TEL: 035-241-333',
        note: '',
      },
    ],
  },
  {
    id: 'so007', orderNo: 'VIP-SEL05HD260616A', customer: 'VIP客戶', pax: 5,
    departure: '2026/06/16', return: '2026/06/20', vehicle: 'Hyundai H350',
    region: '首爾/江原道', route: '仁川機場→江華島→明洞→江陵→注文津→首爾→仁川機場',
    note: '入境 LJ736 14:15 / 出境 LJ737 14:50，請提前確認航班',
    salesContact: '戴耀輝DYSON', status: 'pending', country: 'KR',
    supplierUsername: 'kr001', receiptUploaded: false,
    transferConfirmed: false, groupConfirmed: false,
    itinerary: [
      {
        day: 1, date: '2026/06/16', pickupTime: '14:15',
        receivingCompany: 'Seoul Drive Co., Ltd.', driverName: '',
        hotelBooking: '我方代訂',
        serviceType: '全日包車',
        route: '仁川國際機場 → 江華島斜坡滑車（每人一次）→ 明洞商圈 → 廣藏市場 → 飯店\n\n早：✗　午：馬鈴薯豬骨湯＋季節小菜　晚：敬請自理',
        hotelInfo: 'Baiton Seoul Dongdaemun Hotel',
        note: 'LJ736 抵達時間 14:15，請於入境大廳舉牌等候',
      },
      {
        day: 2, date: '2026/06/17', pickupTime: '09:00',
        receivingCompany: 'Seoul Drive Co., Ltd.', driverName: '',
        hotelBooking: '我方代訂',
        serviceType: '全日包車',
        route: '飯店 → 江陵中央市場 → 鏡浦湖 → 安木海邊 → 飯店\n\n早：飯店內用　午：長腳蟹拉麵　晚：江陵高先生火爐炭烤魚',
        hotelInfo: 'SL Hotel Gangneung',
        note: '',
      },
      {
        day: 3, date: '2026/06/18', pickupTime: '09:00',
        receivingCompany: 'Seoul Drive Co., Ltd.', driverName: '',
        hotelBooking: '我方代訂',
        serviceType: '全日包車',
        route: '飯店 → 注文津海邊（BTS公車站・韓劇《鬼怪》拍攝地）→ Haslla Art World → 飯店\n\n早：飯店內用　午：涼拌蕎麥麵＋水煮五花肉（4人一份）　晚：韓式烤肉吃到飽－明倫進士',
        hotelInfo: 'Baiton Seoul Dongdaemun Hotel',
        note: '',
      },
      {
        day: 4, date: '2026/06/19', pickupTime: '09:00',
        receivingCompany: 'Seoul Drive Co., Ltd.', driverName: '',
        hotelBooking: '我方代訂',
        serviceType: '全日包車',
        route: '飯店 → 星空圖書館 → 聖水洞 → 南山谷韓屋村 → 首爾塔（含來回纜車，不含登塔）→ 飯店\n\n早：飯店內用　午：自理　晚：滿足五香豬腳料理（4人一桌）',
        hotelInfo: 'Baiton Seoul Dongdaemun Hotel',
        note: '',
      },
      {
        day: 5, date: '2026/06/20', pickupTime: '09:00',
        receivingCompany: 'Seoul Drive Co., Ltd.', driverName: '',
        hotelBooking: '我方代訂',
        serviceType: '全日包車',
        route: '飯店 → 樂天超市 → 仁川國際機場\n\n早：飯店內用　午：✗　晚：✗',
        hotelInfo: '溫暖的家 ✈',
        note: 'LJ737 離境時間 14:50，請於 12:30 前抵達機場',
      },
    ],
  },
  {
    id: 'so006', orderNo: 'BKK02VN260625A', customer: '黃淑芬', pax: 8,
    departure: '2026/06/25', return: '2026/06/28', vehicle: 'Van',
    region: 'พัทยา', route: 'กรุงเทพฯ → พัทยา → เกาะล้าน → ชลบุรี',
    note: 'มีเด็กเล็ก 2 คน ต้องการที่นั่งนิรภัยสำหรับเด็ก',
    salesContact: '張琳青RITA', status: 'confirmed', country: 'TH',
    supplierUsername: 'th001', receiptUploaded: false,
    transferConfirmed: true, groupConfirmed: true,
    itinerary: [
      {
        day: 1, date: '2026/06/25', pickupTime: '10:00',
        receivingCompany: 'Bangkok Tour Co., Ltd.', driverName: 'สมชาย ใจดี',
        hotelBooking: 'Dusit Thani Pattaya',
        serviceType: 'รถเช่าทั้งวัน',
        route: 'สนามบินสุวรรณภูมิ → พัทยา Dusit Thani',
        hotelInfo: 'Dusit Thani Pattaya | TEL: 038-425-611',
        note: 'มีเด็ก 2 คน ต้องการเบาะนิรภัย 2 ชุด',
      },
    ],
  },
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

export interface AdvancePayment {
  id: string;
  orderId: string;
  orderNo: string;
  type: '代墊款' | '退款';
  item: string;
  currency: string;
  amount: number;
  applyDate: string;
  applicant: string;
  recipient: string;
  recipientAccount: string;
  content: string;
  note: string;
  transferBank: string;
  paymentMethod: string;
  paymentDate: string;
  accountingReviewed: boolean;
  managerReviewed: boolean;
  accountingReviewDate: string;
  accountingReviewer: string;
  managerReviewDate: string;
  managerReviewer: string;
}

export const mockAdvancePayments: AdvancePayment[] = [
  {
    id: 'adv001', orderId: 'f54211b0', orderNo: 'SDJ01HA260601A',
    type: '代墊款', item: '司機住宿費', currency: 'JPY', amount: 8000,
    applyDate: '2026/05/28', applicant: '蔡潔萱JENNY',
    recipient: '北日本交通', recipientAccount: '三菱UFJ 1234-567890',
    content: '東北行程司機2晚住宿費用', note: '已取得發票',
    transferBank: '台新銀行', paymentMethod: '電匯', paymentDate: '2026/06/01',
    accountingReviewed: false, managerReviewed: false,
    accountingReviewDate: '', accountingReviewer: '',
    managerReviewDate: '', managerReviewer: '',
  },
  {
    id: 'adv002', orderId: '1f48957f', orderNo: 'FUK03HA260601A',
    type: '代墊款', item: '車資尾款', currency: 'JPY', amount: 43000,
    applyDate: '2026/05/30', applicant: '張琳青RITA',
    recipient: '九州ドライブ', recipientAccount: '福岡銀行 9876-543210',
    content: '福岡4日包車尾款', note: '',
    transferBank: '國泰世華', paymentMethod: '電匯', paymentDate: '2026/06/03',
    accountingReviewed: false, managerReviewed: false,
    accountingReviewDate: '', accountingReviewer: '',
    managerReviewDate: '', managerReviewer: '',
  },
  {
    id: 'adv003', orderId: '2fe0861a', orderNo: 'SPK06AF260604A',
    type: '代墊款', item: '司機餐費＋過路費', currency: 'JPY', amount: 12500,
    applyDate: '2026/06/01', applicant: '黃煒楷KEN',
    recipient: '北海道観光', recipientAccount: '北洋銀行 5555-111222',
    content: '北海道6日行程司機雜費', note: 'VIP客戶，優先處理',
    transferBank: '玉山銀行', paymentMethod: '電匯', paymentDate: '',
    accountingReviewed: false, managerReviewed: false,
    accountingReviewDate: '', accountingReviewer: '',
    managerReviewDate: '', managerReviewer: '',
  },
  {
    id: 'adv004', orderId: 'kr002', orderNo: 'PUS02SO260610A',
    type: '代墊款', item: '車資全額', currency: 'KRW', amount: 1680000,
    applyDate: '2026/06/02', applicant: '戴耀輝DYSON',
    recipient: 'Busan Tour', recipientAccount: 'KEB하나은행 123-456789-01',
    content: '釜山3日 Solati 包車全額', note: '',
    transferBank: '第一銀行', paymentMethod: '電匯', paymentDate: '',
    accountingReviewed: false, managerReviewed: false,
    accountingReviewDate: '', accountingReviewer: '',
    managerReviewDate: '', managerReviewer: '',
  },
  {
    id: 'adv005', orderId: 'th001', orderNo: 'BKK01VN260605A',
    type: '代墊款', item: '車資訂金', currency: 'THB', amount: 9000,
    applyDate: '2026/05/25', applicant: '張琳青RITA',
    recipient: 'Bangkok Tour Co.', recipientAccount: 'กสิกรไทย 012-3-45678-9',
    content: '曼谷3日Vans訂金50%', note: '需在出發前7天付清',
    transferBank: '兆豐銀行', paymentMethod: '電匯', paymentDate: '2026/05/27',
    accountingReviewed: false, managerReviewed: false,
    accountingReviewDate: '', accountingReviewer: '',
    managerReviewDate: '', managerReviewer: '',
  },
  {
    id: 'adv006', orderId: 'cn001', orderNo: 'SHA01BU260603A',
    type: '代墊款', item: '商務車租賃費', currency: 'CNY', amount: 7040,
    applyDate: '2026/05/29', applicant: '蔡潔萱JENNY',
    recipient: '上海包車服務', recipientAccount: '中國銀行 6217-0012-3456-7890',
    content: '上海3日商務車全額', note: '',
    transferBank: '中信銀行', paymentMethod: '電匯', paymentDate: '',
    accountingReviewed: false, managerReviewed: false,
    accountingReviewDate: '', accountingReviewer: '',
    managerReviewDate: '', managerReviewer: '',
  },
];
