import React, { useState } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Container,
  Figure,
  Card,
  Form,
  Button,
} from 'react-bootstrap';

export function ProfileView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [values, setValues] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username is required' });
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: 'Username must be 5 characters long',
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: 'Password must be 6 characters long',
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email Required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }

    return isReq;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq && token !== null && user !== null) {
      axios
        .put(
          `https://myflixmiha.herokuapp.com/users/${user}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          localStorage.setItem('user', data.Username);
          alert('Update sucesful!');
        })
        .catch((e) => {
          console.log('error updating the user');
        });
    }
  };

  return (
    <Container>
      <Row className='mt-5'>
        <Col md={12}>
          <Form>
            <h3>Update profile</h3>
            <p></p>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {values.usernameErr && <p>{values.usernameErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {values.passwordErr && <p>{values.passwordErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {values.emailErr && <p>{values.emailErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type='date'
                name='birthday'
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' onClick={handleUpdate}>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
