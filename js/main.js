// Grabing main html elements to fill out

let city = document.querySelector('.city');
let currentDate = document.querySelector('.current-date');
let weatherType = document.querySelector('.weather');
let HiLow = document.querySelector('.hi-low');
let temperature = document.querySelector('.temp');


// // Geolocation on window load
window.addEventListener("load",() =>{
    let long;
    let lag;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        let weatherApiGeo = {
            key: "3abacbe8bac08d340eb90ce0cbf201fc",
            api: "https://api.openweathermap.org/data/2.5/weather?"
        }
        let api = `${weatherApiGeo.api}lat=${lat}&lon=${long}&units=metric&appid=3abacbe8bac08d340eb90ce0cbf201fc`;
        fetch(api) 
           .then((weather) =>{
               return weather.json();
           })
           .then(showWeatherReport)
        })
    }
})



// // Main app
let weatherApi = {
    key: "3abacbe8bac08d340eb90ce0cbf201fc",
    api: "https://api.openweathermap.org/data/2.5/weather?"
}

let search = document.querySelector('.search');

// Search event
search.addEventListener('keypress', (event) => {
    if(event.keyCode == 13) {
        getWeatherReport(search.value);
        search.value = '';
    }
})
// Connecting to API
function getWeatherReport(city) {
    fetch(`${weatherApi.api}q=${city}&units=metric&appid=${weatherApi.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(showWeatherReport);
}
// Getting info and instering values
function showWeatherReport(weather) {
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    dateGenerator();
    weatherType.innerHTML = weather.weather[0].main;
    let Hi = Math.round(weather.main.temp_max);
    let Low = Math.round(weather.main.temp_min);
    HiLow.innerHTML = `${Low}` + '°c' + '&nbsp' + '/' + '&nbsp' + `${Hi}` + '°c';
    temperature.innerHTML = Math.round(`${weather.main.temp}`) + '°c';
}
// Generating date
function dateGenerator() {
    let date = new Date();
    let year = date.getFullYear();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()];
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thurstay', 'Friday', 'Saturday', 'Sunday'];
    let dayInWeek = days[date.getDay() - 1];
    let day = date.getDate();
    currentDate.innerHTML = `${dayInWeek}` + '&nbsp' + `${day}` + '&nbsp' + `${month}` + '&nbsp' + `${year}`;
}