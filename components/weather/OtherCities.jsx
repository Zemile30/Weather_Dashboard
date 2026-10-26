import Image from "next/image";
import { weatherIcons } from "@/lib/weatherIcons";

export default function OtherCities({ cities }) {
  return (
    <div className="grid h-full grid-rows-4 gap-[27px]">
      {cities.map(({ country, city, condition, icon }) => (
        <article
          key={city}
          className="flex items-center justify-between rounded-2xl bg-card px-6"
        >
          <div>
            <p className="text-base text-muted">{country}</p>
            <h3 className="text-xl">{city}</h3>
            <p className="text-base">{condition}</p>
          </div>
          <Image src={weatherIcons[icon]} alt={condition} width={40} height={40} />
        </article>
      ))}
    </div>
  );
}