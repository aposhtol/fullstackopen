import { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import cservice from './services/countries'

const App = () => {
  const [all, setAll] = useState([])
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  
  useEffect(() => {
    cservice
        .getAll()
        .then(returnedData => {
            setAll(returnedData)
        })
   },[])

  const handleCountryChange = event => {
    setSearchCountry(event.target.value)
    setCountries(all.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase())))
  }
    
    
  return (
    <div>
      find countries <input value={searchCountry} onChange={handleCountryChange} />

      <CountryFilter countries={countries} setCountries={setCountries} setSearchCountry={setSearchCountry} all={all}  />
    </div>     
  )}

export default App