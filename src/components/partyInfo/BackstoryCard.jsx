import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardGroup, ListGroup, Row } from "react-bootstrap";

export default function BackstoryCard({ user }) {
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
            <Card.Subtitle>Backstory</Card.Subtitle>
            <Card.Text>
              {PC.pcBackstory} Player written backstory here
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="">
          <Card.Body>
            <Card.Subtitle>Background: {PC.pcBGName}</Card.Subtitle>
            <Card.Text>{PC.pcBGDesc} Background description here</Card.Text>
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
