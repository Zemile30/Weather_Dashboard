import Image from "next/image";
import { weatherIcons } from "@/lib/weatherIcons";

function DayCard({ day, icon, temp }) {
  return (
    <article className="flex h-[226px] w-24 flex-col items-center overflow-hidden rounded-[32px] bg-card">
      <h3 className="w-full border-b border-soft py-3 text-center text-lg font-medium">
        {day}
      </h3>

      <Image
        src={weatherIcons[icon]}
        alt={icon}
        width={40}
        height={40}
        className="mt-6"
      />

      <p className="mt-auto mb-5 text-3xl font-semibold">
        {temp}
        <sup className="text-xl">°</sup>
      </p>
    </article>
  );
}

export default function WeeklyForecast({ days }) {
  return (
    <>
      {days.map((item) => (
        <DayCard key={item.day} {...item} />
      ))}
    </>
  );
}