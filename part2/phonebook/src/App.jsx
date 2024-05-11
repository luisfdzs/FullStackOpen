/* eslint-disable react/prop-types */
// Imports
import { useEffect, useState } from 'react'
import personsService from './services/persons.js'
import './App.css'
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
  return <p>Filter shown with: <input value={searchedName} onChange={updateSearchedName}/></p>
}
const PersonForm = ({newName, newNumber, updateNewName, updateNewNumber, addNewPerson}) => {
  return (
    <form style={{display: 'flex'}}>
      <div>
        <p>Name: <input id='input-name' style={{marginLeft: 23}} onChange={updateNewName} value={newName}/></p>
        <p>Number: <input style={{marginLeft: 5}} onChange={updateNewNumber} value={newNumber}/></p>
      </div>
      <button style={{ background: 'none', border: 'none' }} onClick={addNewPerson}>
        <img src='images/add.png' style={{ width: 30, height: 30, margin: 'auto', paddingLeft: 34 }} alt="Add" />
      </button>
    </form>
  )
}
const Persons  = ({searchedPersons, deletePerson}) => {
  return (
    <>
      {searchedPersons.length 
      ? searchedPersons.map(person => {
        return (
          <div key={person.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            border: '0.1px solid',
            marginBottom: 5
            }}>
            <div>
              <div style={{
                display: 'flex',
                height: 30
              }}>
                <img style={{margin: 5}} src='images/name.png'/>
                <p style={{alignContent: 'center', marginLeft: 5}}>Name: {person.name}</p>
              </div>
              <div style={{
                display: 'flex',
                height: 30
              }}>
                <img style={{margin: 5}} src='images/number.png'/>
                <p style={{alignContent: 'center', marginLeft: 5}}>Number: {person.number}</p>
              </div>
            </div>
            <img style={{
              width: 33,
              height: 33,
              margin: 'auto 8px'
            }} src='images/delete.png' onClick={() => deletePerson(person)}></img>
          </div>
        )
      }) 
      : <p>No data avaiable</p>}
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
    }, 3000);
  }
  const sendNotificationError = (error) => {
    const data = error.response.data
    const a = data.indexOf('<pre>') + 5
    const b = data.indexOf('</pre>')
    const c = data.indexOf('<br>')
    const errorMssg = data.substring(a, b > c && c !== -1 ? c : b)
    sendNotification(errorMssg, true)
  }
  const clean = () => {
    setSearchedName('')
    setNewName('')
    setNewNumber('')
    setSearchedPersons(persons)
    document.getElementById('input-name').focus()
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
      .catch((error) => sendNotificationError(error))
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
    .catch((error) => sendNotificationError(error))
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
      .catch((error) => sendNotificationError(error))
    }
    clean()
  }

  // Render
  return (
    <>
      <div className='all-content borde-chulo'>
        <h2 className='title'>Phonebook</h2>
        {notification ? <Notification message={notification} isError={isError}/> : null}
        <SearchFilter searchedName={searchedName} updateSearchedName={updateSearchedName}/>
        <h3 className='subtitle'>Add a new</h3>
        <PersonForm newName={newName} newNumber={newNumber} updateNewName={updateNewName} updateNewNumber={updateNewNumber} addNewPerson={addNewPerson}/>
        <h3 className='subtitle'>Numbers</h3>
        {isLoading ? <p>Loading ...</p> : <Persons searchedPersons={searchedPersons} deletePerson={deletePerson}/>}
        <br />
      </div >
    </>
  ) 
}

export default App