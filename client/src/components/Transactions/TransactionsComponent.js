import React, { useState, useEffect, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../global'
import './transactions.css'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

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
    <div
      className="transactions-container"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <table>
        <tr>
          <td className="date">
            <td className="transaction-header">Date</td>
            {allTransactions.map((transaction) => (
              <td key={transaction.transaction_id}>{transaction.date}</td>
            ))}
          </td>
          <td className="merchant-name">
            <td className="transaction-header">Merchant Name</td>
            {allTransactions.map((transaction) => (
              <td>
                {transaction.merchant_name
                  ? transaction.merchant_name
                  : 'Other'}
              </td>
            ))}
          </td>
          <td className="category">
            <td className="transaction-header">Category</td>
            {allTransactions.map((transaction) => (
              <td>{transaction.category[0]}</td>
            ))}
          </td>
          <td className="description">
            <td className="transaction-header">Description</td>
            {allTransactions.map((transaction) => (
              <td>{transaction.name}</td>
            ))}
          </td>
          <td className="amount">
            <td className="transaction-header">Amount</td>
            {allTransactions.map((transaction) => (
              <td>${transaction.amount}</td>
            ))}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default withRouter(TransactionsComponent)
