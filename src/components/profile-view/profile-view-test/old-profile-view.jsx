import React from 'react';
import axios from 'axios';

import {
  Button,
  Form,
  Card,
  Row,
  Col,
  Container,
  Figure,
} from 'react-bootstrap';

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
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .get(`https://myflixmiha.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          profile: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateUser = (e) => {
    e.preventDeafult();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(
        `https://myflixmiha.herokuapp.com/users/${user}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert('Profile was successfully updated');
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
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
      const user = localStorage.getItem(user);
      const token = localStorage.getItem(token);
      axios
        .delete(`https://myflixmiha.herokuapp.com/users/${user}`, {
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
    const user = localStorage.getItem(user);
    const token = localStorage.getItem(token);
    axios
      .delete(
        `https://myflixmiha.herokuapp.com/users/${user}/movies/${movieId}`,
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
      username: value,
    });
  }

  setPassword(value) {
    this.setState({
      password: value,
    });
  }

  setEmail(value) {
    this.setState({
      email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
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

                <Button
                  variant='primary'
                  type='submit'
                  onClick={this.updateUser}
                >
                  Update
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>My Favourite movies</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Figure>
              <Figure.Image src={movie.ImagePath} />
              <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>
      </Container>
    );
  }
}
