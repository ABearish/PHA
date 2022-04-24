import React from "react";
import { Card } from "react-bootstrap";
const link = `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=`;
const ListPha = ({ pha, onUpdateTracker }) => {
  console.log(pha);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{pha.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {pha.date.toString().slice(0, 10)}
        </Card.Subtitle>
        <Card.Body>
            <li>
              Diameter(Ft): {pha.est_diameter_min}- {pha.est_diameter_max}
            </li>
            <li>Velocity(Mph): {pha.velocity}</li>
            <li>Miss Distance(LD): {pha.miss_distance}</li>          
        </Card.Body>
        <Card.Link
          href={link + pha.id + `&view=V`}
          target={"blank"}
        >
          Orbit Diagram
        </Card.Link>
        <Card.Link
          href=""
          onClick={(e) => {
            e.preventDefault();
            onUpdateTracker(pha);
          }}
        >
          Add To Tracker
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ListPha;
