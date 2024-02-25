var searchBar = document.querySelector('search');
var citySearch = document.getElementById("city-Search");
var  form = document.getElementById("searchForm");
var searchBtn=document.getElementById("searchBtn");

// create a function for the api call 
function apiCall(){
  
    var apiKey = '41428fb0a9890c868f611f78c6401a98'
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)

        for (var i = 0; i < data.length; i++){
            var displayContent= document.getElementById("display");
        }
    })
}


searchBtn.addEventListener('click', apiCall);