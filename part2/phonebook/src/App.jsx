import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson, setSearchPerson] = useState('');

  useEffect(() => {
    console.log('effect');

    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('fulfilled');
      setPersons(response.data);
    });
  }, []);
  console.log('persons :', persons.length);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const hasPerson = persons.some((person) => person.name === newName);

    if (hasPerson) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleSearchPersonChange = (event) => {
    setSearchPerson(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchPerson={searchPerson}
        handleSearchPersonChange={handleSearchPersonChange}
      />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
