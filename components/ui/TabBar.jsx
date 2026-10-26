export default function TabBar({ tabs, active, onChange, variant = "text" }) {
  if (variant === "pill") {
    return (
      <div className="inline-flex rounded-full bg-card p-0.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
              active === tab ? "bg-card-light font-medium text-main" : "text-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`text-xl transition-colors ${
            active === tab ? "text-white" : "text-muted"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}