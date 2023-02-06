let apiKey = '3e1093f5d85b4cf539a5a5256729c7de';
let apiKeyno2 = '29ce0cb407b2ddf0f16918761f1b5b94'


function currentWeatherInfo(latitude, longitude, input){
    let forecastUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&units=metric&appid=' + apiKeyno2;
    $.ajax({
        url: forecastUrl,
        method: "GET",
    }). then(function(response){
        console.log(response);
        let date = moment.unix(response.dt).format("DD/MM/YYYY");
        let iconData = response.weather[0].icon;
        console.log(iconData);
        let source = 'http://openweathermap.org/img/wn/'+ iconData + '@2x.png';
        let icon = $("<img>").attr('src', source);
        let location = $('<h1>').text(input + ' ' + date).append(icon);
        let description = $("<p>").text(response.weather[0].description + '!');
        let temp = $("<p>").text('Temp: ' + response.main.temp + ' °C');
        let wind = $("<p>").text('Wind: ' + response.wind.speed + ' KPH');
        let humidity = $("<p>").text('Humidity: ' + response.main.humidity + ' °C');
        
        $("#today").append(location, description, temp, wind, humidity);
    
    })



}


$("#search-form").submit(function(event){
    event.preventDefault();
    let input = $("#search-input").val().trim();
    const latlongUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=1&appid=' + apiKey;
    $.ajax({
        url: latlongUrl,
        method: "GET"
      }).then(function(response){
        console.log(response);
        console.log("latitude is " + response[0].lat);
        let latitude = response[0].lat;
        console.log(response[0].lon);
        let longitude = response[0].lon;
        currentWeatherInfo(latitude, longitude, input);
      })

    })








// query url for 16 day forecast



