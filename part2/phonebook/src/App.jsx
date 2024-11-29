import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson, setSearchPerson] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // A GET request is made to the server.
    personService
      .getAllPerson()
      .then((initialData) => {
        setPersons(initialData);
      });
  }, []);

  // Add Person
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      // id keyi koymadım, JSON Server kendisi otomatik id atıyor.
    };

    const hasPerson = persons.some((person) => person.name === newName);

    if (hasPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const findPerson = persons.find((person) => person.name === newName);
        const updatePersonInfo = {...findPerson, number: newNumber}

        // A PUT request is made to the server.
        personService
          .updatePerson(findPerson.id, updatePersonInfo)
          .then((returnedUpdatedData) => {
            setPersons(persons.map((item) => item.id === findPerson.id ? returnedUpdatedData : item))
            setSuccessMessage(`Number updated`)
          })
          .catch((err) => {
            setErrorMessage(`Information of ${findPerson.name} has already been removed from server`)
          })
      }
    } else {
      // A POST request is made to the server.
      personService
        .createPerson(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${returnedPerson.name}`)
        })
    }

    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 3000)
    setNewName('');
    setNewNumber('');
  };

  // Delete Person
  const deletePerson = (id)  => {
    const findPerson = persons.find(person => person.id === id)

    if(window.confirm(`Delete ${findPerson.name}?`)) {
      // A DELETE request is made to the server.
      personService
        .deletePerson(id)
        .then((deletedPerson) => {
          setSuccessMessage(
            `${findPerson.name} was deleted`
          )
        }).catch((err) => {
          setErrorMessage(
            `the person ${findPerson.name} was already deleted from server`
          )
        })

      setPersons(persons.filter((item) => item.id !== id))
    }


    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 3000)
  }

  /* 
    ,
    {
      "id": "f580",
      "name": "QXyGeN Roshan",
      "number": "01-56-3334197"
    }
  */

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleSearchPersonChange = (event) => setSearchPerson(event.target.value);

  // Search Person
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
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

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
