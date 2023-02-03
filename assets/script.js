// variables for apikeys, city names and url

var APIkey = "4b2e3f9a3ae657e2dfba8a0d34ce775e" ;

var cityname = "london";

var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=5&appid=" + APIkey;




// ajax response
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
    });
});

