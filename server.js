const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const dbData=require('./db/db.json')
const api = require('./routes/index.js')
//sets the port to work on heroku
const PORT = process.env.PORT || 3001;

const app = express();
// setting up middleware using express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)
app.use(express.static('public'));
//computer is directed to the index.html 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')));

//computer is directed through /notes to the notes.html 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))); 

//computer selects a note to delete based on the id. 
app.delete("/api/notes/:id", (req, res) => {
      let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
      let noteId = (req.params.id).toString();
    
      //filter all notes that does not have matching id and saved them as a new array
      //the matching array will be deleted
      noteList = noteList.filter(selected =>{
          return selected.id != noteId;
      })
    
      //write the updated data to db.json and display the updated note
      fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
      res.json(noteList);
    });
    //If any other page is asked for the computer routes to the index.html
    app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));

//computer says which port the local host is set to. 
  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);