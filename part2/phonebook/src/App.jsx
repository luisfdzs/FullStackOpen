// Imports
import { useEffect, useState } from 'react'
import personsService from './services/persons.js'

// Components
const Notification = ({message, isError}) => {
  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return message ? <p style={style}>{message}</p> : null
}
const SearchFilter = ({searchedName, updateSearchedName}) => {
  return <p>filter shown with <input value={searchedName} onChange={updateSearchedName}/></p>
}
const PersonForm = ({newName, newNumber, updateNewName, updateNewNumber, addNewPerson}) => {
  return (
    <form>
      <p>name: <input onChange={updateNewName} value={newName}/></p>
      <p>number: <input onChange={updateNewNumber} value={newNumber}/></p>
      <button onClick={addNewPerson}>add</button>
    </form>
  )
}
const Persons  = ({searchedPersons, deletePerson}) => {
  return (
    <>
      {searchedPersons.length ? searchedPersons.map(person => <p key={person.id}>{person.name} {person.number}<button onClick={() => deletePerson(person)}>delete</button></p>) : <p>No data avaiable</p>}
    </>
  )
}

// Main Component App
const App = () => {

  // States
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [searchedPersons, setSearchedPersons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)
  const [refresh, setRefresh] = useState(false)

  // Hook
  useEffect(() => {
    personsService
    .getAll()
    .then(response => {
      const persons = response.data.map(person => ({...person, id: person.id.toString()}))
      setPersons(persons)
      setSearchedPersons(persons)
      setIsLoading(false)
    })
    .catch(() => {
      sendNotification('Error getting the information from the phone book', true)
      setIsLoading(false)
    })
  },[refresh])
  
  // Functions
  const sendNotification = (message, isError = false) => {
    setNotification(message)
    setIsError(isError)
    setTimeout(() => {
      setNotification(null)
    }, 2000);
  }
  const clean = () => {
    setSearchedName('')
    setNewName('')
    setNewNumber('')
    setSearchedPersons(persons)
  }
  const updateNewName = (event) => setNewName(event.target.value)
  const updateNewNumber = (event) => setNewNumber(event.target.value)
  const updateSearchedName = (event) => {
    const name = event.target.value
    const newSearchedPersons = persons.filter(person => person.name.toLowerCase().includes(name.toLowerCase()))
    setSearchedName(name)
    setSearchedPersons(newSearchedPersons)
  }
  const addNewPerson = (event) => {
    event.preventDefault()
    const alreadyExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (alreadyExists) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        updatePerson({...alreadyExists, number: newNumber})
      }
    } else {
      const id = (Math.max(...persons.map(person => person.id)) + 1).toString();
      const newPerson = {name: newName, number: newNumber, id: id}
      const newPersons = [...persons, newPerson]
      personsService.create(newPerson)
      .then(() => {
        setPersons(newPersons)
        setSearchedPersons(newPersons)
        sendNotification(`${newPerson.name} number is added to phonebook`)
        setRefresh(!refresh)
      })
      .catch(() => sendNotification(`${newPerson.name} could not be added`, true))
    }
    clean()
  }
  const updatePerson = (newPerson) => {
    personsService
    .update(newPerson)
    .then(() => {
      const newPersons = [...persons.filter(person => person.name !== newPerson.name), newPerson].sort((a, b) => a.id - b.id)
      setPersons(newPersons)
      setSearchedPersons(newPersons)
      sendNotification(`${newPerson.name} number is updated to ${newPerson.number}`)
    })    
    .catch(() => sendNotification(`Information of ${newPerson.name} has already removed from server`, true))
    clean()
  }
  const deletePerson = (_person) => {
    const confirm = window.confirm(`Delete ${_person.name}?`)
    if (confirm) {
      const updatedPersons = persons.filter(person => person.id !== _person.id)
      console.log()
      personsService.remove(_person.id)
      .then(() => {
        setPersons(updatedPersons)
        setSearchedPersons(updatedPersons)
        sendNotification(`${_person.name} deleted from phonebook`)
      })
      .catch(() => sendNotification(`${_person.name} could not be deleted`, true))
    }
    clean()
  }

  // Render
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        {notification ? <Notification message={notification} isError={isError}/> : null}
        <SearchFilter searchedName={searchedName} updateSearchedName={updateSearchedName}/>
        <h3>Add a new</h3>
        <PersonForm newName={newName} newNumber={newNumber} updateNewName={updateNewName} updateNewNumber={updateNewNumber} addNewPerson={addNewPerson}/>
        <h3>Numbers</h3>
        {isLoading ? <p>Loading ...</p> : <Persons searchedPersons={searchedPersons} deletePerson={deletePerson}/>}
      </div>
    </>
  ) 
}

export default App