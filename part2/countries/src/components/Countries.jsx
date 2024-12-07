import { ErrorMessage, CountriesList, CountryDetail } from '.';

const Countries = ({ filteredCountries, showCountry, weatherInfo }) => {
  const filteredCountriesLength = filteredCountries.length;

  if (filteredCountriesLength > 10) {
    return <ErrorMessage />;
  }

  if (filteredCountriesLength > 1 && filteredCountriesLength <= 10) {
    return filteredCountries.map((item) => {
      return (
        <CountriesList
          key={item.name.common}
          item={item}
          showCountry={showCountry}
        />
      );
    });
  }

  if (filteredCountriesLength === 1) {
    return (
      <CountryDetail
        oneCountry={filteredCountries[0]}
        weatherInfo={weatherInfo}
      />
    );
  }

  return <h2>No matches found...</h2>;
};

export default Countries;
