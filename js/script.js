const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')


const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=67a3e85e409e0b539d55bd0f374d6c4b';
const API_UNITS = '&units=metric';

const getWeather = () => {
    const city = input.value || 'Gdynia';
    const URL = API_URL + city + API_KEY + API_UNITS;

    axios.get(URL).then(res => {
        
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = Object.assign({}, ...res.data.weather)
            
        cityName.textContent = res.data.name
        temperature.textContent = Math.floor(temp) + '°C'
        humidity.textContent = hum + '%'
        weather.textContent = status.main
    })
}

getWeather()
button.addEventListener('click', getWeather)