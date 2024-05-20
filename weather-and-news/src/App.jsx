import './App.css'
import PrimarySearchAppBar from './components/AppBar'
import { useEffect, useState } from 'react'
import News from './News'

export default function App() {
  const APIKEY = "7d046389c5da3d69d8f7b0fdd4e99060"
  const NYTKEY = "mxKP0kwVp2M9WjWDTxxHYL2KARmlrtG0"
  const [toggleWeather, setToggleWeather] = useState(true)
  const [location, setLocation] = useState('')

  // Current Weather Details state variables and functions
  const [date, setDate] = useState('')
  const [latlon, setLatlon] = useState([]) 
  const [temp, setTemp] = useState('')
  const [minMaxTemp, setMinMaxTemp] = useState([])
  const [condition, setCondition] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [humidity, setHumidity] = useState('')
  const [cloudiness, setCloudiness] = useState('')
  const [weatherIconId, setWeatherIconId] = useState('')

  const convertUnixToReadable = (unixTimestamp, isDate) => {
    if (isDate) {

    // Create a new JavaScript Date object based on the timestamp
    const date = new Date(unixTimestamp * 1000); // multiply by 1000 to convert seconds to milliseconds
  
    // Format the date
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;}

    else {
      const options = { 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
      };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
    
      return formattedTime;
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${APIKEY}`)
    const weatherData = await data.json()
    setLocation(weatherData.name)
    const formatedDate = convertUnixToReadable(weatherData.dt, true)
    setDate(formatedDate)
    const latlonList = [weatherData.coord.lat, weatherData.coord.lon]
    setLatlon(latlonList)
    setTemp(weatherData.main.temp)
    const minmaxList = [weatherData.main.temp_min, weatherData.main.temp_max]
    setMinMaxTemp(minmaxList)
    setFeelsLike(weatherData.main.feels_like)
    var mainCondition = weatherData.weather[0].description
    mainCondition = capitalizeFirstLetter(mainCondition)
    setCondition(mainCondition)
    setHumidity(weatherData.main.humidity)
    setCloudiness(weatherData.clouds.all)
    setWeatherIconId(weatherData.weather[0].icon)
  }
    fetchData()
  }, [])

  //Hourly Weather Forecast state variables and functions
  const [hourlyTime, setHourlyTime] = useState([])
  const [hourlyWeatherIconID, setHourlyWeatherIconID] = useState('')


  // Retrieve hourly forecast data
  useEffect(() => {
    const fetchData = async () => {
    const data = await fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=${APIKEY}`)
    const HourlyData = await data.json()
    console.log(HourlyData)
    // const timeFrom = convertUnixToReadable(HourlyData.forecast.time.from, false)
    // const timeTo = convertUnixToReadable(HourlyData.forecast.time.to, false)
    // const hourlyTimeList = [timeFrom, timeTo]
    // setHourlyTime(hourlyTimeList)
    // setHourlyWeatherIconID(HourlyData.forecast.symbol.var)
    }
    // fetchData()
  }, [])

  // NEWS
  const [newsData, setNewsData] = useState([])

  // Retrieve news data
  useEffect(() => {
    
    const fetchData = async () => {
    const data = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYTKEY}`)
    const articles = await data.json()
    
    setNewsData(articles.results)
  }
    fetchData()
  }, [])


  const handleOnclick = () => {
    setToggleWeather(!toggleWeather)
  }

  return (
    <>
    <div className='main-container'>
      <h1> Weather and News Dashboard</h1>
      <div className='secondary-container'>
          <div className='appbar'><PrimarySearchAppBar handleOnclick={handleOnclick} isWeather={toggleWeather}/></div>
          
          {toggleWeather && <div className='weather'>
            <div className="container text-center">

              <div className="row current-tomorrow">
                <div className="col-7">
                  <div className='location-details'>
                    <div className="row">
                    <div className='col'>
                      <h1> {location}</h1>
                    </div>

                    <div className='col'>
                    
                      <h3>{date}</h3> 
                      <div className='coordinates'> <h5>Lat: {latlon[0]}</h5> <h5>Lon:  {latlon[1]}</h5></div>
                    </div>
                    </div>
                  </div>
                  {/* Current Weather */}
                  <div className='row'>
                    <div className='col'>
                      <h1> {temp}° </h1>
                      <div className='min-max-temp'><h5> H: {minMaxTemp[0]}°</h5> <h5>L: {minMaxTemp[1]}°</h5> </div>
                    
                    </div>
                    <div className='col'>
                    <div className='main-weather'> </div>
                    {/* image */}
                    <div ><img className='imageContainer' src={`https://openweathermap.org/img/wn/${weatherIconId}@2x.png`} /></div>    <h5>  {condition}</h5>
                    </div>
                    <div className='col'>
                      <h5>Feels Like {feelsLike}°</h5>
                      <h5> Humidity: {humidity}</h5>
                      <h5>Clouds: {cloudiness}</h5>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className='tomorrow'>
                    <h2 className='tomorrow-heading'> Tomorrow</h2>
                    <div className='row'> <h3 className='forecast-row'>Hourly Weather Details </h3>  </div>
                    <div className='row'> <h3 className='forecast-row'>Hourly Weather Details </h3>  </div>
                    <div className='row'> <h3 className='forecast-row'>Hourly Weather Details </h3>  </div>
                    <div className='row'> <h3 className='forecast-row'>Hourly Weather Details </h3>  </div>
                    <div className='row'> <h3 className='forecast-row'>Hourly Weather Details </h3>  </div>
                    <div className='row'> <h3 className='forecast-row'>Hourly Weather Details </h3>  </div>
                    <div className='row'> <h3 className='forecast-row'>Hourly Weather Details </h3>  </div>
                  </div>
                </div>
              </div>

              {/* Weekly Forecast */}
              <div className='row'>
              <div className='col day-forecast'><h4>Sun</h4>
              <div className='weekly-forecast'> 
              <h3 className='forecast-row'>[Icon] Weather det </h3>
              <h3 className='forecast-row'>[Icon] Temperature </h3>
              <h3 className='forecast-row'>[Icon] Humidity</h3>
              <h3 className='forecast-row'>[Icon] Cloudiness </h3>

              
              </div>
              
              
              </div>  
              <div className='col'><h4>Mon</h4>  </div>  
              <div className='col'><h4>Tue</h4>  </div>  
              <div className='col'><h4>Wed</h4>  </div>  
              <div className='col'><h4>Thur</h4> </div>  
              <div className='col'><h4>Fri</h4>  </div>  
              <div className='col'><h4>Sat</h4>  </div>
               </div>
            </div>
          </div>}
          
          {!toggleWeather && <h1 className='news-heading'> Top Stories</h1> && newsData.map((article, index) => {
            return <News key={index} data={article}/>
          })}
          
      </div>
   
    </div>
    {/* <a target="_blank" href="https://icons8.com/icon/1414/temperature"></a>Icons from <a target="_blank" href="https://icons8.com">Icons8</a> */}
    </>
  )

}
