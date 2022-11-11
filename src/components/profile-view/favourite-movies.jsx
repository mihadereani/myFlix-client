import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import './profile-view.scss';

function FavouriteMovies({ favouritesList }) {
  return (
    <Card className='mb-3 favMovies'>
      <Card.Body>
        <Row>
          <Col>
            <h4>Favourite Movies</h4>
          </Col>
        </Row>
        <Row>
          <p>pizda</p>
          {favouritesList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col key={_id}>
                <Figure>
                  <Figure.Image src={ImagePath} alt={Title} />
                  <Figure.Caption className='mb-3'>{Title}</Figure.Caption>
                </Figure>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavouriteMovies;
