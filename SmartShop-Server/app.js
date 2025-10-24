const express = require('express')
const app = express() 

app.use(express.json())

const movies = [{title: 'Lord of the Rings', genre: 'Fiction'}, {title: 'Finding Nemo', genre: 'Kids'}]

app.get('/', (req, res) => {
    res.send('ROOT')
})

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.get('/movies', (req, res) => {
    res.json(movies)
})

app.post('/movies', (req, res) => {
    const { title, genre } = req.body 
    res.send('OK')
})

app.get('/movies/:genre', (req, res) => {
    const genre = req.params.genre
    res.json(movies.filter(movie => movie.genre.toLowerCase() == genre.toLowerCase())) 
})

app.get('/movies/:genre/year/:year', (req, res) => {
    const genre = req.params.genre
    const year = parseInt(req.params.year) 
    res.send(`You selected ${genre} and the year is ${year}`)
})

// start the server 
app.listen(8080, () => {
    console.log('Server is running.')
})