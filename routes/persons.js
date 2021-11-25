const express = require('express')
const Person = require('../models/Person')

const personsRouter = express.Router()

personsRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

personsRouter.get('/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

personsRouter.delete('/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

personsRouter.post('/', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
    }

    if (!body.name) {
        return response.status(422).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(422).json({
            error: 'number missing'
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })
    
    Person.find({name: newPerson.name}).then(persons => {
        if (persons.length > 0) {
            return response.status(422).json({
                error: 'name already exist'
            })
        } else {
            Person.findByIdAndUpdate(request.params.id)
              .then(result => {
                response.status(203).end()
              })
              .catch(error => next(error))
        }
        
        newPerson.save().then(result => {
            response.status(201).json(result)
        })
    })
})

module.exports = personsRouter