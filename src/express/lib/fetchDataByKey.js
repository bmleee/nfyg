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
  sharedProjects: 'sharedProjects',
  purchasedProjects: 'purchasedProjects',
  purchasedProducts: 'purchasedProducts',
  authorizedProjects: 'authorizedProjects',
  users: 'users',
  projects: 'projects',
  products: 'products',
  sponsors: 'sponsors',
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
}

const fetchDataByKey = async ({ user, ...others }, ...keys) => {
  const [
    { project_names },
    purchases,
  ] = await Promise.all([
    FacebookTracker.getUserSummary(user.id),
    PurchaseModel.findDetailByUser(user)
  ])

  return await Promise.all(keys.map(
    async (k) => await _fetcher[k]({ project_names, purchases, user, ...others })
  ))
}

export default fetchDataByKey
