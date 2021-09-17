var citynameEl = document.querySelector("#cityname");
var userformEl = document.querySelector("#user-form");
var weatherContainerEL = document.querySelector("#weather-conatiner");

var getWeather = function (city) {
    var apiKey = "b4d02dc986c242175b3d602f112a18eb";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + `&appid=${apiKey}`;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
                fetch(apiUrl).then(function (response2) {
                    if (response2.ok) {
                        response2.json().then(function (data2) {
                            console.log(data2);
                        })
                    }
                })
                console.log(data, city);
                // displayWeather(data.coord, city);
            });
        } else {
            alert("Error:Name of a City Not Found");
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

// var searchHistory = function () {
//     var currentWeather = 

// }


var currentWeather = function(data) {
    var cityName = data.name;
var divEl = document.createElement("div");
divEl.textContent = cityName;
weatherContainerEL.appendChild(divEl);
}
currentWeather("Albany");