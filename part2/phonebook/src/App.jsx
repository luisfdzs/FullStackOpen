import { useState } from 'react'

const App = () => {

  const initalData = [{name: 'Arto Hellas', number: '040-1234567'}]
  const [persons, setPersons] = useState(initalData) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [searchedPersons, setSearchedPersons] = useState(persons)

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
    const alreadyExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = [...persons, {name: newName, number: newNumber}]
      setPersons(newPersons)
      setSearchedPersons(newPersons)
    }
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={searchedName} onChange={updateSearchedName}/></p>
      <form>
        <p>name: <input onChange={updateNewName} value={newName}/></p>
        <p>number: <input onChange={updateNewNumber} value={newNumber}/></p>
        <button onClick={addNewPerson}>add</button>
      </form>
      <h2>Numbers</h2>
      {searchedPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App