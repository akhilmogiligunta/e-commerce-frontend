import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value = 0, count, compact = false }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const position = index + 1;
    const isFull = value >= position;
    const isHalf = value >= position - 0.5 && value < position;

    if (isFull) return <FaStar key={position} />;
    if (isHalf) return <FaStarHalfAlt key={position} />;
    return <FaRegStar key={position} />;
  });

  return (
    <div
      className="flex items-center gap-2 text-amber-400"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      <div className={`flex ${compact ? "gap-0.5 text-xs" : "gap-1 text-sm"}`}>
        {stars}
      </div>
      {!compact && (
        <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
          {value.toFixed(1)}
          {count ? ` (${count})` : ""}
        </span>
      )}
    </div>
  );
};

export default Rating;
