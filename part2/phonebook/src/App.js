import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

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
      <div>debug: {newName}</div>
      <h1>Phonebook</h1>

      <div>
        filter names shown with:
        <input value={filterString} onChange={handleFilterChange} />
      </div>
      <h2>add a new name</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
