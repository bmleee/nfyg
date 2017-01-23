import { FB, FacebookApiException } from 'fb'
import { FB_APP } from '~/env'

export default new FB({
  appId: FB_APP.clientID,
  appSecret: FB_APP.clientSecret
})
