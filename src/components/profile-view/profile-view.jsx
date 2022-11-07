import React from 'react';
import axios from 'axios';

import { Button, Form, Card } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavouriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .get(`https://myflixmiha.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateUser = (e) => {
    e.preventDeafult();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(
        `https://myflixmiha.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert('Profile was successfully updated');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', data.Username);

        window.location.pathname = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteUser = (e) => {
    const confirmDelete = window.confirm('Confirm to remove');

    if (confirmDelete) {
      const username = localStorage.getItem(user);
      const token = localStorage.getItem(token);
      axios
        .delete(`https://myflixmiha.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('Profile successfully deleted');
          window.location.pathname = '/';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  removeFavoriteMovie = (e) => {
    const username = localStorage.getItem(user);
    const token = localStorage.getItem(token);
    axios
      .delete(
        `https://myflixmiha.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        console.log(response);
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { user } = this.state;

    return (
      <Card>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              onChange={(e) => this.setUsername(e.target.value)}
              required
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={(e) => this.setPassword(e.target.value)}
              required
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={(e) => this.setEmail(e.target.value)}
              required
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter birthday'
              onChange={(e) => this.setBirthday(e.target.value)}
              required
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Card>
    );
  }
}
