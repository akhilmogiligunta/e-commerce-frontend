import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-brand-700 dark:text-zinc-300"
    >
      <FiArrowLeft />
      Back
    </button>
  );
};

export default BackButton;
