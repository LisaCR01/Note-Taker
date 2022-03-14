const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const dbData=require('./db/db.json')
//sets the port to work on heroku
const PORT = process.env.PORT || 3001;

const app = express();
//sets default set up for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//computer is directed to the index.html 
 app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')));

//computer is directed through /notes to the notes.html 
  app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')));

//computer is routed to dbData if /api/notes selected. 
app.get('/api/notes', (req, res) => {
      res.status(200).json(dbData);
    });

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //create new property called id based on length and assign it to each json object
  newNote.id = uuid.v4();
  //push updated note to the data containing notes history in db.json
  noteList.push(newNote);

  //write the updated data to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

//computer says which port the local host is set to. 
  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);