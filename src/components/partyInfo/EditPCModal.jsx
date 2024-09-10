import { useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { BsFillPencilFill } from 'react-icons/bs';

export default function EditPCModal({ party, setParty, PC, user }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [character, setCharacter] = useState({
    pcName: "",
    pcRace: "",
    pcClass: "",
    pcSubclass: "",
    pcLevel: "",
    pcArmor: "",
    pcHealth: "",
    pcMovement: "",
    pcVision: "",
    pcResistances: "",
    pcImmunities: "",
    pcBackstory: "",
    pcAllies: "",
    pcEnemies: "",
    pcGoals: "",
    pcExtras: "",
    pcBGName: "",
    pcBGDesc: "",
    pcTools: "",
    pcLanguages: "",
    pcPassPer: "",
    pcPassInv: "",
    pcPassIns: "",
    pcImg: "",
  });

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      character.pcName &&
      character.pcRace &&
      character.pcClass &&
      character.pcLevel
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(character)) {
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
      .post("/api/party", {
        pcId: character.pcId,
        pcName: character.pcName,
        pcRace: character.pcRace,
        pcClass: character.pcClass,
        pcSubclass: character.pcSubclass,
        pcLevel: character.pcLevel,
        pcArmor: character.pcArmor,
        pcHealth: character.pcHealth,
        pcMovement: character.pcMovement,
        pcVision: character.pcVision,
        pcResistances: character.pcResistances,
        pcImmunities: character.pcImmunities,
        pcBackstory: character.pcBackstory,
        pcAllies: character.pcAllies,
        pcEnemies: character.pcEnemies,
        pcGoals: character.pcGoals,
        pcExtras: character.pcExtras,
        pcBGName: character.pcBGName,
        pcBGDesc: character.pcBGDesc,
        pcTools: character.pcTools,
        pcLanguages: character.pcLanguages,
        pcPassPer: character.pcPassPer,
        pcPassInv: character.pcPassInv,
        pcPassIns: character.pcPassIns,
        pcImg: character.pcImg,
      })
      .then((res) => {
        setParty([res.data, ...party]);

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
          <Modal.Title>Add New Party Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Character Name:</Form.Label>
              <Form.Control
                as="input"
                placeholder="Enter Name"
                name="pcName"
                onChange={handleChange}
                value={character.pcName}
                required
                autoFocus
              />
              <Form.Label>Race/Species:</Form.Label>
              <Form.Control
                as="input"
                placeholder="Enter Race"
                name="pcRace"
                onChange={handleChange}
                value={character.pcRace}
              />
              <Form.Label>Class</Form.Label>
              <Form.Control
                as="input"
                placeholder="Enter Class - Subclass"
                name="pcClass"
                onChange={handleChange}
                value={character.pcClass}
              />
              <Form.Label>Subclass</Form.Label>
              <Form.Control
                as="input"
                placeholder="Enter Class - Subclass"
                name="pcClass"
                onChange={handleChange}
                value={character.pcSubclass}
              />
              <Form.Label>Level:</Form.Label>
              <Form.Control
                as="input"
                placeholder="#"
                name="pcLevel"
                onChange={handleChange}
                value={character.pcLevel}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" >
              <Form.Label>Image:</Form.Label>
              <Form.Control 
                as="input" 
                placeholder="(Optional) Add link to photo" 
                name="pcImage" 
                onChange={handleChange} 
                value={character.pcImg} 
                />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
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
