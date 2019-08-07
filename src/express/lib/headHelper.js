import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import MagazineModel from '../models/magazine'
import StoreModel from '../models/store'

const _get = async ({projectName, productName, magazineName, storeLink, itemLink, stickerName, posterName, collection}) => {
  let p = projectName ? 
          await ProjectModel.findOneByName(projectName) : 
          productName ? 
          await ProductModel.findOneByName(productName) :
          await MagazineModel.findOneByName(magazineName)
          
  let store = storeLink ? await StoreModel.findOneByLink(storeLink) : null
  let Link_item = {
			overview: {
				html: '',
				raw: ''
			}
	};
	if(storeLink) {
  	for(var i in store.items) {
  		if(itemLink == store.items[i].itemLink) {
  			Link_item = store.items[i]
  		}
  	}
	} else {
	  null
	}
  
  let title = p ? p.abstract.longTitle 
                : stickerName=='STICK-IT' ? 'STICK-IT' 
                : stickerName=='STICK-IT2' ? '[앵콜] STICK-IT' 
                : stickerName=='STICK-IT3' ? '2018 STICK-IT' 
                : stickerName=='fleamarket' ? '돈의예술상점' 
                : posterName=='BLIND-POSTER' ? 'BLIND-POSTER'
                : collection=='literature' ? '문학굿즈전'
                : collection=='literature2' ? '문학굿즈전'
                : collection=='calendar' ? '일력달력전'
                : collection=='ancorebadge' ? '앵콜뱃지전'
                : collection=='fabricposter' ? '천포스터전'
                : collection=='phone-case' ? '폰케이스전'
                : collection=='storelist' ? '월요예술상점'
                : collection=='hwatustore' ? '이 주의 상점 첫번째 :: 화투상점'
                : collection=='somemooddesign' ? '이 달의 상점 두번째 :: 썸무드 디자인'
                : collection=='start' ? '창작자의 활동에 날개를 달다'
                : store && !Link_item.name ? store.abstract.title  
                : Link_item.name ? Link_item.name
                : '넷플연가 | 넷플릭스기반 문화예술 커뮤니티'
  let meta = p ? [
    { property: 'og:image', content: `https://netflix-salon.co.kr${p.abstract.imgSrc}` },
    { property: 'og:description', content: p.abstract.postIntro || p.abstract.description },
  ] : store && !Link_item.name ? [
    { property: 'og:image', content: `https://netflix-salon.co.kr${store.abstract.main_img}` },
    { property: 'og:description', content: store.abstract.description },
  ] : Link_item.name ? [
    { property: 'og:image', content: `https://netflix-salon.co.kr${Link_item.imgSrc}` },
    { property: 'og:description', content: Link_item.name },
  ]
  : stickerName=='STICK-IT' ?  
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/stickit_thumb.jpg' },
    { property: 'og:description', content: '스티커 3팩에 10,000원! 여러 작가님들의 예쁜 스티커를 한 곳에 모아둔 스티커전이 열렸습니다.' },
  ] 
  : stickerName=='STICK-IT2' ?  
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/sticker2/sticker2_thumbanil.jpg' },
    { property: 'og:description', content: '스티커 3팩에 10,000원! 앵콜 스티커 기획전!' },
  ] 
  : stickerName=='STICK-IT3' ?  
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/sticker/2018stickit_banner.jpg' },
    { property: 'og:description', content: '스티커 3팩에 10,000원! 2018 스티커 기획전!' },
  ] 
  : stickerName=='fleamarket' ?  
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/fleamarket/fleamarket_thumbnail.jpg' },
    { property: 'og:description', content: '옛 돈의문이었던 한 마을이 예술가들의 작업으로 가득찬 공간이 됩니다.' },
  ] 
  : posterName=='BLIND-POSTER' ? 
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/poster/blindposter_thumb.jpg' },
    { property: 'og:description', content: '유명 현업 작가부터 학생 작가까지 이름이 가려진 작가 100명의 "포스터 전시/장터"입니다.' },
  ]   
  : collection=='literature' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/7pictures_thumbnail.jpg' },
    { property: 'og:description', content: '마음을 울리는 한편의 문학작품을 예술/디자인으로 만나는 기획전입니다.' },
  ]
  : collection=='literature2' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/uploads/1b98dbe341fa39ef0220afd7a2ca9f14' },
    { property: 'og:description', content: '마음을 울리는 한편의 문학작품을 예술/디자인으로 만나는 기획전입니다.' },
  ]
  : collection=='calendar' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/calendar_thumb.jpg' },
    { property: 'og:description', content: '다가오는 2018년을 준비하는 법, 나의 취향을 담은 디자인/일러스트 달력을 선보입니다.' },
  ]
  : collection=='ancorebadge' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/ancorebadge_thumb.jpg' },
    { property: 'og:description', content: '앵콜 뱃지 기획전입니다.' },
  ]
  : collection=='fabricposter' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/fabricposter_thumbnail.jpg' },
    { property: 'og:description', content: '따스한 햇살이 반가운 봄, 천포스터가 주는 기분 좋은 설레임을 느껴보세요.' },
  ]
  : collection=='phone-case' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/phonecase_thumbnail.jpg' },
    { property: 'og:description', content: '항상 나와 함께하는 핸드폰, 매일 다른 폰케이스로 나만의 감성을 보여주어요.' },
  ]
  : collection=='storelist' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/homeimg_20180105_1.png' },
    { property: 'og:description', content: '월요예술상점은 매주 한 차례 배송되는 온라인 상시 판매 스토어 입니다.' },
  ]
  : collection=='hwatustore' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/homeimg_20180103_9.jpg' },
    { property: 'og:description', content: '지역별 특색을 담은 화투, 첫번째 이 주의 상점 화투상점' },
  ]
  : collection=='somemooddesign' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/somemood_main.jpg' },
    { property: 'og:description', content: '기록하는 습관을 선물합니다. 두번째 이 달의 상점 썸무드 디자인' },
  ]
  : collection=='start' ?
  [
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/homeimg_20180122_1.jpg' },
    { property: 'og:description', content: '‘선주문 후제작’ 방식의 크라우드펀딩으로 지속적인 예술/디자인 창작 활동을 뒷받침합니다.' },
  ]
  :[
    { property: 'og:image', content: 'https://netflix-salon.co.kr/assets/images/7pictures_thumbnail.jpg' },
    { property: 'og:description', content: '넷플릭스기반 문화예술 커뮤니티' },
    { property: 'og:url', content: 'https://netflix-salon.co.kr' },
    { property: 'og:title', content: '넷플연가 | NFYG' },
    { property: 'og:type', content: 'website' },
  ]
  

  return {
    title,
    meta,
  }
}


