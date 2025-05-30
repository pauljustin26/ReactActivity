import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function BodyClassManager({ darkMode }) {
  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-light", darkMode);
    return () => {
      document.body.classList.remove("bg-dark");
      document.body.classList.remove("text-light");
    };
  }, [darkMode]);
  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App BodyClassManager={BodyClassManager} />
  </StrictMode>
);
