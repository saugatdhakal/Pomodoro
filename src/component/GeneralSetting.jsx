import ThemeToggle from "../ThemeToggle";
function GeneralSetting({
  automaticBreak,
  setAutomaticBreak,
  theme,
  automaticPomodoro,
  setAutomaticPomodoro,
  sessionFlag,
  setSessionFlag,
}) {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
     
      <ThemeToggle />
      <div className="flex flex-col gap-4 w-full">
        <label className="text-lg font-bold">Automatic Break</label>
        <select
          value={automaticBreak ? "Enable" : "Disable"}
          onChange={(e) =>
            setAutomaticBreak(e.target.value === "Enable" ? true : false)
          }
          className={`w-full mt-2 p-2 border rounded-md 
            ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }
            appearance-none`}
        >
          <option value="Enable">Enable</option>
          <option value="Disable">Disable</option>
        </select>

        <label className="text-lg font-bold">Automatic Pomodoro</label>
        <select
          value={automaticPomodoro ? "Enable" : "Disable"}
          onChange={(e) =>
            setAutomaticPomodoro(e.target.value === "Enable" ? true : false)
          }
          className={`w-full mt-2 p-2 border rounded-md 
            ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }
            appearance-none`}
        >
          <option value="Enable">Enable</option>
          <option value="Disable">Disable</option>
        </select>
        <div className="flex flex-col gap-4 w-full">
          <label className="text-lg font-bold">Session Flag</label>
          <div className="flex items-center gap-2 w-full">
          <button 
            onClick={() => setSessionFlag(!sessionFlag)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 
              ${sessionFlag ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span
              className={`transform transition ease-in-out duration-200 
                ${sessionFlag ? "translate-x-5" : "translate-x-1"} 
                inline-block w-4 h-4 bg-white rounded-full`}
            />
          </button>
          <label className="w-full">
          Use the Pomodoro sequence: Pomodoro → short break, repeat 4x, then one long break </label>
        </div>
          </div>
          
      </div>
    </div>
  );
}

export default GeneralSetting;
