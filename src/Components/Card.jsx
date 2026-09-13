import { useNavigate } from "react-router-dom";

const Card = ({ title, src, path }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      className="group relative h-48 w-full cursor-pointer select-none overflow-hidden rounded-2xl border border-white/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
    >
      {/* Background Image */}
      <img
        src={src}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/5" />

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-3 p-4">
        <h2 className="line-clamp-1 text-sm font-bold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-base">
          {title}
        </h2>

        <span
          className="flex h-7 w-7 shrink-0 translate-x-2 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </div>
  );
};

export default Card;