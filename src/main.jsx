import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Pomodoro from "./Pomodoro.jsx";
document.title = `Pomodoro Timer`;
import { ThemeProvider } from "./ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Pomodoro />
    </ThemeProvider>
  </StrictMode>
);
