import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Accordion, Card, ListGroup } from "react-bootstrap";
import SesItem from "../components/sessionNotes/SesItem";
import DMItem from "../components/sessionNotes/DMItem";
import AddSesNote from "../components/sessionNotes/AddSesNote";
import AddDMNote from "../components/sessionNotes/AddDMNote";

export default function SessionNotes() {
  const [sessionNotes, setNotes] = useState(useLoaderData().sessionNotes);
  const [dmNotes, setDMNotes] = useState(useLoaderData().dmNotes);

  const sessionNotesList = sessionNotes.map((sesNote) => (
    <SesItem
      key={sesNote.sesId}
      sesNote={sesNote}
      setNotes={setNotes}
      sessionNotes={sessionNotes}
    />
  ));
  const dmNotesList = dmNotes.map((dmNote) => (
    <DMItem
      key={dmNote.sesId}
      dmNote={dmNote}
      setDMNotes={setDMNotes}
      dmNotes={dmNotes}
    />
  ));

  return (
    <Card>
      <Card.Title className="p-2">Session Notes: Campaign Name Here</Card.Title>
      <Card.Body>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0" className="mb-3 bg-dark-subtle" >
          <Accordion.Header className="mb-3">
            Future Session Ideas
          </Accordion.Header>
          <Accordion.Body>
            <AddDMNote dmNotes={dmNotes} setDMNotes={setDMNotes} />
            <ListGroup className="mb-3">{dmNotesList}</ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <AddSesNote setNotes={setNotes} sessionNotes={sessionNotes} />
        <div>{sessionNotesList}</div>
      </Accordion>
      </Card.Body>
    </Card>
  );
}
