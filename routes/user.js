const express= require('express')
const jwt = require('jsonwebtoken');
const {
    getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  userLogin
} = require('../controllers/userControllers')

const router = express.Router()

//GET all users
router.get('/', getAllUsers)

//GET single users
router.get('/:id', getUserById)

//POST a new user
router.post('/', createUser)

//DELETE a user
router.delete('/:id', deleteUser)

//UPDATE a user
router.patch('/:id', updateUser)

router.post('/login', userLogin)


module.exports = router