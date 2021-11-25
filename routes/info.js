const express = require('express')
const Person = require('../models/Person')
const mongoose = require('mongoose')

const infosRouter = express.Router()

infosRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
        const lenght = persons.length
        const receiveTime = new Date()
        response.send(
            `<p>Phonebook has info for ${lenght} people</p>
            <p>${receiveTime.toString()}</p>`
        )
    })
})

module.exports = infosRouter
