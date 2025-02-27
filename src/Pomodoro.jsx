import { useState, useRef, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import NewTask from "./NewTask";
import Timer from "./Timer";
import PomodoroMode from "./component/PomodoroMode";
import breakSound from "./audio/bedside-clock-alarm-95792.mp3";
import phoneAlert from "./audio/phoneAlert.mp3";
import Setting from "./Setting";
import { ThemeContext } from "./ThemeContext";

function Pomodoro() {
  const { theme } = useContext(ThemeContext);
  // Timer durations in minutes
  const [pomodoroTimer, setPomodoroTimer] = useState(1);
  const [shortBreakTimer, setShortBreakTimer] = useState(1);
  const [longBreakTimer, setLongBreakTimer] = useState(15);
  const [minutes, setMinutes] = useState(1);
  const totalTime = minutes * 60;
  const [currentTime, setCurrentTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [timePercentage, setTimePercentage] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [activeMode, setActiveMode] = useState("pomodoro");
  const [automaticBreak, setAutomaticBreak] = useState(true);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.5);

  const audioRef = useRef(null);

  const audioFiles = [
    { name: "Break Sound", file: breakSound },
    { name: "Phone Alert", file: phoneAlert },
  ];

  const [selectedAudio, setSelectedAudio] = useState(audioFiles[0].file);

  const handleAudioChange = (e) => {
    const selectedFile = audioFiles.find(
      (file) => file.name === e.target.value
    );
    if (selectedFile) {
      setSelectedAudio(selectedFile.file);
      const audio = new Audio(selectedFile.file);
      try {
        audio.play();
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 2000);
      } catch (error) {
        console.error("Error playing test sound:", error);
      }
    }
  };
  const playBreakSound = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = audioVolume;
        await audioRef.current.play();

        setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }, 2000);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const pomodorodefault = () => {
    setActiveMode("pomodoro");
    setMinutes(pomodoroTimer);
    setTimePercentage(0);
    setIsBreak(false);
    setCurrentTime(pomodoroTimer * 60);
  };

  const shortBreakdefault = () => {
    setMinutes(shortBreakTimer);
    setActiveMode("shortBreak");
    setTimePercentage(0);
    setIsBreak(true);
    setCurrentTime(shortBreakTimer * 60);
  };

  const longBreakdefault = () => {
    setMinutes(longBreakTimer);
    setActiveMode("longBreak");
    setTimePercentage(0);
    setIsBreak(true);
    setCurrentTime(longBreakTimer * 60);
  };

  const updateDocumentTitle = (newTime) => {
    if (newTime != 0) {
      document.title = `${
        activeMode[0].toUpperCase() + activeMode.slice(1)
      } - ${formatTime(newTime)}`;
    } else {
      document.title = `Pomodoro Timer`;
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((currentTime) => {
          const newTime = currentTime - 1;
          setTimePercentage(
            Math.round(((totalTime - newTime) / totalTime) * 100)
          );
          updateDocumentTitle(newTime);
          return newTime;
        });
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      setIsRunning(false);
      if (isBreak) {
        // Break timer finished, switch back to pomodoro
        playBreakSound();
        pomodorodefault();
      } else {
        // Pomodoro timer finished, start break
        playBreakSound();
        shortBreakdefault();
        if (automaticBreak) {
          // Start break timer after a delay
          setTimeout(() => {
            setIsRunning(true);
          }, 2000);
        }
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, currentTime, totalTime, isBreak]);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };
  useEffect(() => {
    if (isBreak) {
      setCurrentTime(minutes * 60);
    }
  }, [isBreak, minutes]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  const handleStart = () => {
    setIsRunning(true);
  };
  const handlePause = () => {
    setIsRunning(false);
  };
  const handleRestart = () => {
    setTimePercentage(0);
    setIsRunning(false);
    setCurrentTime(totalTime);
  };
  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (mode === "pomodoro") {
      pomodorodefault();
    } else if (mode === "shortBreak") {
      shortBreakdefault();
    } else if (mode === "longBreak") {
      longBreakdefault();
    }
  };

  // Initial setup
  useEffect(() => {
    setMinutes(pomodoroTimer);
    setCurrentTime(pomodoroTimer * 60);
  }, [pomodoroTimer]);

  // Update currentTime when timer duration changes
  useEffect(() => {
    if (activeMode === "pomodoro") {
      setCurrentTime(pomodoroTimer * 60);
    } else if (activeMode === "shortBreak") {
      setCurrentTime(shortBreakTimer * 60);
    } else if (activeMode === "longBreak") {
      setCurrentTime(longBreakTimer * 60);
    }
  }, [pomodoroTimer, shortBreakTimer, longBreakTimer, activeMode]);

  return (
    <div
      className={`h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } `}
    >
      <audio
        ref={audioRef}
        src={selectedAudio}
        preload="auto"
        style={{ display: "none" }}
      />

      <Navbar toggleCard={toggleCard} />
      <NewTask toggleCard={toggleCard} isCardOpen={isCardOpen} />
      {isCardOpen && (
        <Setting
          toggleCard={toggleCard}
          pomodoroTimer={pomodoroTimer}
          setPomodoroTimer={setPomodoroTimer}
          shortBreakTimer={shortBreakTimer}
          setShortBreakTimer={setShortBreakTimer}
          longBreakTimer={longBreakTimer}
          setLongBreakTimer={setLongBreakTimer}
          audioFiles={audioFiles}
          selectedAudio={selectedAudio}
          handleAudioChange={handleAudioChange}
          audioVolume={audioVolume}
          setAudioVolume={setAudioVolume}
          automaticBreak={automaticBreak}
          setAutomaticBreak={setAutomaticBreak}
        />
      )}
      <PomodoroMode
        activeMode={activeMode}
        isRunning={isRunning}
        onModeChange={handleModeChange}
        pomodoroTimer={pomodoroTimer}
        shortBreakTimer={shortBreakTimer}
        longBreakTimer={longBreakTimer}
      />
      <Timer
        minutes={minutes}
        setMinutes={setMinutes}
        totalTime={totalTime}
        currentTime={currentTime}
        timePercentage={timePercentage}
        formatTime={formatTime}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        handleStart={handleStart}
        handlePause={handlePause}
        handleRestart={handleRestart}
        activeMode={activeMode}
        theme={theme}
      />
    </div>
  );
}

export default Pomodoro;
