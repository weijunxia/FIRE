import React, { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import './goals.css'

export default function Goals() {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  return (
    <div>
      <h1>
        Welcome to fatFIRE (Financially Independent and Retire Early) with a fat
        stash. Enter the criteria below to plan for your future.
      </h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>
              Title of your saving goal eg: retirement, mortgage, downpayment,
              college etc
            </Form.Label>
            <Form.Control required type="text" placeholder="Retirement" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Total saving goal:</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                <Form.Control required type="text" placeholder="100,000" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>How much can you save every month?</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="1,000"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please add how much you can save!
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row>
            <Form.Text>
              <h3>Note: Our projections are based on a 6% YoY return.</h3>
            </Form.Text>
          </Row>
          <Button type="submit" className="submitButton">
            Submit form
          </Button>
        </Row>
      </Form>
    </div>
  )
}
