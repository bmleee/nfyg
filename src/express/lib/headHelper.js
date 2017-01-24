import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import MagazineModel from '../models/magazine'

const _get = async ({projectName, productName}) => {
  let p = projectName ? await ProjectModel.findOneByName(projectName) : await ProductModel.findOneByName(productName)

  let title = p ? p.abstract.shortTitle : '7Pictures'
  let meta = p ? [
    { property: 'og:image', content: p.abstract.imgSrc },
  ] : [ 
    { property: 'og:image', content: 'http://7pictures.co.kr/assets/images/favicon.ico' },
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
    productName: renderProps.params.productName
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
