import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../global'
import { withRouter } from 'react-router-dom'
import './goal.css'

function GoalsComponent(props) {
  const handleSubmit = async (e, id) => {
    const res = await axios.delete(`${BASE_URL}/goals/${id}`)
    props.history.push(`/saving-goal`)
  }

  return (
    <div>
      {props.goals.map((goal) => (
        <table className="goal-list">
          <th>{goal.goalTitle}</th>
          <td>Goal Total: {goal.goalTotal}</td>
          <td>Monthly saving goal: {goal.goalAllowance}</td>
          <button onClick={(e) => handleSubmit(e, goal._id)}>delete</button>
        </table>
      ))}
    </div>
  )
}

export default withRouter(GoalsComponent)
