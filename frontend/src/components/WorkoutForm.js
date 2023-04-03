import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [item, setName] = useState('')
  const [category, setCategory] = useState('')
  const [importance, setImportance] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {item, category, importance, amount}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setCategory('')
      setImportance('')
      setAmount('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', paycategory: json})
    }
    window.location.reload(false);
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Item</h3>

      <label>item:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={item}
        className={emptyFields.includes('item') ? 'error' : ''}
      />

      <label>category:</label>
      <select name="category" id="category"
      onChange={(e) => setCategory(e.target.value)}
      value={category}>
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
      value={importance}>
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
        value={amount}
        className={emptyFields.includes('amount') ? 'error' : ''}
      />


      <button>Add Item</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm