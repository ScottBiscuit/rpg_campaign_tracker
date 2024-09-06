import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardGroup,
  Row,
} from "react-bootstrap";

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
    <Card key={PC.pcID} className="">
          <Card.Title>{PC.pcName}</Card.Title>
    <CardGroup >
      <Card className="mb-2">
        <Card.Body>
          <Card.Subtitle>Extra Info</Card.Subtitle>
            <Card.Text>{PC.Extras}</Card.Text>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
      <Card className="mb-2">
        <Card.Body>
          <Card.Subtitle>Allies/Enemies</Card.Subtitle>
          <Card.Text>{PC.pcAllies}</Card.Text>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </CardGroup>
    </Card>
  ));

  return (
    party &&
    user && <Row className="p-2 bg-secondary-subtle">{playerRows}</Row>
  );
}
