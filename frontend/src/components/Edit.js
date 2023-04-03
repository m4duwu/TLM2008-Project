import React, { useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';

const Edit=({workout}) => { 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [item, setName] = useState(workout.item)
  const [category, setCategory] = useState(workout.category)
  const [importance, setImportance] = useState(workout.importance)
  const [amount, setAmount] = useState(workout.amount)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  var name =""

  function handleSubmit(event){
    event.preventDefault()
    Axios ( {
        url: `http://localhost:4000/api/workouts/updatentry/${workout._id}`,
        method: 'PUT',
       headers: { 'Content-Type': 'application/json',
           'Accept' : 'application/json','Authorization': `Bearer ${user.token}` },
        data:{
          item: item,
          category: category,
          importance: importance,
          amount: amount,
        }
    })
    .then(() => {
        console.log(`data has been sent to the server from axios: ${workout._id}`)
    })
    .catch(() => {
        console.log('Data could not be sent from axios')
    })

    handleClose()
    window.location.reload(false)

} 

  return (
    <>
    
      <Button variant="primary" onClick={handleShow}>
       edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <form className="create" onSubmit={handleSubmit}>
      <h3>Edit Item</h3>

      <label>item:</label>
      <input 
        type="text"
        value={item}
        onChange={(e) => setName(e.target.value)} 
      />

      <label>category:</label>
      <select name="category" id="category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" >Choose here</option>
        <option value="Fun">Fun</option>
        <option value="Eating Out">Eating Out</option>
        <option value="Health">Health</option>
        <option value="Misc.">Misc.</option>
        <option value="Groceries">Groceries</option>
        <option value="Clothing">Clothing</option>
        <option value="Living">Living</option>
      </select><br></br>
   
      <label>importance:</label>
      <select name="importance" id="importance"
      onChange={(e) => setImportance(e.target.value)}
      defaultValue={importance}>
        <option value="" >Choose here</option>
        <option value="Essential">Essential</option>
        <option value="Have to Have">Have to Have</option>
        <option value="Nice to Have">Nice to Have</option>
        <option value="Shouldn't Have">Shouldnt Have</option>
      </select><br></br>
 
      <label>amount:</label>
      <input 
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        defaultValue={amount}
        className={emptyFields.includes('amount') ? 'error' : ''}
      />
      {error && <div className="error">{error}</div>}
      
    </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
           <Button variant="primary" onClick={handleSubmit}>Update</Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;