require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons/', (request, response) => {
  Person.find({}).then(person => response.json(person))
})

app.get('/info/', (request, response) => {
  Person.count({}, (err, count) =>
    response.send(`Phonebook has info for ${count} people <br>${new Date}`))
})

app.get('/api/persons/:id/', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)}
      else {
        response.status(404).end()}
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

app.delete('/api/persons/:id/', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end)
    .catch(error => {
      console.log(error)
      next(error)})
})

app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  /*if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Missing name or number'
    })
  */
  //console.log(Person.count({ name: body.name }))

  Person.countDocuments({ name: body.name }, (err, count) => {
    if (count > 0) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    else {
      const person = new Person({
        name: body.name,
        number: body.number
        //id: Math.random().toString(36).slice(2)
      })

      person.save().then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
    }
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  /*const person = {
    name: body.name,
    number: body.number
  }*/

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`))