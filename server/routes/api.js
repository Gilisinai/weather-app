const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../models/City')
const apiKey = "d2f4b614a92855e8f8fedea0a0d367f4"

router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`, function (err, response) {
        let weather = JSON.parse(response.body)
        let details = {
            name: weather.name,
            temperature: weather.main.temp,
            condition: weather.weather[0].description,
            conditionPic: weather.weather[0].icon
        }
        res.send(details)
    })
})


router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        console.log(cities)
        res.send(cities)
    })
})

router.post('/city', function (req, res) {
    newCity = new City(req.body)
    newCity.save()
    res.send("city saved to db")
})

router.delete('/city', function (req, res) {
    let cityToDelete = req.body.city
    City.findOneAndDelete({ 
        name: cityToDelete 
    }).then(res.end())


})

module.exports = router