"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import TabBar from "@/components/ui/TabBar";
import { location, user, tabs, viewModes } from "@/lib/mockData";
import TodayCard from "@/components/weather/TodayCard";
import { today, weekly } from "@/lib/mockData";
import WeeklyForecast from "@/components/weather/WeeklyForecast";
import RainChart from "@/components/weather/RainChart";
import { rainChance, rainLevels } from "@/lib/mockData";
import WindStatus from "@/components/weather/WindStatus";
import UVIndex from "@/components/weather/UVIndex";
import Humidity from "@/components/weather/Humidity";
import Visibility from "@/components/weather/Visibility";
import MapBanner from "@/components/weather/MapBanner";
import OtherCities from "@/components/weather/OtherCities";
import { overview, mapBanner, otherCities } from "@/lib/mockData";



export default function Home() {
  const [activeTab, setActiveTab] = useState("Next 7days");
  const [mode, setMode] = useState("Forecast");
  const [dark, setDark] = useState(true);

  return (
    <main className="p-6">
      <Navbar
        city={location.city}
        country={location.country}
        user={user}
        dark={dark}
        onThemeChange={setDark}
      />
      <div className="mt-8 grid grid-cols-[1fr_300px] gap-x-7 gap-y-6">
        <div className="flex items-center justify-between">
          <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <TabBar tabs={viewModes} active={mode} onChange={setMode} variant="pill" />
        </div>
        <h2 className="text-2xl">Chance Of Rain</h2>
        <div className="flex justify-between">
          <TodayCard data={today} />
          <WeeklyForecast days={weekly} />
        </div>
        <RainChart data={rainChance} levels={rainLevels} />
        <h2 className="text-xl">Today's Overview</h2>
        <div className="flex items-center justify-between">
          <h2 className="text-base">Other Cities</h2>
          <a href="#" className="text-sm">See All</a>
        </div>

        <div className="grid h-[517px] grid-cols-[290px_290px_1fr] grid-rows-2 gap-x-10 gap-y-[27px]">
          <WindStatus data={overview.wind} />
          <UVIndex data={overview.uvIndex} />
          <div className="row-span-2">
            <MapBanner data={mapBanner} />
          </div>
          <Humidity data={overview.humidity} />
          <Visibility data={overview.visibility} />
        </div>
        <OtherCities cities={otherCities} />
      </div>
    </main>
  );
}