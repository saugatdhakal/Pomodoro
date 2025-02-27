import { MdRestartAlt } from "react-icons/md";
import { getHoverClasses } from "../colors/colors";
import { ThemeContext } from "../ThemeContext";
import { useContext, useState } from "react";
function RestartButton({ onClick, activeMode }) {
  const { theme } = useContext(ThemeContext);

  const [rotated, setRotated] = useState(false);

  const handleClick = (event) => {
    setRotated((prev) => !prev);
    if (onClick) onClick(event); // Call the provided onClick function
  };

  return (
    <button
      onClick={handleClick}
      className={`border-2 cursor-pointer ${
        theme === "dark" ? "border-white text-white" : "border-black text-black"
      }  p-3 rounded-full text-2xl transition-colors ${getHoverClasses(
        activeMode
      )}`}
    >
      <MdRestartAlt
        className={`transform transition-transform duration-500 ${
          rotated ? "rotate-360" : "rotate-0"
        }`}
      />
    </button>
  );
}

export default RestartButton;
