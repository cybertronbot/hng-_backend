const express = require('express')
const {
  getResources, 
  getResource, 
  createResources, 
  deleteResources, 
  updateResources
} = require('../controllers/resources')

const router = express.Router()

// GET all workouts
router.get('/', getResources)

// GET a single workout
router.get('/:id', getResource)

// POST a new workout
router.post('/', createResources)

// DELETE a workout
router.delete('/:id', deleteResources)

// UPDATE a workout
router.patch('/:id', updateResources)

module.exports = router