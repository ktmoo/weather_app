

function getWeatherData(_location) {
  
    const loadElement = document.getElementById('load');
    const weatherElement = document.getElementById('weatherData')
    
    loadElement.style.display = 'block';
    RequestMode = ('cors');
    fetch('https://api.weatherapi.com/v1/current.json?key=aaa48bf8b43d41be8a3224751230507&q=${location}')
    
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
loadElement.style.display = 'none';
});

}

 function processWeatherData(data) {
    const location = data.location.name;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const precipitation = data.current.precip_mm;
    const humidity = data.humidity;
    const windSpeed = data.current.wind_kph;

    return { location, temperature, condition, humidity, precipitation, windSpeed };
}

 function displayWeatherData(weatherData) {
    const weatherElement = document.getElementById('weatherData');
 const location = weatherElement.getAttribute.textContent = 'Location: ${data.location.name}';

    return weatherElement 
}
 
 
const locationInput = document.querySelector('#locationInput');
locationInput.value = '';

verifyWeatherDisplay()


function verifyWeatherDisplay() {
    const weatherElement = document.querySelector('#weatherData');
    if (weatherElement.hasChildNodes()) {
        weatherElement.style.display = 'block';
    } else {
       weatherElement.style.display = 'none';
}
};
verifyWeatherDisplay();

const locationForm = document.getElementById('locationForm');
const submit = document.getElementById('submit');
locationForm.addEventListener('submit', event => {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value.trim();
    getWeatherData(location);


});

