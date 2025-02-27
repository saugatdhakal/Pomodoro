function GeneralSetting({automaticBreak, setAutomaticBreak}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-lg font-bold">General Setting</label>
      <div className="flex flex-col gap-4">
        <label className="text-lg font-bold">Theme</label>
        <select className="w-full mt-2 p-2 border rounded-md">
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
        <div className="flex flex-col gap-4">
              <p>{automaticBreak? "Enable" : "Disable"}</p>  
            <label className="text-lg font-bold">Automatic Break</label>
            <select
            value={automaticBreak ? "Enable" : "Disable"}
            onChange={(e) => setAutomaticBreak(e.target.value === "Enable"? true : false)}
            className="w-full mt-2 p-2 border rounded-md"
            >
            <option value="Enable">Enable</option>
            <option value="Disable">Disable</option>
            </select>
            </div>

      
    </div>
  );
}

export default GeneralSetting;