const express = require('express');
const { createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

//require auth for all
router.use(requireAuth);

//get all workouts
router.get('/',getWorkouts);

//get a single workouts
router.get('/:id',getWorkout);


//post a workout
router.post('/',createWorkout)

//update workouts
router.patch('/:id',updateWorkout);

//delete a workout
router.delete('/:id',deleteWorkout);


module.exports = router