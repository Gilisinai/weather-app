const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../models/City')
const apiKey = "d2f4b614a92855e8f8fedea0a0d367f4"
const requestPromise = require('request-promise')

// router.get('/city/:cityName', function (req, res) {
//     let cityName = req.params.cityName
//     request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`, function (err, response) {
//         let weather = JSON.parse(response.body)
//         let details = {
//             name: weather.name,
//             temperature: weather.main.temp,
//             condition: weather.weather[0].description,
//             conditionPic: weather.weather[0].icon
//         }
//         res.send(details)
//     })
// })

router.get('/city/:cityName', async function (req,res) {
    let cityName = req.params.cityName
    let data = await requestPromise(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`)
    let firstResponse = JSON.parse(data)
    let response = await requestPromise(`https://pixabay.com/api/?key=14173778-fa3879fe90932deae6a458ee7&q=${cityName}&category=places&image_type=photo&pretty=true`)
    let image = JSON.parse(response)
        
       let details = {
        name: firstResponse.name,
        temperature: firstResponse.main.temp,
        condition: firstResponse.weather[0].description,
        conditionPic: firstResponse.weather[0].icon,
        img: image.hits[0].largeImageURL
    }
    
    res.send(details)

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