//create web server
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { getNotes, createNewNote, deleteNote } = require('../helpers/notes');

//GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
    getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
});

//POST Route for a new note
router.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        createNewNote (newNote)
            .then((note) => res.json(note))
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(500).json('Error in posting note');
    }
});

//DELETE Route for a specific note
router.delete('/notes/:id', (req, res) => {
    deleteNote (req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;