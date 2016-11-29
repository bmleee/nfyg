var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  phone: {
    type: String
  },
  address: {
    lines: {
      type: String
    },
    details: {
      type: String
    },
    zip: {
      type: String
    }
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
