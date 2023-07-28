const express = require('express');
const {
  getAllJournalEntries,
  getAllJournalEntriesForAllUsers,
  getJournalEntryById,
  createJournalEntry,
  deleteJournalEntry,
  updateJournalEntry,
} = require('../controllers/journalControllers')

const router = express.Router();

// GET all journal entries for all users
router.get('/', getAllJournalEntriesForAllUsers);

// GET all journal entries for a user
router.get('/all/:userId', getAllJournalEntries);

// GET single journal entry
router.get('/:id', getJournalEntryById);

// POST a new journal entry
router.post('/', createJournalEntry);

// DELETE a journal entry
router.delete('/:id', deleteJournalEntry);

// UPDATE a journal entry
router.patch('/:id', updateJournalEntry);

module.exports = router;
