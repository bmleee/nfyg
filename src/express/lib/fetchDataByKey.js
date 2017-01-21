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
  purchasedProjects: 'purchasedProjects',
  purchasedProducts: 'purchasedProducts',
  authorizedProjects: 'authorizedProjects',
  authorizedProducts: 'authorizedProducts',

  // admin
  users: 'users',
  projects: 'projects',
  products: 'products',
  sponsors: 'sponsors',

  // search
  projectsByName: 'projectsByName',
  productsByName: 'productsByName',
  magazinesByName: 'magazinesByName',
}

const _fetcher = {
  sharedProjects: async ({ project_names }) => await Promise.all(
    (await ProjectModel.findByNames(project_names))
      .map(async (p) => await p.toFormat('shared_project'))),
  purchasedProjects: async ({ purchases }) => await Promise.all(
    purchases
      .filter(p => !!p.project)
      .map(async (p) => await p.toFormat('profile'))),
  purchasedProducts: async ({ purchases }) => await Promise.all(
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
  projectsByName: async ({q}) => await Promise.all(
    (await ProjectModel.find({ 'abstract.projectName': q }))
      .map(async (p) => await p.toFormat('search_result'))
  ),
  productsByName: async ({q}) => await Promise.all(
    (await ProductModel.find({ 'abstract.productName': q }))
      .map(async (p) => await p.toFormat('search_result'))
  ),
  magazinesByName: async ({q}) => await Promise.all(
    (await MagazineModel.find({ 'abstract.magazineName': q }))
      .map(async (m) => await m.toFormat('search_result'))
  ),
}

const fetchDataByKey = async ({ user, q, ...others }, ...keys) => {
  let project_names, purchases;

  if (KEYS.sharedProjects in keys) {
    let r = await FacebookTracker.getUserSummary(user && user.id)
    project_names = r.project_names
  }
  if (KEYS.purchasedProjects in keys || KEYS.purchasedProducts in keys) {
    purchases = await PurchaseModel.findDetailByUser(user)
  }
  if (q) {
    q = new RegExp(`.*${q}.*`, 'i')
  }

  return await Promise.all(keys.map(
    async (k) => await _fetcher[k]({ project_names, purchases, user, q, ...others })
  ))
}

export default fetchDataByKey
