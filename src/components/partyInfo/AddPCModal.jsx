import { useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";

export default function AddPCModal({ party, setParty, PC, user }) {
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

  const handleSubmit = async () => {
    const newCharacter = await axios.post("/api/party", {
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
    });
    console.log(newCharacter);

    setParty([newCharacter.data, ...party]);

    handleClose();
  };


return (
  <>
    <Button variant="success" onClick={handleShow}>
      Add New Party Member
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-secondary-subtle" closeButton>
        <Modal.Title>Add New Party Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Tabs defaultActiveKey="basic" id="add-modal-tabs" className="mb-3">
            <Tab eventKey="basic" title="Basic Info">
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
                  placeholder="Ex - Forest Gnome"
                  name="pcRace"
                  onChange={handleChange}
                  value={character.pcRace}
                />
                <Form.Label>Class</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Barbarian"
                  name="pcClass"
                  onChange={handleChange}
                  value={character.pcClass}
                />
                <Form.Label>Subclass</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Berserker"
                  name="pcSubclass"
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
            </Tab>

            <Tab eventKey="stats" title="Stats">
              <Form.Group className="mb-3">
                <Form.Label>Armor Class:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="#"
                  name="pcArmor"
                  onChange={handleChange}
                  value={character.pcArmor}
                />
                <Form.Label>Max Health:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="#"
                  name="pcHealth"
                  onChange={handleChange}
                  value={character.pcHealth}
                />
                <Form.Label>Movement Speed:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Walking 30, Climbing 30..."
                  name="pcMovement"
                  onChange={handleChange}
                  value={character.pcMovement}
                />
                <Form.Label>Vision:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Nightvision 60, Blindsight 10"
                  name="pcVision"
                  onChange={handleChange}
                  value={character.pcVision}
                />
                <Form.Label>Damage Resistance:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Cold, Poison..."
                  name="pcResistances"
                  onChange={handleChange}
                  value={character.pcResistances}
                />
                <Form.Label>Damage Immunity:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Cold, Poison..."
                  name="pcImmunities"
                  onChange={handleChange}
                  value={character.pcImmunities}
                />
              </Form.Group>
            </Tab>

            <Tab eventKey="backstory" title="Backstory">
              <Form.Group className="mb-3">
                <Form.Label>Origin Background Name:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Criminal"
                  name="pcBGName"
                  onChange={handleChange}
                  value={character.pcBGName}
                  autoFocus
                />
                <Form.Label>Tool Proficiences:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Thieves' Tools"
                  name="pcTools"
                  onChange={handleChange}
                  value={character.pcTools}
                />
                <Form.Label>Languages Known:</Form.Label>
                <Form.Control
                  as="input"
                  placeholder="Ex - Common, Elvish..."
                  name="pcLanguages"
                  onChange={handleChange}
                  value={character.pcLanguages}
                />
                <Form.Label> Backstory:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Ex - You eked out a living in dark alleyways..."
                  name="pcBackstory"
                  onChange={handleChange}
                  value={character.pcBackstory}
                />
              </Form.Group>
            </Tab>
          </Tabs>
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