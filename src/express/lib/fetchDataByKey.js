import keys from 'object-keys'

import UserModel from '../models/user'
import ProjectModel from '../models/project'
import ProductModel from '../models/product'
import SponsorModel from '../models/sponsor'
import PurchaseModel from '../models/purchase'
import PaymentModel from '../models/payment'
import AddressModel from '../models/address'
import QnAModel from '../models/qna'
import PostModel from '../models/post'
import ExhibitionModel from '../models/exhibition'
import MagazineModel from '../models/magazine'

import FacebookTracker from '../../lib/FacebookTracker'
import pick from 'lodash.pick'

export const KEYS = {
  // profile
  sharedProjects: 'sharedProjects',
  purchasedProducts: 'purchasedProducts',
  purchasedProjects: 'purchasedProjects',
  authorizedProjects: 'authorizedProjects',
  authorizedProducts: 'authorizedProducts',

  // admin
  users: 'users',
  projects: 'projects',
  products: 'products',
  sponsors: 'sponsors',

  // search
  projectsByQuery: 'projectsByQuery',
  productsByQuery: 'productsByQuery',
  magazinesByQuery: 'magazinesByQuery',
}

const _fetcher = {
  sharedProjects: async ({ project_names = [] }) => await Promise.all(
    (await ProjectModel.findByNames(project_names))
      .map(async (p) => await p.toFormat('shared_project'))),
  purchasedProjects: async ({ purchases = [] }) => await Promise.all(
    purchases
      .filter(p => !!p.project)
      .map(async (p) => await p.toFormat('profile'))),
  purchasedProducts: async ({ purchases = [] }) => await Promise.all(
    purchases
      .filter(p => !!p.product)
      .map(async (p) => await p.toFormat('profile'))),
  authorizedProjects: async ({ user }) => await Promise.all(
    (await ProjectModel.findAuthorizedOnesToUser(user))
      .map(async (p) => await p.toFormat('profile_admin'))),
  authorizedProducts: async ({ user }) => await Promise.all(
    (await ProductModel.findAuthorizedOnesToUser(user))
      .map(async (p) => await p.toFormat('profile_admin'))),
  users: async () => await Promise.all(
    (await UserModel.find({}))
      .map(async (u) => await u.toFormat('profile_admin'))),
  projects: async () => await Promise.all(
    (await ProjectModel.find({}))
      .map(async (p) => await p.toFormat('profile_admin'))),
  products: async () => await Promise.all(
    (await ProductModel.find({}))
      .map(async (p) => await p.toFormat('profile_admin'))),
  sponsors: async () => await Promise.all(
    (await SponsorModel.find({}))
      .map(async (p) => await p.toFormat('profile_admin'))),
  projectsByQuery: async ({q}) => await Promise.all(
    (await ProjectModel.find({
      $or: [
        { 'abstract.projectName': q },
        { 'abstract.longTitle': q },
        { 'abstract.shortTitle': q },
        { 'abstract.postIntro': q },
        { 'abstract.category': q },
      ]
    }))
      .map(async (p) => await p.toFormat('search_result'))
  ),
  productsByQuery: async ({q}) => await Promise.all(
    (await ProductModel.find({
      $or: [
        { 'abstract.productName': q },
        { 'abstract.longTitle': q },
        { 'abstract.shortTitle': q },
        { 'abstract.postIntro': q },
        { 'abstract.category': q },
      ]
    }))
      .map(async (p) => await p.toFormat('search_result'))
  ),
  magazinesByQuery: async ({q}) => await Promise.all(
    (await MagazineModel.find({
      $or: [
        { 'abstract.magazineName': q },
        { 'abstract.longTitle': q },
        { 'abstract.shortTitle': q },
        { 'abstract.postIntro': q },
        { 'abstract.category': q },
      ]
    }))
      .map(async (m) => await m.toFormat('search_result'))
  ),
}

const fetchDataByKey = async ({ user, q, ...others }, ...keys) => {
  let project_names, purchases;
  
  console.log('fetchDataByKey.keys', keys)
  
  console.log('KEYS.purchasedProjects in keys || KEYS.purchasedProducts in keys', KEYS.purchasedProjects in keys || KEYS.purchasedProducts in keys)
  console.log('KEYS.sharedProjects in keys', KEYS.sharedProjects in keys)
  console.log('KEYS.purchasedProjects', KEYS.purchasedProjects)
  console.log('KEYS.purchasedProducts', KEYS.purchasedProducts)

  // preparing parameters
  if (keys.includes(KEYS.sharedProjects)) {
    let r = await FacebookTracker.getUserSummary(user && user.id)
    project_names = r.project_names
  }
  
  if (keys.includes(KEYS.purchasedProjects)
    || keys.includes(KEYS.purchasedProducts)) {
    purchases = await PurchaseModel.findDetailByUser(user)
    console.log('purchases.length: ', purchases.length)
  }
  
  if (q) {
    q = new RegExp(`.*${q}.*`, 'i')
  }

  return await Promise.all(keys.map(
    async (k) => await _fetcher[k]({ project_names, purchases, user, q, ...others })
  ))
}

export default fetchDataByKey
