import axios from 'axios'

import { FB_TRACKER_URL } from '~/env'

class FacebookTracker {
  _host = ''

  constructor (host) {
    this._host = host
  }

  _checkStatus = async () => {
    // TODO: Check facebook tracker is online
  }

  _getConfig = (opts) => ({
    baseURL: this._host,
    ...opts,
  })

  _request = async (opt) => {
    let config = this._getConfig(opt)

    try {
      let response = await axios.request(config)
      return response.data
    } catch (e) {
      throw e
    }
  }

  getProjectSummary = async (projectName) => {
    projectName = projectName.includes('test') ? 'how_we_art' : projectName // TODO: inactivate

    return await this._request({
      url: `/projects/${projectName}/summary`
    })
  }

  // TODO: tracker should accept /summary/short
  getProjectShortSummary = async (projectName) => {
    projectName = projectName.includes('test') ? 'how_we_art' : projectName // TODO: inactivate

    return await this._request({
      url: `/projects/${projectName}/summary`
    })
  }



  // TODO: correct response on tracker side
  // returns { shares, comments, likes, project_names: [ String ], }
  getUserSummary = async (user_no) => {
    user_no = 160 // TODO: deactivate this!
    return await this._request({
      url: `/users/${user_no}/summary`
    })
  }

  // returns { shares, comments, likes, posts: [...]}
  getUserSummaryOnProject = async (user_no, projectName) => {
    user_no = 160 // TODO: deactivate this!
    return await this._request({
      url: `/users/${user_no}/summary/${projectName}`
    })
  }

  // first draft
  postUserLogin = async ({user_id, access_token, expired_in}) => {
    return await this._request({
      method: 'post',
      url: `/users/login`,
      data: {
        user_id,
        access_token,
        expired_in
      }
    })
  }

  // first draft
  postUserShareProject = async ({}) => {
    return await this._request({
      method: 'post',
      url: `/users/share`,
      data: {
        user_id,
        access_token,
        expired_in
      }
    })
  }
}

export default new FacebookTracker(FB_TRACKER_URL)
