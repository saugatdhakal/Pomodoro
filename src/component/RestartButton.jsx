import { MdRestartAlt } from "react-icons/md";
import { getHoverClasses } from "../colors/colors";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
function RestartButton({ onClick, activeMode }) {
      const { theme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={onClick}
      className={`border-2 cursor-pointer ${theme==="dark"?'border-white text-white' : 'border-black text-black' }  p-3 rounded-full text-2xl transition-colors ${getHoverClasses(activeMode)}`}
    >
      <MdRestartAlt />
    </button>
  );
}

export default RestartButton;
