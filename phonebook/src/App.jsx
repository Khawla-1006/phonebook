import { useState } from 'react'

const Filter = (props) =>{
  return(
    <form>
    <div>
      filter shown with: <input 
        value={props.value}
        onChange={props.onChange}
      />
    </div>
    </form>
  )
}

const PersonForm = (props) =>{
  return(
    <form>
        <div>
          name: <input
              value={props.newName}
              onChange={props.handleNameChange}
          />
        </div>
        <br></br>
        <div>
          number: <input 
              value={props.newNumber}
              onChange={props.handleNumberChange}
          />
        </div>

        <div>
          <button type='submit' onClick={props.addName}>add</button>
        </div>
    </form>
  )
}

const Person = ({person}) =>{
  return (
    <li>{person.name} : {person.number}</li>
  )
}

const Persons = (props) =>{
  return(
    <div>
    <ul>
      {
        props.per.map(person =>{
              if(!props.val){    
                if(person.name.toLowerCase() == props.filtered.toLowerCase()){
                  return(<Person person={person} key={person.id}/>)
                }
              }else{
                return(<Person person={person} key={person.id}/>)
              }
           }
        )
      }
      </ul>
    </div>
  )
}



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


  const handlefilter = (event) =>{
    setfiltered(event.target.value)
    setval(false)
  }


  return(
    <div>
      <h2>Phonebook</h2>

      <Filter
      value={filtered}
      onChange={handlefilter}
      />

      <h2>add a new</h2>

      <PersonForm
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      addName={addName}
      />

        <h2>Numbers</h2>

        <Persons 
        per={persons}
        val={val}
        filtered={filtered}
        
        />
    </div>
  )



}


export default App
