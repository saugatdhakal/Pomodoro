import { useState } from "react";
import Navbar from "./Navbar";
import NewTask from "./NewTask";
import Timer from "./Timer";
import { useEffect } from "react";
function Pomodoro() {
  const [minutes, setMinutes] = useState(1);
  const totalTime = minutes * 60;
  const [currentTime, setCurrentTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [timePercentage, setTimePercentage] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((currentTime) => {
          const newTime = currentTime - 1;
          console.log("Current time:", newTime);
          setTimePercentage(
            Math.round(((totalTime - newTime) / totalTime) * 100)
          );
          console.log(
            "Time percentage:",
            Math.round(((totalTime - newTime) / totalTime) * 100)
          );
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime, totalTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  const handleStart = () => {
    console.log("Starting timer");
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

  return (
    <div className="h-screen">
      <Navbar />
      <NewTask />
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
      />
    </div>
  );
}

export default Pomodoro;
