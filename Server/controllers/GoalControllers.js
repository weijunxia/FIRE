const { Goal } = require('../models')
const { post } = require('../models/Account')

const getAllGoals = async (req, res) => {
  try {
    const results = await Goal.find()
    return res.status(200).json({ results })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const createNewGoal = async (req, res) => {
  try {
    const results = await new Goal(req.body)
    await results.save()
    return res.status(201).json({ results })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const editGoal = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Goal.findByIdandUpdate(id, req.body, { new: true })
    if (!updated) throw Error('Goal not found')
    return res.status(200).json(updated)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Goal.findByIdAndDelete(id)
    if (deleted) {
      return res.staus(200).send('Post deleted')
    }
    throw new Error('Post not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getAllGoals,
  createNewGoal,
  editGoal,
  deleteGoal
}
