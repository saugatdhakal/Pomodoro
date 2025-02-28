function PomodoroMode({ activeMode, onModeChange, isRunning,pomodoroSession, shortBreakSession, longBreakSession }) {
  const buttonClass = (mode) => {
    const colors = {
      pomodoro: {
        active: "border-blue-500 text-blue-500",
        hover: "hover:border-blue-200 hover:text-blue-500",
      },
      shortBreak: {
        active: "border-green-500 text-green-500",
        hover: "hover:border-green-200 hover:text-green-500",
      },
      longBreak: {
        active: "border-purple-500 text-purple-500",
        hover: "hover:border-purple-200 hover:text-purple-500",
      },
    };

    const isDisabled = isRunning && activeMode !== mode;

    return `
      p-2 
      rounded
      border-b-2
      ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      ${
        activeMode === mode
          ? colors[mode].active
          : `border-transparent ${!isDisabled && colors[mode].hover}`
      }
    `;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-2 mb-4">
      <button
        className={buttonClass("pomodoro")}
        onClick={() => !isRunning && onModeChange("pomodoro")}
        disabled={isRunning && activeMode !== "pomodoro"}
      >
        Pomodoro {pomodoroSession}  
      </button>
      <button
        className={buttonClass("shortBreak")}
        onClick={() => !isRunning && onModeChange("shortBreak")}
        disabled={isRunning && activeMode !== "shortBreak"}
      >
        Short Break {shortBreakSession}
      </button>
      <button
        className={buttonClass("longBreak")}
        onClick={() => !isRunning && onModeChange("longBreak")}
        disabled={isRunning && activeMode !== "longBreak"}
      >
        Long Break {longBreakSession}
      </button>
    </div>
  );
}

export default PomodoroMode;
