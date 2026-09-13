import { useState, useEffect } from "react";
import { background_image } from "../Utils/constant";
import useWeatherApi from "../Hooks/useWeatherApi";
import { useTheme } from "../Context/ThemeContext";

const MainContainer = () => {
  const weather = useWeatherApi();
  const { currentTheme } = useTheme();

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <section
      className="
        relative
        mx-2
        my-3
        overflow-hidden
        rounded-3xl
        border
        shadow-xl
        transition-all
        duration-300
        select-none
        sm:mx-4
      "
      style={{
        minHeight: "390px",
        borderColor: "var(--color-border)",
        boxShadow: `0 20px 60px ${currentTheme.accent}18`,
      }}
    >
      {/* Background Image */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          transition-transform
          duration-700
        "
        style={{
          backgroundImage: `url(${background_image})`,
        }}
      />

      {/* Dark Theme Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              115deg,
              ${currentTheme.bg}F2 0%,
              ${currentTheme.bg}D9 38%,
              ${currentTheme.bg}8C 72%,
              ${currentTheme.bg}66 100%
            )
          `,
        }}
      />

      {/* Accent Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          blur-3xl
        "
        style={{
          backgroundColor: currentTheme.accent,
          opacity: 0.2,
        }}
      />

      {/* Bottom Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/3
          h-64
          w-64
          rounded-full
          blur-3xl
        "
        style={{
          backgroundColor: currentTheme.accent,
          opacity: 0.08,
        }}
      />

      {weather ? (
        <div
          className="
            relative
            z-10
            grid
            min-h-97.5
            grid-cols-1
            gap-8
            p-5
            sm:p-7
            md:grid-cols-[1fr_auto]
            md:gap-6
            md:p-9
          "
        >
          {/* Left Content */}
          <div
            className="
              flex
              min-w-0
              flex-col
              justify-between
              gap-8
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-medium
                  tracking-wide
                  sm:text-base
                "
                style={{
                  color: "var(--color-muted)",
                }}
              >
                {formattedDate}
              </p>

              <h1
                className="
                  mt-2
                  text-3xl
                  font-extrabold
                  leading-tight
                  tracking-tight
                  sm:text-4xl
                  md:text-5xl
                "
                style={{
                  color: "var(--color-text)",
                }}
              >
                {formattedDay},
              </h1>

              <p
                className="
                  mt-1
                  text-2xl
                  font-bold
                  tracking-tight
                  sm:text-3xl
                  md:text-4xl
                "
                style={{
                  color: currentTheme.accent,
                }}
              >
                {formattedTime}
              </p>
            </div>

            {/* Location Pill */}
            <div
              className="
                flex
                w-fit
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-2
                text-sm
                font-semibold
                backdrop-blur-xl
                sm:text-base
              "
              style={{
                color: "var(--color-text)",
                backgroundColor: `${currentTheme.surface}D9`,
                borderColor: "var(--color-border)",
              }}
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${currentTheme.accent}25`,
                  color: currentTheme.accent,
                }}
              >
                📍
              </span>

              <span className="truncate">
                {weather.location.name}
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div
            className="
              flex
              min-w-0
              flex-col
              items-start
              justify-between
              gap-6
              md:items-end
              md:text-right
            "
          >
            {/* Temperature and Condition */}
            <div className="w-full md:w-auto">
              <div
                className="
                  text-5xl
                  font-extrabold
                  leading-none
                  tracking-tight
                  sm:text-6xl
                  md:text-7xl
                "
                style={{
                  color: "var(--color-text)",
                }}
              >
                {weather.current.temp_c}°
                <span
                  className="
                    ml-1
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                  "
                  style={{
                    color: currentTheme.accent,
                  }}
                >
                  C
                </span>
              </div>

              <p
                className="
                  mt-3
                  max-w-56
                  text-sm
                  font-medium
                  leading-relaxed
                "
                style={{
                  color: "var(--color-muted)",
                }}
              >
                {weather.current.condition.text}
              </p>
            </div>

            {/* Weather Metrics */}
            <div
              className="
                grid
                w-full
                max-w-full
                grid-cols-3
                gap-2
                rounded-2xl
                border
                p-3
                backdrop-blur-xl
                sm:gap-4
                sm:p-4
                md:w-auto
                md:min-w-71.25
                md:grid-cols-1
              "
              style={{
                backgroundColor: `${currentTheme.surface}E6`,
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
                boxShadow: `0 8px 30px ${currentTheme.bg}66`,
              }}
            >
              {/* Precipitation */}
              <div
                className="
                  flex
                  flex-col
                  gap-1
                  md:flex-row
                  md:items-center
                  md:justify-between
                  md:gap-6
                "
              >
                <span
                  className="text-[11px] sm:text-xs md:text-sm"
                  style={{
                    color: "var(--color-muted)",
                  }}
                >
                  Precipitation
                </span>

                <span className="text-xs font-bold sm:text-sm">
                  {weather.current.precip_in ?? "0"} in
                </span>
              </div>

              {/* Humidity */}
              <div
                className="
                  flex
                  flex-col
                  gap-1
                  md:flex-row
                  md:items-center
                  md:justify-between
                  md:gap-6
                "
              >
                <span
                  className="text-[11px] sm:text-xs md:text-sm"
                  style={{
                    color: "var(--color-muted)",
                  }}
                >
                  Humidity
                </span>

                <span className="text-xs font-bold sm:text-sm">
                  {weather.current.humidity}%
                </span>
              </div>

              {/* Wind */}
              <div
                className="
                  flex
                  flex-col
                  gap-1
                  md:flex-row
                  md:items-center
                  md:justify-between
                  md:gap-6
                "
              >
                <span
                  className="text-[11px] sm:text-xs md:text-sm"
                  style={{
                    color: "var(--color-muted)",
                  }}
                >
                  Wind
                </span>

                <span className="text-xs font-bold sm:text-sm">
                  {weather.current.wind_kph} km/h
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="
            relative
            z-10
            flex
            min-h-97.5
            items-center
            justify-center
            text-sm
            font-medium
          "
          style={{
            color: "var(--color-text)",
          }}
        >
          Loading weather...
        </div>
      )}
    </section>
  );
};

export default MainContainer;