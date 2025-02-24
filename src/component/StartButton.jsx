import { FaPlay } from "react-icons/fa";
import { getHoverClasses } from "../colors/colors";

function StartButton({ onClick, activeMode }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-black text-black p-3 rounded-full text-2xl transition-colors ${getHoverClasses(
        activeMode
      )}`}
    >
      <FaPlay />
    </button>
  );
}

export default StartButton;
