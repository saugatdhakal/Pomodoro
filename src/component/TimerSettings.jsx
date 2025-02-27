import Slider from "./Slider";

function TimerSettings({
  pomodoroTimer,
  setPomodoroTimer,
  shortBreakTimer,
  setShortBreakTimer,
  longBreakTimer,
  setLongBreakTimer,
  theme,
}) {
  return (
    <div>
      <div className="">
        <h1 className="text-lg font-bold pl-4">Pomodoro</h1>
        <Slider
          darkMode={theme === "dark"}
          min={1}
          max={60}
          value={pomodoroTimer}
          onChange={setPomodoroTimer}
        />
      </div>
      <div className="">
        <h1 className="text-lg font-bold pl-4">Short Break</h1>
        <Slider
          darkMode={theme === "dark"}
          min={1}
          max={60}
          value={shortBreakTimer}
          onChange={setShortBreakTimer}
        />
      </div>
      <div className="">
        <h1 className="text-lg font-bold pl-4">Long Break</h1>
        <Slider
          darkMode={theme === "dark"}
          min={1}
          max={60}
          value={longBreakTimer}
          onChange={setLongBreakTimer}
        />
      </div>
    </div>
  );
}

export default TimerSettings;
