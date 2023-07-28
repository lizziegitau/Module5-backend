const Journal = require('../models/journal');
const mongoose = require('mongoose');

// Get all journal entries for all users
const getAllJournalEntriesForAllUsers = async (req, res) => {
  try {
    const allJournalEntries = await Journal.find();
    res.status(200).json(allJournalEntries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all journal entries for a user
const getAllJournalEntries = async (req, res) => {
  const userId = req.params.userId;

  try {
    const journalEntries = await Journal.find({ user: userId });
    res.status(200).json(journalEntries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single journal entry by ID
const getJournalEntryById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid journal entry ID' });
  }

  try {
    const journalEntry = await Journal.findById(id);
    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.status(200).json(journalEntry);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new journal entry
const createJournalEntry = async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'Please provide title and text in the request body' });
  }

  // Get the authenticated user from req.user
  const user = req.user;

  try {
    const newJournalEntry = await Journal.create({ user ,title, text });
    res.status(201).json(newJournalEntry);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a journal entry by ID
const deleteJournalEntry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid journal entry ID' });
  }

  try {
    const deletedJournalEntry = await Journal.findByIdAndDelete(id);
    if (!deletedJournalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.status(200).json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a journal entry by ID
const updateJournalEntry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid journal entry ID' });
  }

  try {
    const updatedJournalEntry = await Journal.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!updatedJournalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.status(200).json(updatedJournalEntry);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllJournalEntriesForAllUsers,
  getAllJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  deleteJournalEntry,
  updateJournalEntry,
};
