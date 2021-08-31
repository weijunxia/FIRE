const mongoose = require('mongoose')
const AccountSchema = require('./Account')
const GoalSchema = require('./Goal')

const Account = mongoose.model('accounts', AccountSchema)
const Goal = mongoose.model('goals', GoalSchema)

module.exports = {
  Account,
  Goal
}
