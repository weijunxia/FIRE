import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../global'
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
    <div className="transactions-container">
      <table>
        <tr>
          <td className="date">
            <p className="transaction-header">Date</p>
            {allTransactions.map((transaction) => (
              <p key={transaction.transaction_id}>{transaction.date}</p>
            ))}
          </td>
          <td className="merchant-name">
            <p className="transaction-header">Merchant Name</p>
            {allTransactions.map((transaction) => (
              <p>
                {transaction.merchant_name ? transaction.merchant_name : 'N/A'}
              </p>
            ))}
          </td>
          <td className="category">
            <p className="transaction-header">Category</p>
            {allTransactions.map((transaction) => (
              <p>{transaction.category[0]}</p>
            ))}
          </td>
          <td className="description">
            <p className="transaction-header">Description</p>
            {allTransactions.map((transaction) => (
              <p>{transaction.name}</p>
            ))}
          </td>
          <td className="amount">
            <p className="transaction-header">Amount</p>
            {allTransactions.map((transaction) => (
              <p>${transaction.amount}</p>
            ))}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default withRouter(TransactionsComponent)
