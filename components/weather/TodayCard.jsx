import Image from "next/image";
import { weatherIcons } from "@/lib/weatherIcons";

export default function TodayCard({ data }) {
  const {
    day,
    time,
    temp,
    icon,
    feelsLike,
    windDirection,
    windSpeed,
    pressure,
    humidity,
    sunrise,
    sunset,
  } = data;

  return (
    <section className="h-[226px] w-64 overflow-hidden rounded-3xl bg-card-light text-main">
      <div className="flex items-center justify-between bg-card-light-header px-4 py-3 font-medium">
        <span>{day}</span>
        <span>{time}</span>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-start justify-between">
          <p className="text-5xl font-semibold">
            {temp}
            <sup className="text-3xl">°</sup>
          </p>
          <Image
            src={weatherIcons[icon]}
            alt={icon}
            width={56}
            height={56}
          />
        </div>

        <div className="mt-4 flex justify-between text-xs">
          <ul className="space-y-1.5">
            <li>
              Real Feel <b>{feelsLike}°</b>
            </li>
            <li>
              Wind {windDirection}. <b>{windSpeed}</b>
            </li>
            <li>
              Pressure <b>{pressure}</b>
            </li>
            <li>
              Humidity <b>{humidity}%</b>
            </li>
          </ul>
          <ul className="space-y-1.5">
            <li>
              Sunrise <b>{sunrise}</b>
            </li>
            <li>
              Sunset <b>{sunset}</b>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}