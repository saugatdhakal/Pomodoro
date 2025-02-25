import { MdRestartAlt } from "react-icons/md";
import { getHoverClasses } from "../colors/colors";

function RestartButton({ onClick, activeMode }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 cursor-pointer border-black text-black p-3 rounded-full text-2xl transition-colors ${getHoverClasses(activeMode)}`}
    >
      <MdRestartAlt />
    </button>
  );
}

export default RestartButton;
