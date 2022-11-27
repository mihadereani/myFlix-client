import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Figure } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Figure>
        <Figure.Image variant='top' src={movie.ImagePath} alt={movie.Title} />
        <Link to={`/movies/${movie._id}`}>
          <Figure.Caption className='link'>{movie.Title}</Figure.Caption>
        </Link>
      </Figure>
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
