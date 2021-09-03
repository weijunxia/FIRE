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
    <div className="transactions-container">
      <table>
        <tr>
          <td className="date">
            <p className="title">Date</p>
            {allTransactions.map((transaction) => (
              <p>{transaction.date}</p>
            ))}
          </td>
          <td className="merchant-name">
            <p className="title">Merchant Name</p>
            {allTransactions.map((transaction) => (
              <p>
                {transaction.merchant_name ? transaction.merchant_name : 'N/A'}
              </p>
            ))}
          </td>
          <td className="category">
            <p className="title">Category</p>
            {allTransactions.map((transaction) => (
              <p>{transaction.category[0]}</p>
            ))}
          </td>
          <td className="description">
            <p className="title">Description</p>
            {allTransactions.map((transaction) => (
              <p>{transaction.name}</p>
            ))}
          </td>
          <td className="amount">
            <p className="title">Amount</p>
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
