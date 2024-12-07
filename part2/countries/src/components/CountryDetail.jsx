import { CountryWeatherDetail } from '.';

const CountryDetail = ({ oneCountry, weatherInfo }) => {
  const { name, capital, area, languages, flags } = oneCountry;

  const languageList = Object.values(languages);

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h3>languages:</h3>
      <ul>
        {languageList.map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={flags.png} alt={flags.alt} style={{ width: '150px' }} />
      {weatherInfo && (
        <CountryWeatherDetail weatherInfo={weatherInfo} cityName={capital[0]} />
      )}
    </div>
  );
};

export default CountryDetail;
