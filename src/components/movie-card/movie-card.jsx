import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className='movie-card' border='primary'>
        <Card.Img
          className='movie-card__img'
          variant='top'
          src={movie.ImagePath}
        />
        <Card.Body className='movie-card__content'>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description.substring(0, 80)} ...</Card.Text>
        </Card.Body>
        <Button
          onClick={() => {
            onMovieClick(movie);
          }}
          variant='link'
        >
          Open
        </Button>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
