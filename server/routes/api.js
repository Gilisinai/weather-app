const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../models/City')
const apiKey = "d2f4b614a92855e8f8fedea0a0d367f4"

router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`, function (err, response) {
        let weather = JSON.parse(response.body)

        res.send(weather)
    })
})


router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city', function (req, res) {
    newCity = new City(req.body)
    newCity.save()
    res.send("city saved to db")
})

router.delete('/city/:cityName', function (req, res) {
    let cityToDelete = req.params.cityName
    City.findOneAndDelete({name: cityToDelete}, function(err, city) {
        res.send(`${cityToDelete} deleted from db`)
    })


})

module.exports = router