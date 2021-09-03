import React, { useState, useEffect, Pressable } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from './global'
// components
import NavBarComp from './components/NavBar/NavBar'
import PlaidLinkComponent from './components/PlaidComponents/PlaidLinkComp'
import TransactionsComponent from './components/Transactions/TransactionsComponent'
import GoalsForm from './components/Goals/GoalsForm'
import GoalsComponent from './components/Goals/Goal'
// styling
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// images
import logo from './images/fatFIRE.png'

function App(props) {
  const [goals, setGoals] = useState([])

  const handleSubmit = async (e, formData) => {
    e.preventDefault()
    const res = await axios.post(`${BASE_URL}/goals`, formData)
    setGoals(...goals, res.data.results)
    props.history.push('/saving-goal')
  }

  useEffect(() => {
    async function getGoal() {
      const res = await axios.get(`${BASE_URL}/goals`)
      setGoals(res.data.results)
    }
    getGoal()
  }, [props.history.location])

  return (
    <div className="App">
      <header>
        <NavBarComp />
      </header>
      <Switch>
        <Route exact path="/">
          <PlaidLinkComponent />
        </Route>
        <Route path="/transactions/:account_id">
          <TransactionsComponent />
        </Route>
        <Route
          exact
          path="/saving-goal"
          component={(props) => (
            <div>
              <GoalsForm handleSubmit={handleSubmit} {...props} />
              {goals.length && <GoalsComponent goals={goals} {...props} />}
            </div>
          )}
        />
      </Switch>
    </div>
  )
}

export default withRouter(App)
