import React, { useState } from "react";
import { Card } from "react-bootstrap";

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
          href={`${pha.info};old=0;orb=1;cov=0;log=0;cad=0#orb`}
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