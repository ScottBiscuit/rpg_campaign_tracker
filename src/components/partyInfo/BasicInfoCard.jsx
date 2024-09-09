import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardGroup, ListGroup, Row } from "react-bootstrap";

export default function MyInfoCard({ user }) {
  const [party, setParty] = useState([]);

  useEffect(() => {
    generateParty();
  }, []);

  const generateParty = async () => {
    const res = await axios.get(`/api/party/`);

    setParty(res.data);
  };

  const playerRows = party.map((PC) => (
    <Card key={PC.pcID} className="mb-2">
      <Card.Title className="m-1">{PC.pcName}</Card.Title>
      <CardGroup>
        <Card className="">
          <Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Race: {PC.pcRace}</ListGroup.Item>
              <ListGroup.Item>Class: {PC.pcClass}</ListGroup.Item>
              <ListGroup.Item>Subclass: {PC.pcSubclass}</ListGroup.Item>
              <ListGroup.Item>Level: {PC.pcLevel}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="">
          <Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Armor Class: {PC.pcArmor}</ListGroup.Item>
              <ListGroup.Item>Max Hit Points: {PC.pcHealth}</ListGroup.Item>
              <ListGroup.Item>Movement: {PC.pcMovement}</ListGroup.Item>
              <ListGroup.Item>Vision: {PC.pcVision}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="">
          <Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Passive Perception: {PC.pcPassPer}
              </ListGroup.Item>
              <ListGroup.Item>
                Passive Investigation: {PC.pcPassInv}
              </ListGroup.Item>
              <ListGroup.Item>Passive Insight: {PC.pcPassIns}</ListGroup.Item>
              <ListGroup.Item>Languages: {PC.pcLanguages}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </CardGroup>
      <Card.Footer>Del - Edit</Card.Footer>
    </Card>
  ));

  return (
    party && user && <Row className="p-2 bg-secondary-subtle">{playerRows}</Row>
  );
}
