import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Accordion,
  Button,
  Card,
  ListGroup,
  Tabs,
  Tab,
  Row,
} from "react-bootstrap";
import SesItem from "../components/sessionNotes/SesItem";
import DMItem from "../components/sessionNotes/DMItem";
import AddSesNote from "../components/sessionNotes/AddSesNote";
import AddDMNote from "../components/sessionNotes/AddDMNote";

export default function SessionNotes() {
  const [sessionNotes, setNotes] = useState(useLoaderData().sessionNotes);
  const [dmNotes, setDMNotes] = useState(useLoaderData().dmNotes);

  const [user, setUser] = useState(null);
  const [party, setParty] = useState([]);

  useEffect(() => {
    // generateParty();
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get("/api/auth");
    setUser(res.data.user);
  };

  const navigate = useNavigate();
  const handleNav = () => navigate("/login");

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

  return user ? (
    <Card>
      <Card.Title className="p-2">Session Notes: Campaign Name Here</Card.Title>
      <Card.Body>
        <Tabs defaultActiveKey="dmnotes" id="notes-tabs" className="mb-3">
          <Tab eventKey="dmnotes" title="Future Session Ideas">
            <Row className="p-2 bg-dark-subtle">
              <AddDMNote
                user={user}
                setUser={setUser}
                dmNotes={dmNotes}
                setDMNotes={setDMNotes}
              />
              <Card>{dmNotesList}</Card>
            </Row>
          </Tab>
          <Tab eventKey="sessionnotes" title="Session Notes">
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <AddSesNote setNotes={setNotes} sessionNotes={sessionNotes} />
              <div>{sessionNotesList}</div>
            </Accordion>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  ) : (
    <Card>
      <Card.Title>
        You are not currently logged in. Click the link below to login.
      </Card.Title>
      <Button onClick={handleNav}>Login</Button>
    </Card>
  );
}
