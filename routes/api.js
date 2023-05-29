const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

// Middleware to parse JSON request body
router.use(express.json());

// Route to get all saved notes
router.get('/notes', (req, res) => { // Update the route path to '/'
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes data.' });
      }
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });

// Route to save a new note
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uniqid(); // Assign a unique id to the new note

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes data.' });
    }
    try {
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to save note.' });
        }

        res.json(newNote);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to parse notes data.' });
    }
  });
});

module.exports = router;
