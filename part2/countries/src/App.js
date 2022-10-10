import { useState, useEffect } from "react";
import axios from "axios";
const CountryList = (props) => {
  const countryListToShow = props.countriesToShow;
  // console.log(country);
  if (countryListToShow.length > 5) {
    return <p>"too many bro"</p>;
  } else if (countryListToShow.length > 1) {
    return (
      <ul>
        {countryListToShow.map((country) => {
          const countryNameCommon = country.name.common;
          return <li key={countryNameCommon}>{countryNameCommon}</li>;
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
          return <li>{country.languages[lkey]}</li>;
        })}
      </ul>
      <img src={country.flags.svg} width="300" />
      <p>{JSON.stringify(country)}</p>
    </div>

    // <ul>
    //   {Object.keys(country).map((objKey) => {
    //     return (
    //       <li key={objKey}>
    //         {objKey}: {country[objKey].toString()}
    //       </li>
    //     );
    //   })}
    // </ul>
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
  const [countryNamesCommon, setCountryNamesCommon] = useState([]);
  // const [countriesToShow, setCountriesToShow] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filterString, setFilterString] = useState("");
  // let allCountries = [];
  useEffect(() => {
    console.log("use effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      // console.log("response", response);
      setAllCountries(response.data);
    });
  }, []);
  // console.log("countries", allCountries);
  // setCountriesToShow(
  //   allCountries.map((country) => {
  //     return country.name.common;
  //   })
  // );
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterString(event.target.value);
  };
  const countriesToShow = allCountries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(filterString.toLowerCase());
  });
  return (
    <>
      <Filter onChange={handleFilterChange} />
      <CountryList countriesToShow={countriesToShow} />
    </>
  );
};

export default App;
