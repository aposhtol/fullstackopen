import React from "react"
import OneCountry from "./OneCountry"

const CountryFilter = ({countries, setCountries, setSearchCountry, all}) => {

    if (countries.length >= 11 && countries.length > 1) {
      return(
      <div>Too many matches, specify another filter</div>
      )
    }
  
    else if (countries.length === 1) {
      return(
      <OneCountry countries={countries} setCountries={setCountries} setSearchCountry={setSearchCountry} all={all}/>
      )}  
  
    else { 
      return(
      countries.map(c => 
        <div key={c.cca2}>
          {c.name.common}
          <button onClick={() => {
            setCountries([c]);
            <OneCountry countries={countries} setCountries={setCountries} setSearchCountry={setSearchCountry} all={all}/>}}>show</button>
          </div>))}}

export default CountryFilter