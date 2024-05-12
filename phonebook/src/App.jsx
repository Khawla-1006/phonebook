import { useState } from 'react'

const App = () =>{

  const [persons, setPersons] = useState([
  
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setfiltered] = useState('')
  const [val , setval] = useState(true)


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

  const handlefilter = (event) =>{
    setfiltered(event.target.value)
    setval(false)
  }

  const phonebook = () =>{
    console.log(val);

      {  val
        ? persons.map(person => <Person person={person} key={person.id}/> )
        : persons.filter(person => person.name.toLowerCase() == filtered.toLowerCase())
      }


   }
  


  return(
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
          filter shown with: <input 
            value={filtered}
            onChange={handlefilter}
          />
        </div>

      <h2>add a new</h2>
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
        </div>

      </form>

        <h2>Numbers</h2>
        <div>
        <ul>
          {
              // persons
              // .filter(person => person.name.toLowerCase() == filter.toLowerCase())
              // .map(person => 
              //   <Person person={person} key={person.id}/>
              // )
        // val
        // ? persons.map(person => <Person person={person} key={person.id}/> )
        // : persons.filter(person => person.name.toLowerCase() == filtered.toLowerCase())
phonebook()
          }
          </ul>
        </div>
    </div>
  )



}


export default App
