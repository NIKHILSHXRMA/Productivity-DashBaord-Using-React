import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { label: "Health", icon: "💧" },
  { label: "Learning", icon: "📚" },
  { label: "Work", icon: "💼" },
  { label: "Mindset", icon: "🧘" },
];

const DEFAULT_GOALS = [
  {
    id: 1,
    title: "Drink 3L of water",
    category: "Health",
    target: 3,
    current: 2,
    unit: "L",
  },
  {
    id: 2,
    title: "Read 20 pages",
    category: "Learning",
    target: 20,
    current: 15,
    unit: "pages",
  },
  {
    id: 3,
    title: "Deep work sessions",
    category: "Work",
    target: 4,
    current: 4,
    unit: "sessions",
  },
];

const Dailygoals = () => {
  const navigate = useNavigate();

  const [goals, setGoals] = useState(() => {
    try {
      const savedGoals = localStorage.getItem("daily_goals");

      return savedGoals ? JSON.parse(savedGoals) : DEFAULT_GOALS;
    } catch (error) {
      console.error("Failed to load daily goals:", error);
      return DEFAULT_GOALS;
    }
  });

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("Health");

  useEffect(() => {
    localStorage.setItem("daily_goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedUnit = unit.trim();
    const numericTarget = Number(target);

    if (
      !trimmedTitle ||
      !target ||
      !Number.isFinite(numericTarget) ||
      numericTarget <= 0
    ) {
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: trimmedTitle,
      category,
      target: numericTarget,
      current: 0,
      unit: trimmedUnit || "times",
    };

    setGoals((previousGoals) => [...previousGoals, newGoal]);

    setTitle("");
    setTarget("");
    setUnit("");
    setCategory("Health");
  };

  const updateProgress = (id, delta) => {
    setGoals((previousGoals) =>
      previousGoals.map((goal) => {
        if (goal.id !== id) {
          return goal;
        }

        const nextProgress = Math.max(
          0,
          Math.min(goal.target, goal.current + delta)
        );

        return {
          ...goal,
          current: nextProgress,
        };
      })
    );
  };

  const deleteGoal = (id) => {
    setGoals((previousGoals) =>
      previousGoals.filter((goal) => goal.id !== id)
    );
  };

  const completedGoals = goals.filter(
    (goal) => goal.current >= goal.target
  ).length;

  const overallPercentage = goals.length
    ? Math.round((completedGoals / goals.length) * 100)
    : 0;

  const accentColor = "var(--color-accent, #D4A373)";
  const surfaceColor = "var(--color-surface, #9D6638)";
  const backgroundColor = "var(--color-bg, #382618)";

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden px-3 py-4 text-white transition-colors duration-500 sm:px-5 sm:py-6 lg:px-8"
      style={{ backgroundColor }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-7">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex min-h-10 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm transition hover:bg-white/20 active:scale-95 sm:px-4 sm:text-sm"
          >
            <span aria-hidden="true">←</span>
            <span>Dashboard</span>
          </button>

          <span
            className="text-right text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-widest"
            style={{ color: accentColor }}
          >
            Target Tracker
          </span>
        </header>

        <main className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <section className="flex min-w-0 flex-col gap-4 sm:gap-6">
            {/* Overview Card */}
            <div
              className="rounded-2xl border border-white/10 p-4 shadow-xl backdrop-blur-md sm:rounded-3xl sm:p-6"
              style={{ backgroundColor: `${surfaceColor}4D` }}
            >
              <div className="flex items-center justify-between gap-3">
                <h2
                  className="text-base font-bold tracking-tight sm:text-lg"
                  style={{ color: accentColor }}
                >
                  Today's Achievement
                </h2>

                <span className="text-xl" aria-hidden="true">
                  🎯
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {overallPercentage}%
                </span>

                <span className="text-right text-[11px] leading-5 text-white/70 sm:text-xs">
                  {completedGoals} of {goals.length} achieved
                </span>
              </div>

              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-black/30 sm:h-3">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${overallPercentage}%`,
                    backgroundColor: accentColor,
                  }}
                />
              </div>
            </div>

            {/* Add Goal Form */}
            <form
              onSubmit={addGoal}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-white/10 p-4 shadow-xl backdrop-blur-md sm:rounded-3xl sm:p-6"
              style={{ backgroundColor: `${surfaceColor}4D` }}
            >
              <div>
                <h3
                  className="text-base font-bold tracking-tight sm:text-lg"
                  style={{ color: accentColor }}
                >
                  Add Daily Target
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/50">
                  Create a small goal and track your progress daily.
                </p>
              </div>

              <input
                type="text"
                placeholder="Goal title e.g. Drink Water"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/30 focus:ring-1"
                style={{ "--tw-ring-color": accentColor }}
              />

              <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Target"
                  value={target}
                  onChange={(event) => setTarget(event.target.value)}
                  className="min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/30 focus:ring-1"
                  style={{ "--tw-ring-color": accentColor }}
                />

                <input
                  type="text"
                  placeholder="Unit e.g. pages"
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                  className="min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/30 focus:ring-1"
                  style={{ "--tw-ring-color": accentColor }}
                />
              </div>

              {/* Categories */}
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold text-white/60">
                  Category
                </p>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {CATEGORIES.map((item) => {
                    const isSelected = category === item.label;

                    return (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => setCategory(item.label)}
                        className="flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition active:scale-95"
                        style={{
                          backgroundColor: isSelected
                            ? accentColor
                            : "rgba(255,255,255,0.05)",
                          color: isSelected
                            ? "#171717"
                            : "rgba(255,255,255,0.7)",
                        }}
                      >
                        <span aria-hidden="true">{item.icon}</span>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 min-h-11 w-full rounded-xl px-4 py-3 text-sm font-bold text-neutral-900 shadow transition hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: accentColor }}
              >
                Save Goal
              </button>
            </form>
          </section>

          {/* Right Column */}
          <section className="flex min-w-0 flex-col gap-3 lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-white/80 sm:text-base">
                Today's Goals
              </h2>

              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/60 sm:text-xs">
                {goals.length} {goals.length === 1 ? "Goal" : "Goals"}
              </span>
            </div>

            {goals.length === 0 ? (
              <div
                className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-white/10 p-6 text-center text-white/50 sm:rounded-3xl sm:p-8"
                style={{ backgroundColor: `${surfaceColor}33` }}
              >
                <span className="mb-3 text-4xl sm:text-5xl" aria-hidden="true">
                  🎯
                </span>

                <p className="text-sm leading-6">
                  No active goals for today.
                  <br />
                  Add one to get started!
                </p>
              </div>
            ) : (
              goals.map((goal) => {
                const isFinished = goal.current >= goal.target;

                const percentage = goal.target
                  ? Math.min(
                      100,
                      Math.round((goal.current / goal.target) * 100)
                    )
                  : 0;

                return (
                  <article
                    key={goal.id}
                    className={`group flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border p-4 transition-all backdrop-blur-md sm:rounded-3xl sm:p-5 ${
                      isFinished
                        ? "border-emerald-400/20 bg-emerald-400/5"
                        : "border-white/10"
                    }`}
                    style={
                      !isFinished
                        ? { backgroundColor: `${surfaceColor}4D` }
                        : undefined
                    }
                  >
                    {/* Goal Header */}
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-md bg-white/10 px-2 py-1 text-[10px] sm:text-xs"
                            style={{ color: accentColor }}
                          >
                            {goal.category}
                          </span>

                          {isFinished && (
                            <span className="rounded-md bg-emerald-950/40 px-2 py-1 text-[10px] font-semibold text-emerald-400 sm:text-xs">
                              Completed ✓
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 wrap-break-word text-sm font-bold leading-6 tracking-tight sm:text-base">
                          {goal.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteGoal(goal.id)}
                        aria-label={`Delete ${goal.title}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm text-white/40 transition hover:bg-red-500/10 hover:text-red-400 active:scale-95"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Progress */}
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-white/70">
                        <span className="wrap-break-word">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>

                        <span>{percentage}%</span>
                      </div>

                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/30">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: isFinished
                              ? "#34D399"
                              : accentColor,
                          }}
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                      <span className="text-[11px] text-white/40 sm:text-xs">
                        Update progress
                      </span>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateProgress(goal.id, -1)}
                          disabled={goal.current === 0}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-base font-bold transition hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Decrease progress for ${goal.title}`}
                        >
                          −
                        </button>

                        <button
                          type="button"
                          onClick={() => updateProgress(goal.id, 1)}
                          disabled={isFinished}
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold text-neutral-900 shadow transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                          style={{ backgroundColor: accentColor }}
                          aria-label={`Increase progress for ${goal.title}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-[10px] tracking-wide text-white/40 sm:py-8 sm:text-xs">
          Set small goals · Stay consistent · Make progress every day
        </footer>
      </div>
    </div>
  );
};

export default Dailygoals;