
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuotesApi from "../Hooks/useQoutesApi";

const Quotes = () => {
  const navigate = useNavigate();
  const { quote, getQuotes } = useQuotesApi();

  const [copied, setCopied] = useState(false);

  const accentColor = "var(--color-accent, #8B5CF6)";

  const handleCopy = async () => {
    if (!quote?.quote) return;

    const quoteText = `"${quote.quote}" — ${
      quote.author || "Unknown"
    }`;

    try {
      await navigator.clipboard.writeText(quoteText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy quote:", error);
    }
  };

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
        max-w-6xl flex-1 flex-col
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
            Daily Inspiration
          </span>
        </div>

        {/* Quote Card Wrapper */}
        <div className="
          flex flex-1
          items-center justify-center
          py-8 sm:py-12
        ">
          <section
            className="
              relative w-full
              max-w-4xl
              overflow-hidden
              rounded-2xl
              border border-white/10
              p-5 text-center
              shadow-2xl
              backdrop-blur-xl
              transition-colors duration-500
              sm:rounded-3xl sm:p-10
              md:p-14
            "
            style={{
              backgroundColor:
                "var(--color-surface, #191D2B)",
            }}
          >

            {/* Decorative Quote Mark */}
            <span className="
              pointer-events-none
              absolute -left-1 -top-6
              select-none
              font-serif text-[110px]
              leading-none text-white/10
              sm:-top-8 sm:text-[150px]
            ">
              “
            </span>

            {/* Quote Content */}
            <div className="
              relative z-10
              flex min-h-52
              flex-col items-center
              justify-center
              sm:min-h-60
            ">
              <p className="
                max-w-3xl
                wrap-break-word
                text-lg font-semibold
                leading-relaxed
                tracking-tight
                text-white
                sm:text-2xl
                md:text-3xl
              ">
                {quote?.quote
                  ? `"${quote.quote}"`
                  : "Loading your daily quote..."}
              </p>

              {quote?.author && (
                <p
                  className="
                    mt-5
                    wrap-break-word
                    text-sm font-bold
                    tracking-wide
                    sm:mt-6 sm:text-base
                  "
                  style={{ color: accentColor }}
                >
                  — {quote.author}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="
              relative z-10
              mt-8 flex
              flex-col items-stretch
              justify-center gap-3
              sm:mt-10 sm:flex-row
              sm:items-center
            ">
              <button
                type="button"
                onClick={getQuotes}
                className="
                  w-full
                  rounded-xl
                  px-5 py-3
                  text-xs font-bold
                  text-black
                  shadow-lg
                  transition hover:brightness-110
                  active:scale-95
                  sm:w-auto sm:text-sm
                "
                style={{ backgroundColor: accentColor }}
              >
                ✨ New Quote
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!quote?.quote}
                className="
                  w-full
                  rounded-xl
                  border border-white/15
                  px-5 py-3
                  text-xs font-semibold
                  text-white
                  transition
                  hover:bg-white/10
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:w-auto sm:text-sm
                "
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
            </div>

            {/* Bottom Accent */}
            <div
              className="
                mx-auto mt-8
                h-1 w-14
                rounded-full
                sm:mt-10 sm:w-16
              "
              style={{ backgroundColor: accentColor }}
            />
          </section>
        </div>

        {/* Footer */}
        <div className="
          pb-2 text-center
          text-[10px]
          tracking-wider
          text-white/40
          sm:text-xs
        ">
          Stay motivated · Stay focused
        </div>
      </div>
    </div>
  );
};

export default Quotes;