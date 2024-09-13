import { Card, CardGroup, ListGroup, Row } from "react-bootstrap";
import DeletePCModal from "./DeletePCModal";
import EditPCModal from "./EditPCModal";

export default function BasicInfoCard({ user, party, setParty, PC }) {
  return (
    <Row className="p-2 bg-dark-subtle" key={PC.pcID}>
      <Card className="">
        <Card.Title className="m-1">Basic Info - {PC.pcName}</Card.Title>
        <CardGroup>
          <Card className="">
            <Card.Img src={PC.pcImg} />
          </Card>
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
        <Card.Footer>
          {/* <DeletePCModal
            user={user}
            party={party}
            setParty={setParty}
            PC={PC}
          />
          <EditPCModal user={user} party={party} setParty={setParty} PC={PC} /> */}
        </Card.Footer>
      </Card>
    </Row>
  );
}
