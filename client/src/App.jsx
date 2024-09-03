import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  let [input, setInput] = useState("");
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
      })
      .catch(error => {
        // upon failure, show error message
      });
  }, []);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const addTask = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: input })
    });
    // Continue fetch request here
  };

  const updateTask = id => {
    // update task from database
    // upon success, update tasks
    // upon failure, show error message
  };

  const deleteTask = id => {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
  };

  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          New Task:
          <input onChange={e => handleChange(e)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
