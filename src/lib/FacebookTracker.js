import axios from 'axios'
import querystring from 'querystring'

import { FB_TRACKER_URL, FB_APP } from '~/env'

class FacebookTracker {
  constructor ({ host, client_id, client_secret }) {
    this._host = host
    this.client_id = client_id
    this.client_secret = client_secret

    this.graph_api_url = 'https://graph.facebook.com'
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

  // GET /user/login to FacebookTracker
  fbUserLoggedIn = async (user) => {
    if (!user.fb_id) { // local login
      return;
    }

    try {
      const r = await this._request({
        method: 'post',
        url: '/users/login',
        data: {
          user_id: user.id,
          user_app_scope_id: user.fb_id,
          access_token: user.fb_access_token,
        }
      })
      console.log('fbUserLoggedIn.r', r);
    } catch (e) {
      console.error(e);
    }
  }


  userSharedProject = async (user, project_name, link) => {
    if (!user.fb_id) { // local login
      return;
    }

    try {
      const r = await this._request({
        method: 'post',
        url: '/projects/share',
        data: {
          user_id: user.id,
          project_name: project_name,
          access_token: user.fb_access_token,
          link: link
        }
      })
      console.log('fbUserLoggedIn.r', r);
    } catch (e) {
      console.error(e);
    }
  }

  // use graph api
  getLongLivedUserAccessToken = async (access_token)  => {
    let config = {
      baseURL: this.graph_api_url,
      url: '/oauth/access_token',
      params: {
        grant_type: 'fb_exchange_token',
        client_id: this.client_id,
        client_secret: this.client_secret,
        fb_exchange_token: access_token
      }
    }

    try {
      const r = await axios.request(config)
      const q = querystring.parse(r.data)
      if (q.access_token) {
        return q.access_token
      } else {
        return access_token
      }
    } catch (e) {
      console.error(e);
      return access_token
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

export default new FacebookTracker({
  host: FB_TRACKER_URL,
  client_id: FB_APP.clientID,
  client_secret: FB_APP.clientSecret
})
