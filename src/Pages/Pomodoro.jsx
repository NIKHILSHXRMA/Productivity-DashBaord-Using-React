/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MODES = {
  work: {
    label: "Focus",
    time: 25 * 60,
  },
  shortBreak: {
    label: "Short Break",
    time: 5 * 60,
  },
  longBreak: {
    label: "Long Break",
    time: 15 * 60,
  },
};

const Pomodoro = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const [currentMode, setCurrentMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(MODES.work.time);
  const [baseTime, setBaseTime] = useState(MODES.work.time);
  const [isActive, setIsActive] = useState(false);

  const [completedSessions, setCompletedSessions] = useState(() => {
    return Number(localStorage.getItem("pomodoro_sessions")) || 0;
  });

  const accentColor = "var(--color-accent, #8B5CF6)";

  useEffect(() => {
    localStorage.setItem(
      "pomodoro_sessions",
      String(completedSessions)
    );
  }, [completedSessions]);

  // Timer
  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);

      if (currentMode === "work") {
        setCompletedSessions((previous) => previous + 1);
        setCurrentMode("shortBreak");
        setTimeLeft(MODES.shortBreak.time);
        setBaseTime(MODES.shortBreak.time);
      } else {
        setCurrentMode("work");
        setTimeLeft(MODES.work.time);
        setBaseTime(MODES.work.time);
      }

      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, currentMode]);

  const switchMode = (modeKey) => {
    clearInterval(timerRef.current);

    setIsActive(false);
    setCurrentMode(modeKey);
    setTimeLeft(MODES[modeKey].time);
    setBaseTime(MODES[modeKey].time);
  };

  const toggleTimer = () => {
    setIsActive((previous) => !previous);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(baseTime);
  };

  const adjustTime = (seconds) => {
    setTimeLeft((previousTime) =>
      Math.max(60, previousTime + seconds)
    );

    setBaseTime((previousBaseTime) =>
      Math.max(60, previousBaseTime + seconds)
    );
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  const progressPercent =
    baseTime > 0
      ? Math.min(
          100,
          Math.max(0, ((baseTime - timeLeft) / baseTime) * 100)
        )
      : 0;

  const circleRadius = 44;
  const circleCircumference = 2 * Math.PI * circleRadius;

  return (
    <div
      className="
        flex min-h-screen w-full
        flex-col overflow-x-hidden
        px-3 py-4
        transition-colors duration-500
        sm:px-6 sm:py-8
        lg:px-8
      "
      style={{
        backgroundColor: "var(--color-bg, #0F111A)",
        color: "var(--color-text, #F8FAFC)",
      }}
    >
      <div className="
        mx-auto flex w-full
        max-w-5xl flex-1 flex-col
      ">

        {/* Top Header */}
        <div className="
          flex flex-wrap
          items-center justify-between
          gap-3
        ">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2
              rounded-xl
              border border-white/10
              bg-white/10
              px-3 py-2.5
              text-xs font-semibold
              transition hover:bg-white/20
              active:scale-95
              sm:px-4 sm:text-sm
            "
          >
            ← Dashboard
          </button>

          <span
            className="
              text-right text-[10px]
              font-bold uppercase
              tracking-[0.15em]
              sm:text-xs sm:tracking-widest
            "
            style={{ color: accentColor }}
          >
            Pomodoro Timer
          </span>
        </div>

        {/* Main Card Wrapper */}
        <div className="
          flex flex-1
          items-center justify-center
          py-8 sm:py-12
        ">
          <section
            className="
              w-full max-w-2xl
              rounded-2xl
              border border-white/10
              p-4 shadow-2xl
              backdrop-blur-xl
              transition-colors duration-500
              sm:rounded-3xl sm:p-8
            "
            style={{
              backgroundColor:
                "var(--color-surface, #191D2B)",
            }}
          >

            {/* Mode Selector */}
            <div className="
              mb-6 flex
              flex-wrap justify-center
              gap-1 rounded-2xl
              bg-black/20 p-1.5
              sm:mb-7
            ">
              {Object.entries(MODES).map(([key, mode]) => {
                const isSelected = currentMode === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchMode(key)}
                    className={`
                      flex-1 rounded-xl
                      px-2 py-2.5
                      text-[11px] font-semibold
                      transition
                      sm:flex-none sm:px-4
                      sm:text-sm
                      ${
                        isSelected
                          ? "text-black shadow-md"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }
                    `}
                    style={
                      isSelected
                        ? { backgroundColor: accentColor }
                        : undefined
                    }
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>

            {/* Timer Dial */}
            <div className="
              relative mx-auto
              flex aspect-square
              w-full max-w-55
              items-center justify-center
              sm:max-w-70
            ">
              <svg
                className="
                  h-full w-full
                  -rotate-90
                "
                viewBox="0 0 100 100"
                role="img"
                aria-label={`Timer ${formatTime()}`}
              >
                {/* Background Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={circleRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.12"
                  strokeWidth="6"
                />

                {/* Progress Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={circleRadius}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={
                    circleCircumference -
                    (progressPercent / 100) *
                      circleCircumference
                  }
                  className="
                    transition-all duration-500
                    ease-linear
                  "
                />
              </svg>

              {/* Timer Text */}
              <div className="
                absolute
                flex flex-col
                items-center
              ">
                <span className="
                  text-4xl font-black
                  tracking-tight
                  text-white
                  sm:text-6xl
                ">
                  {formatTime()}
                </span>

                <span
                  className="
                    mt-2 text-[10px]
                    font-bold uppercase
                    tracking-[0.15em]
                    sm:text-xs sm:tracking-widest
                  "
                  style={{ color: accentColor }}
                >
                  {isActive ? "Running" : "Paused"}
                </span>
              </div>
            </div>

            {/* Adjust Time */}
            <div className="
              mt-6 flex
              flex-wrap items-center
              justify-center gap-2
            ">
              {[-300, -60, 60, 300].map((seconds) => (
                <button
                  key={seconds}
                  type="button"
                  onClick={() => adjustTime(seconds)}
                  className="
                    rounded-lg
                    border border-white/10
                    bg-white/5
                    px-3 py-2
                    text-xs font-semibold
                    text-white/80
                    transition
                    hover:bg-white/15
                    active:scale-95
                  "
                >
                  {seconds > 0
                    ? `+${seconds / 60}m`
                    : `${seconds / 60}m`}
                </button>
              ))}
            </div>

            {/* Main Controls */}
            <div className="
              mt-6 flex
              flex-col items-stretch
              justify-center gap-3
              sm:mt-7 sm:flex-row
              sm:items-center
            ">
              <button
                type="button"
                onClick={toggleTimer}
                className="
                  w-full
                  rounded-2xl
                  px-5 py-3
                  text-sm font-bold
                  text-black
                  shadow-lg
                  transition
                  hover:brightness-110
                  active:scale-95
                  sm:w-32
                "
                style={{ backgroundColor: accentColor }}
              >
                {isActive ? "Pause" : "Start"}
              </button>

              <button
                type="button"
                onClick={resetTimer}
                className="
                  w-full
                  rounded-2xl
                  border border-white/15
                  px-5 py-3
                  text-sm font-semibold
                  text-white/80
                  transition
                  hover:bg-white/10
                  active:scale-95
                  sm:w-auto
                "
              >
                Reset
              </button>
            </div>

            {/* Stats */}
            <div className="
              mt-7 flex
              flex-wrap items-center
              justify-between gap-3
              border-t border-white/10
              pt-5
              text-xs text-white/60
              sm:mt-8
            ">
              <span>
                Sessions Completed
              </span>

              <div className="
                flex items-center gap-3
              ">
                <span
                  className="
                    text-lg font-black
                  "
                  style={{ color: accentColor }}
                >
                  {completedSessions}
                </span>

                <button
                  type="button"
                  onClick={() => setCompletedSessions(0)}
                  className="
                    rounded-lg px-2 py-1
                    text-[10px]
                    text-white/40
                    transition
                    hover:text-red-400
                  "
                >
                  Clear
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="
          pb-2 text-center
          text-[10px]
          tracking-wide
          text-white/40
          sm:text-xs
        ">
          Flexible Timer · Pause anytime · Adjust time on the fly
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;