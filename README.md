# Pomodoro Timer

A modern, feature-rich Pomodoro Timer built with React to help you boost productivity and manage your work sessions effectively.
## Screenshot

![Pomodoro Timer Desktop](https://github.com/saugatdhakal/Pomodoro/raw/main/src/assets/Project%20SS/pomodoro1.png)

![Pomodoro Timer Mobile](https://github.com/saugatdhakal/Pomodoro/raw/main/src/assets/Project%20SS/pomodoro2.png)

![Pomodoro Timer Music Album](https://github.com/saugatdhakal/Pomodoro/raw/main/src/assets/Project%20SS/pomodoro3.png)

![Pomodoro Setting](https://github.com/saugatdhakal/Pomodoro/raw/main/src/assets/Project%20SS/pomodoro4.png)



## Features

- **Three Timer Modes**

  - Pomodoro (25 minutes)
  - Short Break (2 minutes)
  - Long Break (10 minutes)
  - Persist data even refesh

- **Visual Features**

  - Circular progress indicator
  - Color-coded modes (Blue for Pomodoro, Green for Short Break, Purple for Long Break)
  - Responsive design
  - Clean, minimalist interface

- **Timer Controls**

  - Start/Pause functionality
  - Reset timer option
  - Automatic mode switching
  - Audio notifications when sessions end

- **Smart Automation**
  - Automatic break timer after Pomodoro session
  - Automatic return to Pomodoro mode after break
  - Sound alerts for session transitions

- **Customizable Settings**
  - Ability to set custom durations for Pomodoro, Short Break, and Long Break
  - Option to enable/disable sound notifications
  - Dark mode for reduced eye strain

- **Statistics and Reports**
  - Track number of completed Pomodoro sessions

## Technologies Used

- React
- Tailwind CSS
- React Circular Progress Bar
- Vite

## Getting Started

1. Clone the repository
2. Install dependencies
3. Start the development server

## How to Use

1. Select your desired mode (Pomodoro, Short Break, or Long Break)
2. Click the Start button to begin the timer
3. Work until the timer ends
4. Take a break when the alarm sounds
5. The timer will automatically switch between work and break modes

## Project Structure

After cloning the repository and installing the dependencies, your project structure should look like this:

```bash
Pomodoro/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Timer.jsx
│   │   ├── Controls.jsx
│   │   ├── Settings.jsx
│   │   ├── Statistics.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── index.css
│   ├── index.jsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## Contributing

Feel free to submit issues and enhancement requests!