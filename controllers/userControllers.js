const User = require ('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get a single user by ID
const getUserById = async (req, res) => {

  const userId = req.params.id

  if(!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({error: 'No such user'})
}

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, password } = req.body

  let emptyFields = []

    if(!firstName) {
        emptyFields.push('firstName')
    }
    if(!lastName) {
        emptyFields.push('lastName')
    }
    if(!password) {
        emptyFields.push('password')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

// Hash the password
const hashedPassword = await bcrypt.hash(password, 10);

//add the user to the db
  try {
    const newUser = await User.create({ firstName, lastName, password: hashedPassword })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Delete a user by ID
const deleteUser = async (req, res) => {
  const userId = req.params.id

  if(!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({error: 'No such user'})
}

  try {
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update a user by ID
const updateUser = async (req, res) => {
  const userId = req.params.id

  if(!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({error: 'No such user'})
}

  try {
    const updatedUser = await User.findOneAndUpdate({_id: userId}, {
        ...req.body
    }, {new: true})
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

//Handle user login
const userLogin = async (req, res) => {
  const { firstName, lastName, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ firstName, lastName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT and send it as a response
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET
    const token = jwt.sign({ userId: user._id }, tokenSecret);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  userLogin
}
