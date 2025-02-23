import { Flat } from "@alptugidin/react-circular-progress-bar";
import StartButton from "./component/StartButton";
import PauseButton from "./component/PauseButton";
import RestartButton from "./component/RestartButton";
function Timer({
  minutes,
  setMinutes,
  totalTime,
  currentTime,
  formatTime,
  isRunning,
  setIsRunning,
  timePercentage,
  handleStart,
  handlePause,
  handleRestart,
  activeMode,
}) {
  const modeColor = {
    pomodoro: {
      active: "#2b7fff",
      light: "#dbeafe",
    },
    shortBreak: {
      active: "#22c55e",
      light: "#dcfce7",
    },
    longBreak: {
      active: "#ad46ff",
      light: "#f3e8ff",
    },
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <div style={{ width: "300px" }}>
        <Flat
          progress={timePercentage}
          range={{ from: 0, to: 100 }}
          sign={{ value: "%", position: "end" }}
          text={formatTime(currentTime)}
          showMiniCircle={true}
          showValue={false}
          sx={{
            strokeColor: modeColor[activeMode].active,
            barWidth: 2,
            bgStrokeColor: modeColor[activeMode].light,
            bgColor: { value: "#ffffff", transparency: "20" },
            shape: "full",
            strokeLinecap: "round",
            valueSize: 13,
            valueWeight: "bold",
            valueColor: "#000000",
            valueFamily: "Trebuchet MS",
            textSize: 13,
            textWeight: "bold",
            textColor: "#000000",
            textFamily: "Trebuchet MS",
            loadingTime: 1000,
            miniCircleColor: modeColor[activeMode].active,
            miniCircleSize: 5,
            valueAnimation: true,
            intersectionEnabled: true,
          }}
        />
      </div>
      <div className="flex gap-4">
        {isRunning ? (
          <PauseButton activeMode={activeMode} onClick={handlePause} />
        ) : (
          <StartButton activeMode={activeMode} onClick={handleStart} />
        )}
        <RestartButton activeMode={activeMode} onClick={handleRestart} />
      </div>
    </div>
  );
}

export default Timer;
