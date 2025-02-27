import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return <>
    <label className="text-lg font-bold">Theme</label>
        <select className="w-full mt-2 p-2 border rounded-md"
        onChange={(e) => setTheme(e.target.value)}
        value={theme}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
    
    </>;
}