import { VscSettings } from "react-icons/vsc";
import { TbReload } from "react-icons/tb";
function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4">
            <div className="text-2xl font-bold">Pomodoro Timer</div>
            <div className="flex flex-row items-center gap-4 text-4xl ">
            <VscSettings className="cursor-pointer hover:text-blue-500 hover:bg-blue-100 hover:rounded p-1" />
            <TbReload className="cursor-pointer hover:text-blue-500 hover:bg-blue-100 hover:rounded p-1"  />
            </div>
        </nav>
    )
}
export default Navbar;