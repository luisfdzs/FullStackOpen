
// Imports
import { useEffect, useState } from 'react'
import personsService from './services/persons.js'

// Components
const Notification = ({message, style}) => {  
  return <p style={style}>{message}</p>
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
      {searchedPersons.map(person => <p key={person.id}>{person.name} {person.number}<button onClick={() => deletePerson(person)}>delete</button></p>)}
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
  const [notification, setNotification] = useState('')
  const [notificationError, setNotificationError] = useState('')

  // Hook
  useEffect(() => {
    personsService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setSearchedPersons(response.data)
    })
    .catch(() => {
      setNotificationError('Error getting the information from the phone book')        
        setTimeout(() => {
          setNotificationError(null)
        }, 2000);
    })
  },[])

  // Functions
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
        setNotification(`${newPerson.name} number is added to phonebook`)        
        setTimeout(() => {
          setNotification(null)
        }, 2000);
      })
      .catch(() => {
        setNotificationError(`${newPerson.name} could not be added`)
        setTimeout(() => {
          setNotificationError(null)
        }, 2000);
      })
    }
    clean()
  }
  const updatePerson = (newPerson) => {
    personsService
    .update(newPerson)
    .then(() => {
      const newPersons = [...persons.filter(person => person.name !== newPerson.name), newPerson]
      setPersons(newPersons)
      setNotification(`${newPerson.name} number is updated to ${newPerson.number}`)        
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    })    
    .catch(() => {
      setNotificationError(`Information of ${newPerson.name} has already removed from server`)
      setTimeout(() => {
        setNotificationError(null)
      }, 2000);
    })
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
      })
      .catch(() => {
        setNotificationError(`${_person.name} could not be deleted`)
        setTimeout(() => {
          setNotificationError(null)
        }, 2000);
      })
    }
    clean()
  }

  // Render
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorNotificationStyle = {...notificationStyle, color: 'red'}
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        {notificationError ? <Notification style={errorNotificationStyle} message={notificationError}/> : null }
        {notification ? <Notification style={notificationStyle} message={notification}/> : null}
        <SearchFilter searchedName={searchedName} updateSearchedName={updateSearchedName}/>
        <h3>Add a new</h3>
        <PersonForm newName={newName} newNumber={newNumber} updateNewName={updateNewName} updateNewNumber={updateNewNumber} addNewPerson={addNewPerson}/>
        <h3>Numbers</h3>
        <Persons searchedPersons={searchedPersons} deletePerson={deletePerson}/>
      </div>
    </>
  ) 
}

export default App