import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface Country {
  cca2: string;
  name: {
    common: string;
  };
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
}

const Countries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${searchTerm}`);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

 
    if (searchTerm) {
      fetchData();
    } else {
    
      setCountries([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Country List</h1>
      <input
        type="text"
        placeholder="Enter country name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {countries.map((country) => (
          <li key={country.cca2}>
            <strong>{country.name.common}</strong> - 
            Currency: {getCurrency(country)} - 
            Language: {getLanguage(country)}
          </li>
        ))}
      </ul>
    </div>
  );
};


const getCurrency = (country: Country) => {
  const currencies = country.currencies;
  if (currencies) {
    const currencyNames = Object.values(currencies).map((currency) => currency.name);
    return currencyNames.join(', ');
  }
  return 'N/A';
};


const getLanguage = (country: Country) => {
  const languages = country.languages;
  if (languages) {
    const languageNames = Object.values(languages).map((language) => language);
    return languageNames.join(', ');
  }
  return 'N/A';
};

export default Countries;
