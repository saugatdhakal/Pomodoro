import { FaPlay } from "react-icons/fa";
function StartButton({onClick}) {
  return (
    <button onClick={onClick} className="border-2 hover:bg-blue-200 text-black p-3 rounded-full text-2xl">
      <FaPlay />
    </button>
  );
}

export default StartButton;
