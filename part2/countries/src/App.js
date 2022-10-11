import { useState, useEffect } from "react";
import axios from "axios";

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
      <img src={country.flags.svg} width="300" />
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
const CountryInput = () => {};
const App = () => {
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filterString, setFilterString] = useState("");
  useEffect(() => {
    console.log("use effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setAllCountries(response.data);
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
