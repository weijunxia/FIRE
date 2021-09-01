const { Schema } = require('mongoose')

const GoalSchema = new Schema(
  {
    goalTitle: {
      type: String,
      required: true
    },
    goalTotal: {
      type: String,
      required: true
    },
    goalDate: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = GoalSchema
