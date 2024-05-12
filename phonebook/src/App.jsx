import { useState } from 'react'

const App = () =>{

  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '123-456-7890',
      id : 1
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addName = (event) =>{
    event.preventDefault();
  
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i].name);
        if(persons[i].name.toLowerCase() === newName.toLowerCase()){
            alert(`${newName} is already added to phonebook`)
        }
        if(persons[i].number === newNumber){
          alert(`${newNumber} is already added to phonebook`)
        }
    }

    const newNameObject = {
    name : newName,
    number: newNumber,
    id: persons.length + 1
    }
    setPersons(persons.concat(newNameObject))
    setNewName('add name')
    setNewNumber('add number')
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const Person = ({person}) =>{
    return (
      <li>{person.name} : {person.number}</li>
    )
  }


  return(
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
          name: <input
              value={newName}
              onChange={handleNameChange}
          />
        </div>
        <br></br>
        <div>
          number: <input 
              value={newNumber}
              onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit' onClick={addName}>add</button>
          <ul>
          {persons.map(person => 
            <Person person={person} key={person.id}/>
          )}
          </ul>
        </div>
      </form>

        <h2>Numbers</h2>
        <div>
           debug : {newName}
        </div>
    </div>
  )



}


export default App
