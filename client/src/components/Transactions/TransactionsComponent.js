import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../global'
import PlaidLinkComponent from '../PlaidComponents/PlaidLinkComp'
import './transactions.css'

function TransactionsComponent(props) {
  const [allTransactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions(props.match.params.account_id)
  }, [])

  const getTransactions = async (accountId) => {
    const res = await axios.get(`${BASE_URL}/transactions/${accountId}`)
    console.log('res is:', res.data.transactions)
    setTransactions(res.data.transactions)
  }

  return (
    <div>
      <table>
        <tr>
          <td>
            Date
            {allTransactions.map((transaction) => (
              <p>{transaction.date}</p>
            ))}
          </td>
          <td>
            Merchant Name
            {allTransactions.map((transaction) => (
              <p>{transaction.merchant_name}</p>
            ))}
          </td>
          <td>
            Category
            {allTransactions.map((transaction) => (
              <p>{transaction.category[0]}</p>
            ))}
          </td>
          <td>
            Description
            {allTransactions.map((transaction) => (
              <p>{transaction.name}</p>
            ))}
          </td>
          <td>
            Amount
            {allTransactions.map((transaction) => (
              <p>{transaction.amount}</p>
            ))}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default withRouter(TransactionsComponent)
