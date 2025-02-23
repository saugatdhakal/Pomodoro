import { FaPause } from "react-icons/fa";
function PauseButton({ onClick }) {
  return (
    <button onClick={onClick} className="border-2 hover:bg-blue-200 text-black p-3 rounded-full text-2xl">
      <FaPause />
    </button>
  );
}

export default PauseButton;
