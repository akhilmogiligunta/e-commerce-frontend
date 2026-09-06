const SectionHeading = ({ eyebrow, title, action }) => (
  <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl dark:text-white">
        {title}
      </h2>
    </div>
    {action}
  </div>
);

export default SectionHeading;
