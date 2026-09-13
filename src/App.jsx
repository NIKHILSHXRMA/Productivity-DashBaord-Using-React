import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Utils/firebase";

import Home from "./Pages/Home";
import Todo from "./Pages/Todo";
import DailyPlanner from "./Pages/DailyPlanner";
import Pomodoro from "./Pages/Pomodoro";
import Quotes from "./Pages/Quotes";
import Dailygoals from "./Pages/Dailygoals";
import Auth from "./Components/Auth";
import { ThemeProvider } from "./Context/ThemeContext";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        className="flex min-h-screen w-full items-center justify-center"
        style={{
          backgroundColor: "var(--color-bg, #080B14)",
          color: "var(--color-text, #F8FAFC)",
        }}
      >
        <p className="font-heading text-sm font-medium tracking-wide">
          Verifying session...
        </p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div
        className="
          min-h-screen
          w-full
          overflow-visible
          bg-(--color-bg)
          text-(--color-text)
          transition-colors
          duration-500
        "
      >
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/auth" replace />}
          />

          {/* Authentication */}
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/" replace />}
          />

          {/* Protected Routes */}
          <Route
            path="/todo"
            element={user ? <Todo /> : <Navigate to="/auth" replace />}
          />

          <Route
            path="/dailyplanner"
            element={
              user ? <DailyPlanner /> : <Navigate to="/auth" replace />
            }
          />

          <Route
            path="/quotes"
            element={user ? <Quotes /> : <Navigate to="/auth" replace />}
          />

          <Route
            path="/pomodoro"
            element={user ? <Pomodoro /> : <Navigate to="/auth" replace />}
          />

          <Route
            path="/dailygoals"
            element={user ? <Dailygoals /> : <Navigate to="/auth" replace />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;