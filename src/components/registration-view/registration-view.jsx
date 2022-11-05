import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '.registartion-view.scss';

export function RegistrationView(props) {
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

  const validate = () => {
    let isReq = true;
    if (name) {
      setValues({ ...values, nameErr: 'Name is required' });
      isReq = false;
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://myflixmiha.herokuapp.com/users', {
          Name: name,
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration succesful, please login!');
          window.open('/', '_self');
        })
        .catch((response) => {
          console.error(response);
          alert('unable to register');
        });
    }
  };

  return (
    <form>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        E-mail:
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Date of birth:
        <input
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>
      <button type='submit' onClick={handleSubmit}>
        Register
      </button>
    </form>
  );
}
