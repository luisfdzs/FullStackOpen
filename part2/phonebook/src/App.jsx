import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
       name: 'Arto Hellas',
       number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const updateNewName = (event) => setNewName(event.target.value)
  const updateNewNumber = (event) => setNewNumber(event.target.value)
  const addNewPerson = (event) => {
    event.preventDefault()
    const alreadyExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, {name: newName, number: newNumber}])
    }
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <p>name: <input onChange={updateNewName} value={newName}/></p>
        <p>number: <input onChange={updateNewNumber} value={newNumber}/></p>
        <button onClick={addNewPerson}>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App