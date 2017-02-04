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
  sharedProjects: async ({ project_names = [] }) => {
    if (project_names.length === 0) return []

    return  await Promise.all(
      (await ProjectModel.findByNames(project_names))
        .map(async (p) => {
          try {
            return await p.toFormat('shared_project')
          } catch (e) {
            console.error('erorr to fetch sharedProjects');
            console.error(e);
            throw e
          }
        }))
  },
  purchasedProjects: async ({ purchases = [] }) => !purchases ? [] : await Promise.all(
    purchases
      .filter(p => !!p.project)
      .map(async (p) => {
        try {
          return await p.toFormat('profile')
        } catch (e) {
          console.error('erorr to fetch purchasedProjects');
          console.error(e);
          throw e
        }
      })),
  purchasedProducts: async ({ purchases = [] }) => !purchases ? [] : await Promise.all(
    purchases
      .filter(p => !!p.product)
      .map(async (p) => {
        try {
          return await p.toFormat('profile')
        } catch (e) {
          console.error('erorr to fetch purchasedProducts');
          console.error(e);
        }
      })),
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

  try {
    // preparing parameters
    if (keys.includes(KEYS.sharedProjects)) {
      let r = await FacebookTracker.getUserSummary(user)
      project_names = r.project_names || []
      console.log('user summary', r);
    }

    if (keys.includes(KEYS.purchasedProjects)
      || keys.includes(KEYS.purchasedProducts)) {
      purchases = await PurchaseModel.findDetailByUser(user)
    }

    if (q) {
      q = new RegExp(`.*${q}.*`, 'i')
    }
  } catch (e) {
    console.error('error in fetchDataByKey');
    console.error(e);
  }

  return await Promise.all(keys.map(
    async (k) => await _fetcher[k]({ project_names, purchases, user, q, ...others })
  ))
}

export default fetchDataByKey
