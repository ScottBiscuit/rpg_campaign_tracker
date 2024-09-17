import React, { useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import EditDMNote from "./EditDMNote";
import DelDMNote from "./DelDMNote";

export default function DMItem({ dmNote, setDMNotes, dmNotes }) {
  const { dmNoteId, dmNoteIdeas } = dmNote;

  return (
    <>
      <ListGroup.Item key={dmNoteId}>
        <Row>
          <Col>
            <DelDMNote
              dmNote={dmNote}
              setDMNotes={setDMNotes}
              dmNotes={dmNotes}
            />
            <EditDMNote
              dmNote={dmNote}
              setDMNotes={setDMNotes}
              dmNotes={dmNotes}
            />
          </Col>
          <Col xs={{ span: 10 }}>{dmNoteIdeas}</Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}
