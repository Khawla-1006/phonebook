import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/person'
import person from './services/person'

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

const Person = (props) =>{
  console.log(props)
  return (
    <li>{props.name} : {props.number} 

    <button onClick={props.deletePerson}>delete</button>
    </li>
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
                  return(
                  <Person 
                  person={person} 
                  key={person.id}
                  //delete person property
                  deletePerson={person.deletePerson}
                  />)
                }
              }else{
                return(<Person 
                  person={person} 
                  key={person.id}
                  
                  />)
              }
           }
        )
      }
      </ul>
    </div>
  )
}

const App = () =>{

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setfiltered] = useState('')
  const [val , setval] = useState(true)


  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)
    })
  }, [])

  const deletePerson = () => {
    const per = persons.find(p => p.id === id)
    const changedPerson = {...per}
      personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        window.confirm(`Delete ${returnedPerson} ?`)
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))      
      })
      .catch(error => {
          alert("delete failed!")
        }
      )  
  }
  
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

    personService
    .create(newNameObject)
    .then(returnedPerson => {
      console.log(returnedPerson);
      setPersons(persons.concat(returnedPerson))
      setNewName('add name')
      setNewNumber('add number')
    })
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
        deletePerson = {() => deletePerson()}
        />
    </div>
  )
}


export default App
