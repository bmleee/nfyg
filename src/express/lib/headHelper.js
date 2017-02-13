import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import MagazineModel from '../models/magazine'

const _get = async ({projectName, productName, magazineName}) => {
  let p = projectName ? 
          await ProjectModel.findOneByName(projectName) : 
          productName ? 
          await ProductModel.findOneByName(productName) :
          await MagazineModel.findOneByName(magazineName)
  
  let title = p ? p.abstract.longTitle : '7Pictures'
  let meta = p ? [
    { property: 'og:image', content: `http://7pictures.kr:8080${p.abstract.imgSrc}` },
    { property: 'og:description', content: p.abstract.postIntro || p.abstract.description },
  ] : [ 
    { property: 'og:image', content: 'http://7pictures.co.kr/assets/images/favicon.ico' },
    { property: 'og:description', content: '' },
  ]

  return {
    title,
    meta,
  }
}


export default async function headHelper(renderProps) {
  const {
    title,
    meta
  } = await _get({
    projectName: renderProps.params.projectName,
    productName: renderProps.params.productName,
    magazineName: renderProps.params.magazineName
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
