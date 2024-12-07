import { useEffect } from 'react';
import { useState } from 'react';
import countryService from './services/countries';
import weatherService from './services/weather';
import { Countries, CountryDetail, InputSearch } from './components';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  // Filtered Countries
  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchValue.toLocaleLowerCase());
  });

  useEffect(() => {
    if (countries.length <= 0) {
      countryService
        .getAllCountries()
        .then((initialData) => {
          setCountries(initialData);
        })
        .catch((err) => {
          console.log('data gelmedi.. ', err);
        });
    }

    if (filteredCountries.length === 1 || selectedCountry) {
      const { latlng } = filteredCountries[0] || [39, 35];

      weatherService
        .getWeather({ lat: latlng[0], lon: latlng[1] })
        .then((initData) => {
          setWeatherInfo(initData);
        })
        .catch((err) => {
          console.log('hava durumu hatalı', err);
        });
    }
  }, [searchValue, selectedCountry]);

  // Handle Input Change
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setSelectedCountry(null);
  };

  // Show Country Detail
  const showCountry = (name) => {
    const findCountry = countries.find(
      (item) => item.name.common.toLowerCase() === name.toLowerCase()
    );

    if (!findCountry) {
      setSelectedCountry(null);
      return;
    }

    setSelectedCountry(findCountry);
  };

  return (
    <>
      <main>
        <InputSearch
          searchValue={searchValue}
          handleChange={handleChange}
          text='find countries'
        />
        {searchValue && !selectedCountry && (
          <Countries
            filteredCountries={filteredCountries}
            showCountry={showCountry}
            weatherInfo={weatherInfo}
          />
        )}
        {selectedCountry && (
          <CountryDetail
            oneCountry={selectedCountry}
            weatherInfo={weatherInfo}
          />
        )}
      </main>
    </>
  );
}

export default App;
