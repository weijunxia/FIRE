const plaid = require('plaid')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const Account = require('../models/Account')

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  plaid.environments.sandbox
)
