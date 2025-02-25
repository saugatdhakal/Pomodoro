import { IoClose } from "react-icons/io5";
import CustomSlider from "./component/Slider";

function Card({
  toggleCard,
  pomodoroTimer,
  setPomodoroTimer,
  shortBreakTimer,
  setShortBreakTimer,
  longBreakTimer,
  setLongBreakTimer,
  isCardOpen,
}) {
  return (
    <div className=" relative w-full flex justify-center items-center">
      <div className=" absolute z-100 h-auto  h-max-h-82 top-5 overflow-y-auto flex flex-col bg-white rounded-lg p-4 shadow-sm border w-11/12 sm:w-4/5 md:w-3/4 lg:w-5/8 border-slate-200">
        <div className="flex justify-between items-end mb-4 ">
          <h1 className="text-2xl font-bold">Setting</h1>
          <button
            onClick={toggleCard}
            className="text-2xl cursor-pointer font-bold p-1 border-2 border-slate-300 rounded-full"
          >
            <IoClose />
</button>
        </div>
        <div className="flex flex-col">
          <div className="w-full">
            <h1 className="text-lg font-bold pl-5">Pomodoro</h1>
            <CustomSlider
              min={5}
              max={60}
              value={pomodoroTimer}
              onChange={setPomodoroTimer}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold pl-5">Short Break</h1>
            <CustomSlider
              min={5}
              max={60}
              value={shortBreakTimer}
              onChange={setShortBreakTimer}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold pl-5">Long Break</h1>
            <CustomSlider
              min={5}
              max={60}
              value={longBreakTimer}
              onChange={setLongBreakTimer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
