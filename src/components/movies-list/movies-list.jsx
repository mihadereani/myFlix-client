import React from 'react';
import { Col } from 'react-bootstrap';
import { NavBar } from '../navbar/navbar';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className='main-view' />;

  return (
    <>
      <NavBar />
      <p></p>
      <p></p>
      <p></p>
      <h1></h1>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={6} lg={4} xl={3} key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
