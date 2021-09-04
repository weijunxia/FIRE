const { Account } = require('../models')
const plaidClient = require('../plaid')
const getAllAccounts = async (req, res) => {
  try {
    const results = await Account.find()
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const addNewAccount = async (req, res) => {
  try {
    const data = req.body
    const preparedAccounts = []
    for (let account of data) {
      const { access_token } = await plaidClient.exchangePublicToken(
        account.accessToken
      )
      let newAccount = { ...account, accessToken: access_token }

      preparedAccounts.push(newAccount)
    }
    const accounts = await Account.insertMany(preparedAccounts)
    return res.send(accounts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Account.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Account Deleted')
    }
    throw new Error('Post not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getAllAccounts,
  addNewAccount,
  deleteAccount
}
