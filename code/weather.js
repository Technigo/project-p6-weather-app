// All the DOM selectors stored as short variables
const shortDescription = document.getElementById("shortDescription")
const body = document.getElementById("body")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const description = document.getElementById("description")
const forecast = document.getElementById("forecast")
const icon = document.getElementById("icon")
const headline = document.getElementById("headline")

// Global variables
const API_KEY = "c4fbece7d9084df316c81a5f217e2d95"
const B_URL = "https://api.openweathermap.org/data/2.5/weather"
let city = "Stockholm"
const F_URL = `https://api.openweathermap.org/data/2.5/forecast`

const weatherURL = `${B_URL}?q=${city}&units=metric&APPID=${API_KEY}`
const forecastURL = `${F_URL}?q=${city}&units=metric&APPID=${API_KEY}`

headline.innerHTML = `The weather in ${city} today`

function convertTime(time) {
    const date = new Date(time * 1000)
    const convertedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return convertedTime
}



fetch(weatherURL)
    .then(response => response.json())
    .then(data => {        

        shortDescription.innerHTML = data.weather[0].description
        temperature.innerHTML = `${data.main.temp.toFixed()} °C` 
        feelsLike.innerHTML = `feels like ${data.main.feels_like.toFixed()} °C`
        sunrise.innerHTML = `Sunrise: ${convertTime(data.sys.sunrise)}`
        sunset.innerHTML = `Sunset: ${convertTime(data.sys.sunset)}`
        

        if (data.weather[0].main === "Clouds") {
            body.classList.remove(...body.classList)
            body.classList.add("cloudy")
            icon.src = "./assets/cloud.svg"
            description.innerHTML = `It's cloudy today in ${city}`
        }
        else if (data.weather[0].main === "Rain") {
            body.classList.remove(...body.classList)
            body.classList.add("rainy")
            icon.src = "./assets/rain.svg"
            description.innerHTML = `It's raining today in ${city}`
        }
        else if (data.weather[0].main === "Sun") {
            body.classList.remove(...body.classList)
            body.classList.add("sunny")
            icon.src = "./assets/sun.svg"
            description.innerHTML = `It's sunny today in ${city}`
        }
        else if (data.weather[0].main === "Unknown") {
            body.classList.remove(...body.classList)
            body.classList.add("unknown")
            icon.src = "./assets/unkown.svg"
            description.innerHTML = `The weather in ${city} is unkown today.`
        }
        else if (data.weather[0].main === "Clear") {
            body.classList.remove(...body.classList)
            body.classList.add("clear")
            icon.src = "./assets/sun.svg"
            description.innerHTML = `Beautiful clear sky today in ${city}.`
        }
        
    })
 
    
fetch(forecastURL)
    .then(response => response.json())
    .then(data => {

        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
console.log(filteredForecast)
        const convertToWeekday = (date) => {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            const wholeDate = new Date(date)
            const dayNumber = wholeDate.getDay()
            const dayName = (dayNames[dayNumber])
            return dayName
        }

        filteredForecast.forEach(day => {
            forecast.innerHTML += `
                <div>
                    <p>${convertToWeekday(day.dt_txt)}</p>
                    <p>${day.main.temp.toFixed(0)} °C</p>
                </div>
                `
        })
    })


