import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import FavouriteMovies from './favourite-movies';

import './profile-view.scss';

export function ProfileView(movies) {
  const [user, setUser] = useState();
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios
      .get(`https://myflixmiha.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavouriteMovies(
          movies.filter((movie) => {
            response.data.FavouriteMovies.includes(movie._id);
          })
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);
}
