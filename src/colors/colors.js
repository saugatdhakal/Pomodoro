export const modeColors = {
    pomodoro: {
      active: "#2b7fff",
      light: "#dbeafe",
      tailwindClass: "bg-blue-500",
    },
    shortBreak: {
      active: "#22c55e",
      light: "#dcfce7",
      tailwindClass: "bg-green-500",
    },
    longBreak: {
      active: "#ad46ff",
      light: "#f3e8ff",
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