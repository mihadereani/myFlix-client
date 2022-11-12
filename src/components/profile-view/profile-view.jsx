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

  const updateUser = (e) => {
    e.preventDefault();
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
      .then((res) => {
        localStorage.setItem('user', data.Username);
        alert('Update successful!');
      })
      .catch((error) => {
        console.error(error);
        alert('Unable to update profile info.');
      });
  };

  const handleUpdate = (e) => {};

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <Container>
      <Row>
        <Col>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>

      <div>
        {favoriteMovies.map((m) => {
          return (
            <div>
              <p>{m.Title}</p>
              <img src={m.ImagePath} alt='Movie photo' />
            </div>
          );
        })}
      </div>
      <Row></Row>
    </Container>
  );
}
