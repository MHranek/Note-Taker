const express = require('express');
const path = require('path');
const fs = require('fs');
const dataBase = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// TODO Routing

// GET /notes => notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

// GET /api/notes => db.json
app.get('/api/notes', (req, res) => {
    res.json(dataBase);
})

// POST /api/notes => save db.json
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request recieved`);
    fs.writeFileSync('./db/db.json', JSON.stringify(req.body), (err) => err ? console.error(err): console.log(`Added new note`));
})

// BONUS DELETE /api/notes/:id => delete note with id

// GET * => index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))