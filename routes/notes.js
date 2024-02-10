const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const { 
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const {title, text, note_id} = req.body;

    if(title && text){
        const newNote ={
            title,
            text,
            id: uuid()
        }
    
    readAndAppend(newNote, './db/notes.json');
    res.json(`New note has been added`);
} else{
    res.error('Error adding the note');
}
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/notes.json', result);
            res.json(`Note with the id of ${noteId} has been deleted!`);
        });
});






module.exports = notes;