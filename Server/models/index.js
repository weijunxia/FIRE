const mongoose = require('mongoose')
const AccountSchema = require('./Account')
const GoalSchema = require('./Goal')

const Account = mongoose.model('accounts', AccountSchema)
const Post = mongoose.model('goals', PostSchema)

module.exports = {
  Account,
  Post
}
