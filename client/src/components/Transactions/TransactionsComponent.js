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
      <table>
        <tr>

            <th className="transaction-header date">Date</th>
            {allTransactions.map((transaction) => (
              <td key={transaction.transaction_id}>{transaction.date}</td>
            ))}
            <th className="transaction-header merchant">Merchant Name</th>
            {allTransactions.map((transaction) => (
              <td>
                {transaction.merchant_name
                  ? transaction.merchant_name
                  : 'Other'}
              </td>
            ))}
            <th className="transaction-header category">Category</th>
            {allTransactions.map((transaction) => (
              <td>{transaction.category[0]}</td>
            ))}
          <td className="description">
            <th className="transaction-header">Description</th>
            {allTransactions.map((transaction) => (
              <td>{transaction.name}</td>
            ))}
          <td className="amount">
            <th className="transaction-header amount">Amount</th>
            {allTransactions.map((transaction) => (
              <td>${transaction.amount}</td>
            ))}
        </tr>
      </table>
    </div>
  )
}

export default withRouter(TransactionsComponent)
