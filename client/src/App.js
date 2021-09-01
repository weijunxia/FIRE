import React, { useState, useEffect, Pressable } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Plaid from 'plaid'
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLink
} from 'react-plaid-link'
import { BASE_URL } from './global'
// components
import Test from './components/test'
import NavBar from './components/NavBar/NavBar'
// styling
import './App.css'

function App(props) {
  const [linkToken, setLinkToken] = useState('')
  const [goals, setGoals] = useState([])

  const requestLinkToken = async () => {
    const response = await axios.get(`${BASE_URL}/create-link-token`)
    setLinkToken(response.data.linkToken)
  }

  useEffect(() => {
    async function getGoal() {
      const res = await axios.get(`${BASE_URL}/goals`)
      setGoals(res.data.results)
    }
    // getGoal()
    requestLinkToken()
  }, [])

  const onExit = (error, metadata) => console.log('onExit', error, metadata)

  const onEvent = (eventName, metadata) => {
    console.log('onEvent', eventName, metadata)
  }

  const onSuccess = (token, metadata) => {
    console.log('onSuccess', token, metadata)
  }

  return (
    <div className="App">
      <header></header>
      <Test />
      <PlaidLink
        className="Custom Button"
        style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
        token={linkToken}
        onExit={onExit}
        onSuccess={onSuccess}
        onEvent={onEvent}
      >
        Connect to your bank account
      </PlaidLink>
    </div>
  )
}

export default App
