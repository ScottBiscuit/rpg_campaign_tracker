import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardGroup, Row } from "react-bootstrap";

export default function GoalsCard({ user }) {
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
            <Card.Subtitle>Goals/Missions</Card.Subtitle>
            <Card.Text>{PC.pcBackstory}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="">
          <Card.Body>
            <Card.Subtitle>Other stuff</Card.Subtitle>
            <Card.Text>More stuff</Card.Text>
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
