import { useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";

export default function EditSesNote({ setNotes, sessionNotes, sesNote }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    sesNumber: sesNote.sesNumber,
    sesDate: sesNote.sesDate,
    sesPartyLvl: sesNote.sesPartyLvl,
    sesNotes: sesNote.sesNotes,
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.sesNumber &&
      formState.sesDate &&
      formState.sesPartyLvl &&
      formState.sesNotes
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    axios
      .put(`/api/sessionNotes/${sesNote.sesId}`, {
        sesId: formState.sesId,
        sesNumber: formState.sesNumber,
        sesDate: formState.sesDate,
        sesPartyLvl: formState.sesPartyLvl,
        sesNotes: formState.sesNotes,
      })
      .then((res) => {
        const editedResData = sesNote.sesId;

        function findEdit(sessionNotes, editedResData) {
          for (let i = 0; i < sessionNotes.length; i++) {
            if (sessionNotes[i].sesId === editedResData) {
              console.log(i);
              return i;
            }
          }
        }
        sessionNotes.splice(findEdit(sessionNotes, editedResData), 1, res.data);

        setNotes([...sessionNotes]);

        handleClose();
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <BsFillPencilFill />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Session Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Session Number</Form.Label>
              <Form.Control
                as="input"
                name="sesNumber"
                onChange={handleChange}
                value={formState.sesNumber}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="sesDate">Session Date</Form.Label>
              <Form.Control
                as="input"
                name="sesDate"
                onChange={handleChange}
                value={formState.sesDate}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Average Party Level</Form.Label>
              <Form.Control
                as="input"
                name="sesPartyLvl"
                onChange={handleChange}
                value={formState.sesPartyLvl}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Session Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                name="sesNotes"
                onChange={handleChange}
                value={formState.sesNotes}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
