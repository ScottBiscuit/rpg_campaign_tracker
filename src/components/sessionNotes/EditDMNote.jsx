import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

export default function EditDMNote({ setDMNotes, dmNotes, dmNote }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    dmNoteIdeas: dmNote.dmNoteIdeas,
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .put(`/api/dmNotes/${dmNote.dmNoteId}`, {
        dmNoteId: formState.dmNoteId,
        dmNoteIdeas: formState.dmNoteIdeas,
      })
      .then((res) => {
        const editedResData = dmNote.dmNoteId;

        function findEdit(dmNotes, editedResData) {
          for (let i = 0; i < dmNotes.length; i++) {
            if (dmNotes[i].dmNoteId === editedResData) {
              console.log(i);
              return i;
            }
          }
        }
        dmNotes.splice(findEdit(dmNotes, editedResData), 1, res.data);

        setDMNotes([...dmNotes]);

        handleClose();
      });
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <BsFillPencilFill />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Future Session Idea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Future Session Ideas</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="dmNoteIdeas"
                onChange={handleChange}
                value={formState.dmNoteIdeas}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit" onClick={handleSubmit}>
            Edit Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
