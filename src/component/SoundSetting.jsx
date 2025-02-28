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
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <label
          className={`block text-lg font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Alert Sound
        </label>
        <select
          value={audioFiles.find((file) => file.file === selectedAudio)?.name}
          onChange={handleAudioChange}
          className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        >
          {audioFiles.map((file, index) => (
            <option key={index} value={file.name}>
              {file.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          className={`block text-lg font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Volume
        </label>
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
  );
}

export default SoundSetting;
