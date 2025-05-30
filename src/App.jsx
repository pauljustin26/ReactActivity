import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function App({ BodyClassManager }) {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="App">
      {BodyClassManager && <BodyClassManager darkMode={darkMode} />}
      <div className="d-flex justify-content-end align-items-center pt-4 pe-4">
        <button
          className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`}
          onClick={toggleDarkMode}
          type="button"
          aria-label="Toggle dark mode"
        >
          <FontAwesomeIcon icon={darkMode ? faMoon : faSun} size="lg" />
        </button>
      </div>
      <TodoList darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;
