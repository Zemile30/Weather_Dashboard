import Image from "next/image";
import { Bell, LayoutGrid, MapPin, Search } from "lucide-react";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

export default function Navbar({ city, country, user, dark, onThemeChange }) {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Menu"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-card"
        >
          <LayoutGrid size={24} />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-card"
        >
          <Bell size={24} />
        </button>
        <div className="flex items-center gap-3 text-base">
          <MapPin size={24} />
          <span>
            {city},{country}
          </span>
        </div>
      </div>

      <label className="flex h-[46px] w-[492px] items-center gap-4 rounded-xl bg-card px-6 text-sm">
        <Search size={24} />
        <input
          type="text"
          placeholder="Search City"
          className="w-full bg-transparent text-muted outline-none placeholder:text-muted"
        />
      </label>

      <div className="flex items-center gap-4 justify-self-end">
        <ToggleSwitch checked={dark} onChange={onThemeChange} />
        <Image
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover object-center"
        />
      </div>
    </header>
  );
}