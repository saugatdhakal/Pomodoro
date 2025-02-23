import { MdRestartAlt } from "react-icons/md";
function RestartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="border-2 hover:border-blue-200 hover:text-blue-500 border-black hover:bg-blue-200 text-black p-3 rounded-full text-2xl"
    >
      <MdRestartAlt />
    </button>
  );
}

export default RestartButton;
