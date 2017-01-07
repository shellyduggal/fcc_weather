function getLocalWeatherF() {
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
	  	navigator.geolocation.getCurrentPosition(
	  		checkFahrenheit, 
	  		displayError, 
	  		{enableHighAccuracy:true, timeout:timeoutVal, maximumAge:0}
	  	);	
	} else {
		$(".current").html("We are having trouble finding you at the moment, please enter your zip code below to get your current weather");
	}
}

function getLocalWeatherC() {
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
	  	navigator.geolocation.getCurrentPosition(
	  		checkCelsius, 
	  		displayError, 
	  		{enableHighAccuracy:true, timeout:timeoutVal, maximumAge:0}
	  	);	
	} else {
		$(".current").html("We are having trouble finding you at the moment, please enter your zip code below to get your current weather");
	}
}

function checkFahrenheit(position) {
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&APPID=8d33069c47bb58b1671aa96f7063b548", function(json) {
			// 1/2. Get city and country from API
			$("#local").html(json["name"] + ', ' + json["sys"].country);
			// 3. Get F temp from API
    		$('#temp').html(json["main"].temp + "° F");
			// 4. Get description from API
    		$('#skies').html(json["weather"][0].description);
		});
}

function checkCelsius(position) {
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&APPID=8d33069c47bb58b1671aa96f7063b548", function(json) {
			// 1/2. Get city and country from API 
			$("#local").html(json["name"] + ', ' + json["sys"].country);
			// 3. Get F temp from API
    		$('#temp').html(json["main"].temp + "° C");
			// 4. Get description from API
    		$('#skies').html(json["weather"][0].description);
		});
}

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}

// #temp click event
// 	if has class fahrenheit
// 		update temp to celsius 	
// 	else 
//		update temp to fahrenheit 
// at end toggle class Fahrenheit

$( "#temp" ).click(function() {
  if($(this).hasClass(".Fahrenheit")) {
  	getLocalWeatherC();
  } else {
  	getLocalWeatherF();
  }
  $("#temp").toggleClass(".Fahrenheit");
});

getLocalWeatherF();
