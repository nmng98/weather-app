import React, {useState} from 'react';

const api = {
  key: "8f3e6e0f2c1d42f945a152075d5337a7",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      // GET REQUEST FROM API
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        // GET JSON PROMISE
        .then(res => res.json())
        // SET WEATHER TO RESULT
        // SET QUERY TO EMPTY STRING
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
          
    }
  }

  const dateBuilder = (d) => {

    let months = ["January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // return `${day} ${month} ${date}, ${year}`
    return `${month} ${date}, ${year}`

  }

  const fahrenheitConvert = (w) => {
    let converted = w * 1.8 + 32;
    return Math.round(converted)
  }

  // , {weather.sys.country}

  return (
    <div className = 
    // IF WEATHER DEFINED, CHANGE BACKGROUND OF APP 
    // BASED ON THE TEMPERATURE
      {(typeof weather.main != "undefined") ? 
      ((weather.main.temp > 16) ? 'app warm' : 'app')
      : 'app'}>
      <main>
        <div className = "search-box">
          <input 
            type = "text"
            className = "search-bar"
            placeholder = "Search Location..."
            onChange = {e => setQuery(e.target.value)}
            value = {query}
            onKeyPress = {search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className = "location-box">
              <div className = "location">{weather.name}</div>
              <div className = "date">{dateBuilder(new Date())}</div>
            </div>
            <div className = "weather-box">
              <div className = "temp">
                {fahrenheitConvert(weather.main.temp)}°F
                
              </div>
              <div className = "weather">{weather.weather[0].main}</div>
              <div className = "humidity">Humidity: {weather.main.humidity}% </div>
              <div className = "wind">Wind: {weather.wind.speed} mph </div>
              <div className = "feels-like">Feels Like: {fahrenheitConvert(weather.main.feels_like)}°F</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
