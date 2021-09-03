import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../global'
import { withRouter } from 'react-router-dom'

function GoalsComponent(props) {
  const handleSubmit = async (e, id) => {
    const res = await axios.delete(`${BASE_URL}/goals/${id}`)
    props.history.push(`/saving-goal`)
  }

  return (
    <div>
      {props.goals.map((goal) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '10px'
          }}
        >
          <table>
            <p>{goal.goalTitle}</p>
            <p>Goal Total: {goal.goalTotal}</p>
            <p>Monthly saving goal: {goal.goalAllowance}</p>
            <button onClick={(e) => handleSubmit(e, goal._id)}>delete</button>
          </table>
        </div>
      ))}
    </div>
  )
}

export default withRouter(GoalsComponent)
