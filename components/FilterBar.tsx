type Props = {
  label: string;
  options: readonly string[];
  active: string;
  onChange: (value: string) => void;
};

export default function FilterBar({ label, options, active, onChange }: Props) {
  const all = ["All", ...options];
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-3">
      {all.map((option) => {
        const selected = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              selected
                ? "border-accent bg-accent text-white shadow-glow"
                : "border-line text-muted hover:border-accent hover:text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
