// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Edit from './Edit'
import Delete from './Delete'

const WorkoutDetails = ({ workout }) => {

  return (
    <div className="workout-details">
      <br></br>
      <p><strong>ID: </strong>{workout._id}</p>
      <p><strong>Item: </strong>{workout.item}</p>
      <p><strong>Category: </strong>{workout.category}</p>
      <p><strong>Importance: </strong>{workout.importance}</p>
      <p><strong>Amount: </strong>${workout.amount}</p><br></br>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      
      <Delete workout={workout}/>
      <Edit workout={workout}/>
      
    </div>
  )
}

export default WorkoutDetails