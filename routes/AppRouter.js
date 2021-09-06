const { Router } = require('express')
const { Account, Transactions } = require('../models')
const util = require('util')
const AccountController = require('../controllers/AccountController')
const GoalController = require('../controllers/GoalControllers')
const TransactionController = require('../controllers/TransactionController')
const plaidClient = require('../plaid')

AppRouter = Router()

AppRouter.get('/', (req, res) => res.send('Success!'))

AppRouter.get('/goals', GoalController.getAllGoals)
AppRouter.put('/goals/:id', GoalController.editGoal)
AppRouter.post('/goals', GoalController.createNewGoal)
AppRouter.delete('/goals/:id', GoalController.deleteGoal)

AppRouter.get('/accounts', AccountController.getAllAccounts)
AppRouter.post('/accounts', AccountController.addNewAccount)
AppRouter.delete('/accounts/:id', AccountController.deleteAccount)

AppRouter.get('/transactions', TransactionController.getAllTransactions)
AppRouter.post('/transactions', TransactionController.addNewTransaction)

AppRouter.get('/create-link-token', async (req, res) => {
  const { link_token: linkToken } = await plaidClient.createLinkToken({
    user: {
      client_user_id: 'unique id'
    },
    client_name: 'fatFIRE',
    products: ['auth', 'transactions'],
    country_codes: ['US'],
    language: 'en'
  })
  res.json({ linkToken })
})

AppRouter.get('/transactions/:account_id', async (req, res) => {
  const account = await Account.findById(req.params.account_id)
  if (account) {
    const transactions = await plaidClient.getTransactions(
      account.accessToken,
      '2021-01-01',
      '2021-01-30'
    )
    console.log(transactions)
    return res.status(200).json(transactions)
  }
})

AppRouter.post('/transactions/:transaction_id', async (req, res) => {
  const transaction = await Transactions.findById(req.params.transaction_id)
  if (transaction) {
    console.log(res.transaction)
  }
})

module.exports = AppRouter
