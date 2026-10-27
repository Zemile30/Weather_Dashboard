"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import TabBar from "@/components/ui/TabBar";
import TodayCard from "@/components/weather/TodayCard";
import WeeklyForecast from "@/components/weather/WeeklyForecast";
import RainChart from "@/components/weather/RainChart";
import WindStatus from "@/components/weather/WindStatus";
import UVIndex from "@/components/weather/UVIndex";
import Humidity from "@/components/weather/Humidity";
import Visibility from "@/components/weather/Visibility";
import MapBanner from "@/components/weather/MapBanner";
import OtherCities from "@/components/weather/OtherCities";
import useWeather from "@/hooks/useWeather";
import { user, tabs, viewModes, mapBanner, rainLevels, windBars, uvIndex } from "@/lib/constants";


export default function Home() {
  const [activeTab, setActiveTab] = useState("Next 7days");
  const [mode, setMode] = useState("Forecast");
  const [dark, setDark] = useState(true);

  const { weather, forecast, rainChance, otherCities, loading, error, search } = useWeather();

  
  if (!weather) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        {loading ? (
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-600 border-t-white" />
        ) : (
          <p>{error}</p>
        )}
      </div>
    );
  }

  const { location, today, wind, humidity, visibility } = weather;

  return (
    <main className="p-6">
      <Navbar
        city={location.city}
        country={location.country}
        user={user}
        dark={dark}
        onSearch={search}
      />

      {error && (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div
        className={`mt-8 grid grid-cols-[1fr_300px] gap-x-7 gap-y-6 ${
          loading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <TabBar tabs={viewModes} active={mode} onChange={setMode} variant="pill" />
        </div>
        <h2 className="text-2xl">Chance Of Rain</h2>

        <div className="flex gap-12">
          <TodayCard data={today} />
          <WeeklyForecast days={forecast} />
        </div>
        <RainChart data={rainChance} levels={rainLevels} />

        <h2 className="text-xl">Today&apos;s Overview</h2>
        <div className="flex items-center justify-between">
          <h2 className="text-base">Other Cities</h2>
          <a href="#" className="text-sm">See All</a>
        </div>

        <div className="grid h-[517px] grid-cols-[290px_290px_1fr] grid-rows-2 gap-x-10 gap-y-[27px]">
          <WindStatus data={{ ...wind, bars: windBars }} />
          <UVIndex data={uvIndex} />
          <div className="row-span-2">
            <MapBanner data={mapBanner} />
          </div>
          <Humidity data={humidity} />
          <Visibility data={visibility} />
        </div>
        <OtherCities cities={otherCities} />
      </div>
    </main>
  );
}