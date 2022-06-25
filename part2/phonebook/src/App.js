import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import pbservice from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    pbservice
      .getAll()
      .then(data => {
            setPersons(data)
        })
  },[])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber
    }

    if (persons.some(i => i.name === newName && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))) {

      const pToUpdate = persons.find(i => i.name === newName)
      const updatedNumber = {...pToUpdate, number: newNumber}

      pbservice
        .update(pToUpdate.id, updatedNumber)
        .then(returnedData => {
          setPersons(persons.map(person => person.id !== pToUpdate.id ? person : returnedData))
          setMessage(`Added ${newName}`)
        })
        .catch(error => {
          setError(`Information of ${newName} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== pToUpdate.id))
        })

      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)

      setNewName('')
      setNewNumber('')
    }

    else {

      pbservice
      .create(nameObject)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))})

      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    }

  const deleteData = (id, name) => {

    if(window.confirm(`Delete ${name}?`)) {
      pbservice
        .remove(id)
        setPersons(persons.filter(p => p.id !== id))
    }}

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} error={error}/>

      <Filter value={newSearch} onChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
    
      <h2>Numbers</h2>
      <Persons deleteData={deleteData} persons={persons} newSearch={newSearch}/>
    </div>     
  )
}

export default App