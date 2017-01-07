import Iamport from 'iamport'
import config from '~/iamport.config.js'

const IMP = new Iamport({
	impKey: config.REST.key,
	impSecret: config.REST.secret,
})

export default IMP
