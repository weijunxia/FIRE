import React from 'react'

export default function GoalsComponent(props) {
  return (
    <div>
      {props.goals.map((goal) => (
        <div>
          <p>{goal.goalTitle}</p>
          <p>{goal.goalTotal}</p>
          <p>{goal.goalAllowance}</p>
        </div>
      ))}
    </div>
  )
}
