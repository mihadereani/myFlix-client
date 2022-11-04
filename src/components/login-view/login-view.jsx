import React, { useState } from 'react';
import axios from 'axios';

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
    axios
      .post('https://myflixmiha.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('no such user');
      });
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
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Label className='login-view__label'>Password:</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
