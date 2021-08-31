const { Router } = require('express')
const AccountController = require('../controllers/AccountController')
const GoalController = require('../controllers/GoalControllers')

AppRouter = Router()

AppRouter.get('/', (req, res) => res.send('Success!'))
AppRouter.get('/goals', GoalController.getAllGoals)
AppRouter.post('/goals/:id', GoalController.createNewGoal)
AppRouter.put('/posts/:id', GoalController.editGoal)
AppRouter.get('/accounts', AccountController.getAllAccounts)
AppRouter.post('/accounts', AccountController.addNewAccount)

module.exports = AppRouter
