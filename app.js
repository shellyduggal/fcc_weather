// 1. Get user location
var lat;
var long;

if (navigator.geolocation) {
  var timeoutVal = 10 * 1000 * 1000;
  navigator.geolocation.getCurrentPosition(
    displayPosition, 
    displayError,
    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
  );
}
else {
  alert("Geolocation is not supported by this browser");
}

function displayPosition(position) {
  lat = Math.round(position.coords.latitude);
  long = Math.round(position.coords.longitude);
  console.log(lat,long);
}

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}

console.log("(" + lat + " ," + long + ")");

// 2. Lookup city name from API
$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&APPID=8d33069c47bb58b1671aa96f7063b548", function(json) {
	console.log(json["name"]);
    $("#local").html(json["name"] + ', ' + json["sys"].country);
// 3. Get F temp from API
    $('#temp').html(json['main.temp']);
// 4. Get description from API
    $('#skies').html(json['weather.description']);
});



// 4. Get C temp from API


