import { useEffect, useState } from 'react'

// Components
const SearchCountryBox = ({countrySearched, updateCountrySearched}) => {
  return <p>find countries <input onChange={updateCountrySearched} value={countrySearched}/></p>
}
const DisplayResults = ({countriesSearched, setCountriesSearched, isLoading}) => {
  return(<>
    {isLoading ? <p>Loading ...</p> : (
      countriesSearched.length < 1 ? <p>No matches</p> :
      (countriesSearched.length == 1 ? <Country country={countriesSearched[0]}/> :
      (countriesSearched.length > 1 && countriesSearched.length < 11 ? <ListOfCountries countries={countriesSearched} setCountriesSearched={setCountriesSearched}/> : <p>Too many matches, specify another filter</p>))
    )}
  </>)
}
const ListOfCountries = ({countries, setCountriesSearched}) => {
  return (
    <>
    {countries.map((country) => {
        const name = country.name.common
        const key = country.name.official
        return <p key={key}>{name} <button onClick={() => {setCountriesSearched([country])}}>show</button></p>
      })}
    </>
  )
}
const Country = ({country}) => {

  // Constants
  const apiKey = import.meta.env.VITE_SOME_KEY
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`
  
  // States
  const [capital, setCapital] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState('')

  // Functions
  const imgUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}.png`

  // useEffect
  useEffect(() => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(json => {
      setCapital(json)
      fetch(imgUrl(json.weather[0].icon))
      .then(response => {
        setImage(response.url)
        setIsLoading(false)
      })
    })
  }, [])

  // Render
  return (
    <>
      {isLoading ? <p>Loading ...</p> : (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} />
          <h2>Weather in {country.capital}</h2>
          <p>temperature {(capital.main.temp - 273).toFixed(2)}ºC </p>
          <img src={image} />
          <p>wind {capital.wind.speed}m/s</p>
        </div>
      )}
    </>
  )
}
// Main component, 'App'
function App() {

  // Constants
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  // States
  const [countries, setCountries] = useState([])
  const [countriesSearched, setCountriesSearched] = useState([])
  const [countrySearched, setCountrySearched] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Functions
  const updateCountrySearched = (event) => {
    const search = event.target.value
    const searched = countries.filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))
    setCountrySearched(search)
    setCountriesSearched(searched)
  }

  // useEffect
  useEffect(() => {
    fetch(baseUrl).then(response => response.json())
    .then(json => {
      setCountries(json)
      setCountriesSearched(json)
      setIsLoading(false)
    })
  }, [])

  // Render
  return (
    <>
      <SearchCountryBox countrySearched={countrySearched} updateCountrySearched={updateCountrySearched}/>
      <DisplayResults countriesSearched={countriesSearched} setCountriesSearched={setCountriesSearched} isLoading={isLoading}/>
    </>
  )
}

export default App
