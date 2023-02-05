let apiKey = '3e1093f5d85b4cf539a5a5256729c7de';


$("#search-form").submit(function(event){
    event.preventDefault();
    let input = $("#search-input").val().trim();
    const latlongUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=1&appid=' + apiKey;
    $.ajax({
        url: latlongUrl,
        method: "GET"
      }).then(function(response){
        console.log(response);
        console.log()
      })

    })








// query url for 16 day forecast

let forcastUrl = 'api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid=' + apiKey;

