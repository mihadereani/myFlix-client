import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
          <Row className='movie-description'>
            <Col>
              <span className='label'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </Col>
          </Row>
          <Row className='movie-genre__name'>
            <Col>
              <span className='label'>Genre name: </span>
              <span className='value'>{movie.Genre.Name}</span>
            </Col>
          </Row>
          <Row className='movie-genre__description'>
            <Col>
              <span className='label'>Genre description: </span>
              <span className='value'>{movie.Genre.Description}</span>
            </Col>
          </Row>
          <Row className='directo-genre__name'>
            <Col>
              <span className='label'>Director's name: </span>
              <span className='value'>{movie.Director.Name}</span>
            </Col>
          </Row>
          <Row className='directo-genre__bio'>
            <Col>
              <span className='label'>Direcor's bio: </span>
              <span className='value'>{movie.Director.Bio}</span>
            </Col>
          </Row>

          <button
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </button>
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
