const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const dbData=require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

 app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')));

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);