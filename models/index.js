const mongoose = require('mongoose')
const AccountSchema = require('./Account')
const GoalSchema = require('./Goal')
const TransactionsSchema = require('./Transactions')

const Account = mongoose.model('accounts', AccountSchema)
const Goal = mongoose.model('goals', GoalSchema)
const Transactions = mongoose.model('transaction', TransactionsSchema)

module.exports = {
  Account,
  Goal,
  Transactions
}
