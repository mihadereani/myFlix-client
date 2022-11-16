import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className='space' />
          </Col>
        </Row>
        <Row>
          <Col className='director-name'>{director.Director.Name}</Col>
        </Row>
        <p></p>
        <Row>
          <Col>
            <span className='label'>Bio: </span> {director.Director.Bio}
          </Col>
        </Row>
        <p></p>
        <Row>
          <Col>
            <span className='label'>Bio: </span>
            {director.Director.Movies}
          </Col>
        </Row>
        <p></p>
        <Row>
          <Col>
            <span className='label'>Birth: </span>
            {director.Director.Birth}
          </Col>
        </Row>
        <Row>
          <Col>
            <span className='label'>Death: </span>
            {director.Director.Death}
          </Col>
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
