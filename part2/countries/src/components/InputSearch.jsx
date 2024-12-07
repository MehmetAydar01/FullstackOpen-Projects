const InputSearch = ({ searchValue, handleChange, text }) => {
  return (
    <div>
      <span style={{ marginRight: '0.5rem' }}>{text}</span>
      <input type='text' value={searchValue} onChange={handleChange} />
    </div>
  );
};

export default InputSearch;
