import { Moon, Sun } from "lucide-react";

export default function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex h-11 w-28 items-center rounded-full border border-soft p-1"
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-white text-main transition-transform duration-300 ${
          checked ? "translate-x-[66px]" : "translate-x-0"
        }`}
      >
        {checked ? <Moon size={20} /> : <Sun size={20} />}
      </span>
    </button>
  );
}