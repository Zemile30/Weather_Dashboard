const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DIRECTIONS = ["N", "N-E", "E", "S-E", "S", "S-W", "W", "N-W"];

export function getIconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

// API vaxtı UTC saniyədir; şəhərin yerli vaxtı üçün timezone ofseti əlavə olunur
function toCityDate(unixSeconds, timezone) {
  return new Date((unixSeconds + timezone) * 1000);
}

// Ofset artıq əlavə olunub, ona görə getHours() yox, UTC metodları işlədilir
function formatTime(date) {
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes} ${period}`;
}

function degToDirection(deg) {
  if (typeof deg !== "number") return "";
  return DIRECTIONS[Math.round(deg / 45) % 8];
}

export function formatToday(raw) {
  const { main, wind, weather, sys, timezone, dt } = raw;
  const now = toCityDate(dt, timezone);

  return {
    day: DAYS[now.getUTCDay()],
    time: formatTime(now),
    temp: Math.round(main.temp),
    icon: weather[0].icon,
    description: weather[0].description,
    feelsLike: Math.round(main.feels_like),
    windDirection: degToDirection(wind.deg),
    windSpeed: `${Math.round(wind.speed * 3.6)}km/h`,
    pressure: `${main.pressure}hPa`,
    humidity: main.humidity,
    sunrise: formatTime(toCityDate(sys.sunrise, timezone)),
    sunset: formatTime(toCityDate(sys.sunset, timezone)),
  };
}

// API şeh nöqtəsini vermir, temperatur və rütubətdən Magnus düsturu ilə hesablanır
function calcDewPoint(temp, humidity) {
  const a = 17.62;
  const b = 243.12;
  const g = Math.log(humidity / 100) + (a * temp) / (b + temp);
  return Math.round((b * g) / (a - g));
}

function describeVisibility(km) {
  if (km >= 10) return "Visibility is excellent";
  if (km >= 5) return "Visibility is good";
  if (km >= 2) return "Haze is affecting visibility";
  return "Visibility is very poor";
}

export function formatLocation(raw) {
  const country = new Intl.DisplayNames(["en"], { type: "region" }).of(raw.sys.country);
  return { city: raw.name, country };
}

export function formatWind(raw) {
  return {
    speed: Number((raw.wind.speed * 3.6).toFixed(2)),
    unit: "km/h",
    time: formatTime(toCityDate(raw.dt, raw.timezone)),
  };
}

export function formatHumidity(raw) {
  return {
    value: raw.main.humidity,
    dewPoint: calcDewPoint(raw.main.temp, raw.main.humidity),
  };
}

export function formatVisibility(raw) {
  const km = Math.round(raw.visibility / 1000);
  return { distance: km, unit: "km", condition: describeVisibility(km) };
}

// 3 saatlıq proqnoz siyahısını şəhərin yerli günlərinə görə qruplaşdırır
export function formatForecast(raw) {
  const { list, city } = raw;
  const days = {};

  list.forEach((item) => {
    const local = toCityDate(item.dt, city.timezone);
    const key = local.toISOString().slice(0, 10);
    const hour = local.getUTCHours();

    if (!days[key]) {
      days[key] = { date: local, min: Infinity, max: -Infinity, icon: null, bestDiff: 99 };
    }
    const d = days[key];
    d.min = Math.min(d.min, item.main.temp_min);
    d.max = Math.max(d.max, item.main.temp_max);

    // ikon üçün günün ortasına (12:00) ən yaxın ölçmə seçilir
    const diff = Math.abs(hour - 12);
    if (diff < d.bestDiff) {
      d.bestDiff = diff;
      d.icon = item.weather[0].icon;
    }
  });

  return Object.values(days)
    .slice(0, 6)
    .map((d) => ({
      day: DAYS[d.date.getUTCDay()],
      min: Math.round(d.min),
      max: Math.round(d.max),
      icon: d.icon,
    }));
}

// Other Cities kartı üçün qısa format
export function formatCity(raw) {
  return {
    city: raw.name,
    country: raw.sys.country,
    temp: Math.round(raw.main.temp),
    icon: raw.weather[0].icon,
    description: raw.weather[0].description,
  };
}

// OpenWeatherMap ikon kodunu (məs. "10d") layihənin öz ikon açarına çevirir
export function getIconKey(code = "") {
  const night = code.endsWith("n");

  switch (code.slice(0, 2)) {
    case "01": // clear sky
      return "sunny";
    case "02": // few clouds
      return "partly-cloudy";
    case "03": // scattered clouds
      return "cloudy-sun";
    case "04": // broken / overcast clouds
      return "cloudy";
    case "09": // shower rain
      return "rain";
    case "10": // rain
      return night ? "rain" : "rain-sun";
    case "11": // thunderstorm
      return night ? "thunder-rain" : "storm-sun";
    case "13": // snow
      return "snow-sun";
    case "50": // mist, fog
      return "cloudy";
    default:
      return "cloudy";
  }
}

// İlk 6 üç-saatlıq ölçmədən yağış ehtimalı (%)
export function formatRainChance(raw) {
  return raw.list.slice(0, 6).map((item) => {
    const date = toCityDate(item.dt, raw.city.timezone);
    const h = date.getUTCHours();
    const label = `${String(h % 12 || 12).padStart(2, "0")}${h >= 12 ? "PM" : "AM"}`;
    return { hour: label, value: Math.round((item.pop ?? 0) * 100) };
  });
}