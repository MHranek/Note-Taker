const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// TODO Routing

// GET /notes => notes.html

// GET /api/notes => db.json

// POST /api/notes => save db.json

// BONUS DELETE /api/notes/:id => delete note with id

// GET * => index.html
app.get('*', (req, res) => res.sendfile(path.join(__dirname, '/public/index.html')))

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))