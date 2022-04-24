import React, { useState } from "react";
import { Card } from "react-bootstrap";
const link = `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=`;
const CustomCards = ({ pha, onUpdateTracker }) => {
  const [added, toggleAdd] = useState(false);
  const displayAddedLink = (added) => {
    if (!added)
      return (
        <Card.Link
          href=""
          onClick={(e) => {
            e.preventDefault();
            onUpdateTracker(pha);
            toggleAdd(!added)
          }}
        >
          Add To Tracker
        </Card.Link>
      );
    else
      return (
        <Card.Link
          href=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
        </Card.Link>
      );
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{pha.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {pha.date.toString().slice(0, 10)}
        </Card.Subtitle>
        <Card.Body>
          <li>
            Diameter(Ft) {pha.est_diameter_min} - {pha.est_diameter_max}
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
        {displayAddedLink(added)}
      </Card.Body>
    </Card>
  );
};

export default CustomCards;