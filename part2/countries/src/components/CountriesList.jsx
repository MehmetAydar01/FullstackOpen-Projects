import { CountryDetail } from '.';

const CountriesList = ({ item, showCountry }) => {
  const countryName = item.name.common;

  return (
    <div>
      <p>{countryName}</p>
      <button type='button' onClick={() => showCountry(countryName)}>
        show
      </button>
    </div>
  );
};

export default CountriesList;
