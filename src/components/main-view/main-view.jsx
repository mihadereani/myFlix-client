import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { NavBar } from '../navbar/navbar';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
<<<<<<< HEAD
<<<<<<< HEAD
      movies: [
        {
          _id: 1,
          Title: 'Inception',
          Description: 'desc1...',
          ImagePath: '...',
        },
        {
          _id: 2,
          Title: 'The Shawshank Redemption',
          Description: 'desc2...',
          ImagePath: '...',
        },
        {
          _id: 3,
          Title: 'Gladiator',
          Description: 'desc3...',
          ImagePath: '...',
        },
      ],
      selectedMovie: null,
=======
      movies: [],
>>>>>>> ad5aa26 (create Routes)
=======
>>>>>>> c77bef6 (redux)
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
        this.props.setMovies(response.data);
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
    const { movies } = this.props;
    const { user } = this.state;

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
              return <MoviesList movies={movies} />;
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

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
