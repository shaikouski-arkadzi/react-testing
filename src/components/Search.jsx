const Search = ({ value, onChange, children, placeholder }) => {
  return (
    <label>
      {children}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid="search textbox"
      />
    </label>
  );
};

export default Search;
