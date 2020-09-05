import React from "react";
import { Card } from "react-bootstrap";

const ListTracking = ({ track, onRemoveTrack }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{track.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {track.date.toString().slice(0, 10)}
        </Card.Subtitle>
        <Card.Body>
            <li>
              Diameter(Ft): {track.est_diameter_min}- {track.est_diameter_max}{" "}
            </li>
            <li>Velocity(Mph): {track.velocity}</li>
            <li>Miss Distance(LD): {track.miss_distance}</li>
        </Card.Body>
        <Card.Link
          href={`${track.info};old=0;orb=1;cov=0;log=0;cad=0#orb`}
          target={"blank"}
        >
          Orbit Diagram
        </Card.Link>
        <Card.Link
          href=""
          onClick={(e) => {
            e.preventDefault();
            onRemoveTrack(track.id);
          }}
        >
          Remove
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ListTracking;
