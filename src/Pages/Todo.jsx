
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultTodos = [
  {
    id: 1,
    text: "Review weekly productivity goals",
    completed: false,
  },
  {
    id: 2,
    text: "Complete 2 Pomodoro focus sessions",
    completed: true,
  },
];

const Todo = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("app_todos");

      return savedTodos ? JSON.parse(savedTodos) : defaultTodos;
    } catch (error) {
      console.error("Unable to load todos:", error);
      return defaultTodos;
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("app_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();

    const taskText = input.trim();

    if (!taskText) return;

    const newTodo = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTodos((previousTodos) => [newTodo, ...previousTodos]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
  };

  const clearCompleted = () => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.completed)
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;

    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  const progress =
    todos.length === 0
      ? 0
      : Math.round((completedCount / todos.length) * 100);

  const accentColor = "var(--color-accent, #8B5CF6)";

  return (
    <div
      className="
        min-h-screen w-full overflow-x-hidden
        px-3 py-4
        text-white
        transition-colors duration-500
        sm:px-6 sm:py-8
        lg:px-8
      "
      style={{
        backgroundColor: "var(--color-bg, #0F111A)",
        color: "var(--color-text, #F8FAFC)",
      }}
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Top Bar */}
        <div
          className="
            mb-5 flex flex-wrap items-center
            justify-between gap-3
            sm:mb-6
          "
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              rounded-xl border border-white/10
              bg-white/10 px-3 py-2
              text-xs font-semibold
              transition hover:bg-white/20
              active:scale-95
              sm:px-4 sm:py-2.5 sm:text-sm
            "
          >
            ← Dashboard
          </button>

          <span
            className="
              text-right text-[10px] font-bold
              uppercase tracking-[0.18em]
              sm:text-xs sm:tracking-widest
            "
            style={{ color: accentColor }}
          >
            Task Manager
          </span>
        </div>

        {/* Main Card */}
        <section
          className="
            min-w-0 overflow-hidden
            rounded-2xl border border-white/10
            shadow-2xl backdrop-blur-xl
            sm:rounded-3xl
          "
          style={{
            backgroundColor: "var(--color-surface, #191D2B)",
          }}
        >
          {/* Header */}
          <div className="border-b border-white/10 p-4 sm:p-8">
            <div
              className="
                flex flex-col gap-5
                sm:flex-row sm:items-start
                sm:justify-between
              "
            >
              <div className="min-w-0 flex-1">
                <p
                  className="
                    mb-2 text-[10px] font-bold
                    uppercase tracking-[0.15em]
                    sm:text-xs sm:tracking-widest
                  "
                  style={{ color: accentColor }}
                >
                  Your productivity
                </p>

                <h1
                  className="
                    wrap-break-word text-2xl font-black
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  To-Do List
                </h1>

                <p className="
                  mt-2 max-w-xl
                  text-xs leading-relaxed
                  text-white/60 sm:text-sm
                ">
                  Organize your tasks and stay focused
                  throughout the day.
                </p>
              </div>

              {/* Completion Badge */}
              <div
                className="
                  w-fit shrink-0
                  rounded-2xl border border-white/10
                  bg-black/20 px-4 py-3
                  sm:px-5
                "
              >
                <p
                  className="text-2xl font-black sm:text-3xl"
                  style={{ color: accentColor }}
                >
                  {progress}%
                </p>

                <p className="text-[11px] text-white/50 sm:text-xs">
                  Completed
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5 sm:mt-6">
              <div
                className="
                  mb-2 flex flex-wrap
                  justify-between gap-2
                  text-[11px] text-white/60
                  sm:text-xs
                "
              >
                <span>
                  {completedCount} of {todos.length} completed
                </span>

                <span>{remainingCount} remaining</span>
              </div>

              <div className="
                h-2 overflow-hidden rounded-full
                bg-white/10 sm:h-2.5
              ">
                <div
                  className="
                    h-full rounded-full
                    transition-all duration-500
                  "
                  style={{
                    width: `${progress}%`,
                    backgroundColor: accentColor,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="min-w-0 p-4 sm:p-8">
            {/* Add Todo */}
            <form
              onSubmit={addTodo}
              className="
                flex min-w-0
                flex-col gap-3
                sm:flex-row
              "
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Add a new task..."
                className="
                  min-w-0 w-full flex-1
                  rounded-xl border border-white/10
                  bg-white/10 px-3.5 py-3
                  text-sm text-white
                  outline-none
                  placeholder:text-white/40
                  focus:border-white/30
                  focus:ring-2 focus:ring-white/10
                  sm:px-4
                "
              />

              <button
                type="submit"
                className="
                  w-full shrink-0
                  rounded-xl px-5 py-3
                  text-sm font-bold text-black
                  transition hover:brightness-110
                  active:scale-95
                  sm:w-auto sm:px-6
                "
                style={{ backgroundColor: accentColor }}
              >
                + Add Task
              </button>
            </form>

            {/* Filters */}
            <div
              className="
                mt-5 flex min-w-0
                flex-col gap-3
                sm:mt-6 sm:flex-row
                sm:items-center sm:justify-between
              "
            >
              <div className="
                max-w-full overflow-x-auto
                rounded-xl bg-black/20 p-1
              ">
                <div className="flex min-w-max gap-1">
                  {["all", "active", "completed"].map((tab) => {
                    const active = filter === tab;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setFilter(tab)}
                        className={`
                          rounded-lg px-3 py-2
                          text-xs font-semibold
                          capitalize transition
                          sm:px-4
                          ${
                            active
                              ? "text-black"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          }
                        `}
                        style={
                          active
                            ? { backgroundColor: accentColor }
                            : undefined
                        }
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              <span className="
                text-xs text-white/50
                sm:text-right
              ">
                {filteredTodos.length}{" "}
                {filteredTodos.length === 1 ? "task" : "tasks"}
              </span>
            </div>

            {/* Todo List */}
            <div
              className="
                mt-4 flex
                max-h-104 min-h-52
                flex-col gap-3
                overflow-y-auto
                pr-0
                sm:mt-5 sm:pr-1
              "
            >
              {filteredTodos.length === 0 ? (
                <div className="
                  flex min-h-52
                  flex-col items-center
                  justify-center
                  rounded-2xl
                  border border-dashed
                  border-white/10
                  bg-white/5
                  px-4 text-center
                ">
                  <div className="mb-3 text-4xl">📋</div>

                  <h2 className="font-bold">
                    No tasks found
                  </h2>

                  <p className="
                    mt-1 text-xs
                    text-white/50 sm:text-sm
                  ">
                    Add a task or select another filter.
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="
                      flex min-w-0
                      items-start gap-3
                      rounded-2xl
                      border border-white/10
                      bg-white/5
                      px-3 py-3
                      transition hover:bg-white/10
                      sm:items-center
                      sm:px-4 sm:py-4
                    "
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      aria-label={`Complete ${todo.text}`}
                      className="
                        mt-0.5 h-5 w-5
                        shrink-0 cursor-pointer
                        sm:mt-0
                      "
                      style={{ accentColor }}
                    />

                    {/* Task Text */}
                    <button
                      type="button"
                      onClick={() => toggleTodo(todo.id)}
                      className={`
                        min-w-0 flex-1
                        wrap-break-word
                        text-left text-sm
                        font-medium leading-relaxed
                        transition
                        ${
                          todo.completed
                            ? "text-white/35 line-through"
                            : "text-white"
                        }
                      `}
                    >
                      {todo.text}
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete ${todo.text}`}
                      className="
                        flex h-9 w-9
                        shrink-0 items-center
                        justify-center
                        rounded-lg
                        text-sm text-white/40
                        transition
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {todos.length > 0 && (
              <div className="
                mt-5 flex
                flex-col gap-3
                border-t border-white/10
                pt-4 text-xs text-white/50
                sm:mt-6 sm:flex-row
                sm:items-center
                sm:justify-between sm:pt-5
              ">
                <span>
                  {remainingCount}{" "}
                  {remainingCount === 1 ? "item" : "items"} remaining
                </span>

                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={clearCompleted}
                    className="
                      self-start rounded-lg
                      px-2 py-2
                      font-semibold text-red-400
                      transition
                      hover:bg-red-400/10
                      sm:self-auto
                    "
                  >
                    Clear completed
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Todo;