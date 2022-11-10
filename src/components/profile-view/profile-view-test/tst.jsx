import React from 'react';
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
import { Link } from 'react-router-dom';

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

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setBirthday = this.setBirthday.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .get(`https://myflixmiha.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  updateUser(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios
      .put(
        `https://myflixmiha.herokuapp.com/users/${user}`,
        {
          Username: Username,
          Password: Password,
          Email: Email,
          Birthday: Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert('Profile was successfully updated');
        localStorage.setItem('user', data.Username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUsername(event) {
    this.setState({ Username: event.target.Username });
  }

  setPassword(event) {
    this.setState({ Password: event.target.Password });
  }

  setEmail(event) {
    this.setEmail({ Email: event.target.Email });
  }

  setBirthday(event) {
    this.setBirthday({ Birthday: event.target.Birthday });
  }

  render() {
    const { movies } = this.props;
    const { Username, Birthday, FavouriteMovies, Password, Email } = this.state;

    const favouritesList = FavouriteMovies.map((movieId) =>
      movies.find((m) => m._id === movieId)
    );

    return (
      <Container>
        <Row>
          <Col>
            <p>{Username}</p>
            <p>{Email}</p>
            <p>{Password}</p>
            <p>{Birthday}</p>
            <p>{FavouriteMovies}</p>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col md={12}>
            <Form>
              <h4>Update your details</h4>
              <p></p>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={this.state.Username}
                  Username={this.state.Username}
                  onChange={this.setUsername}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='New Password'
                  Password={this.state.Password}
                  onChange={this.setPassword}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='email'
                  placeholder={this.state.Email}
                  Email={this.state.Email}
                  onChange={this.setEmail}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type='date'
                  placeholder={this.state.Birthday}
                  Birthday={this.state.Birthday}
                  onChange={this.setBirthday}
                />
              </Form.Group>

              <Button
                variant='primary'
                type='submit'
                value='Submit'
                onClick={this.updateUser}
              >
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          {favouritesList.map(
            (movie) => (
              console.log(movie),
              (
                <Col lg={3} md={6} key={movie._id}>
                  <Figure>
                    <Figure.Image
                      src={movie.ImagePath}
                      alt={movie.Title}
                    ></Figure.Image>
                    <Figure.Caption className='mb-3'>
                      {movie.Title}
                    </Figure.Caption>
                  </Figure>
                </Col>
              )
            )
          )}
        </Row>
      </Container>
    );
  }
}
