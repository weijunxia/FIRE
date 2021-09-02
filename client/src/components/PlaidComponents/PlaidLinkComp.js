import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLink
} from 'react-plaid-link'
import plaidClient from '../../../../routes/AppRouter'
import { BASE_URL } from '../../global'

export default async function PlaidLinkComponent() {
  const [linkToken, setLinkToken] = useState('')

  const requestLinkToken = async () => {
    const response = await axios.get(`${BASE_URL}/create-link-token`)
    setLinkToken(response.data.linkToken)
  }

  useEffect(() => {
    requestLinkToken()
  }, [])

  const onExit = (error, metadata) => console.log('onExit', error, metadata)

  const onEvent = (eventName, metadata) => {
    console.log('onEvent', eventName, metadata)
  }

  const onSuccess = async (token, metadata) => {
    console.log('onSuccess', token, metadata)
  }
  const response = await plaidClient.itemPublicTokenExchange({ linkToken })

  const access_token = response.access_token

  const accounts_response = await plaidClient.accountsGet({ access_token })

  const accounts = accounts_response.accounts

  const now = moment()
  const today = now.format(`YYYY-MM-DD`)
  const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD')

  const response2 = await plaidClient.transactionsGet({
    access_token,
    start_date: thirtyDaysAgo,
    end_date: today
  })
  const transactions = response2.transactions
  console.log(
    `You have ${transactions.length} transactions form the last thirty days`
  )
  return (
    <div>
      <PlaidLink
        className="Custom Button"
        style={{ padding: '20px', fontSize: '16px', curor: 'pointer' }}
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
