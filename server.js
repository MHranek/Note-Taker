const express = require('express');
const path = require('path');
const fs = require('fs');
const dataBase = require('./db/db.json');
const { argv } = require('process');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET /notes => notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

// GET /api/notes => db.json
app.get('/api/notes', (req, res) => {
    res.status(201).json(dataBase);
})

// POST /api/notes => save db.json
app.post('/api/notes', (req, res) => {
    const notes = dataBase;
    notes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => err ? console.error(err): console.log(`Added new note`));
    res.status(201).json(`${req.method} request recieved`);
})

// BONUS DELETE /api/notes/:id => delete note with id
app.delete('/api/notes/:id', (req, res) => {
    // get id
    const noteID = req.params.id;
    const notes = dataBase;

    // search for the id and remove the note at that instance of the id
    for (let i = 0; i < notes.length; i++) {
        if (noteID == notes[i].id) {
            // remove current index
            notes.splice(i, 1);
            // write updated array to json
            fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => err ? console.error(err): console.log(`Deleted note with ID: ${noteID}`));
            res.status(201).json(`Deleted note with ID: ${noteID}`);
        }
    }
})

// GET * => index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))