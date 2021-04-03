// Setup DB
const JSONdb = require('simple-json-db');
const db = new JSONdb('db/db.json');

// Set up Unique ID
const { v4: uuidv4, validate: uuidValidate } = require('uuid');


// Setup Express
const express = require('express')
const exphbs = require('express-handlebars')


const app = express()

const port = 3000

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));




app.get('/', (req, res) => {
    res.render('home');
});
app.get('/notes', (req, res) => {
    res.render('notes');
})

// Get all the notes
app.get('/api/notes', (req, res) => {
    res.send(db.JSON());
});

// Read a note from the database
app.get('/api/notes/:id', (req, res) => {
    const uuid = req.params.id;
    if (uuidValidate(uuid)) {
        const data = JSON.parse(db.get(uuid));
        res.send(data);
    }
    
});

// Saves a note to the database
app.post('/api/notes', (req, res) => {
    const uuid = uuidv4();
    console.log(req.body)
    const title = req.body.title;
    const body = req.body.note;

    const note = {
        title: title,
        body: body,
    }

    db.set(uuid, JSON.stringify(note));

    res.send(uuid);
});

// Deletes a note
app.delete('/api/notes/:id', (req, res) => {
    const uuid = req.params.id;
    console.log('request to delete', uuid);
    if (uuidValidate(uuid)) {
        const result = db.delete(uuid);
        res.send(result);
    }

});


app.listen(port, () => {
    console.log(`app running on ${port}`)
})
