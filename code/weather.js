// All the DOM selectors stored as short variables
const shortDescription = document.getElementById("shortDescription")
const body = document.getElementById("body")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const description = document.getElementById("description")
const forecast = document.getElementById("forecast")
const icon = document.getElementById("icon")

// Global variables
const API_KEY = "c4fbece7d9084df316c81a5f217e2d95"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
let city = "Stockholm"

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`

const convertTime = time => {
    const date = new Date (time * 1000)
    const convertedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})
    return convertedTime
}

fetch(URL)
    .then(res => res.json())
    .then(data => {        
        console.log(data)
        shortDescription.innerHTML = data.weather[0].description 

        if (data.weather[0].main === "Clouds") {
            body.classList.remove(...body.classList)
            body.classList.add("cloudy")
            icon.src = "./assets/cloud.svg"
            description.innerHTML = `It's so cloudy today in ${city}`
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

        sunrise.innerHTML = `Sunrise: ${convertTime(data.sys.sunrise)}`
        sunset.innerHTML = `Sunset: ${convertTime(data.sys.sunset)}`
    })
    
