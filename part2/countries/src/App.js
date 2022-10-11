import { useState, useEffect } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const CountryList = (props) => {
  const countryListToShow = props.countriesToShow;
  if (countryListToShow.length > 5) {
    return <p>too many results</p>;
  } else if (countryListToShow.length > 1) {
    return (
      <ul>
        {countryListToShow.map((country) => {
          const countryNameCommon = country.name.common;
          return (
            <li key={countryNameCommon}>
              {countryNameCommon}{" "}
              <Button
                text="show"
                onClick={() => props.setCountryFunction([country])}
              />
            </li>
          );
        })}
      </ul>
    );
  } else if (countryListToShow.length === 1) {
    return <CountryInfo country={countryListToShow[0]} />;
  }
};

const CountryInfo = ({ country }) => {
  console.log(country.flags.png);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <h2>{country.name.official}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <h4>Languages:</h4>
      <ul>
        {Object.keys(country.languages).map((lkey) => {
          return <li key={lkey}>{country.languages[lkey]}</li>;
        })}
      </ul>
      <img
        src={country.flags.svg}
        width="300"
        style={{ filter: "drop-shadow(5px 5px 5px #666666)" }}
      />
      <WeatherInfo country={country} />
    </div>
  );
};
const Filter = (props) => {
  return (
    <div>
      country filter:
      <input value={props.filterString} onChange={props.onChange} />
    </div>
  );
};

const WeatherInfo = ({ country }) => {
  const [latitude, longitude] = country.capitalInfo.latlng;
  const [temperature, setTemperature] = useState("loading...");
  const [weatherIcon, setWeatherIcon] = useState("01d");
  const [weatherDesc, setweatherDesc] = useState("");
  useEffect(() => {
    console.log("use effect: get weather");
    console.log(api_key);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
      )
      .then((response) => {
        console.log("weather promise fulfilled");
        // setWeather(response.data);
        console.log("weather", response);
        console.log("temp", response.data.main.temp);
        setTemperature(
          Math.round((response.data.main.temp - 273.15) * 10) / 10
        );
        setWeatherIcon(response.data.weather[0]["icon"]);
        setweatherDesc(response.data.weather[0]["description"]);
      });
  }, []);
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {temperature} °C</p>
      <figure>
        <img
          src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          style={{ filter: "drop-shadow(5px 5px 5px #666666)" }}
        />
        <figcaption>{weatherDesc}</figcaption>
      </figure>
    </div>
  );
};
const CountryInput = () => {};
const App = () => {
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filterString, setFilterString] = useState("");
  useEffect(() => {
    console.log("use effect: get countries");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("country promise fulfilled");
      setAllCountries(response.data);
      console.log("countries", response);
    });
  }, []);
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterString(event.target.value);
    setCountriesToShow(
      allCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      })
    );
  };
  if (countriesToShow.length === 1) {
  }
  return (
    <>
      <Filter onChange={handleFilterChange} />
      <CountryList
        countriesToShow={countriesToShow}
        setCountryFunction={setCountriesToShow}
      />
    </>
  );
};

export default App;
