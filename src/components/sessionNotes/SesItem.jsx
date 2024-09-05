import React, { useState } from "react";
import { Accordion, Button, Form, Row } from "react-bootstrap";
import EditSesNote from "./EditSesNote";
import DelSesNote from "./DelSesNote";

export default function SesItem({ sesNote, setNotes, sessionNotes }) {
  const { sesId, sesNumber, sesDate, sesPartyLvl, sesNotes } = sesNote;

  return (
    <Accordion.Item eventKey={sesId} key={sesId}>
      <Accordion.Header>
        Session #{sesNumber} | {sesDate} | Lvl: {sesPartyLvl}{" "}
      </Accordion.Header>
      <Accordion.Body>
        <Row type="text" className="mb-3">
          {sesNotes}
        </Row>
        <span>
          <DelSesNote
            sesNote={sesNote}
            setNotes={setNotes}
            sessionNotes={sessionNotes}
          />
          <EditSesNote
            sesNote={sesNote}
            setNotes={setNotes}
            sessionNotes={sessionNotes}
          />
        </span>
      </Accordion.Body>
    </Accordion.Item>
  );
}
