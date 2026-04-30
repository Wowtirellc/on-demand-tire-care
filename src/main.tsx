import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Restore SPA path after GitHub Pages 404.html redirect
const redirectPath = sessionStorage.getItem("spa-redirect");
if (redirectPath) {
  sessionStorage.removeItem("spa-redirect");
  if (redirectPath !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(null, "", redirectPath);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
