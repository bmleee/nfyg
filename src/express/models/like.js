import mongoose from 'mongoose'
import axios from 'axios'

import UserModel from './user'

import config from '~/iamport.config.js'

const Schema = mongoose.Schema;
const LikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  store: { type: Schema.Types.ObjectId, ref: 'Store' },
  user_info: {
    name: { type: String, required: false },
    display_name: { type: String, required: false },
    local_email: { type: String, required: false },
    id: { type: String, required: false },
    fb_id: { type: String,},
    image: { type: String, required: false },
  },
  like_state: {
    type: String,
    enum: ['un-like', 'like'],
    default: 'un-like',
  }
});

LikeSchema.pre('validate', function (next) {
	if (this.project || this.product || this.store) next()
	else {
		next(Error('One of project, product field is reuqired!'))
	}
})

LikeSchema.pre('update', function (next) {
	this.updated_at = Date.now()
	next()
})

LikeSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

LikeSchema.methods.toFormat = async function (type, ...args) {
  let isItemNew = false;
  for(var i in this.store && this.store.items) {
    if((Date.now() - new Date(this.store.items[i].created_at).valueOf()) / 1000 / 60 / 60 / 24 < 10) {
      isItemNew = true;
    }
  }
  
  switch (type) {
      case 'profile':
        return {
          _id: this._id,
          project: this.project && this.project.abstract,
          product: this.product && this.product.abstract,
          project_funding: this.project && this.project.funding,
          product_funding: this.product && this.product.funding,
          remainingDays: this.product && ((new Date(this.product.funding.dateTo).getTime() + 86400000) - new Date().getTime() ) / 1000 / 60 / 60 / 24,
          store: this.store && this.store.abstract,
          storeInfo: this.store && this.store.storeInfo,
          storeItems: this.store && this.store.items,
          storeisItemNew: isItemNew,
          storeShippingCycle: this.store && this.store.storeShippingCycle,
          like_state: this.like_state,
          user: this.user_info,
        }
    default:
      console.error(`toFormat can't accept this ${JSON.stringify(type)}`);
      return ''
  }
}

LikeSchema.methods.cancelByUser = async function () {

  switch (this.like_state) {
      case 'un-like':
      case 'like':
          this.like_state = 'un-like'
          break;
      default:
        // console.log(`Post ${this._id} cancel purchase request on state ${this.purchase_info.purchase_state}`)
    }
    return await this.save()
}

LikeSchema.statics.findByUserAndProduct = function (user, product) {
	return this.find({ user }).find({ product }).sort({ updated_at: -1})
}
LikeSchema.statics.findByUserAndProject = function (user, project) {
	return this.find({ user }).find({ project }).sort({ updated_at: -1})
}
LikeSchema.statics.findDetailByUser = function (user) {
	return this.find({ user: user._id || user || user.local_email || user.fb_email }).populate('project product store').sort({ updated_at: -1})
}
LikeSchema.statics.findByProject = function (project) {
	return this.find({ project }).sort({ updated_at: -1})
}
LikeSchema.statics.findByProduct = function (product) {
	return this.find({ product }).sort({ updated_at: -1})
}
LikeSchema.statics.countValidLikes = function ({ product, project, }) {
  let q =  product ? { product } : { project }
	return this.count(q)
    .where('like_state').in(['like'])
}
LikeSchema.statics.findByUserAndStore = function (user, store) {
	return this.find({ user }).find({ store }).sort({ updated_at: -1})
}
LikeSchema.statics.findByStore = function (store) {
	return this.find({ store }).sort({ updated_at: -1})
}

const LikeModel = mongoose.model('Like', LikeSchema);

export default LikeModel
