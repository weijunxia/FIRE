const { Transactions } = require('../models')

const getAllTransactions = async (req, res) => {
  try {
    const transList = await Transactions.find()
    return res.status(200).json(transList)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const addNewTransaction = async (req, res) => {
  try {
    if (req.body.length) {
      const transactions = await Transactions.insertMany(req.body)
      return res.send(transactions)
    }
    const transactions = new Transactions(req.body)
    await transactions.save()
    return res.status(201).json(transactions)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params
    const transaction = await Transaction.findById(transaction_id)
    if (transaction) {
      return res.json(transaction)
    }
    res.status(404).json({ message: 'Transaction not found.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllTransactions,
  addNewTransaction,
  getTransaction
}
