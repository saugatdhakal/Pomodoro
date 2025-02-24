import { useState } from "react";
import Navbar from "./Navbar";
import NewTask from "./NewTask";
import Timer from "./Timer";
import { useEffect } from "react";
import PomodoroMode from "./component/PomodoroMode";
import breakSound from "./audio/bedside-clock-alarm-95792.mp3";

function Pomodoro() {
  const [minutes, setMinutes] = useState(1);
  const totalTime = minutes * 60;
  const [currentTime, setCurrentTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [timePercentage, setTimePercentage] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [activeMode, setActiveMode] = useState("pomodoro");
  const automaticBreak = true;
  const [breakAudio, setBreakAudio] = useState(null);

  // Initialize audio on component mount
  useEffect(() => {
    const audio = new Audio(breakSound);
    audio.preload = "auto";
    audio.load();
    setBreakAudio(audio);
  }, []);

  const pomodorodefault = () => {
    setActiveMode("pomodoro");
    setMinutes(25);
    setTimePercentage(0);
    setIsBreak(false);
  };
  const shortBreakdefault = () => {
    setMinutes(2);
    setActiveMode("shortBreak");
    setTimePercentage(0);
    setIsBreak(true);
  };
  const longBreakdefault = () => {
    setMinutes(10);
    setActiveMode("longBreak");
    setTimePercentage(0);
    setIsBreak(true);
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

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((currentTime) => {
          const newTime = currentTime - 1;
          setTimePercentage(
            Math.round(((totalTime - newTime) / totalTime) * 100)
          );
          return newTime;
        });
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      setIsRunning(false);
      if (isBreak) {
        // Break timer finished, switch back to pomodoro
        pomodorodefault();
      } else {
        // Pomodoro timer finished, switch to break
        setIsBreak(true);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, currentTime, totalTime, isBreak]);

  useEffect(() => {
    setCurrentTime(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (isBreak) {
      playBreakSound();
      shortBreakdefault();
      if (automaticBreak) {
        const breakTimer = setTimeout(() => {
          setIsRunning(true);
        }, 2000);
        return () => clearTimeout(breakTimer);
      }
    }
  }, [isBreak]);

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
    setIsBreak(false);
    if (mode === "pomodoro") {
      setMinutes(25);
    } else if (mode === "shortBreak") {
      setMinutes(1);
    } else if (mode === "longBreak") {
      setMinutes(10);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <NewTask />
      <PomodoroMode
        activeMode={activeMode}
        isRunning={isRunning}
        onModeChange={handleModeChange}
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
