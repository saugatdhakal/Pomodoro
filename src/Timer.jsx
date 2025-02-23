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
}) {
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
          showValue={true}
          sx={{
            strokeColor: "#ff0000",
            barWidth: 5,
            bgStrokeColor: "#ffffff",
            bgColor: { value: "#000000", transparency: "20" },
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
            miniCircleColor: "#ff0000",
            miniCircleSize: 5,
            valueAnimation: true,
            intersectionEnabled: true,
          }}
        />
      </div>
      <div className="flex gap-4">
        {isRunning ? (
          <PauseButton onClick={handlePause} />
        ) : (
          <StartButton onClick={handleStart} />
        )}
        <RestartButton onClick={handleRestart} />
      </div>
    </div>
  );
}

export default Timer;
