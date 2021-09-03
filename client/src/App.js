import React, { useState, useEffect, Pressable } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from './global'
// components
import NavBarComp from './components/NavBar/NavBar'
import PlaidLinkComponent from './components/PlaidComponents/PlaidLinkComp'
import TransactionsComponent from './components/Transactions/TransactionsComponent'
import GoalsForm from './components/Goals/GoalsForm'
// styling
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// images
import logo from './images/fatFIRE.png'

function App(props) {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    async function getGoal() {
      const res = await axios.get(`${BASE_URL}/goals`)
      setGoals(res.data.results)
    }
    // getGoal()
  }, [])

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
        <Route path="/saving-goal">
          <GoalsForm />
        </Route>
      </Switch>
    </div>
  )
}

export default App
