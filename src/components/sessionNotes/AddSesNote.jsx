import { useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

export default function AddSesNote({ setNotes, sessionNotes }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    sesNumber: "",
    sesDate: "",
    sesPartyLvl: "",
    sesNotes: "",
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
      .post("/api/sessionNotes", {
        sesId: formState.sesId,
        sesNumber: formState.sesNumber,
        sesDate: formState.sesDate,
        sesPartyLvl: formState.sesPartyLvl,
        sesNotes: formState.sesNotes,
      })
      .then((res) => {
        setNotes([res.data, ...sessionNotes]);
        handleClose();
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Session
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Session Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Session Number</Form.Label>
              <Form.Control
                as="input"
                placeholder="#"
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
                placeholder="Example - 2024-12-25"
                name="sesDate"
                onChange={handleChange}
                value={formState.sesDate}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Average Party Level</Form.Label>
              <Form.Control
                as="input"
                placeholder="#"
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
                placeholder="Enter notes..."
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
