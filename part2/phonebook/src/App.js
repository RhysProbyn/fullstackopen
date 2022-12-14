import { useState, useEffect } from "react";
import axios from "axios";

const Person = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter names shown with:
      <input value={props.filterString} onChange={props.onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameOnChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.numberValue} onChange={props.numberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    if (
      persons.map((x) => x.name.toLowerCase()).includes(newName.toLowerCase())
    ) {
      handleDuplicate(newName);
    } else {
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterString(event.target.value);
  };

  const handleDuplicate = (name) => {
    window.alert(`${name} is already in the phonebook`);
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterString.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterString={filterString} onChange={handleFilterChange} />

      <h2>add a new name</h2>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={namesToShow} />
    </div>
  );
};

export default App;
