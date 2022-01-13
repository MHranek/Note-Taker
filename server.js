const express = require('express');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// TODO Routing

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))