import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLink
} from 'react-plaid-link'
import { logSuccess } from 'util'
import { BASE_URL } from '../../global'
import './plaidlinkcomponent.css'

export default function PlaidLinkComponent() {
  const [linkToken, setLinkToken] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [accounts, setAccounts] = useState([])

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
  }

  const exchangePublicToken = async () => {}

  const now = moment()
  const today = now.format(`YYYY-MM-DD`)
  const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD')

  useEffect(() => {
    requestLinkToken()
    getAccounts()
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
    await insertAccounts(accounts)
  }

  const getTransactions = async (accountId) => {
    const res = await axios.get(`${BASE_URL}/transactions/${accountId}`)
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
          <h1>{account.accountName}</h1>
          <button onClick={() => getTransactions(account._id)}>
            Check Transactions
          </button>
        </div>
      ))}
    </div>
  )
}
