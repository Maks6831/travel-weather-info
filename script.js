let apiKey = '3e1093f5d85b4cf539a5a5256729c7de';
let apiKeyno2 = '29ce0cb407b2ddf0f16918761f1b5b94'


function weatherInfo(latitude, longitude){
    let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ latitude +'&lon='+ longitude +'&appid=' + apiKeyno2;
    $.ajax({
        url: forecastUrl,
        method: "GET",
    }). then(function(response){
        console.log(response);
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
        weatherInfo(latitude, longitude);
      })

    })








// query url for 16 day forecast



