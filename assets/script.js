
var todaydate = moment().format("MMMM Do YYYY");
console.log(todaydate);
// Click event when search button is clicked to trigger ajax response

$("#search-button").on("click", function(event){

    event.preventDefault();

// variables for apikeys, city names and url

var APIkey = "4b2e3f9a3ae657e2dfba8a0d34ce775e" ;

var cityname = $("#search-input").val().trim();

var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=5&appid=" + APIkey;

$("#search-input").val("");


// 2 ajax responses one getting lat and longitude and the other to use the information to gather the forecast
$.ajax({
    url: geocodeURL,
    method:"GET"
}).then(function(response){

    var lat = response[0].lat;
    var lon = response[0].lon;
    console.log(lat)
    console.log(lon)
    

    var forecast = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +"&appid=" + APIkey;
    $.ajax({
        url: forecast,
        method:"GET"
    }).then(function(result){
        console.log(result)

        var todaycityname = $("<h1>").text(result.city.name + " " + todaydate);
        var temp = $("<p>").text("Temp: " + result.list[0].main.temp)
        var wind = $("<p>").text("Wind speed: " + result.list[0].wind.speed)
        var humidity = $("<p>").text("Humidity: " + result.list[0].main.humidity)

        $("#today").append(todaycityname, temp, wind, humidity);

        $("#today").addClass("borderstyling")
    });
});
 

})


