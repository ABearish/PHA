import React, {useState, useEffect} from 'react';
import ListPha from './ListPha';
import {Card, Container, Row} from 'react-bootstrap';

const Pha = ({onUpdatePhaList, phaList, onUpdateTracker}) => {
  
  useEffect(() => {
    onUpdatePhaList()
  }, []);

  if (!phaList.length) {
  return (
    null
  )
  } else {
  return (
    <Container>
      <Row>
      {phaList.map((pha, i) => {
        return (
        < ListPha pha={pha} key={i} onUpdateTracker={onUpdateTracker}/>
        )
      })}
      </Row>
    </Container>
  )
  }
}


export default Pha;