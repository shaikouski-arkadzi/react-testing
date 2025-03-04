const Search = ({ value, onChange, children, placeholder }) => {
  return (
    <label>
      {children}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Search;
