import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import phoneService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  // Success and error messages are controlled with errorMessage state
  const [errorMessage, setErrorMessage] = useState({})

  useEffect(() => {
    phoneService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const handleAddNumber = (event) => {
    event.preventDefault()
    const personObj = persons.find(person => person.name === newName)
    if (personObj) {
      // If confirm is true, the number is updated
      if(window.confirm(personObj.name + ' is already in the phonebook. Do you wish to update the phone number?')){
        const changedPerson = {...personObj, number: newNumber}
        phoneService.update(changedPerson).then(returnedNum => {
          setPersons(persons.map(person => person.id !== personObj.id ? person : returnedNum))
          // Success message
          setErrorMessage({...errorMessage, 'text':`${personObj.name} phone number was updated`, 'isError':false})
          setTimeout(() => {
            setErrorMessage({})
          }, 4000)
        }).catch(error => {
          // Error message
          setErrorMessage({...errorMessage, 'text':`${personObj.name} was already deleted from the server.`, 'isError':true})
          setTimeout(() => {
            setErrorMessage({})
          }, 4000)
        })
      } 
    } else {
      const newPersonObj = {
        name: newName,
        number: newNumber,
      }
      phoneService
        .create(newPersonObj)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          // Success message
          setErrorMessage({...errorMessage, 'text':`Added ${newPersonObj.name} to the PhoneBook`, 'isError':false})
          setTimeout(() => {
            setErrorMessage({})
          }, 4000)
        }).catch(error => {
          // const error_message = error.response
          const error_message = error.response.data.error
          setErrorMessage({...errorMessage, 'text': `${error_message}`, 'isError': true })
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonFilter = (event) => {
    const filteredString = event.target.value
    if (filteredString !== '') {
      const filteredArray = persons.filter((person) => {
        return person.name.toLowerCase().includes(filteredString.toLowerCase())
      })
      setFilteredPersons(filteredArray)
    } else {
      setFilteredPersons([])
    }
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm('Delete ' + name + ' ?')) {
      phoneService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
      // Success message
      setErrorMessage({...errorMessage, 'text':`Removed ${name} from the PhoneBook`, 'isError':false})
      setTimeout(() => {
        setErrorMessage({})
      }, 4000)
    }
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={errorMessage} />
      <Filter onChange={handlePersonFilter} />
      <h2>Add new person to the phonebook</h2>
      <PersonForm name={newName}
        number={newNumber}
        handleName={handleNameChange}
        handleNum={handleNumberChange}
        handleAddPerson={handleAddNumber} />
      <h2>Numbers</h2>
      <Persons filtered={filteredPersons} persons={persons} onDelete={handleDeletePerson} />
    </div>
  )

}

export default App
