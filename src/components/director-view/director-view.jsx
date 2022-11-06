import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>{director.Director.Name}</Col>
        </Row>
        <Row>
          <Col>{director.Director.Bio}</Col>
        </Row>
        <Row>
          <Col>{director.Director.Movies}</Col>
        </Row>
        <Row>
          <Col>{director.Director.Birth}</Col>
        </Row>
        <Row>
          <Col>{director.Director.Death}</Col>
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
