const express = require('express')
const db = require('./config/connection')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const PORT = 3001

db.once('open', ()=>{
    app.listen(PORT, ()=>{
        console.log(`App listening on http://localhost:${PORT}`)
    })
})