export default async function headHelper(renderProps) {
  let sticker_name = ''
  let poster_name = ''
  let collection = ''
  let itemLink_sub = renderProps.location.pathname
  let itemLink = itemLink_sub.substr(itemLink_sub.lastIndexOf('/') + 1);
  if(renderProps.location.pathname == '/sticker') {
    sticker_name = 'STICK-IT'
  }
  else if(renderProps.location.pathname == '/sticker2') {
    sticker_name = 'STICK-IT2'
  }
  else if(renderProps.location.pathname == '/2018stickit') {
    sticker_name = 'STICK-IT3'
  }
  else if(renderProps.location.pathname == '/doneuiartshop') {
    sticker_name = 'fleamarket'
  }
  else if(renderProps.location.pathname == '/blind-poster') {
    poster_name = 'BLIND-POSTER'
  }
  else if(renderProps.location.pathname == '/collection/literature') {
    collection = 'literature'
  }
  else if(renderProps.location.pathname == '/collection/literature2') {
    collection = 'literature2'
  }
  else if(renderProps.location.pathname == '/collection/calendar') {
    collection = 'calendar'
  }
  else if(renderProps.location.pathname == '/collection/ancorebadge') {
    collection = 'ancorebadge'
  }
  else if(renderProps.location.pathname == '/collection/fabricposter') {
    collection = 'fabricposter'
  }
  else if(renderProps.location.pathname == '/collection/phone-case') {
    collection = 'phone-case'
  }
  else if(renderProps.location.pathname == '/storelist') {
    collection = 'storelist'
  }
  else if(renderProps.location.pathname == '/storeofweeks/hwatustore') {
    collection = 'hwatustore'
  }
  else if(renderProps.location.pathname == '/storeofweeks/somemooddesign') {
    collection = 'somemooddesign'
  }
  else if(renderProps.location.pathname == '/start') {
    collection = 'start'
  }
  const {
    title,
    meta
  } = await _get({
    projectName: renderProps.params.projectName,
    productName: renderProps.params.productName,
    magazineName: renderProps.params.magazineName,
    storeLink: renderProps.params.storeLink,
    itemLink: renderProps.params.itemLink,
    stickerName: sticker_name,
    posterName: poster_name,
    collection: collection
  })

  return new Head({ title, meta, })
}

/***********************************
 *          Constructors           *
 ***********************************/

/**
 * Head
 * @param {[type]} title [description]
 * @param {[type]} meta  [description]
 */
 function Head({
   title,
   meta
 }) {
   this.title = title && new Title(title)
   this.meta = meta && new Meta(meta)
 }
 Head.prototype.toString = function toString() {
   let r = ''
   if (this.title) r += this.title.toString() + '\n'
   if (this.meta) r += this.meta.toString() + '\n'

   return r
 }

/**
* Title
* @param {[type]} title [description]
*/
function Title(title) {
  this.title = title
}
Title.prototype.toString = function toString() {
  return `<title>${this.title}</title>`
}


/**
 * Meta
 * @param {[type]} meta [description]
 */
function Meta(meta) {
  this.meta = meta
}
Meta.prototype.toString = function toString() {
  return this.meta
    .map(m => `<meta name="${m.property}" property="${m.property}" content="${m.content}" />`)
    .join('\n') || ''
}
