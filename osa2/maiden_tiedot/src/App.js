import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({ countries, showCountry }) => {
  return (
    <div>
      <ul style={{ listStyle: "none", padding:"0px"}}>
        {countries.map(country => {
          return (
              <li key={country.name}>{country.name} <button onClick={() => showCountry(country)}>show</button></li>
          )
        })}
        </ul>
    </div>
  )
}

const Country = ({ country, weather }) => {
  // console.log(country);
  // console.log(weather);
  return(
    <div>
      <h2>{country[0].name}</h2>
        <span>Capital: {country[0].capital}</span>
        <br></br>
        <span>Population: {country[0].population}</span>
      <h3>Spoken languages</h3>
        <ul>
          {country[0].languages.map(lang => {
            return <li key={lang.name}>{lang.name}</li>
          })}
        </ul>
      <img src={country[0].flag} style={{width:"150px"}} alt='Maan lippu' />
      <h2>Weather in {country[0].name}</h2>
          <p><strong>Temperature:</strong> {weather.temperature} Celcius</p>
          <img src={weather.weather_icons} alt='Sään kuva' />
          <p><strong>Wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [weather, setWeather] = useState([])
  
  const weather_api_key = process.env.REACT_APP_API_KEY

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }


  // Kun tekstikentässä arvo muuttuu, axio hakee dataa api:lta
  useEffect(() => {
    if(searchValue !== '') {
      axios
      .get('https://restcountries.eu/rest/v2/name/' + searchValue)
      .then(response => {
        setCountries(response.data)
      })
    }
  }, [searchValue])

  // Kun countries tila muuttuu ja countries on listassa 1 kpl
  // haetaan sään liittyvää dataa weatherstack:sta
  useEffect(() => {
    if (countries.length === 1) {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${countries[0].name}`)
      .then(response => {
        setWeather(response.data.current)
      })
    }
  }, [countries])

  const showCountry = (country) => {
    // Kun nappi painetaan, muutetaan tekstikentän arvoksi maan nimi,
    // tällöin useEffect suorittaa uuden haun ja näyttää valitun maan
    setSearchValue(country.name)
  }
  

  return (
    <div>
      <h2>Maiden tiedot</h2>
      Search countries: <input value={searchValue} onChange={handleSearchValue} />
      <div>
        {countries.length === 1 ? <Country country={countries} weather={weather} /> 
        : (countries.length < 10 && countries.length >= 1) 
        ? <Countries countries={countries} showCountry={showCountry}/> 
        : <p>Too many matches, specify another filter</p> }
      </div>
    </div>
  );
}

export default App;
