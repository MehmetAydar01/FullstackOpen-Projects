import Person from './Person';

const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
