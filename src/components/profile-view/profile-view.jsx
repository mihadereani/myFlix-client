import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Figure,
} from 'react-bootstrap';

import './profile-view.scss';
import { Link } from 'react-router-dom';

export function ProfileView({ movies }) {
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMoviesId, setFavoriteMoviesId] = useState([]);

  const [values, setValues] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const favoriteMovies = favoriteMoviesId.map((movieId) =>
    movies.find((m) => m._id === movieId)
  );

  const currentUser = localStorage.getItem('user');
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

  const getUser = () => {
    axios
      .get(`https://myflixmiha.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMoviesId(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://myflixmiha.herokuapp.com/users/${currentUser}`,
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
          localStorage.setItem('user', response.data.Username);
          alert('Update successful!');
        })
        .catch((error) => {
          console.error(error);
          alert('Unable to update profile info.');
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (confirm('This will delete your profile and cannot be undone!')) {
      axios
        .delete(`https://myflixmiha.herokuapp.com/users/${currentUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          alert('your account has been deleted.');
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch((error) => {
          console.error(error);
          alert('Unable to delete profile info.');
        });
    }
  };

  useEffect(() => {
    getUser();
  });

  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Profile info</Card.Title>
              <Card.Text>
                Username: {user.Username} <br />
                Email: {user.Email}
              </Card.Text>
              <Button
                variant='outline-primary'
                type='submit'
                onClick={handleDelete}
              >
                Unregister profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Update profile</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  {values.usernameErr && <p>{values.usernameErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {values.passwordErr && <p>{values.passwordErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {values.emailErr && <p>{values.emailErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type='date'
                    name='birthday'
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
              </Form>
              <p></p>
              <Button variant='primary' type='submit' onClick={handleUpdate}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mt-5'>
        <Col>
          <Card.Title className='mb-2'>Favorite Movies</Card.Title>

          <Row>
            {favoriteMovies.map(({ ImagePath, Title, _id }) => {
              return (
                <Col className='fav-movie' xs={12} md={6} lg={3} key={_id}>
                  <Figure>
                    <Link to={`/movies/${_id}`}>
                      <Figure.Image variant='top' src={ImagePath} alt={Title} />
                      <Figure.Caption>{Title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <Button variant='secondary' type='submit'>
                    Remove from list
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
