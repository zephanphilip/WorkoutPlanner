import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


function WorkoutDetails( {workout}) {

  const {user } = useAuthContext()
  const{dispatch}= useWorkoutsContext()

  const handleClick = async () =>{
    if(!user){
      return
    }

    const response = await fetch('https://workoutplanner-zl28.onrender.com/api/workouts/'+workout._id,{
      method: 'DELETE',
      headers: {
        'Authorization':`Bearer ${user.token}`
      }

    })
    const json= await response.json()
    if(response.ok) {
    dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }


  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>LOAD (kg):</strong>{workout.load}</p>
      <p><strong>REPS     :</strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date (workout.createdAt),{addSuffix: true})}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutDetails
