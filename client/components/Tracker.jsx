import React, {useState, useEffect} from 'react';
import ListTracker from './ListTracker';
import {Container, Row, Alert} from 'react-bootstrap';
const Tracker = ({tracking, onRemoveTrack}) => {
  if (!tracking.length) {
  return (
    null
  )
  } else {
  return (
    <React.Fragment>
    <Alert variant={'info'}>
      Your Tracker
    </Alert>
    <Container>
      <Row>
      {tracking.map((track, i) => {
        return (
        < ListTracker track={track} key={i} onRemoveTrack={onRemoveTrack}/>
        )
      })}
      </Row>
    </Container>
    </ React.Fragment>
  )
  }
}


export default Tracker;