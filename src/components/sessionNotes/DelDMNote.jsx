import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function DelDMNote({ setDMNotes, dmNotes, dmNote }) {
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
      .delete(`/api/dmNotes/${dmNote.dmNoteId}/delete`, {
        dmNoteId: formState.dmNoteId,
      })
      .then((res) => {
        const deletedResData = dmNote.dmNoteId;

        function findDeleted(dmNotes, deletedResData) {
          for (let i = 0; i < dmNotes.length; i++) {
            if (dmNotes[i].dmNoteId === deletedResData) {
              console.log(i);
              return i;
            }
          }
        }
        dmNotes.splice(findDeleted(dmNotes, deletedResData), 1);

        setDMNotes([...dmNotes]);

        handleClose();
      });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        <BsFillTrashFill />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Future Session Idea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Future Session Idea?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" type="submit" onClick={handleSubmit}>
            Delete Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
