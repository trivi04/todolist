import React, { useState } from "react";
import "./styles.css"; // Make sure to have a corresponding CSS file

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editedTodo, setEditedTodo] = useState(null);

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo
    };
    setList([...list, newTodo]);

    setInput("");
  };

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const editTodo = (id) => {
    const todoToEdit = list.find((todo) => todo.id === id);
    setEditedTodo(todoToEdit);
    setInput(todoToEdit.todo);
  };

  const updateTodo = () => {
    const updatedList = list.map((todo) =>
      todo.id === editedTodo.id ? { ...todo, todo: input } : todo
    );

    setList(updatedList);
    setEditedTodo(null);
    setInput("");
  };

  return (
    <div className="app-container">
      <h1>Task List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />
        {editedTodo ? (
          <div className="button-group">
            <button onClick={updateTodo}>Update</button>
            <button onClick={() => setEditedTodo(null)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => addTodo(input)}>Add</button>
        )}
      </div>
      <ul className="task-list">
        {list.map((todo) => (
          <li key={todo.id}>
            {todo.todo}
            <div>
              <button className="edit" onClick={() => editTodo(todo.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
