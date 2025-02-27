import ThemeToggle from "../ThemeToggle";
function GeneralSetting({ automaticBreak, setAutomaticBreak, theme }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">General Setting</label>
      <ThemeToggle />
      <div className="flex flex-col gap-2">
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
      </div>
    </div>
  );
}

export default GeneralSetting;
