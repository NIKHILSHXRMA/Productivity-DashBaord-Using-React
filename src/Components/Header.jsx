
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { auth, signOut } from "../Utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const {
    currentTheme,
    setThemeById,
    themes,
  } = useTheme();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [themeOpen, setThemeOpen] = useState(false);

  const themeRef = useRef(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        themeRef.current &&
        !themeRef.current.contains(event.target)
      ) {
        setThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Sign In / Sign Out
  const handleAuthAction = async () => {
    if (user) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign out failed:", error);
      }
    } else {
      navigate("/auth");
    }
  };

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Guest";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div
      className="
        mx-2 mt-2
        rounded-2xl
        border border-white/10
        bg-(--color-surface,#9D6638)
        px-3 py-3
        shadow-lg shadow-black/10
        transition-colors duration-500
        sm:mx-3 sm:px-5 sm:py-3.5
        lg:mx-4
      "
    >
      <header className="flex items-center justify-between gap-3">

        {/* ================= BRAND ================= */}
        <button
          onClick={() => navigate("/")}
          aria-label="Go to FocusFlow home"
          className="
            group flex min-w-0 items-center gap-2.5
            text-left
            cursor-pointer
          "
        >
          {/* Premium Logo */}
          <span
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-white/20
              bg-white/15
              text-xl
              shadow-inner
              transition-transform duration-300
              group-hover:scale-105
              sm:h-11 sm:w-11
            "
          >
            ⚡
          </span>

          {/* Brand Text */}
          <div className="min-w-0">
            <h1
              className="
                truncate
                text-base font-bold tracking-tight text-white
                sm:text-xl md:text-2xl
              "
            >
              FocusFlow
            </h1>

            <p className="hidden text-[10px] font-medium tracking-wide text-white/60 sm:block">
              Your productivity workspace
            </p>
          </div>
        </button>

        {/* ================= ACTIONS ================= */}
        <div className="flex shrink-0 items-center gap-2">

          {/* User Profile */}
          {user && (
            <div
              className="
                hidden items-center gap-2
                rounded-xl
                border border-white/10
                bg-black/10
                px-2.5 py-2
                md:flex
              "
            >
              {/* Avatar */}
              <div
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-lg
                  bg-white/20
                  text-xs font-bold text-white
                "
              >
                {userInitial}
              </div>

              {/* User Name */}
              <div className="max-w-32">
                <p className="truncate text-xs font-semibold text-white">
                  {userName}
                </p>

                <p className="text-[10px] text-white/60">
                  Personal workspace
                </p>
              </div>
            </div>
          )}

          {/* ================= THEME DROPDOWN ================= */}
          <div ref={themeRef} className="relative">

            {/* Theme Trigger */}
            <button
              onClick={() => setThemeOpen((prev) => !prev)}
              aria-expanded={themeOpen}
              aria-haspopup="menu"
              title="Change theme"
              className="
                flex items-center gap-2
                rounded-xl
                border border-white/15
                bg-white/10
                px-2.5 py-2
                text-xs font-semibold text-white
                backdrop-blur-md
                transition-all duration-200
                hover:bg-white/20
                active:scale-95
                cursor-pointer
                sm:px-3
              "
            >
              {/* Current Theme Color */}
              <span
                className="
                  h-3 w-3 shrink-0
                  rounded-full
                  border border-white/30
                  shadow-sm
                "
                style={{
                  backgroundColor:
                    currentTheme?.accent || "#8B5CF6",
                }}
              />

              {/* Theme Name */}
              <span className="hidden max-w-24 truncate sm:inline lg:max-w-32">
                {currentTheme?.name || "Theme"}
              </span>

              {/* Chevron */}
              <span
                className={`text-[10px] transition-transform duration-200 ${
                  themeOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Theme Menu */}
            {themeOpen && (
              <div
                role="menu"
                className="
                  absolute right-0 top-full z-50 mt-2
                  w-60
                  overflow-hidden
                  rounded-2xl
                  border border-white/10
                  bg-(--color-bg,#0F111A)
                  p-2
                  shadow-2xl shadow-black/30
                  backdrop-blur-xl
                "
              >
                <div className="px-3 pb-2 pt-1">
                  <p className="text-xs font-semibold text-(--color-text,#F8FAFC)">
                    Choose your theme
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/50">
                    Personalize your workspace
                  </p>
                </div>

                {themes.map((theme) => {
                  const isActive =
                    currentTheme?.id === theme.id;

                  return (
                    <button
                      key={theme.id}
                      role="menuitem"
                      onClick={() => {
                        setThemeById(theme.id);
                        setThemeOpen(false);
                      }}
                      className={`
                        flex w-full items-center gap-3
                        rounded-xl
                        px-3 py-2.5
                        text-left
                        transition-all duration-200
                        cursor-pointer
                        ${
                          isActive
                            ? "bg-white/10"
                            : "hover:bg-white/5"
                        }
                      `}
                    >
                      {/* Theme Preview */}
                      <span
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-xl
                          border border-white/10
                        "
                        style={{
                          backgroundColor: theme.surface,
                        }}
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: theme.accent,
                          }}
                        />
                      </span>

                      {/* Theme Details */}
                      <span className="min-w-0 flex-1">
                        <span
                          className="
                            block truncate
                            text-xs font-semibold
                            text-(--color-text,#F8FAFC)
                          "
                        >
                          {theme.name}
                        </span>

                        <span className="mt-0.5 block text-[10px] text-white/50">
                          {theme.id}
                        </span>
                      </span>

                      {/* Active Indicator */}
                      {isActive && (
                        <span className="text-sm text-(--color-accent,#8B5CF6)">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= AUTH BUTTON ================= */}
          <button
            onClick={handleAuthAction}
            className="
              rounded-xl
              border border-white/20
              bg-white/10
              px-3 py-2
              text-xs font-semibold text-white
              backdrop-blur-md
              transition-all duration-200
              hover:border-white/30
              hover:bg-white/20
              active:scale-95
              cursor-pointer
              sm:px-4
            "
          >
            {user ? "Sign Out" : "Sign In"}
          </button>

        </div>
      </header>
    </div>
  );
};

export default Header;