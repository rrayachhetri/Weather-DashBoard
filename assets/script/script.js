var citynameEl = document.querySelector("#cityname");
var userformEl = document.querySelector("#user-form");
var weatherContainerEL = document.querySelector("#weather-container");
var forecastEl = document.querySelector("#forecast");
var localStorageEl = document.querySelector("#localstorage");
var cityButtonsEl = document.querySelector("#city-buttons")


var getWeather = function (city) {
    var apiKey = "b4d02dc986c242175b3d602f112a18eb";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + `&units=metric&appid=${apiKey}`;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${apiKey}`;
                fetch(apiUrl).then(function (response2) {
                    if (response2.ok) {
                        response2.json().then(function (data2) {
                            displayForecast(data2);
                            console.log(data2);
                        })
                    }
                })
                displayWeather(data, city);
            });
        } else {
            alert("Error: City Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to OpenWeathermap");
        })
};

var submitHandler = function (event) {
    event.preventDefault();
    var cityInput = citynameEl.value;
    //check if there is value in cityInput
    if (cityInput) {
        getWeather(cityInput);
        //clear the CitynamEl value
        citynameEl.value = '';
    } else {
        alert("Please enter the name of a City");
    }
    localStorage.setItem('city', cityInput);
};
userformEl.addEventListener("submit", submitHandler);

// clear old content

var displayWeather = function (data) {
    // clear old content
    weatherContainerEL.textContent = '';
    var divEl = document.createElement("div");
    var cityName = data.name;
    var citynameH = document.createElement("h3");
    citynameH.innerHTML = cityName;
    var dateSpanEL = document.createElement("span");
    dateSpanEL.className = "date";
    var date = moment().format("(MM/DD/YYYY)");
    dateSpanEL.textContent = date;
    var iconURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var iconEl = document.createElement("img");
    iconEl.setAttribute("src", iconURL);
    iconEl.className = "icon";
    var temp = data.main.temp;
    console.log(temp);
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + temp + " °C";
    var wind = "Wind: " + data.wind.speed + " MPH";
    var windEl = document.createElement("p");
    windEl.textContent = wind;
    var humidity = data.main.humidity;
    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + humidity + " %";
    citynameH.appendChild(dateSpanEL);
    citynameH.appendChild(iconEl);
    divEl.appendChild(citynameH);
    divEl.appendChild(tempEl);
    divEl.appendChild(windEl);
    divEl.appendChild(humidEl);
    weatherContainerEL.appendChild(divEl);
    localStorage.setItem(divEl, weatherContainerEL);
}

var displayForecast = function (data2) {
    var divEl = document.createElement("div");
    var uviEl = document.createElement("p");
    uviEl.textContent = "UV Index:";
    var riskEl = document.createElement("span");
    riskEl.textContent = data2.current.uvi;
    if (data2.current.uvi <= 2) {
        riskEl.className = "favourable";

    } else if (data2.current.uvi <= 5) {
        riskEl.className = "moderate"

    } else if (data2.current.uvi >= 6) {
        riskEl.className = "severe"

    }

    uviEl.appendChild(riskEl);
    divEl.appendChild(uviEl);


    var titleEl = document.createElement("h3");
    titleEl.textContent = "5 day Forecast:"
    forecastEl.appendChild(titleEl);
    forecastEl.textContent = '';
    for (let i = 0; i < 5; i++) {
       
        var weatherEl = document.createElement("div");

        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + data2.daily[i].temp.day + " °C";
        // console.log(tempEl);
        var dateEl = document.createElement("p");
        var date = moment().format("(MM/DD/YYYY)");
        dateEl.textContent = date;
        // console.log(dateEl);
        var imgEl = document.createElement('img');
        var iconURL = "https://openweathermap.org/img/w/" + data2.daily[i].weather[0].icon + ".png";
        imgEl.setAttribute("src", iconURL);

        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + data2.daily[i].humidity + " %";

        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + data2.daily[i].wind_speed + " MPH";


        weatherEl.appendChild(dateEl);
        weatherEl.appendChild(imgEl);
        weatherEl.appendChild(tempEl);
        weatherEl.appendChild(windEl);
        weatherEl.appendChild(humidEl);
        forecastEl.appendChild(weatherEl);
    }

    weatherContainerEL.appendChild(divEl);

}


var saveInput = function (localStorage, buttonClick) {
    var buttonClick = document.getElementById("cityname").value;
    buttonClick = localStorage.getItem('city', cityInput);

    // var city = buttonClick.getAttribute(cityInput);
    // var cityel = document.createElement("div");
    // cityel.textContent = city;
    // cityButtonsEl.appendChild(cityel);


}
    

