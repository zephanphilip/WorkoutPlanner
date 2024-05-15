import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

function WorkoutForm() {
    const {user } = useAuthContext()
  
  const {dispatch} = useWorkoutsContext()

  const [title,setTitle]= useState('');
  const [load,setLoad]= useState('');
  const [reps,setReps]= useState('');
  const [error, setError]= useState(null);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!user){
        setError('you must be logged in')
        return
    }

    const workout ={title,load,reps}

    const response = await fetch('https://workoutplanner-zl28.onrender.com:4000/api/workouts',{
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`
        }
    })

    const json = await response.json();
    if (response.ok){
        setTitle('');
        setLoad('');
        setReps('');
        setError(null)
        console.log("new workout added",json);
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
   <form className='create' onSubmit={handleSubmit}>
    <h3>ADD A NEW WORKOUT</h3>
    <input
        required
        type="text" placeholder="Workout Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
    />
    <input
        required
        type="number" placeholder="Loads (in kg)"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
    />
    <input
        required
        type="number" placeholder="Reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
    />
    <button>Add Workout</button>
    {error && <div className='error'>{error}</div>}
   </form>
  )
}

export default WorkoutForm
