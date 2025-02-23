import { FaPlay } from "react-icons/fa";
import { modeColors } from "../colors/colors";
function StartButton({ onClick, activeMode }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-black hover:border-${modeColors[activeMode].tailwindClass} hover:text-blue-500 hover:bg-blue-200 text-black p-3 rounded-full text-2xl`}
    >
      <FaPlay />
    </button>
  );
}

export default StartButton;
