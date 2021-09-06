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
    <div className="transactions-container">
      <table style={{ width: '100%' }}>
        <tr>
          <th className="transaction-header">Date</th>
          {allTransactions.map((transaction) => (
            <td key={transaction.transaction_id} className="date">
              {transaction.date}
            </td>
          ))}
        </tr>
        <tr>
          <th className="transaction-header">Merchant Name</th>
          {allTransactions.map((transaction) => (
            <td className="merchant-name">
              {transaction.merchant_name ? transaction.merchant_name : 'N/A'}
            </td>
          ))}
        </tr>
        <tr>
          <th className="transaction-header">Category</th>
          {allTransactions.map((transaction) => (
            <td className="category">{transaction.category[0]}</td>
          ))}
        </tr>
        <tr>
          <th className="transaction-header">Description</th>
          {allTransactions.map((transaction) => (
            <td className="description">{transaction.name}</td>
          ))}
        </tr>
        <tr>
          <th className="transaction-header">Amount</th>
          {allTransactions.map((transaction) => (
            <td className="amount">${transaction.amount}</td>
          ))}
        </tr>
      </table>
    </div>
  )
}

export default withRouter(TransactionsComponent)
