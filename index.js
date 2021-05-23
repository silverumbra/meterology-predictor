function formatDate(timestamp) {
    // calculate the date 
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `${minutes}`;
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
    }

    function displayForecast(response) {
        let forecastElement = document.querySelector("#forecast");
        let forecastHTML = `<div class="row">`;

        let days = ["Thu", "Fri", "Sat", "Sun"];
        days.forEach(function (day) {
        forecastHTML = forecastHTML + 
        `   <div class="col-2">
             <div class="weather-forecast-date">${day}</div>
             <img src= "https://specials-images.forbesimg.com/imageserve/933666298/960x0.jpg?fit=scale" alt= "" width="70"/>
             <div class="weather-forecast-temperatures">
             <span class="weather-forecast-min">
                 10º
             </span>
             <span class="weather-forecast-max">
                 13º
             </span>
             </div>
             </div>
`;
});

forecastHTML = forecastHTML +`</div>`;
forecastElement.innerHTML = forecastHTML;

    }

    function getForecast(coordinates) {
        let apiKey = "edb378f0be539a4b2c5c96da53e9f0c1";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {

console.log(response.data);

    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");


     celiusTemperature = response.data.main.temp;

    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = response.data.main.humidity;
    descriptionElement.innerHTML = response.data.weather[0].description;
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);

}

function search(city) {
let apiKey = "edb378f0be539a4b2c5c96da53e9f0c1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);

}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
        let temperatureElement = document.querySelector("#temperature");
        celiusLink.classList.remove("active");
        fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCeliusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
     celiusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celiusTemperature);
}



let celiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celiusLink = document.querySelector("#celius-link");
celiusLink.addEventListener("click", displayCeliusTemperature);


