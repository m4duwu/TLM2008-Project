import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//modal used for delete
const Delete=({workout}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
    setShow(false)
  }

  return (
    <>
    <span className="material-symbols-outlined" onClick={handleShow}>delete</span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are you sure you want to <strong>delete</strong> selected item?</p>
        <p><strong>ID: </strong>{workout._id}</p>
        <p><strong>Item: </strong>{workout.item}</p>
        <p><strong>Category: </strong>{workout.category}</p>
        <p><strong>Importance: </strong>{workout.importance}</p>
        <p><strong>Amount: </strong>${workout.amount}</p><br></br>
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Delete;