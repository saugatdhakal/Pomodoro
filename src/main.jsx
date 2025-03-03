import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Pomodoro from "./Pomodoro.jsx";
document.title = `Pomodoro Timer`;
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "./ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Pomodoro />
      <SpeedInsights />
    </ThemeProvider>
  </StrictMode>
);
