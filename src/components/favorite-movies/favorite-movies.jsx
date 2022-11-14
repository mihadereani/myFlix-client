import React from 'react';
import { Link } from 'react-router-dom';
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

export function FavoriteMovies({ favoriteMovies }) {
  console.log(favoriteMovies);
  return (
    <Row className='mt-5'>
      <Col>
        <Card.Title className='mb-2'>Favorite Movies</Card.Title>

        <Row>
          {favoriteMovies.map((m) => {
            return (
              <Col className='fav-movie' xs={12} md={6} lg={3} key={m._id}>
                <Figure>
                  <Link to={`/movies/${m._id}`}>
                    <Figure.Image
                      variant='top'
                      src={m.ImagePath}
                      alt={m.Title}
                    />
                    <Figure.Caption>{m.Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button
                  variant='secondary'
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .delete(
                        `https://myflixmiha.herokuapp.com/users/${currentUser}/movies/${m._id}`,
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
