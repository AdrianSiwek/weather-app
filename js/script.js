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
        warning.textContent = '';
        input.value = '';

        if (status.id >= 200 && status.id <300) {
            photo.setAttribute('src', './img/thunderstorm.png')
        } else if (status.id >= 300 && status.id <= 400) {
            photo.setAttribute('src', './img/drizzle.png')
        } else if (status.id >= 500 && status.id <= 531) {
            photo.setAttribute('src', './img/rain.png')
        } else if (status.id >= 600 && status.id <= 621) {
            photo.setAttribute('src', './img/ice.png')
        } else if (status.id >= 701 && status.id <= 781) {
            photo.setAttribute('src', './img/fog.png')
        } else if (status.id === 800) {
            photo.setAttribute('src', './img/sun.png')
        } else if (status.id >= 801 && status.id <= 804) {
            photo.setAttribute('src', './img/cloud.png')
        } else {
            photo.setAttribute('src', './img/unknown.png')
        }
    }).catch(()=>warning.textContent = 'Wpisz poprawną nazwę miasta!')
}

const onEnterClick = (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
}

getWeather()
button.addEventListener('click', getWeather);
input.addEventListener('keyup', onEnterClick);