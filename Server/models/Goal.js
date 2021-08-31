const {Schema} = require('mongoose')

const GoalSchema = new Schema(
  {
    title: {
      type: String,     
      required: true,

    }
  },
  {timestamps = true}
)

module.exports = GoalSchema