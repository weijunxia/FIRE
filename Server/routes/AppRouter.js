const { Router } = require('express')
const GoalController = require('../controllers/GoalControllers')

AppRouter = Router()

AppRouter.get('/', (req, res) => res.send('Success!'))
AppRouter.get('/goals', GoalController.getAllGoals)

module.exports = AppRouter
