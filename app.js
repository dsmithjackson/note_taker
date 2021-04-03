// Setup Express
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const port = 3000

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/notes', (req, res) => {
    res.render('notes');
})

app.get('/api/notes', (req,res) => {

});

app.post('/api/notes', (req, res) => {

});

app.delete('/api/notes/:id', (req, res) => {

});


app.listen(port, () => {
    console.log(`app running on ${port}`)
})