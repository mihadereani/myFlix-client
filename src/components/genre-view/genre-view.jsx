import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>{genre.Genre.Name}</Col>
        </Row>
        <Row>
          <Col>{genre.Genre.Description}</Col>
        </Row>
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
