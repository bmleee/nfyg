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
    projectName = 'klimtinside' // TODO: set original projectName
    return await this._request({
      url: `/projects/${projectName}/summary`
    })
  }

  // TODO: correct response on tracker side
  getUserSummary = async (user_app_scope_id) => {
    return await this._request({
      url: `/users/${user_name}/summary`
    })
  }

  postUserLogin = async ({user_id, access_token, expired_in}) => {
    return await this._request({
      user_id,
      access_token,
      expired_in
    })
  }
}

export default new FacebookTracker(FB_TRACKER_URL)
