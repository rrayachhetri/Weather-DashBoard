var citynameEl = document.querySelector("#cityname");
var userformEl = document.querySelector("#user-form");
var weatherContainerEL = document.querySelector("#weather-container");
var forecastEl = document.querySelector("#forecast");


var getWeather = function (city) {
    var apiKey = "b4d02dc986c242175b3d602f112a18eb";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + `&appid=${apiKey}`;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {

            response.json().then(function (data) {

                console.log(data);
                apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
                fetch(apiUrl).then(function (response2) {
                    if (response2.ok) {
                        response2.json().then(function (data2) {
                            console.log(data2);
                            // displayWeather(data, data2);
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
};
userformEl.addEventListener("submit", submitHandler);

var displayWeather = function (data, data2) {
    var cityName = data.name;
    var icon = data.weather[0].icon;
    var iconEl = document.createElement("p");
    iconEl.textContent = icon;
    var divEl = document.createElement("div");
    var citynameH = document.createElement("h3");
    var dateSpanEL = document.createElement("span");
    var date = moment().format("MM/DD/YYYY");
    dateSpanEL.textContent = date;
    citynameH.innerHTML = cityName;
    divEl.appendChild(iconEl);
    citynameH.appendChild(dateSpanEL);
    divEl.appendChild(citynameH);
    console.log(divEl);
    console.log(citynameH);
    // weatherContainerEL.appendChild(citynameH);
    // console.log(cityname);
    // var forecast = data2.list[0];
    // console.log(forecast);
    // var weatherData = data.weather[0];
    // console.log(weatherData);

    // var 
    // var 
    // var citynameDiv = document.createElement("div");

    weatherContainerEL.appendChild(divEl);
}


// var displayDate = 