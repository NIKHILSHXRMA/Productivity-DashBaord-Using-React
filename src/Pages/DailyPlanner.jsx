import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TIME_SLOTS = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
];

const DailyPlanner = () => {
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(() => {
    try {
      const savedSchedule = localStorage.getItem("planner_schedule");
      return savedSchedule ? JSON.parse(savedSchedule) : {};
    } catch (error) {
      console.error("Unable to load schedule:", error);
      return {};
    }
  });

  const [priorities, setPriorities] = useState(() => {
    try {
      const savedPriorities = localStorage.getItem("planner_priorities");

      return savedPriorities
        ? JSON.parse(savedPriorities)
        : ["", "", ""];
    } catch (error) {
      console.error("Unable to load priorities:", error);
      return ["", "", ""];
    }
  });

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("planner_notes") || "";
  });

  useEffect(() => {
    localStorage.setItem("planner_schedule", JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(
      "planner_priorities",
      JSON.stringify(priorities)
    );
  }, [priorities]);

  useEffect(() => {
    localStorage.setItem("planner_notes", notes);
  }, [notes]);

  const handleScheduleChange = (time, value) => {
    setSchedule((previousSchedule) => ({
      ...previousSchedule,
      [time]: value,
    }));
  };

  const handlePriorityChange = (index, value) => {
    setPriorities((previousPriorities) =>
      previousPriorities.map((priority, priorityIndex) =>
        priorityIndex === index ? value : priority
      )
    );
  };

  const clearDay = () => {
    const shouldReset = window.confirm(
      "Are you sure you want to reset your day's plan?"
    );

    if (!shouldReset) return;

    setSchedule({});
    setPriorities(["", "", ""]);
    setNotes("");
  };

  const accentColor = "var(--color-accent, #8B5CF6)";

  return (
    <div
      className="min-h-screen w-full px-4 py-6 transition-colors duration-500 sm:px-6 sm:py-8"
      style={{
        backgroundColor: "var(--color-bg, #0F111A)",
        color: "var(--color-text, #F8FAFC)",
      }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Top Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20 active:scale-95"
          >
            ← Dashboard
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={clearDay}
              className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 active:scale-95"
            >
              Reset Plan
            </button>

            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Daily Planner
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Hourly Schedule */}
          <section
            className="rounded-3xl border border-white/10 p-5 shadow-2xl backdrop-blur-xl transition-colors duration-500 sm:p-7 lg:col-span-2"
            style={{
              backgroundColor:
                "var(--color-surface, #191D2B)",
            }}
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p
                  className="mb-1 text-xs font-bold uppercase tracking-widest"
                  style={{ color: accentColor }}
                >
                  Plan your day
                </p>

                <h2 className="text-2xl font-black tracking-tight">
                  Hourly Schedule
                </h2>
              </div>

              <span className="text-xs text-white/50">
                6:00 AM – 10:00 PM
              </span>
            </div>

            <div className="flex max-h-96 flex-col gap-2 overflow-y-auto pr-1 sm:max-h-130">
              {TIME_SLOTS.map((time) => (
                <div
                  key={time}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition hover:bg-white/10 focus-within:border-white/30"
                >
                  <span
                    className="w-20 shrink-0 text-xs font-bold sm:w-24"
                    style={{ color: accentColor }}
                  >
                    {time}
                  </span>

                  <input
                    type="text"
                    value={schedule[time] || ""}
                    onChange={(event) =>
                      handleScheduleChange(time, event.target.value)
                    }
                    placeholder="Add activity or task..."
                    className="min-w-0 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Priorities */}
            <section
              className="rounded-3xl border border-white/10 p-5 shadow-2xl backdrop-blur-xl transition-colors duration-500 sm:p-6"
              style={{
                backgroundColor:
                  "var(--color-surface, #191D2B)",
              }}
            >
              <div className="mb-4">
                <p
                  className="mb-1 text-xs font-bold uppercase tracking-widest"
                  style={{ color: accentColor }}
                >
                  Focus first
                </p>

                <h3 className="text-xl font-black tracking-tight">
                  Top Priorities
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {priorities.map((priority, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                      style={{
                        backgroundColor: `${accentColor}22`,
                        color: accentColor,
                      }}
                    >
                      {index + 1}
                    </span>

                    <input
                      type="text"
                      value={priority}
                      onChange={(event) =>
                        handlePriorityChange(
                          index,
                          event.target.value
                        )
                      }
                      placeholder={`Priority #${index + 1}`}
                      className="min-w-0 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Notes */}
            <section
              className="flex min-h-64 flex-col rounded-3xl border border-white/10 p-5 shadow-2xl backdrop-blur-xl transition-colors duration-500 sm:p-6"
              style={{
                backgroundColor:
                  "var(--color-surface, #191D2B)",
              }}
            >
              <div className="mb-4">
                <p
                  className="mb-1 text-xs font-bold uppercase tracking-widest"
                  style={{ color: accentColor }}
                >
                  Capture ideas
                </p>

                <h3 className="text-xl font-black tracking-tight">
                  Brain Dump & Notes
                </h3>
              </div>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Jot down quick thoughts, follow-ups, or reflections..."
                className="min-h-40 flex-1 resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10"
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;