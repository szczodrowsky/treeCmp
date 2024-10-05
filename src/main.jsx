import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom"; // Użycie BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    {" "}
    {/* Opakowanie całej aplikacji w Router */}
    <App />
  </Router>
);
