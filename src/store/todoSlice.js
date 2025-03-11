import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) throw new Error("Can't fetch");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodos = createAsyncThunk(
  "todos/add",
  async function (todosText, { rejectWithValue }) {
    try {
      const newTodo = {
        title: todosText,
        completed: false,
      };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to add todo");
      const data = await response.json();
      return { ...newTodo, id: data.id || new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo(state, action) {
      state.push({
        id: new Date().toISOString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleComplete(state, action) {
      const toggledTodo = state.find((todo) => todo.id === action.payload);
      toggledTodo.completed = !toggledTodo.completed;
    },
    removeTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
