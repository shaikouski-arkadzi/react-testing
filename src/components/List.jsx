const List = ({ items = [] }) => {
  return (
    <ul>
      {items.map((el) => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  );
};

export default List;
