import { useEffect, useState } from "react"
import axios from "axios"

const OneCountry = ({countries, setCountries, setSearchCountry, all}) => {

    const [weatherData, setWeatherData] = useState({})
    
    useEffect(()=> {
    const api_key = process.env.REACT_APP_API_KEY
    axios
          .get(countries.map(c => 'https://api.weatherapi.com/v1/current.json?key=' + api_key +'&q=' + c.capital))
          .then(r => {
            
              const {temp_c, wind_kph, condition:{icon}, condition:{text}} = r.data.current
              setWeatherData({temp_c, icon, wind_kph, text})
          })
          },[countries])
      
    return(
      countries.map(c =>  
        <div key={c.cca2}>
        <h1>{c.name.common}</h1>
        <div>capital {c.capital}</div>
        <div>area {c.area}</div>
        <br/>
        <b>languages:</b>  
        <ul>
          {Object.entries(c.languages).map(([key, value]) =>
          <li key={key}>{value}</li>)}
        </ul> 
        <img width='200' alt='' src={c.flags.png}></img>
        <br/>
        <h2>Weather in {c.capital}</h2>
        <p>temperature {weatherData.temp_c} Celsius</p>
        <img alt={weatherData.text} src={weatherData.icon} width='100'></img>
        <p>wind {weatherData.wind_kph} km/h</p>
        <button onClick={() => {setCountries(all); setSearchCountry('')}}>back</button>
        </div>
      ))}

export default OneCountry