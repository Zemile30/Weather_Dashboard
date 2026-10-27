import Image from "next/image";
import { weatherIcons } from "@/lib/weatherIcons";
import { getIconKey } from "@/lib/weatherUtils";

function DayCard({ day, icon, min, max }) {
  const iconSrc = weatherIcons[getIconKey(icon)];

  return (
    <article className="flex h-[226px] w-24 flex-col items-center overflow-hidden rounded-[32px] bg-card">
      <h3 className="w-full border-b border-soft py-3 text-center text-lg font-medium">
        {day.slice(0, 3)}
      </h3>

      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={`${day} weather`}
          width={40}
          height={40}
          className="mt-6"
        />
      ) : null}

      <div className="mt-auto mb-5 text-center">
        <p className="text-3xl font-semibold">
          {max}
          <sup className="text-xl">°</sup>
        </p>
        <p className="text-sm text-muted">
          {min}
          <sup>°</sup>
        </p>
      </div>
    </article>
  );
}

export default function WeeklyForecast({ days }) {
  return (
    <>
      {days.map((item, index) => (
        <DayCard key={`${item.day}-${index}`} {...item} />
      ))}
    </>
  );
}