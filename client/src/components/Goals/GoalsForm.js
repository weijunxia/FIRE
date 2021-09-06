import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../global'
import './goalsForm.css'

export default function GoalsForm(props) {
  const [formData, setFormData] = useState({
    goalTitle: '',
    goalTotal: '',
    goalAllowance: ''
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  return (
    <div className="body">
      <h1>
        Welcome to fatFIRE (Financially Independent and Retire Early) with a fat
        stash. Enter the criteria below to plan for your future.
      </h1>
      <div className="formContainer">
        <form
          onSubmit={(e) => props.handleSubmit(e, formData)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h3>Enter Plan:</h3>
          <input
            type="text"
            name="goalTitle"
            value={formData.goalTitle}
            onChange={handleChange}
          ></input>
          <h3>Enter target:</h3>
          <input
            type="text"
            name="goalTotal"
            value={formData.goalTotal}
            onChange={handleChange}
          ></input>
          <h3>Enter monthly allowance :</h3>
          <input
            type="text"
            name="goalAllowance"
            value={formData.goalAllowance}
            onChange={handleChange}
          ></input>
          <h3>Note: Our Savings Model assumes a 6% YoY growth.</h3>
          <button
            style={{ background: 'darkBlue', color: 'white' }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
