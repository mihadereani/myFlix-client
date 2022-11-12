import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

export function updateUser({ handleSubmit, handleUpdate }) {
  return (
    <Row>
      <Col>
        <p>pizda</p>
        <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
          <h2>Want to change some info</h2>
          <label>Username:</label>
          <input
            type='text'
            name='Username'
            deafultValue={user.Username}
            onChange={(e) => handleUpdate(e)}
          />
          <label>Password:</label>
          <input
            type='password'
            name='password'
            deafultValue={user.Password}
            onChange={(e) => handleUpdate(e)}
          />
          <label>Email address:</label>
          <input
            type='email'
            name='email'
            deafultValue={user.Email}
            onChange={(e) => handleUpdate(e.target.value)}
          />
          <button variant='primary' type='submit'>
            Update
          </button>
        </form>
      </Col>
    </Row>
  );
}
