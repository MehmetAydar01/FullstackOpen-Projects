const weatherImgUrl = 'https://openweathermap.org/img/wn';

const CountryWeatherDetail = ({ weatherInfo, cityName }) => {
  const { weather, main, wind } = weatherInfo;

  const temperature = (main?.temp || 273) - 273;

  return (
    <div>
      <h2>Weather in {cityName}</h2>
      <p>temperature {temperature.toFixed(2)} Celcius</p>
      <img
        src={`${weatherImgUrl}/${weather[0]?.icon}@2x.png`}
        alt={`${cityName}'s weather`}
      />
      <p>wind {wind.speed} m/s</p>
    </div>
  );
};

export default CountryWeatherDetail;
