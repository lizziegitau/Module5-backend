const express= require('express')
const {
    getAllMeditations,
  getMeditationById,
  createMeditation,
  deleteMeditation,
  updateMeditation,
} = require('../controllers/meditationControllers')

const router = express.Router()

//GET all meditations
router.get('/', getAllMeditations)

//GET single meditation
router.get('/:id', getMeditationById)

//POST a new meditation
router.post('/', createMeditation)

//DELETE a meditation
router.delete('/:id', deleteMeditation)

//UPDATE a meditation
router.patch('/:id', updateMeditation)

module.exports = router