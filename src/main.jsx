import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../scss/custom.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(<App />);
