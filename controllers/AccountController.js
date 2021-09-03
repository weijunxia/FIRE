const { Account } = require('../models')

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
    if (req.body.length) {
      const accounts = await Account.insertMany(req.body)
      return res.send(accounts)
    }
    const account = new Account(req.body)
    await results.save()
    return res.status(201).json(account)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getAllAccounts,
  addNewAccount
}
