import { useState, useEffect } from "react";

function CurrentTimer({ theme = "light" }) {
  // Set initial time to 1 PM for preview
  const initialTime = new Date();
  initialTime.setHours(13, 0, 0); // Set to 1:00:00 PM
  
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time in 12-hour format
  const hours12 = String(time.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  
  // Format date as "Day, Month D, YYYY"
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = time.toLocaleDateString('en-US', options);

  return (
    <div className={`flex flex-col items-center justify-center ${
      theme === "dark" ? "text-white" : "text-black"
    }`}>
      <div className="text-center w-full max-w-md">
        <p className="md:text-xl mb-2">{formattedDate}</p>
      </div>
      <div>
        <h1 className="md:text-6xl text-3xl font-bold">
          {hours12}<span className="mx-2">:</span>{minutes}<span className="mx-2">:</span>{seconds} <span className="text-2xl">{ampm}</span> 
        </h1>
      </div>
    </div>
  );
}

export default CurrentTimer;