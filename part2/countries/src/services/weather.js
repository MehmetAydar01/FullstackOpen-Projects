import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data';

const getWeather = ({ lat, lon }) => {
  const request = axios.get(
    `${baseUrl}/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );

  return request.then((response) => response.data);
};

export default { getWeather };
