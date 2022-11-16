import React from 'react';
import axios from 'axios';
import { NavBar } from '../navbar/navbar';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://myflixmiha.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Row className='main-view justify-content-md-center'>
          <Route
            exact
            path='/'
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Container>
                  <NavBar />
                  <Row>
                    <Col>
                      <Link to={`users/${user}`}>{user}</Link>
                    </Col>
                  </Row>
                  <Row>
                    {movies.map((m) => (
                      <Col md={6} lg={4} xl={3} key={m._id}>
                        <MovieCard movie={m} />
                      </Col>
                    ))}
                  </Row>
                </Container>
              );
            }}
          />

          <Route
            exact
            path='/register'
            render={() => {
              if (user) return <Redirect to='/' />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            exact
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to='/' />;
              return (
                <Col>
                  <NavBar />
                  <ProfileView
                    user={user}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path='/movies/:movieId'
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <NavBar />
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path='/directors/:name'
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <NavBar />
                  <DirectorView
                    director={movies.find(
                      (m) => m.Director.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path='/genres/:name'
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <NavBar />
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path='/login'
            render={() => {
              return (
                localStorage.clear(),
                (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                )
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
