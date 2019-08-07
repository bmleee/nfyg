export const Display = {
	MOBILE: 'display is mobilde',
	TABLET: 'display is tablet',
	DESKTOP: 'display is desktop',
};

export const SelectOptions = {
	ProjectCategory: [
		{ value: 'life-style', label: '라이프 스타일' },
		{ value: 'beauty', label: '뷰티' },
		{ value: 'health', label: '건강' },
		{ value: 'culture', label: '문화' },
	],

	ProductCategory: [
		{ value: 'culture', label: '문화' },
		{ value: 'badge', label: '뱃지창고' },
		{ value: 'artkit', label: '예술놀이' },
		{ value: 'eco', label: '환경' },
		{ value: 'e-bag', label: '에코백' },
		{ value: 'sticker1', label: '스티커전(우편)' },
		{ value: 'sticker2', label: '스티커전(택배)' },
		{ value: 'poster', label: '포스터액자' },
		{ value: 'blind-poster', label: '포스터전' },
		{ value: 'blind-poster-3', label: '포스터전(3장)' },
		{ value: 'blind-poster-5', label: '포스터전(5장)' },
		{ value: 'literature', label: '문학전' },
		{ value: 'calendar', label: '일력달력' },
	],
	
	ProductCategoryArray: [
		{ value: 'badge', label: '뱃지' },
		{ value: 'exhibition', label: '전시' },
		{ value: 'literature', label: '출판' },
		{ value: 'fashion', label: '패션' },
		{ value: 'accessory', label: '액세서리' },
		{ value: 'phonecase', label: '폰케이스' },
		{ value: 'fancy', label: '문구' },
		{ value: 'arttoy', label: '아트토이' },
		{ value: 'props', label: '소품' },
		{ value: 'diy', label: 'DIY' },
		{ value: 'fabricposter', label: '천포스터' }
	],
	
	MainCategory: [
		{ main_value: 'accessory', value: 'accessory', label: '액세서리' },
		{ main_value: 'accessory', value: 'necklace', label: '  - 목걸이' },
		{ main_value: 'accessory', value: 'earring', label: '  - 귀걸이' },
		{ main_value: 'accessory', value: 'bracelet', label: '  - 팔찌' },
		{ main_value: 'accessory', value: 'badge', label: '  - 뱃지' },
		{ main_value: 'accessory', value: 'phonecase', label: '  - 폰케이스' },
		{ main_value: 'accessory', value: 'keyring', label: '  - 키링' },
		
		{ main_value: 'poster', value: 'poster', label: '포스터' },
		{ main_value: 'poster', value: 'frame', label: '  - 포스터액자' },
		
		{ main_value: 'literature', value: 'literature', label: '출판' },
		
		{ main_value: 'fashion', value: 'fashion', label: '패션' },
		{ main_value: 'fashion', value: 'wallet', label: '  - 지갑' },
		{ main_value: 'fashion', value: 'ecobag', label: '  - 에코백' },
		{ main_value: 'fashion', value: 'bag', label: '  - 가방' },
		{ main_value: 'fashion', value: 'clothing', label: '  - 의류' },
		
		{ main_value: 'props', value: 'props', label: '소품' },
		{ main_value: 'props', value: 'case', label: '  - 보관함' },
		{ main_value: 'props', value: 'fabricposter', label: '  - 천포스터' },
		{ main_value: 'props', value: 'calendar', label: '  - 달력' },
		{ main_value: 'props', value: 'cup', label: '  - 잔/컵' },
		{ main_value: 'props', value: 'battery', label: '  - 보조배터리' },
		{ main_value: 'props', value: 'candle', label: '  - 캔들/디퓨져' },
		{ main_value: 'props', value: 'interior', label: '  - 인테리어' },
		{ main_value: 'props', value: 'arttoy', label: '  - 아트토이' },
		{ main_value: 'props', value: 'magnet', label: '  - 마그넷' },
		
		{ main_value: 'fancy', value: 'fancy', label: '문구' },
		{ main_value: 'fancy', value: 'sticker', label: '  - 스티커' },
		{ main_value: 'fancy', value: 'tape', label: '  - 테이프' },
		{ main_value: 'fancy', value: 'postcard', label: '  - 엽서' },
		{ main_value: 'fancy', value: 'notepad', label: '  - 메모장' },
		{ main_value: 'fancy', value: 'writing', label: '  - 필기구' },
		{ main_value: 'fancy', value: 'bookmark', label: '  - 책갈피' },
	],
	
	MainCategory_elements: [
		{
			value: 'accessory',
			elements: [
				{ sub_value: 'necklace', sub_label: '목걸이' },
				{ sub_value: 'earring', sub_label: '귀걸이' },
				{ sub_value: 'bracelet', sub_label: '팔찌' },
				{ sub_value: 'badge', sub_label: '뱃지' },
				{ sub_value: 'phonecase', sub_label: '폰케이스' },
				{ sub_value: 'keyring', sub_label: '키링' },
			]
		},
		{
			value: 'poster',
			elements: [
				{ sub_value: 'frame', sub_label: '포스터액자' }
			]
		},
		{
			value: 'fashion',
			elements: [
				{ sub_value: 'wallet', sub_label: '지갑' },
				{ sub_value: 'ecobag', sub_label: '에코백' },
				{ sub_value: 'bag', sub_label: '가방' },
				{ sub_value: 'clothing', sub_label: '의류' }
			]
		},
		{
			value: 'props',
			elements: [
				{ sub_value: 'case', sub_label: '보관함' },
				{ sub_value: 'fabricposter', sub_label: '천포스터' },
				{ sub_value: 'calendar', sub_label: '달력' },
				{ sub_value: 'cup', sub_label: '잔/컵' },
				{ sub_value: 'battery', sub_label: '보조배터리' },
				{ sub_value: 'candle', sub_label: '캔들/디퓨져' },
				{ sub_value: 'interior', sub_label: '인테리어' },
				{ sub_value: 'arttoy', sub_label: '아트토이' },
				// { sub_value: 'magnet', sub_label: '마그넷' },
			]
		},
		{
			value: 'fancy',
			elements: [
				{ sub_value: 'sticker', sub_label: '스티커' },
				{ sub_value: 'tape', sub_label: '테이프' },
				{ sub_value: 'postcard', sub_label: '엽서' },
				{ sub_value: 'notepad', sub_label: '메모장' },
				{ sub_value: 'writing', sub_label: '필기구' },
				{ sub_value: 'bookmark', sub_label: '책갈피' },
			]
		}
	],
	

	ProjectState:  [
		{ "value": "preparing", "label": "검토요청" },
		{ "value": "completed", "label": "검토완료" },
		{ "value": "in-progress", "label": "진행중" },
	],

	ProductState:  [
		{ "value": "preparing", "label": "검토요청" },
		{ "value": "completed", "label": "검토완료" },
		{ "value": "in-progress", "label": "진행중" },
	],
	
	StoreState:  [
		{ "value": "in-progress", "label": "진행중" },
		{ "value": "preparing", "label": "준비중" },
	],
	
	SortChar:  [
		{ "value": "가", "label": "가" },
		{ "value": "나", "label": "나" },
		{ "value": "다", "label": "다" },
		{ "value": "라", "label": "라" },
		{ "value": "마", "label": "마" },
		{ "value": "바", "label": "바" },
		{ "value": "사", "label": "사" },
		{ "value": "아", "label": "아" },
		{ "value": "자", "label": "자" },
		{ "value": "차", "label": "차" },
		{ "value": "카", "label": "카" },
		{ "value": "타", "label": "타" },
		{ "value": "파", "label": "파" },
		{ "value": "하", "label": "하" },
		{ "value": "A", "label": "A" },
		{ "value": "B", "label": "B" },
		{ "value": "C", "label": "C" },
		{ "value": "D", "label": "D" },
		{ "value": "E", "label": "E" },
		{ "value": "F", "label": "F" },
		{ "value": "G", "label": "G" },
		{ "value": "H", "label": "H" },
		{ "value": "I", "label": "I" },
		{ "value": "J", "label": "J" },
		{ "value": "K", "label": "K" },
		{ "value": "L", "label": "L" },
		{ "value": "M", "label": "M" },
		{ "value": "N", "label": "N" },
		{ "value": "O", "label": "O" },
		{ "value": "P", "label": "P" },
		{ "value": "Q", "label": "Q" },
		{ "value": "R", "label": "R" },
		{ "value": "S", "label": "S" },
		{ "value": "T", "label": "T" },
		{ "value": "U", "label": "U" },
		{ "value": "V", "label": "V" },
		{ "value": "W", "label": "W" },
		{ "value": "X", "label": "X" },
		{ "value": "Y", "label": "Y" },
		{ "value": "Z", "label": "Z" },
		{ "value": "ETC", "label": "ETC" },
	],
	
	ShippingCycle2:  [
		{ "value": "일요일", "label": "일요일" },
		{ "value": "월요일", "label": "월요일" },
		{ "value": "화요일", "label": "화요일" },
		{ "value": "수요일", "label": "수요일" },
		{ "value": "목요일", "label": "목요일" },
		{ "value": "금요일", "label": "금요일" },
		{ "value": "토요일", "label": "토요일" },
	],
	
	ShippingCycle:  [
		{ "value": "월요일", "label": "월요일" },
		{ "value": "화요일", "label": "화요일" },
		{ "value": "수요일", "label": "수요일" },
		{ "value": "목요일", "label": "목요일" },
		{ "value": "금요일", "label": "금요일" },
		{ "value": "매일", "label": "매일" }
	],
	
	ShippingArray:  [
		{ "value": "월요일", "label": "월요일" },
		{ "value": "화요일", "label": "화요일" },
		{ "value": "수요일", "label": "수요일" },
		{ "value": "목요일", "label": "목요일" },
		{ "value": "금요일", "label": "금요일" }
	],
	
	ShippingCompanyList:  [
		{ "value": "korex", "label": "CJ대한통운", "link": "https://www.doortodoor.co.kr" },
		{ "value": "logen", "label": "로젠택배", "link": "https://www.ilogen.com/d2d/delivery/invoice_search.jsp" },
		{ "value": "dongbu", "label": "KG로지스", "link": "https://www.kglogis.co.kr/delivery/waybill.jsp" },
		{ "value": "epost", "label": "우체국택배", "link": "https://service.epost.go.kr/iservice/usr/trace/usrtrc001k01.jsp" },
		{ "value": "hanjin", "label": "한진택배", "link": "https://www.hanjin.co.kr/Delivery_html/inquiry/personal_inquiry.jsp" },
		{ "value": "lotte", "label": "롯데택배", "link": "https://www.lotteglogis.com/home/personal/inquiry/track" },
		{ "value": "kgbls", "label": "KGB택배", "link": "http://www.kgbls.co.kr/sub/sub0401.asp" },
		{ "value": "gtxlogis", "label": "GTX로지스", "link": "http://gtx.webmaker21.kr" },
		{ "value": "daesin", "label": "대신택배", "link": "http://www.ds3211.co.kr/freight/internalFreightForm.jsp" },
		{ "value": "ilyang", "label": "일양로지스", "link": "https://www.ilyanglogis.com/functionality/tracking.asp" },
		{ "value": "kdexp", "label": "경동택배", "link": "https://www.kdexp.com" },
		{ "value": "hdexp", "label": "합동택배", "link": "http://www.hdexp.co.kr/delivery_search.hd" },
		{ "value": "cupost", "label": "CU편의점택배", "link": "https://www.cupost.co.kr/postbox/delivery/local.cupost" },
		{ "value": "cvsnet", "label": "포스트박스(GS25)", "link": "http://www.cvsnet.co.kr/postbox/m_home/index.jsp" },
		{ "value": "fedex", "label": "FEDEX", "link": "https://www.fedex.com/apps/fedextrack/?action=track&cntry_code=kr" },
		{ "value": "tnt", "label": "TNT", "link": "https://www.tnt.com/express/ko_kr/site/shipping-tools/tracking.html" },
		{ "value": "dhl", "label": "DHL", "link": "http://www.dhl.co.kr/ko/express/tracking.html" },
		{ "value": "goodstoluck", "label": "굿투럭", "link": "http://www.goodstoluck.co.kr" },
		{ "value": "kunyoung", "label": "건영택배", "link": "http://www.kunyoung.com/goods/goods_01.php" },
		{ "value": "slx", "label": "SLX택배", "link": "http://www.slx.co.kr/delivery/delivery_number.php" },
		{ "value": "sfexpress", "label": "SF-Express", "link": "http://www.sf-express.com/kr/ko/dynamic_function/waybill/" },
		{ "value": "honam", "label": "한서호남택배", "link": "http://www.honamlogis.co.kr/page/?pid=tracking_number" },
	],
	
	BankList:  [
		{ "value": "KDB산업은행", "label": "KDB산업은행" },
		{ "value": "BOA", "label": "BOA" },
		{ "value": "IBK기업은행", "label": "IBK기업은행" },
		{ "value": "KB국민은행", "label": "KB국민은행" },
		{ "value": "NH농협", "label": "NH농협" },
		{ "value": "NH투자증권", "label": "NH투자증권" },
		{ "value": "SC은행", "label": "SC은행" },
		{ "value": "경남은행", "label": "경남은행" },
		{ "value": "광주은행", "label": "광주은행" },
		{ "value": "대구은행", "label": "대구은행" },
		{ "value": "대신증권", "label": "대신증권" },
		{ "value": "미래에셋", "label": "미래에셋" },
		{ "value": "부산은행", "label": "부산은행" },
		{ "value": "삼성증권", "label": "삼성증권" },
		{ "value": "새마을은행", "label": "새마을은행" },
		{ "value": "수협은행", "label": "수협은행" },
		{ "value": "신한은행", "label": "신한은행" },
		{ "value": "신협은행", "label": "신협은행" },
		{ "value": "씨티은행", "label": "씨티은행" },
		{ "value": "외환은행", "label": "외환은행" },
		{ "value": "우리은행", "label": "우리은행" },
		{ "value": "우체국", "label": "우체국" },
		{ "value": "유안타증권", "label": "유안타증권" },
		{ "value": "전북은행", "label": "전북은행" },
		{ "value": "제주은행", "label": "제주은행" },
		{ "value": "카카오뱅크", "label": "카카오뱅크" },
		{ "value": "하나은행", "label": "하나은행" },
		{ "value": "한화투자증권", "label": "한화투자증권" }
	],

	ExhibitionGenre: [
		{ "value": "Painting", "label": "Painting" },
		{ "value": "Drawing", "label": "Drawing" },
		{ "value": "Mixed media", "label": "Mixed media" },
		{ "value": "Sculpture", "label": "Sculpture" },
		{ "value": "Photography", "label": "Photography" },
		{ "value": "Video", "label": "Video" },
		{ "value": "Animation", "label": "Animation" },
		{ "value": "Installation", "label": "Installation" },
		{ "value": "Ceramic", "label": "Ceramic" },
		{ "value": "Fiber art", "label": "Fiber art" },
		{ "value": "Embroidery", "label": "Embroidery" },
		{ "value": "etc", "label": "etc" },
	],

	City: [
		{ "value": "Seoul", "label": "서울" },
		{ "value": "Jeju", "label": "제주" },
		{ "value": "Busan", "label": "부산" },
		{ "value": "Daegu", "label": "대구" },
		{ "value": "Incheon", "label": "인천" },
		{ "value": "Gwangju", "label": "광주" },
		{ "value": "Daejeon", "label": "대전" },
		{ "value": "Ulsan", "label": "울산" },
		{ "value": "Sejong", "label": "세종" },
		{ "value": "Gangwon", "label": "강원" },
		{ "value": "Chungbuk", "label": "충북" },
		{ "value": "Chungnam", "label": "충남" },
		{ "value": "Jeonbuk", "label": "전북" },
		{ "value": "Jeonnam", "label": "전남" },
		{ "value": "etc", "label": "기타" },
	],

	QnA: [
		{ "value": "to-all", "label": "모두에게" },
		{ "value": "to-creator", "label": "창작자에게" }
	],

	Ranking: [
		{ "value": "support_at", "label": "최신순" },
		{ "value": "likes", "label": "금액순" }
	],

	Reward: [
		{value: true, label: '직접 후원'},
		{value: false, label: '간접 후원'}
	],
	
	EtcrewardActive: [
		{value: true, label: '활성화'},
		{value: false, label: '비활성화'}
	],
	
	MustrewardActive: [
		{value: false, label: '달성시 리워드'},
		{value: true, label: '무조건 리워드'}
	],

	Artwork: [
		{ "value": true, "label": "판매완료" },
		{ "value": false, "label": "판매중" },
	],
	
	itemAccept: [
		{ "value": true, "label": "승인" },
		{ "value": false, "label": "미승인" },
	],

	MagazineCategory: [
		{ "value": '', "label": "전체" },
		{ "value": 'culture space', "label": "매거진" },
		{ "value": 'exhibition / museum', "label": "전시" },
	]

}
