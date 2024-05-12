import { useState } from 'react'

const App = () =>{

  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id : 1
    }
  ])
  const [newName, setNewName] = useState('')


  const addName = (event) =>{
    event.preventDefault();
  
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i].name);
        if(persons[i].name.toLowerCase() === newName.toLowerCase()){
            alert(`${newName} is already added to phonebook`)
        }
    }

    const newNameObject = {
    name : newName,
    id: persons.length + 1
    }
    setPersons(persons.concat(newNameObject))
    setNewName('add names!')
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const Person = ({person}) =>{
    return (
      <li>{person.name}</li>
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
