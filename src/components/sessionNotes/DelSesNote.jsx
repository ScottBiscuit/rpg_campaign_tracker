import { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';


export default function DelSesNote({ setNotes, sessionNotes, sesNote}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState(
    {
      sesNumber: sesNote.sesNumber,
      sesDate: sesNote.sesDate,
      sesPartyLvl: sesNote.sesPartyLvl,
      sesNotes: sesNote.sesNotes
    });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      };

  const handleSubmit = () => {

    axios.delete(`/api/sessionNotes/${sesNote.sesId}/delete`, 
      { sesId: formState.sesId }).then((res) => {

        const deletedResData = sesNote.sesId

        function findDeleted(sessionNotes, deletedResData){
          for(let i = 0; i < sessionNotes.length; i++){
            if(sessionNotes[i].sesId === deletedResData){
              console.log(i)
              return i;
            }
          }
        }
        sessionNotes.splice(findDeleted(sessionNotes, deletedResData), 1)

        setNotes([...sessionNotes])

        handleClose()
      })
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        <BsFillTrashFill />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Session Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this session note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type='submit' onClick={handleSubmit}>
            Delete Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
