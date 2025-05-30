import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTrash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function TodoList({ darkMode }) {
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState([]);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selected, setSelected] = useState([]);
  const [inputError, setInputError] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setInputError("icon");
      return;
    }
    setTodos([...todos, input.trim()]);
    setInput("");
    setShowInput(false);
    setInputError("");
  };

  // Helper to toggle selection
  const toggleSelect = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleDelete = () => {
    if (selected.length === 0) return;
    setTodos(todos.filter((_, i) => !selected.includes(i)));
    setSelected([]);
  };

  const handleFinish = () => {
    if (selected.length === 0) return;
    setFinished([...finished, ...todos.filter((_, i) => selected.includes(i))]);
    setTodos(todos.filter((_, i) => !selected.includes(i)));
    setSelected([]);
  };

  // Card classes for modern look
  const cardClass = `card shadow-lg border-0 rounded-4 px-0 ${
    darkMode ? "bg-light text-dark" : "bg-white text-dark"
  }`;
  const inputClass = `form-control border-0 rounded-pill px-3 py-2 ${
    darkMode ? "bg-white text-dark" : "bg-light text-dark"
  }`;
  const listItemClass = `list-group-item border-0 rounded-3 mb-2 d-flex align-items-center todo-hover ${
    darkMode ? "bg-white text-dark" : "bg-light text-dark"
  }`;
  const emptyListClass = `list-group-item text-muted text-center border-0 bg-transparent`;
  const finishedListItemClass = `list-group-item border-0 rounded-3 mb-2 d-flex align-items-center bg-success bg-opacity-25 text-success-emphasis`;

  return (
    <div
      className="container mt-5 d-flex flex-column align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className={cardClass} style={{ width: "100%", maxWidth: 480 }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <h2
              className="card-title mb-0 fw-bold"
              style={{ letterSpacing: 1 }}
            >
              To-do List
            </h2>
          </div>
          <ul className="list-group mb-3 border-0">
            {todos.length === 0 && (
              <li className={emptyListClass}>No to-do's yet!</li>
            )}
            {todos.map((todo, idx) => (
              <li
                key={idx}
                className={
                  listItemClass +
                  (selected.includes(idx)
                    ? " border-primary border-2 shadow-sm"
                    : "")
                }
                style={{
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, border 0.2s",
                }}
                onClick={() => toggleSelect(idx)}
              >
                <input
                  type="checkbox"
                  name="todoSelect"
                  checked={selected.includes(idx)}
                  onChange={() => toggleSelect(idx)}
                  className="form-check-input me-3"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span style={{ flex: 1, fontWeight: 500 }}>{todo}</span>
              </li>
            ))}
          </ul>
          {selected.length > 0 && (
            <div className="d-flex gap-2 mb-4 justify-content-center">
              <button
                className="btn btn-outline-danger rounded-pill px-4 fw-semibold"
                onClick={handleDelete}
                aria-label="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                className="btn btn-outline-success rounded-pill px-4 fw-semibold"
                onClick={handleFinish}
                aria-label="Mark as Finished"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          )}
          {!showInput && (
            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn btn-dark btn-lg rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: 56, height: 56 }}
                onClick={() => setShowInput(true)}
                aria-label="Add todo"
              >
                <FontAwesomeIcon icon={faPlus} size="lg" />
              </button>
            </div>
          )}
          {showInput && (
            <form
              onSubmit={handleAdd}
              className="d-flex mb-4 gap-2 flex-column align-items-center"
            >
              {inputError && (
                <div
                  className="alert alert-danger py-2 px-3 w-100 text-center mb-2"
                  style={{ fontSize: "0.95rem" }}
                >
                  <FontAwesomeIcon icon={faCircleExclamation} />
                </div>
              )}
              <div className="d-flex w-100 gap-2">
                <input
                  type="text"
                  className={inputClass}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (inputError) setInputError("");
                  }}
                  placeholder="Add a new todo"
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn btn-dark rounded-pill px-4 fw-semibold"
                  aria-label="Add"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </form>
          )}
          {finished.length > 0 && (
            <div className="mt-4 pt-3 border-top">
              <h5 className="text-center mb-3 text-success fw-bold">
                Finished To-dos
              </h5>
              <ul className="list-group border-0">
                {finished.map((todo, idx) => (
                  <li key={idx} className={finishedListItemClass}>
                    <span className="ms-2" style={{ fontWeight: 500 }}>
                      {todo}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .todo-hover:hover {
          box-shadow: 0 0 0 0.2rem #0d6efd33;
        }
      `}</style>
    </div>
  );
}

export default TodoList;
