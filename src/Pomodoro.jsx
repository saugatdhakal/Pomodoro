import { useState } from "react";
import Navbar from "./Navbar";
import NewTask from "./NewTask";
import Timer from "./Timer";
import { useEffect } from "react";
import PomodoroMode from "./component/PomodoroMode";

function Pomodoro() {
  const [minutes, setMinutes] = useState(1);
  const totalTime = minutes * 60;
  const [currentTime, setCurrentTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [timePercentage, setTimePercentage] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [activeMode, setActiveMode] = useState("pomodoro");

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
    }
    return () =>{
      clearInterval(interval);
      

    } 
  }, [isRunning, currentTime, totalTime]);

  useEffect(() => {
    setCurrentTime(minutes*60);
  }, [minutes]);

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
      setMinutes(25);
    } else if (mode === "shortBreak") {
      setMinutes(5);
    } else if (mode === "longBreak") {
      setMinutes(10);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <NewTask />
      <PomodoroMode activeMode={activeMode} isRunning={isRunning}  onModeChange={handleModeChange} />
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
