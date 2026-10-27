import Image from "next/image";
import { weatherIcons } from "@/lib/weatherIcons";
import { getIconKey } from "@/lib/weatherUtils";

export default function OtherCities({ cities }) {
  return (
    <div className="grid h-full grid-rows-4 gap-[27px]">
      {cities.map(({ country, city, description, icon }) => {
        const iconSrc = weatherIcons[getIconKey(icon)];

        return (
          <article
            key={city}
            className="flex items-center justify-between rounded-2xl bg-card px-6"
          >
            <div>
              <p className="text-base text-muted">{country}</p>
              <h3 className="text-xl">{city}</h3>
              <p className="text-base capitalize">{description}</p>
            </div>
            {iconSrc ? (
              <Image
                src={iconSrc}
                alt={description ?? "Weather icon"}
                width={40}
                height={40}
              />
            ) : null}
          </article>
        );
      })}
    </div>
  );
}