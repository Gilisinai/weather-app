const express = require('express')
const app = express()
const api = require('./server/routes/api')
// const request = require('request')
const bodyParser = require("body-parser")
// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', api)


const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})