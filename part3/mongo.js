const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please at least provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.daroj.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {

  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })

    .catch(err => console.log(err))
}

if (process.argv.length > 3) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  person.save()

    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))
}