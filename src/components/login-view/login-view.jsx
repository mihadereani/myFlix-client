import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <Row>
      <Col></Col>
      <Col md={8}>
        <Card className='login-view' border='primary'>
          <Card.Body>
            <Col className='login-title'>Login to myFlix</Col>
          </Card.Body>
          <Card.Body>
            <Form className='login-form'>
              <Form.Group controlId='formUsername'>
                <Form.Label className='login-view__label'>Username:</Form.Label>
                <Form.Control
                  type='text'
                  value={username}
                  placeholder='Enter username'
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Label className='login-view__label'>Password:</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength='8'
                />
              </Form.Group>
              <Button
                className='login-view__button'
                variant='primary'
                type='submit'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
          <Card.Body>
            <Col className='register-text'>Don't have account?</Col>
            <Button
              className='login-view__button'
              variant='outline-primary'
              type='submit'
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>
  );
}
