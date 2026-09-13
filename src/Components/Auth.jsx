import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../Utils/firebase";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const accentColor = "var(--color-accent, #D4A373)";
  const backgroundColor = "var(--color-bg, #382618)";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isLogin && !name) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      navigate("/");
    } catch (firebaseError) {
      console.error(firebaseError);

      switch (firebaseError.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/email-already-in-use":
          setError("This email is already registered. Please log in.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin((previousMode) => !previousMode);
    setError("");
    setShowPassword(false);

    setFormData((previousData) => ({
      name: "",
      email: previousData.email,
      password: "",
    }));
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6 text-white sm:px-6 sm:py-8"
      style={{ backgroundColor }}
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: accentColor }}
      />

      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: accentColor }}
      />

      {/* Main Card */}
      <div className="relative z-10 grid min-h-0 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        {/* Left Section */}
        <section className="relative hidden min-h-162.5 overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85"
            alt="Productivity workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/50 to-black/80" />

          <div className="relative flex h-full flex-col justify-between p-10">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-fit text-2xl font-black tracking-tight"
            >
              Focus
              <span style={{ color: accentColor }}>Flow.</span>
            </button>

            <div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                Your productivity space
              </span>

              <h1 className="mt-6 max-w-md text-5xl font-black leading-tight">
                Make every day
                <span
                  className="block"
                  style={{ color: accentColor }}
                >
                  count.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                Manage your tasks, plan your day, track your goals and stay
                focused with one beautiful productivity dashboard.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80">
                  ✓ Task Management
                </span>

                <span className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80">
                  ✓ Daily Planning
                </span>

                <span className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80">
                  ✓ Focus Timer
                </span>
              </div>
            </div>

            <p className="text-xs text-white/50">
              Build habits. Stay consistent. Become better.
            </p>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex min-h-162.5 flex-col justify-center p-5 sm:p-8 lg:p-10 xl:p-12">
          {/* Mobile Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-8 w-fit text-2xl font-black tracking-tight lg:hidden"
          >
            Focus
            <span style={{ color: accentColor }}>Flow.</span>
          </button>

          <div className="mx-auto w-full max-w-md">
            {/* Heading */}
            <div className="mb-8">
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: accentColor }}
              >
                Welcome to FocusFlow
              </p>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                {isLogin ? "Welcome back!" : "Create your account"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/50">
                {isLogin
                  ? "Login to continue your productivity journey."
                  : "Start building a more focused and organized life today."}
              </p>
            </div>

            {/* Login Signup Switch */}
            <div className="mb-7 grid grid-cols-2 rounded-xl bg-white/5 p-1">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-bold transition ${
                  isLogin
                    ? "bg-white/10 text-white shadow"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-bold transition ${
                  !isLogin
                    ? "bg-white/10 text-white shadow"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-white/80"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nikhil Sharma"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/30 focus:bg-white/10"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-white/80"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/30 focus:bg-white/10"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-white/80"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    autoComplete={
                      isLogin ? "current-password" : "new-password"
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-16 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/30 focus:bg-white/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previousValue) => !previousValue)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl py-3.5 text-sm font-black text-neutral-900 shadow-lg transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: accentColor }}
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login to FocusFlow →"
                  : "Create Account →"}
              </button>
            </form>

            {/* Bottom Toggle */}
            <p className="mt-7 text-center text-sm text-white/50">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={toggleAuthMode}
                className="ml-1 font-bold transition hover:underline"
                style={{ color: accentColor }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>

            <div className="mt-8 flex items-center gap-3 text-xs text-white/30">
              <div className="h-px flex-1 bg-white/10" />
              <span>FocusFlow Productivity</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auth;