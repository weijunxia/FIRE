const {Schema} = require('mongoose')

const GoalSchema = new Schema(
  {
    goalTitle: {
      type: String,     
      required: true,
    },
    goalTotal: {
      type: String,
      required: true
    },
    goalDate: {
      type: Date,
      required: true,
      default: Date.now
    }

  },
  {timestamps = true}
)

module.exports = GoalSchema