// All the DOM selectors stored as short variables
const body = document.getElementById("body")
const desc = document.getElementById("desc")
const icon = document.getElementById("icon")
const temp = document.getElementById("temp")
const sunset = document.getElementById("sunset")
const sunrise = document.getElementById("sunrise")
const forecast = document.getElementById("forecast")
const headline = document.getElementById("headline")
const humidity = document.getElementById("humidity")
const shortDesc = document.getElementById("shortDesc")

// Global variables
const API_KEY = '6bb7973de3d5499c2cfa5c1f2092da78'
const W_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FC_URL = 'https://api.openweathermap.org/data/2.5/forecast'
let city = 'Belgrade'
let unit = 'metric'
let lang = 'en'
const weatherURL = `${W_URL}?q=${city}&units=${unit}&lang=${lang}&APPID=${API_KEY}`
const forecastURL = `${FC_URL}?q=${city}&units=${unit}&lang=${lang}&APPID=${API_KEY}`

headline.innerHTML = `Today's weather in <em>${city}</em>:`

const convertTime = time => {
    const date = new Date(time*1000)
    const convertedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    return convertedTime
}

/* To-do 1: Lägg fetch i en funktion
för att kunna trigga ändringar;
ex ny stad; F eller C; 24h eller 12h osv

To-do 2: Fixa så att soluppgång & -nedgång
är per vald stad, istället för användare
*/

fetch(weatherURL)
    .then(resp => resp.json())
    .then(data => {

        shortDesc.innerHTML = `<strong>${data.weather[0].description}</strong>`
        temp.innerHTML = `<strong>${data.main.temp.toFixed(0)} °C</strong>, feels like ${data.main.feels_like.toFixed(0)} °C`
        humidity.innerHTML = `<strong>${data.main.humidity} %</strong> humidity`
        sunrise.innerHTML = `🌞⬆: ${convertTime(data.sys.sunrise)}`
        sunset.innerHTML = `🌞⬇: ${convertTime(data.sys.sunset)}`
        
        if (data.weather[0].main === 'Rain') {
            body.classList.remove(...body.classList)
            icon.src = './assets/rain.svg'
            body.classList.add('rain')
            desc.innerHTML = `Whip out that umbrella and rain coat!`
        }
        else if (data.weather[0].main === 'Clear') {
            body.classList.remove(...body.classList)
            icon.src = './assets/sun.svg'
            body.classList.add('clear')
            desc.innerHTML = `It's all clear boss, you can come out now.`
        }
        else if (data.weather[0].main === 'Clouds') {
            body.classList.remove(...body.classList)
            icon.src = './assets/cloud.svg'
            body.classList.add('clouds')
            desc.innerHTML = `It's the boring kind of cotton candy.`
        }
        else {
            body.classList.remove(...body.classList)
            icon.scr = './assets/unknown.svg'
            body.classList.add('unknown')
            desc.innerHTML = `It's all over the place homie. Stay safe.`
        }
    })

fetch(forecastURL)
    .then(resp => resp.json())
    .then(data => {
        const noonForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

        const convToWeekday = (date) => {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            const wholeDate = new Date(date)
            const dayNumber = wholeDate.getDay()
            const dayName = (dayNames[dayNumber])
            return dayName
        }

        noonForecast.forEach(day => {
            forecast.innerHTML += `
            <div>
                <p>${convToWeekday(day.dt_txt)}</p>
                <p>${day.main.temp.toFixed(0)} °C</p>
            </div>`
        })
    })