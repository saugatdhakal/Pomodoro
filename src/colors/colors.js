export const modeColors = {
    pomodoro: {
      active: "#2b7fff",
      light: "#bedbff",
      tailwindClass: "bg-blue-500",
    },
    shortBreak: {
      active: "#22c55e",
      light: "#b9f8cf",
      tailwindClass: "bg-green-500",
    },
    longBreak: {
      active: "#ad46ff",
      light: "#e9d4ff",
      tailwindClass: "bg-purple-500",
    },
  };

export const getHoverClasses = (activeMode) => {
  switch (activeMode) {
    case "pomodoro":
      return "hover:border-blue-500 hover:text-blue-500";
    case "shortBreak":
      return "hover:border-green-500 hover:text-green-500";
    case "longBreak":
      return "hover:border-purple-500 hover:text-purple-500";
    default:
      return "hover:border-blue-500 hover:text-blue-500";
  }
};