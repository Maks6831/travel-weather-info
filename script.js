$(document).ready(function(){
//--------------------------------------------------------- global variables -----------------------------------------------//
// note: Somehow using multiple keys minimized the number of errors when requesting information from API
let apiKey = '3e1093f5d85b4cf539a5a5256729c7de';
let apiKeyno2 = '29ce0cb407b2ddf0f16918761f1b5b94';
let apiKeyno3 = 'f99a2eb7e96df9308bdccc7005ec552e';
let searchHistory = []; // array which stories city data

//--------------------------------------------------------- storing search values to localstorage -----------------------------------------------//

//stores the value of the search as well as being used to call the function which creates the button. 
function addtohistory(latitude, longitude, input){
    // store lat, long and name as an object.
    let cityData = {
        input: input,
        latitude: latitude,
        longitude: longitude,
    }
    // check to see if city has already been stored (to prevent identical buttons being created)
    let index = searchHistory.findIndex(x => x.input === input);
    if(index != -1){
        return
    } else {
        // push data to localstorage as an object inside of an array
        searchHistory.push(cityData);
        localStorage.setItem('search-history', JSON.stringify(searchHistory))
        // create Buttons!!!
        createButton(latitude, longitude, input);
    }
    
}

//--------------------------------------------------------- display previous searches on reload -----------------------------------------------//
// upon site load, buttons of previous searches are stored on the page. 
function displaySearchHistory(){
    let storedCities = localStorage.getItem('search-history');
    if(storedCities){
        searchHistory = JSON.parse(storedCities);
    }
    for(let i = 0; i < searchHistory.length; i++){
        createButton(searchHistory[i].latitude, searchHistory[i].longitude, searchHistory[i].input);
    }
}
displaySearchHistory();



//creat button which when pressed calls the API functions. 
function createButton(latitude, longitude, input){
    let button = $('<button type="button" class="btn btn-primary">').text(input);
    button.addClass('buttonstyle');
    $('#asideBoi').append(button);
    button.on('click', function(){
        currentWeatherInfo(latitude, longitude, input);
        fiveDayForecast(latitude, longitude);
        
    })
}

//--------------------------------------------------------- five day forecast! ---------------------------------------------------------------//

// function which takes in the lat and long values from the geocoding api search and calculates five days forecast. 
function fiveDayForecast(latitude, longitude){
    let fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ latitude + '&lon='+ longitude +'&units=metric&appid=' + apiKey;
    $.ajax({
        url: fiveDayUrl,
        method: "GET",
    }).then(function(response){
        $('#forecast').empty();
        let object = response.list
        // for loop which runs through the length of the list in API object.
        for(let i = 0; i < object.length; i++){
            let timeData = response.list[i].dt_txt
            //creates cards for each list which describes the weather at 12pm. 
            if(timeData.includes("12:00:00")){
                let objectI = response.list[i];
                let card = $('<div class="card" style="width: 18rem;">');
                let cardBody = $('<div class="card-body card-shadow">')
                let iconData = response.list[i].weather[0].icon;
                let source = 'https://openweathermap.org/img/wn/'+ iconData + '@2x.png';
                let icon = $("<img>").attr('src', source);
                
                let temp = $("<p>").text('Temp: ' + objectI.main.temp + ' °C');
                let wind = $("<p>").text('Wind: ' + objectI.wind.speed + ' KPH');
                let humidity = $("<p>").text('Humidity: ' + objectI.main.humidity + ' °C');
                // uses the unix time stamp to display date
                let date = $("<p>").text(moment.unix(objectI.dt).format("DD/MM/YYYY"));
                cardBody.append(date, icon, temp, wind, humidity);
                card.append(cardBody);
                $('#forecast').append(cardBody);
            }
            
        }
    })
}

//--------------------------------------------------------- Current weather -----------------------------------------------------------------------//

// function which takes in the lat and long values from the geocoding api search and calculates current weather using current weather api. 
function currentWeatherInfo(latitude, longitude, input){
    let forecastUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&units=metric&appid=' + apiKeyno2;
    $.ajax({
        url: forecastUrl,
        method: "GET",
    }). then(function(response){
        $("#today").empty();
        // uses the unix time stamp to display date
        let date = moment.unix(response.dt).format("DD/MM/YYYY");
        let iconData = response.weather[0].icon;
        let source = 'https://openweathermap.org/img/wn/'+ iconData + '@2x.png';
        let icon = $("<img>").attr('src', source);
        let location = $('<h1>').text(input + ' ' + date).append(icon);
        let description = $("<p>").text(response.weather[0].description + '!');
        let temp = $("<p>").text('Temp: ' + response.main.temp + ' °C');
        let wind = $("<p>").text('Wind: ' + response.wind.speed + ' KPH');
        let humidity = $("<p>").text('Humidity: ' + response.main.humidity + ' °C');
        let header = $('<h1>').text('Five Day Forecast:');
        
        $("#today").append(location, description, temp, wind, humidity, header);
        
    
    })
}

//--------------------------------------------------------- Event Listener -----------------------------------------------------------------------//
// Event listener for search querry - calculates the lat and long values. 
$("#search-form").submit(function(event){
    event.preventDefault();
    let input = $("#search-input").val().trim();
    const latlongUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=1&appid=' + apiKey;
    $.ajax({
        url: latlongUrl,
        method: "GET"
      }).then(function(response){
        let latitude = response[0].lat;
        let longitude = response[0].lon;
        // call current weather
        currentWeatherInfo(latitude, longitude, input);
        //call five day forecast
        fiveDayForecast(latitude, longitude);
        // stores city data as well as creating the button. 
        addtohistory(latitude, longitude, input);
       
      })

    })







})
