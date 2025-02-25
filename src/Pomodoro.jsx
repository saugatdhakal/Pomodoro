import { useState } from "react";
import Navbar from "./Navbar";
import NewTask from "./NewTask";
import Timer from "./Timer";
import { useEffect } from "react";
import PomodoroMode from "./component/PomodoroMode";
import breakSound from "./audio/bedside-clock-alarm-95792.mp3";
import Card from "./card";

function Pomodoro() {
  // Timer durations in minutes
  const [pomodoroTimer, setPomodoroTimer] = useState(25);
  const [shortBreakTimer, setShortBreakTimer] = useState(5);
  const [longBreakTimer, setLongBreakTimer] = useState(15);

  const [minutes, setMinutes] = useState(1);
  const totalTime = minutes * 60;
  const [currentTime, setCurrentTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [timePercentage, setTimePercentage] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [activeMode, setActiveMode] = useState("pomodoro");
  const automaticBreak = true;
  const [breakAudio, setBreakAudio] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  // Initialize audio on component mount
  useEffect(() => {
    const audio = new Audio(breakSound);
    audio.preload = "auto";
    audio.load();
    setBreakAudio(audio);
  }, []);

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

  const playBreakSound = async () => {
    if (breakAudio) {
      try {
        breakAudio.currentTime = 0;
        breakAudio.volume = 0.5;
        await breakAudio.play();
        setTimeout(() => {
          breakAudio.pause();
          breakAudio.currentTime = 0;
        }, 2000);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
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
    <div className="h-screen">
      <Navbar />
      <NewTask toggleCard={toggleCard} isCardOpen={isCardOpen} />
      {isCardOpen && (
        <Card
          toggleCard={toggleCard}
          pomodoroTimer={pomodoroTimer}
          setPomodoroTimer={setPomodoroTimer}
          shortBreakTimer={shortBreakTimer}
          setShortBreakTimer={setShortBreakTimer}
          longBreakTimer={longBreakTimer}
          setLongBreakTimer={setLongBreakTimer}
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
      />
    </div>
  );
}

export default Pomodoro;
