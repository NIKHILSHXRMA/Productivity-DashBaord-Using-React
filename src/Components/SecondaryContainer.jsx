import Card from "./Card";
import {
  DailyPlan_image,
  DailyPlanner_image,
  Motivation_image,
  Pomodoro_image,
  Todo_image,
} from "../Utils/constant";

const CARDS_DATA = [
  {
    title: "Todo",
    path: "/todo",
    src: Todo_image,
  },
  {
    title: "Daily Planner",
    path: "/dailyplanner",
    src: DailyPlanner_image,
  },
  {
    title: "Motivation",
    path: "/quotes",
    src: Motivation_image,
  },
  {
    title: "Pomodoro Timer",
    path: "/pomodoro",
    src: Pomodoro_image,
  },
  {
    title: "Daily Goals",
    path: "/dailygoals",
    src: DailyPlan_image,
  },
];

const SecondaryContainer = () => {
  return (
    <section
      className="mx-2 mb-8 mt-3 rounded-3xl border p-3 sm:mx-4 sm:p-4"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-surface) 55%, transparent)",
        borderColor: "var(--color-border)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-accent)" }}
          >
            Your workspace
          </p>

          <h2
            className="mt-1 font-heading text-lg font-bold sm:text-xl"
            style={{ color: "var(--color-text)" }}
          >
            Stay productive
          </h2>
        </div>

        <span
          className="rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            color: "var(--color-muted)",
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-bg)",
          }}
        >
          5 tools
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {CARDS_DATA.map((card) => (
          <Card
            key={card.path}
            title={card.title}
            path={card.path}
            src={card.src}
          />
        ))}
      </div>
    </section>
  );
};

export default SecondaryContainer;