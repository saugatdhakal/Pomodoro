import { useState, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { FiClock, FiVolume2, FiSettings } from "react-icons/fi";
import TimerSettings from "./component/TimerSettings";
import GeneralSetting from "./component/GeneralSetting";
import SoundSetting from "./component/SoundSetting";
import { ThemeContext } from "./ThemeContext";

function Setting({
  toggleCard,
  pomodoroTimer,
  setPomodoroTimer,
  shortBreakTimer,
  setShortBreakTimer,
  longBreakTimer,
  setLongBreakTimer,
  audioFiles,
  selectedAudio,
  handleAudioChange,
  audioVolume,
  setAudioVolume,
  setAutomaticBreak,
  automaticBreak,
  automaticPomodoro,
  setAutomaticPomodoro,
  sessionFlag,
  setSessionFlag,
}) {
  const [activeSection, setActiveSection] = useState("Timers");
  const { theme } = useContext(ThemeContext);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-100">
      <div
        className={`rounded-2xl shadow-2xl w-11/12 max-w-3xl mx-4 ${
          theme === "dark"
            ? "bg-gray-900 text-white border border-gray-700"
            : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center p-6 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h1 className="text-2xl font-bold">Settings</h1>
          <button
            onClick={toggleCard}
            className={`p-2 rounded-full transition-colors ${
              theme === "dark"
                ? "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Navigation and Content Container */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-250px)] max-h-[500px]">
          {/* Navigation Sidebar */}
          <nav
            className={`md:w-56 border-b md:border-b-0 md:border-r ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <ul className="flex md:flex-col p-2">
              {["Timers", "Sounds", "General"].map((section) => (
                <li key={section} className="w-full">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section
                        ? theme === "dark"
                          ? "bg-blue-900/20 text-blue-400 font-medium"
                          : "bg-blue-50 text-blue-600 font-medium"
                        : theme === "dark"
                        ? "text-gray-400 hover:bg-gray-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section === "Timers" && <FiClock size={20} />}
                    {section === "Sounds" && <FiVolume2 size={20} />}
                    {section === "General" && <FiSettings size={20} />}
                    <span>{section}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Area */}
          <div
            className={`flex-1 p-6 overflow-y-auto ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="max-w-2xl mx-auto">
              {activeSection === "Timers" && (
                <TimerSettings
                  pomodoroTimer={pomodoroTimer}
                  setPomodoroTimer={setPomodoroTimer}
                  shortBreakTimer={shortBreakTimer}
                  setShortBreakTimer={setShortBreakTimer}
                  longBreakTimer={longBreakTimer}
                  setLongBreakTimer={setLongBreakTimer}
                />
              )}
              {activeSection === "Sounds" && (
                <SoundSetting
                  audioFiles={audioFiles}
                  selectedAudio={selectedAudio}
                  handleAudioChange={handleAudioChange}
                  audioVolume={audioVolume}
                  setAudioVolume={setAudioVolume}
                  theme={theme}
                />
              )}
              {activeSection === "General" && (
                <GeneralSetting
                  automaticBreak={automaticBreak}
                  setAutomaticBreak={setAutomaticBreak}
                  automaticPomodoro={automaticPomodoro}
                  setAutomaticPomodoro={setAutomaticPomodoro}
                  sessionFlag={sessionFlag}
                  setSessionFlag={setSessionFlag}
                  theme={theme}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
