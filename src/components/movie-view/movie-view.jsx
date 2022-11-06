import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Row className='movie-view'>
        <Col>
          <Row className='movie-poster'>
            <img src={movie.ImagePath} />
          </Row>
          <Row className='movie-title'>
            <Col>
              <span className='label'>Title: </span>
              <span className='value'>{movie.Title}</span>
            </Col>
          </Row>
          <Row className='paragraph'>
            <Col>
              <span className='label'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </Col>
          </Row>
          <Row className='paragraph'>
            <Col>
              <span className='label'>Genre: </span>
              <span className='value'>{movie.Genre.Name}</span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant='link'>Genre</Button>
              </Link>
            </Col>
          </Row>
          <Row className='paragraph'>
            <Col>
              <span className='label'>Genre description: </span>
              <span className='value'>{movie.Genre.Description}</span>
            </Col>
          </Row>
          <Row className='paragraph'>
            <Col>
              <span className='label'>Director: </span>
              <span className='value'>{movie.Director.Name}</span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant='link'>Director</Button>
              </Link>
            </Col>
          </Row>
          <Row className='director-bio'>
            <Col>
              <span className='label'>Direcor's bio: </span>
              <span className='value'>{movie.Director.Bio}</span>
            </Col>
          </Row>
          <Button
            className='button'
            onClick={() => {
              onBackClick();
            }}
            variant='primary'
          >
            Back
          </Button>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Movies: PropTypes.array.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Actors: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
