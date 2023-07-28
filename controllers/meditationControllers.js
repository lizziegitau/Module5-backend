const Meditation = require('../models/meditation')
const mongoose = require('mongoose')

// Get all meditations
const getAllMeditations = async (req, res) => {
  try {
    const meditations = await Meditation.find();
    res.status(200).json(meditations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single meditation by ID
const getMeditationById = async (req, res) => {
  const meditationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(meditationId)) {
    return res.status(404).json({ error: 'Invalid meditation ID' });
  }

  try {
    const meditation = await Meditation.findById(meditationId);
    if (!meditation) {
      return res.status(404).json({ error: 'Meditation not found' });
    }
    res.status(200).json(meditation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new meditation
const createMeditation = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: 'Please provide title and description' });
  }

  try {
    const newMeditation = await Meditation.create({ title, description});
    res.status(201).json(newMeditation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a meditation by ID
const deleteMeditation = async (req, res) => {
  const meditationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(meditationId)) {
    return res.status(404).json({ error: 'Invalid meditation ID' });
  }

  try {
    const deletedMeditation = await Meditation.findByIdAndDelete(meditationId);
    if (!deletedMeditation) {
      return res.status(404).json({ error: 'Meditation not found' });
    }
    res.status(200).json({ message: 'Meditation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a meditation by ID
const updateMeditation = async (req, res) => {
  const meditationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(meditationId)) {
    return res.status(404).json({ error: 'Invalid meditation ID' });
  }

  try {
    const updatedMeditation = await Meditation.findByIdAndUpdate(
      meditationId,
      { ...req.body },
      { new: true }
    );
    if (!updatedMeditation) {
      return res.status(404).json({ error: 'Meditation not found' });
    }
    res.status(200).json(updatedMeditation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllMeditations,
  getMeditationById,
  createMeditation,
  deleteMeditation,
  updateMeditation,
};
