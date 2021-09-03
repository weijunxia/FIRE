const { Schema } = require('mongoose')

const TransactionSchema = new Schema(
  {
    account_id: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    category_id: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    merchant_name: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    pending: {
      type: Boolean,
      required: true
    },
    transaction_id: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = TransactionSchema
