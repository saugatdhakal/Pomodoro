export default function Slider({
  min = 1,
  max = 60,
  leftLabel = "",
  rightLabel = "",
  step = 1,
  value = 30,
  darkMode = false,
  showValueInPercentage = false,
  onChange = () => {},
}) {
  // Ensure value is within [min, max]
  const clampedValue = Math.max(min, Math.min(value, max));

  // Calculate the percentage for the filled portion
  const getPercentage = () => {
    return ((clampedValue - min) / (max - min)) * 100;
  };

  // Update the parent state whenever the user drags
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  // Offset the handle so it's fully within the track.
  // The handle is 16px wide (Tailwind .w-4), so half is 8px.
  const handleOffset = 8;
  const leftPosition = `calc(${getPercentage()}% - ${handleOffset}px)`;

  return (
    <div className="flex w-full max-w-full m-auto items-center h-14 justify-center px-4">
      <div className="relative w-full py-1">
        {/* Track */}
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Filled portion */}
          <div
            className="absolute h-2 bg-blue-500 rounded-full"
            style={{ width: `${getPercentage()}%` }}
          />

          {/* Custom handle */}
          <div
            className="absolute h-4 w-4 top-0 flex items-center justify-center
                       rounded-full bg-white shadow border border-gray-300 pointer-events-none"
            style={{ left: leftPosition }}
          >
            {/* Tooltip wrapper */}
            <div className="relative -mt-2 w-1">
              <div
                className="absolute z-40 bottom-full mb-2 left-1/2 flex justify-center"
                style={{ transform: "translateX(-50%)" }}
              >
                <div className="relative shadow-md">
                  {/* Tooltip bubble */}
                  <div className="bg-blue-200 text-black font-bold text-xs rounded py-1 px-4">
                    {showValueInPercentage ? `${getPercentage()}%` : clampedValue}
                  </div>
                  {/* Tooltip arrow */}
                  <svg
                    className="absolute text-black w-full h-2 left-0 top-full"
                    viewBox="0 0 255 255"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Min/Max labels */}
          <div
            className={`absolute ${
              darkMode ? "text-white" : "text-gray-800"
            } -ml-1 bottom-0 left-0 -mb-7`}
          >
            {leftLabel != "" ? leftLabel : min}
          </div>
          <div
            className={`absolute ${
              darkMode ? "text-white" : "text-gray-800"
            } text-gray-800 -mr-1 bottom-0 right-0 -mb-7`}
          >
            {rightLabel != "" ? rightLabel : max}
          </div>
        </div>

        {/* Actual range input (invisible) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={clampedValue}
          onChange={handleChange}
          className="absolute top-0 left-0 w-full h-4 cursor-pointer opacity-0"
          style={{ zIndex: 50 }}
        />
      </div>
    </div>
  );
}
