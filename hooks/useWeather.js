import { useState, useEffect, useCallback, useRef } from "react";
import {
  formatLocation,
  formatToday,
  formatWind,
  formatHumidity,
  formatVisibility,
  formatForecast,
  formatRainChance,
  formatCity,
} from "@/lib/weatherUtils";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const DEFAULT_CITY = "Baku";
const OTHER_CITIES = ["Beijing", "California", "Dubai", "Charlottetown"];

async function request(endpoint, city) {
  if (!API_KEY) {
    throw new Error("API key tapılmadı. .env.local faylını yoxlayın.");
  }

  const url = `${BASE_URL}/${endpoint}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error("Fetch xətası:", err);
    throw new Error("İnternet bağlantısını yoxlayın.");
  }

  if (response.status === 404) throw new Error("Şəhər tapılmadı. Adı yoxlayıb yenidən cəhd edin.");
  if (response.status === 401) throw new Error("API key etibarsızdır və ya hələ aktiv deyil.");
  if (!response.ok) throw new Error("Məlumatı almaq mümkün olmadı. Bir az sonra yenidən cəhd edin.");

  return response.json();
}

function formatCurrent(raw) {
  return {
    location: formatLocation(raw),
    today: formatToday(raw),
    wind: formatWind(raw),
    humidity: formatHumidity(raw),
    visibility: formatVisibility(raw),
  };
}

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [rainChance, setRainChance] = useState([]);
  const [otherCities, setOtherCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ən son sorğunun nömrəsi; köhnə sorğuların nəticəsi ignor edilir
  const requestId = useRef(0);

  const search = useCallback(async (city) => {
    const name = city.trim();
    if (!name) return;

    const id = ++requestId.current;
    setLoading(true);
    setError(null);

    try {
      const [current, forecastRaw] = await Promise.all([
        request("weather", name),
        request("forecast", name),
      ]);
      if (id !== requestId.current) return;

      setWeather(formatCurrent(current));
      setForecast(formatForecast(forecastRaw));
      setRainChance(formatRainChance(forecastRaw));
      setError(null);
    } catch (err) {
      if (id !== requestId.current) return;
      setError(err.message);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  // ilk açılış: default şəhər (Bakı)
  useEffect(() => {
    search(DEFAULT_CITY);
  }, [search]);

  // sabit 4 şəhər, bir dəfə yüklənir
  useEffect(() => {
    let cancelled = false;

    Promise.allSettled(OTHER_CITIES.map((c) => request("weather", c))).then((results) => {
      if (cancelled) return;
      setOtherCities(
        results.filter((r) => r.status === "fulfilled").map((r) => formatCity(r.value))
      );
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { weather, forecast, rainChance, otherCities, loading, error, search };
}