// Getting current date using moment js

var todaydate = moment().format("MMMM Do YYYY");
console.log(todaydate);

// Click event when search button is clicked to trigger ajax response

$("#search-button").on("click", function(event){

    event.preventDefault();

// variables for apikeys, city names and url

var APIkey = "4b2e3f9a3ae657e2dfba8a0d34ce775e" ;

var cityname = $("#search-input").val().trim();

var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=5&appid=" + APIkey;


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

        $("#today").addClass("borderstyling");

        for (i=6 ; i< 39 ; i=i+8){

            var tempcardUnfixed = result.list[i].main.temp - 273.15;
            var tempcardC = tempcardUnfixed.toFixed(2);

            var iconcode = result.list[i].weather[0].icon; 
            var iconurl = "http://openweathermap.org/img/wn/" + iconcode +"@2x.png"

            var datecard = $("<b>").text(result.list[i].dt_txt);
            var icon = $("<img>").attr("src", iconurl);
            var tempcard = $("<p>").text("Temp: " + tempcardC);
            var windcard = $("<p>").text("Wind speed: " + result.list[i].wind.speed);
            var humiditycard = $("<p>").text("Humidity: " + result.list[i].main.humidity);
            


            var card = $("<div>");
            var cardbody = $("<div>");

            card.addClass("card");
            cardbody.addClass("card-body");

            cardbody.append(datecard, icon, tempcard, windcard, humiditycard);
            card.append(cardbody);

            $("#forecast").append(card);
        }
    });
});
 

    var history = $("<li>").text(cityname);
    history.addClass("btn btn-primary")

    $("#history").append(history);

    
    

    $("#search-input").val("");
    $("#today").empty();
    $("#forecast").empty();



    $(history).on("click", function(event){

    event.preventDefault();
    cityname = $(this).value;

    $("#search-input").val("");
    $("#today").empty();
    $("#forecast").empty();

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
    
            $("#today").addClass("borderstyling");
    
            for (i=6 ; i< 39 ; i=i+8){
    
                var tempcardUnfixed = result.list[i].main.temp - 273.15;
                var tempcardC = tempcardUnfixed.toFixed(2);
    
                var iconcode = result.list[i].weather[0].icon; 
                var iconurl = "http://openweathermap.org/img/wn/" + iconcode +"@2x.png"
    
                var datecard = $("<b>").text(result.list[i].dt_txt);
                var icon = $("<img>").attr("src", iconurl);
                var tempcard = $("<p>").text("Temp: " + tempcardC);
                var windcard = $("<p>").text("Wind speed: " + result.list[i].wind.speed);
                var humiditycard = $("<p>").text("Humidity: " + result.list[i].main.humidity);
                
    
    
                var card = $("<div>");
                var cardbody = $("<div>");
    
                card.addClass("card");
                cardbody.addClass("card-body");
    
                cardbody.append(datecard, icon, tempcard, windcard, humiditycard);
                card.append(cardbody);
    
                $("#forecast").append(card);

                
            }
        });
    })
        
});
});




