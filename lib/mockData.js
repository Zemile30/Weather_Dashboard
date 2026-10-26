export const location = {
  city: 'Dhaka',
  country: 'Bangladesh',
};

export const user = {
  name: 'Zemile',
  avatar: '/images/avatar.jpg',
};

export const tabs = ['Today', 'Tomorrow', 'Next 7days'];
export const viewModes = ['Forecast', 'Air Quality'];

export const today = {
  day: 'Friday',
  time: '11:45 AM',
  temp: 16,
  icon: 'partly-cloudy',
  feelsLike: 18,
  windDirection: 'N-E',
  windSpeed: '6-7km/h',
  pressure: '100MB',
  humidity: 51,
  sunrise: '5:30AM',
  sunset: '6:45',
};

export const weekly = [
  { day: 'SAT', icon: 'rain-sun', temp: 10 },
  { day: 'SUN', icon: 'storm-sun', temp: 15 },
  { day: 'MON', icon: 'rain', temp: 11 },
  { day: 'TUE', icon: 'cloudy-sun', temp: 10 },
  { day: 'WED', icon: 'thunder-rain', temp: 12 },
  { day: 'THU', icon: 'wind-rain-sun', temp: 10 },
];

export const rainChance = [
  { hour: '10AM', value: 65 },
  { hour: '11AM', value: 60 },
  { hour: '12AM', value: 90 },
  { hour: '01PM', value: 37 },
  { hour: '02PM', value: 75 },
  { hour: '03PM', value: 30 },
];

export const rainLevels = ['Rainy', 'Sunny', 'Heavy'];

export const overview = {
  wind: {
    speed: 7.5,
    unit: 'km/h',
    time: '6.20 AM',
    bars: [25, 30, 36, 42, 48, 55, 62, 70, 78, 86, 92, 100,
           96, 88, 80, 72, 64, 55, 48, 40, 34, 28, 22, 18],
  },
  uvIndex: { value: 5.5, max: 12, ticks: [5, 7, 10, 12] },
  humidity: { value: 84, dewPoint: 27 },
  visibility: {
    distance: 4,
    unit: 'km',
    condition: 'Haze is affecting visibility',
  },
};

export const mapBanner = {
  image: '/images/city.png',
};

export const otherCities = [
  { country: 'China', city: 'Beijing', condition: 'Cloudy', icon: 'rain' },
  { country: 'US', city: 'California', condition: 'Windy', icon: 'wind-rain-sun' },
  { country: 'Dubai', city: 'Arab Emirates', condition: 'Mostly Sunny', icon: 'cloudy-sun' },
  { country: 'Canada', city: 'Charlottetown', condition: 'Light SnowShower', icon: 'snow-sun' },
];