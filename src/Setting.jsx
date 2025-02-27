import { useState,useContext } from "react";
import { IoClose } from "react-icons/io5";
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
}) {
  const [activeSection, setActiveSection] = useState("Timers");
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="relative w-full flex justify-center items-center">
      <div className={`absolute z-100 h-auto top-5 overflow-y-auto flex flex-col ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }  rounded-lg p-4 shadow-sm border w-11/12 sm:w-4/5 md:w-3/4 lg:w-5/8 border-slate-200`}>
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <h1 className="text-2xl font-bold">Setting</h1>
          <button
            onClick={toggleCard}
            className="text-2xl cursor-pointer font-bold p-1 border-2 border-slate-300 rounded-full"
          >
            <IoClose />
          </button>
        </div>

        {/* Sidebar & Content */}
        <div className="flex">
          {/* Sidebar Menu */}
          <div className="w-[30%] flex flex-col gap-4 items-start">
            {["Timers", "Sounds", "General"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`text-base sm:text-lg cursor-pointer font-bold ${
                  activeSection === item ? "text-blue-500 border-b-2" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-[70%]">
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
              />
            )}
            {activeSection === "General" && (
              <GeneralSetting
                automaticBreak={automaticBreak}
                setAutomaticBreak={setAutomaticBreak}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
