import Slider from "./Slider";
function SoundSetting({
  audioFiles,
  selectedAudio,
  handleAudioChange,
  audioVolume,
  setAudioVolume,
  theme,
}) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <label className="text-lg font-bold">Select Alert Sound:</label>
        <select
          value={audioFiles.find((file) => file.file === selectedAudio)?.name}
          onChange={handleAudioChange}
          className={`w-full mt-2 p-2 border rounded-md 
            ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }
            appearance-none`}
        >
          {audioFiles.map((file, index) => (
            <option key={index} value={file.name}>
              {file.name}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-1">
          <label className="text-lg font-bold">Volume</label>
          <Slider
            showValueInPercentage={true}
            leftLabel="Mute"
            rightLabel="Max"
            darkMode={theme === "dark"}
            min={0}
            max={1}
            step={0.1}
            value={audioVolume}
            onChange={setAudioVolume}
          />
        </div>
      </div>
    </>
  );
}

export default SoundSetting;
