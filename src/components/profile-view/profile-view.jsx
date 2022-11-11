import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import './profile-view.scss';

export function ProfileView({ movies }) {
  const [user, setUser] = useState();
  const [favoriteMoviesId, setFavoriteMoviesId] = useState([]);

  const favoriteMovies = favoriteMoviesId.map((movieId) =>
    movies.find((m) => m._id === movieId)
  );

  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    getUser();
  });

  // console.log(user);
  // console.log(movies);
  // console.log(favoriteMovies);

  // debugger;

  return (
    <Container>
      <Row>
        <Col>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>

      <div>
        {favoriteMovies.map((m) => {
          return <p>{m.Title}</p>;
        })}
      </div>
      <Row></Row>
    </Container>
  );
}
