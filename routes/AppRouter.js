const { Router } = require('express')
const { Account, Transactions } = require('../models')
const plaid = require('plaid')
const util = require('util')
const dotenv = require('dotenv')
const AccountController = require('../controllers/AccountController')
const GoalController = require('../controllers/GoalControllers')
const TransactionController = require('../controllers/TransactionController')

AppRouter = Router()

AppRouter.get('/', (req, res) => res.send('Success!'))

AppRouter.get('/goals', GoalController.getAllGoals)
AppRouter.put('/goals/:id', GoalController.editGoal)
AppRouter.post('/goals', GoalController.createNewGoal)
AppRouter.delete('/goals/:id', GoalController.deleteGoal)

AppRouter.get('/accounts', AccountController.getAllAccounts)
AppRouter.post('/accounts', AccountController.addNewAccount)
AppRouter.delete('/accounts', AccountController.deleteAccount)

AppRouter.get('/transactions', TransactionController.getAllTransactions)
AppRouter.post('/transactions', TransactionController.addNewTransaction)

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET

const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox
})

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
    const { access_token } = await plaidClient.exchangePublicToken(
      account.accessToken
    )
    const transactions = await plaidClient.getTransactions(
      access_token,
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

AppRouter.post('/token-exchange', async (req, res) => {
  const { publicToken } = req.body
  const { access_token: accessToken } = await plaidClient.exchangePublicToken(
    publicToken
  )

  const authResponse = await plaidClient.getAuth(accessToken)
  console.log('----------------')
  console.log('Auth response: ')
  console.log(util.inspect(authResponse, false, null, true))

  const identityResponse = await plaidClient.getIdentity(accessToken)
  console.log('----------------')
  console.log('Identity Response')
  console.log(util.inspect(identityResponse, false, null, true))

  const balanceResponse = await plaidClient.getBalance(accessToken)
  console.log('----------------')
  console.log('Balance Response')
  console.log(util.inspect(balanceResponse, false, null, true))

  res.sendStatus(200)
})

module.exports = AppRouter
