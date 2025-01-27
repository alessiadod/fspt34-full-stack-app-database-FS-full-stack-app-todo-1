import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  let [input, setInput] = useState("");
  let [tasks, setTasks] = useState([]);

  //async await
  useEffect(() => {
    // fetch("/api/todos")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     // upon success, update tasks
    //     console.log(json);
    //   })
    //   .catch((error) => {
    //     // upon failure, show error message
    //   });

    const getTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getTodos();
  }, []);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (input.trim() === "") return;
    addTask();
  };

  const addTask = async () => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: input })
      });
      // Continue fetch request here
      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateTask = async id => {
    // update task from database
    // upon success, update tasks
    // upon failure, show error message
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ complete: true })
      });
      if (response.ok) {
        const updateTask = await response.json();
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async id => {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To Do List</h1>
      <form onSubmit={e => handleSubmit(e)} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a task"
            value={input}
            onChange={e => handleChange(e)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </form>
      <div>
        <ul className="list-group">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.complete ? "text-decoration-line-through" : ""
              }`}
            >
              {task.text}
              <div>
                <button
                  className={`btn btn-sm me-2 ${
                    task.complete ? "btn-warning" : "btn-success"
                  }`}
                  onClick={() => updateTask(task.id)}
                >
                  {task.complete ? "Undo" : "Complete"}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
