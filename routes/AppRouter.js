const { Router } = require('express')
const plaid = require('plaid')
const util = require('util')
const dotenv = require('dotenv')
const AccountController = require('../controllers/AccountController')
const GoalController = require('../controllers/GoalControllers')

AppRouter = Router()

AppRouter.get('/', (req, res) => res.send('Success!'))
AppRouter.get('/goals', GoalController.getAllGoals)
AppRouter.post('/goals/:id', GoalController.createNewGoal)
AppRouter.put('/goals/:id', GoalController.editGoal)
AppRouter.get('/accounts', AccountController.getAllAccounts)
AppRouter.post('/accounts/:id', AccountController.addNewAccount)

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
