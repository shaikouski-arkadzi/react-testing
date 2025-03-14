import { useState, useEffect } from "react";
import List from "./List";
import Search from "./Search";
import TodoList from "./TodoList";
import AddTodoItem from "./AddTodoItem";

const initData = ["Text 1", "Text 2", "Text 3"];

const Layout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(initData);
  useEffect(() => {
    setData(
      initData.filter((el) =>
        el.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  return (
    <>
      <Search
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      >
        Find:
      </Search>
      <List items={data} />
      {"---------------------------------------------"}
      <br />
      <AddTodoItem />
      <TodoList />
    </>
  );
};

export default Layout;
