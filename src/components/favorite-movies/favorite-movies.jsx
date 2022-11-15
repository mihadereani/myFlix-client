import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Button, Card, Row, Col, Figure } from 'react-bootstrap';

export function FavoriteMovies({ movies, user, favoriteMovies }) {
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  return (
    <Row className='mt-5'>
      <Col>
        <Card.Title className='mb-2'>Favorite Movies</Card.Title>
        <Row>
          {favoriteMovies?.map((movie) => {
            return (
              <Col className='fav-movie' xs={12} md={6} lg={3} key={movie?._id}>
                <Figure>
                  <Link to={`/movies/${movie?._id}`}>
                    <Figure.Image
                      variant='top'
                      src={movie?.ImagePath}
                      alt={movie?.Title}
                    />
                    <Figure.Caption>{movie?.Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button
                  variant='secondary'
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .delete(
                        `https://myflixmiha.herokuapp.com/users/${currentUser}/movies/${movie?._id}`,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      )
                      .then((response) => {
                        alert('Favorite movie has been removed.');
                      })
                      .catch((error) => {
                        console.error(error);
                        alert('Unable to remove favorite movie.');
                      });
                  }}
                >
                  Remove from list
                </Button>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
