import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className='space' />
          </Col>
        </Row>
        <Row>
          <Col className='genre-title'>{genre.Genre.Name}</Col>
        </Row>
        <Row>
          <Col>{genre.Genre.Description}</Col>
        </Row>
        <p></p>
        <Button
          onClick={() => {
            onBackClick();
          }}
          variant='primary'
        >
          Back
        </Button>
      </Container>
    );
  }
}
