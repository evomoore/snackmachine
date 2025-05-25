const express = require('express');
const router = express.Router();
const EditorNote = require('../models/EditorNote');

// GET all editor notes
router.get('/', async (req, res) => {
  try {
    const notes = await EditorNote.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching editor notes:', error);
    res.status(500).json({ message: 'Error fetching editor notes' });
  }
});

// GET single editor note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await EditorNote.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Editor note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Error fetching editor note:', error);
    res.status(500).json({ message: 'Error fetching editor note' });
  }
});

// POST /api/editor-notes
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const editorNote = new EditorNote({
      content
    });

    const savedNote = await editorNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error creating editor note:', error);
    res.status(500).json({ message: 'Error creating editor note' });
  }
});

// PUT /api/editor-notes/:id
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const updatedNote = await EditorNote.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Editor note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating editor note:', error);
    res.status(500).json({ message: 'Error updating editor note' });
  }
});

// DELETE /api/editor-notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await EditorNote.findByIdAndDelete(req.params.id);
    
    if (!deletedNote) {
      return res.status(404).json({ message: 'Editor note not found' });
    }

    res.json({ message: 'Editor note deleted successfully' });
  } catch (error) {
    console.error('Error deleting editor note:', error);
    res.status(500).json({ message: 'Error deleting editor note' });
  }
});

module.exports = router; 