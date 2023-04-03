const express = require('express')
let cors = require("cors");
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(cors());
// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.put('/:id', updateWorkout)

router.put('/updatentry/:id', async (req, res) => {
  var success = false
  const id  = req.body.id
  
 
  try {
    const {item, category, importance,amount} = req.body
    let newentry = {item: item, category:category,importance:importance,amount:amount} 
    
      let old_entry = await Workout.findById(req.params.id);
      if (!old_entry) {
          return res.status(404).send({ success, error: 'Not Found'})
      }
      
      const update_entry = await Workout.findByIdAndUpdate(req.params.id, { $set: newentry }, { new: true })
      return res.send({res: update_entry})
  } catch (error) {
      return res.status(500).send({error: 'Internal Server Error'})
  }
  
  })


module.exports = router