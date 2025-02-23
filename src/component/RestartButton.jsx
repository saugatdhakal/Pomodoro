import { MdRestartAlt } from "react-icons/md";
function RestartButton({ onClick }) {
  return (
    <button onClick={onClick} className="border-2 hover:bg-blue-200 text-black p-3 rounded-full text-2xl">  
      <MdRestartAlt />
    </button>
  );
}

export default RestartButton;
