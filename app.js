// Setup DB
const JSONdb = require('simple-json-db');
const db = new JSONdb('db/db.json');

// Set up Unique ID
const { v4: uuidv4 } = require('uuid');


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

app.get('/api/notes', (req, res) => {
    res.send('hi');
});

app.get('/api/notes/:id', (req, res) => {

});

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

    res.send("yay");
});

app.delete('/api/notes/:id', (req, res) => {

});


app.listen(port, () => {
    console.log(`app running on ${port}`)
})
