import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardGroup, Row } from "react-bootstrap";
import DeletePCModal from "./DeletePCModal";
import EditPCModal from "./EditPCModal";

export default function GoalsCard({ user, party, setParty, PC }) {
  // const [party, setParty] = useState([]);

  // useEffect(() => {
  //   generateParty();
  // }, []);

  // const generateParty = async () => {
  //   const res = await axios.get(`/api/party/`);

  //   setParty(res.data);
  // };

  // const playerRows = party.map((PC) => (

  return (
    <Row className="p-2 bg-dark-subtle">
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
        <Card.Footer>
          <DeletePCModal
            user={user}
            party={party}
            setParty={setParty}
            PC={PC}
          />
          <EditPCModal user={user} party={party} setParty={setParty} PC={PC} />
        </Card.Footer>
      </Card>
    </Row>
  );
}
