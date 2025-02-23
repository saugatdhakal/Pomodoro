import { FaPause } from "react-icons/fa";
import { modeColors } from "../colors/colors";
function PauseButton({ onClick, activeMode }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 hover:border-${modeColors[activeMode].tailwindClass}
       hover:text-blue-500 
       border-black hover:bg-blue-200 
        text-black p-3 rounded-full text-2xl`}
    >
      <FaPause />
    </button>
  );
}

export default PauseButton;
