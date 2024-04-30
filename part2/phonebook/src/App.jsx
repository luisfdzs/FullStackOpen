import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const updateNewName = (event) => setNewName(event.target.value)
  const addNewPerson = (event) => {
    event.preventDefault()
    const alreadyExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, {name: newName}])
    }
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={updateNewName} value={newName}/>
        </div>
        <div>
          <button onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App