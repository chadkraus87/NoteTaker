const router = require('express').Router();
const path = require('path');

// Route to return the notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Route to return the index.html file for all other routes
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Handle the save button functionality
router.post('/save-note', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    console.log('New note:', title, text);
    res.sendStatus(200);
  } else {
    res.status(400).json({ error: 'Please enter a note title and text.' });
  }
});

module.exports = router;