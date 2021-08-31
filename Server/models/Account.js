const {Schema} = require('mongoose')

const AccountSchema = new Schema ({
  accessToken: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  institutionId: {
    type: String,
    required: true
  },
  institutionName: {
    type: String,
    required: true
  },
  accountName: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  accountSubtype: {
    type: String,
    required: true
  },
}, 
  {timestamps = true}
)

module.exports = AccountSchema