import { FaPause } from "react-icons/fa";
import { getHoverClasses } from "../colors/colors";

function PauseButton({ onClick, activeMode }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 cursor-pointer border-black text-black p-3 rounded-full text-2xl transition-colors ${getHoverClasses(
        activeMode
      )}`}
    >
      <FaPause />
    </button>
  );
}

export default PauseButton;
