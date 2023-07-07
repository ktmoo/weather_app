
function getWeatherData(location) {
    const apiKey = 'aaa48bf8b43d41be8a3224751230507';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;
    
    const loadingWeather = document.getElementById('loadingWeather');
    const weatherElement = document.getElementById('weatherData')
   
    loadingWeather.style.display = 'block';
    
    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
                throw new Error(response.statusText);
       }
    })
 .then(data => {
    const weatherData = processWeatherData(data);
            console.log(data);
            displayWeatherData(weatherData);
   
})
.catch(err => {
    weatherElement.innerHTML = 'Location does not exist';
    console.error(err)
    verifyWeatherDisplay();
})
.finally(() => {
loadingWeather.style.display = 'none';
 
});
}
  
 function processWeatherData(data) {
    const location = data.location.name;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const precipitation = data.current.precip_mm;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
   
    return { location, temperature, condition, humidity, precipitation, windSpeed };
   }
   
 function displayWeatherData(weatherData) {
    const weatherElement = document.getElementById('weatherData');
    weatherElement.innerHTML = `
    <h2>Weather in ${weatherData.location}</h2>
    <p>Temperature: ${weatherData.temperature}°C</p>
    <p>Condition: ${weatherData.condition}</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Precipitation: ${weatherData.precipitation}mm</p>
    <p>Wind Speed: ${weatherData.windSpeed} km/h</p>
  `;
   
  const locationInput = document.getElementById('locationInput'); 
locationInput.value = '';

verifyWeatherDisplay();
 }

function verifyWeatherDisplay() {
    const weatherElement = document.getElementById('weatherData');
    if (weatherElement.hasChildNodes()) {
        weatherElement.style.display = '';
    } else {
       weatherElement.style.display = 'none';
    }
}
     
verifyWeatherDisplay();
     
const locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit', event => {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput')
    const location = locationInput.value.trim();
    getWeatherData(location)
   
});
 