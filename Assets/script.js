var searchBar = document.querySelector('search');
var citySearch = document.getElementById("city-Search");
var  form = document.getElementById("searchForm");
var searchBtn=document.getElementById("searchBtn");


//Api Key
var apiKey = '41428fb0a9890c868f611f78c6401a98'


// create a function for the api call and fetch weather data for inputed city, note : url has weather 
async function apiCall(city){
  
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    await fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)

    })
}


// function to fetch the data for given city note: url has forcast

async function getWeather(city){
    var apiUrl =`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    await fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)

    })


}


/



searchBtn.addEventListener('click', apiCall);