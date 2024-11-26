const Filter = ({ searchPerson, handleSearchPersonChange }) => {
  return (
    <div>
      filter shown with:
      <input value={searchPerson} onChange={handleSearchPersonChange} />
    </div>
  );
};

export default Filter;
