import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLink
} from 'react-plaid-link'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../global'
import './plaidlinkcomponent.css'

export default function PlaidLinkComponent() {
  const [linkToken, setLinkToken] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])

  const requestLinkToken = async () => {
    const response = await axios.get(`${BASE_URL}/create-link-token`)
    setLinkToken(response.data.linkToken)
  }

  const insertAccounts = async (accounts) => {
    const res = await axios.post(`${BASE_URL}/accounts`, accounts)
    setAccounts([...accounts, ...res.data])
  }

  const getAccounts = async () => {
    const res = await axios.get(`${BASE_URL}/accounts`)
    setAccounts(res.data)
    console.log(res)
  }

  const insertTransactions = async (transactions) => {
    const res = await axios.post(`${BASE_URL}/transactions`)
    setTransactions([...transactions, res.transactions])
  }

  const getAllTransactions = async () => {
    const res = await axios.get(`${BASE_URL}/transactions`)
    setTransactions(res.data.transactions)
    console.log(res)
  }

  useEffect(() => {
    requestLinkToken()
    getAccounts()
    getAllTransactions()
  }, [])

  const onExit = (error, metadata) => console.log('onExit', error, metadata)

  const onEvent = (eventName, metadata) => {
    console.log('onEvent', eventName, metadata)
  }

  const onSuccess = async (token, metadata) => {
    console.log(token, metadata)
    const accounts = metadata.accounts.map((account) => ({
      plaidId: account.id,
      accountName: account.name,
      accountSubtype: account.subtype,
      accountType: account.type,
      accessToken: token,
      institutionId: metadata.institution.institution_id,
      institutionName: metadata.institution.name
    }))
    await setAccessToken(token.accessToken)
    console.log('this is your access token: ', accessToken)
    await insertAccounts(accounts)
  }

  const getTransactions = async (accountId) => {
    const res = await axios.get(`${BASE_URL}/transactions/${accountId}`)
    console.log('res is:', res.data.transactions)
  }

  return (
    <div>
      <PlaidLink
        className="CustomButton"
        style={{ padding: '20px', fontSize: '16px', curor: 'pointer' }}
        token={linkToken}
        onExit={onExit}
        onSuccess={onSuccess}
        onEvent={onEvent}
      >
        Connect to your bank account
      </PlaidLink>
      {accounts.map((account) => (
        <div key={account._id}>
          <h1>
            {account.accountName}
            <br></br>
            {account.institutionName}
          </h1>
          <Link to={`/transactions/${account._id}`}>
            <button>Check Transactions</button>
          </Link>
        </div>
      ))}
    </div>
  )
}
