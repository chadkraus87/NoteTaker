const uniqid = require('uniqid');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const handleErrorResponse = (res, errorMessage, statusCode = 500) => {
  console.log(errorMessage);
  res.status(statusCode).json({ error: errorMessage });
};

router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      handleErrorResponse(res, 'Failed to read notes.');
    } else {
      const notes = JSON.parse(data)
      res.send(notes);
    }
  });
});

router.post('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      handleErrorResponse(res, 'Failed to read notes.');
    } else {
      const notes = JSON.parse(data);
      const newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text,
      };
      notes.push(newNote);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
          handleErrorResponse(res, 'Failed to save note.');
        } else {
          res.redirect('/notes');
        }
      });
    }
  });
});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      handleErrorResponse(res, 'Failed to read notes.');
    } else {
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== noteId);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
          handleErrorResponse(res, 'Failed to delete note.');
        } else {
          res.status(200).json(notes);
        }
      });
    }
  });
});

module.exports = router;