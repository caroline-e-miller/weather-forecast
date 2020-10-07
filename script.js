var apiKey = "2cef2d7cae052715188e701df4ab1db7";
var UV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}";
// var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city - search + & appid={ 2cef2d7cae052715188e701df4ab1db7 }"; (get imperial API)
var imperialAPI = "http://api.openweathermap.org/data/2.5/find?q=London&units=imperial";


//search button
$("#search-button").on("click", function (event) {
    event.preventDefault()
    var citySearch = $("#user-input").val();
    weatherSearch(citySearch)
    // getFiveDayForecast(citySearch)
    // getUVIndex(citySearch)

    // ToDo: Store search in local storage if city is not in already
})

//search button
$(".list-group-item").on("click", function (event) {
    var citySearch = $(event.target).text();
    weatherSearch(citySearch)
    // getFiveDayForecast(citySearch)
    // getUVIndex(citySearch)
})

function weatherSearch(cityName) {
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
    //call ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response, response.data);
        $(".city-name").text(response.name);
        $("#temp").text("Temprature: " + response.main.temp);
        $("#humid").text("Humidity: " + response.main.humidity);
        $("#wind").text("Wind Speed: " + response.wind.speed);
        $("#skinCancer").text("UV Index: " + response.value);


        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var UVindex = `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        //call ajax
        $.ajax({
            url: UVindex,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#skinCancer").text("UV Index: " + response.value);
        })

        var fiveDayQueryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=imperial&appid=${apiKey}`;
        //call ajax
        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (weekLong) {
            console.log(weekLong)
            // console.log(response, response.data);
            // $(".city-name").text(response.name);
            // $("#temp").text("Temprature: " + response.main.temp);
            // $("#humid").text("Humidity: " + response.main.humidity);
            // $("#wind").text("Wind Speed: " + response.wind.speed);

            //temperature display
            $('.monday-temp').html("Temp: " + fiveDayQueryURL.list[0].main.temp);
            $('.tuesday-temp').html("Temp: " + fiveDayQueryURL.list[1].main.temp);
            $('.wednesday-temp').html("Temp: " + fiveDayQueryURL.list[2].main.temp);
            $('.thursday-temp').html("Temp: " + fiveDayQueryURL.list[3].main.temp);
            $('.friday-temp').html("Temp: " + fiveDayQueryURL.list[4].main.temp);

            //humidity
            $('.monday-temp').html("Humidity: " + fiveDayQueryURL.list[0].main.humidity);
            $('.tuesday-temp').html("Humidity: " + fiveDayQueryURL.list[1].main.humidity);
            $('.wednesday-temp').html("Humidity: " + fiveDayQueryURL.list[2].main.humidity);
            $('.thursday-temp').html("Humidity: " + fiveDayQueryURL.list[3].main.humidity);
            $('.friday-temp').html("Humidity: " + fiveDayQueryURL.list[4].main.humidity);

            //uv
            $('.monday-temp').html("UV: " + fiveDayQueryURL.list[0].response.value);
            $('.tuesday-temp').html("UV: " + fiveDayQueryURL.list[1].response.value);
            $('.wednesday-temp').html("UV: " + fiveDayQueryURL.list[2].response.value);
            $('.thursday-temp').html("UV: " + fiveDayQueryURL.list[3].response.value);
            $('.friday-temp').html("UV: " + fiveDayQueryURL.list[4].response.value);

        })

    })
}

// function getFiveDayForecast(city) {
// var fiveDayQueryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
// //call ajax
// $.ajax({
//     url: fiveDayQueryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response, response.data);
//     $(".city-name").text(response.name);
//     $("#temp").text("Temprature: " + response.main.temp);
//     $("#humid").text("Humidity: " + response.main.humidity);
//     $("#wind").text("Wind Speed: " + response.wind.speed);

// })


// function getUVIndex(latitude, longitude) {
//     var latitude = response.coord.lat;
//     var longitude = response.coord.lon;
//     var UVindex = `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
//     //call ajax
//     $.ajax({
//         url: UVindex,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response, response.coord ? response.coord : 12333, response.data);
//         $("#skinCancer").text("UV Index: " + response.coord);
//     })
// }

$("#user-input").val("");
