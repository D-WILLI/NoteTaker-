const { json } = require('express');
const fs = require ('fs');
const { request } = require('http');
const { v4: uuidv4 } = require('uuid');
let notesData = []; 


module.exports = (app) => {

    // this is the get request 
    app.get('/api/notes', (req, res) => {
      const data = fs.readFileSync('./db/db.json');
      res.send (JSON.parse(data)); 
      notesData = data; 
    })

    // this is the delete request
    app.delete('/api/notes/:id ', function (req, res) {
        notesData = fs.readFileSync('./db/db.json', 'utf-8'); 
        notesData = JSON.parse(notesData); 
        notesData = notesData.filter(function (note) {
       return note.id != req.params.id; 
       }); 
       notesData = JSON.stringify(notesData); 
       fs.writeFile('./db/db.json', notesData, 'utf-8'); 
    
   
    
    }); 

    // this is the post request
    app.post('/api/notes', (req, res) => {
        let data = JSON.parse(fs.readFileSync('./db/db.json','utf-8')); 
        let notes = req.body
        notes.id = uuidv4(); 
        data.push(notes)
        fs.writeFileSync("./db/db.json", JSON.stringify(data))
        return res.json(data)
    });
   
   
  };
  

