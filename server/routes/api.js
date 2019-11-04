const express = require('express')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})

router.post('/person', function (req,res) {
    const newPerson = new Person(req.body)
    newPerson.save()
    res.send("person saved to db")
})

router.put('/person/:id', function (req,res) {
    let id = req.params.id
    Person.findByIdAndUpdate(id, { age: 80 }, { new: true }, function (err, person) {
        res.send(person)
    })
})

router.delete('/apocalypse', function (req, res) {
    
        Person.remove({},function (err) {
            console.log(err) //usually this will be `null`, unless something went wrong
            res.send("cleared peopleDB")
        })
        
    
    
})

module.exports = router