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
    		$('#temp').html(Math.round(json["main"].temp) + "° F");
			// 4. Get description from API
    		$('#skies').html(json["weather"][0].description);
    		// 5. Get icon from API
    		var iconSource = "http://openweathermap.org/img/w/" + json["weather"][0].icon + ".png"
    		$('#icon').html('<img src=' + iconSource+ '>');
    		// 6. Update background image
    		switch(json["weather"][0].icon) {
			  case "01d":
			  case "01n":
			  	$("body").css("background-image", "url:'https://cdn.pixabay.com/photo/2012/03/04/00/01/background-21717_1280.jpg'");
			  	break;
			  case "02d":
			  case "02n":
			  case "03d":
			  case "03n":
			  case "04d":
			  case "04n":
			  	$("body").css("background-image", "url:'https://cdn.pixabay.com/photo/2013/11/14/20/23/clouds-210649_1280.jpg'");
			  	break;
			  case "09d":
			  case "09n":
			  case "10d":
			  case "10n":
			  	$("body").css("background-image", "url:'https://cdn.pixabay.com/photo/2015/08/02/15/05/drip-871152_1280.jpg'");
			  	break;
			  case "11d":
			  case "11n":
			  	$("body").css("background-image", "url:'https://cdn.pixabay.com/photo/2016/10/25/12/28/california-1768742_1280.jpg'");
				break;
			  case "13d":
			  case "13n":
			  	$("body").css("background-image", "url:'https://cdn.pixabay.com/photo/2015/01/16/18/39/kermit-601711_1280.jpg'");
			  	break;
			  case "50d":
			  case "50n":
			  	$("body").css("background-image", "url:'https://cdn.pixabay.com/photo/2015/08/15/00/58/mountains-889131_1280.jpg'");
			  	break;
			}
    });
}

function checkCelsius(position) {
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&APPID=8d33069c47bb58b1671aa96f7063b548", function(json) {
			// 1/2. Get city and country from API 
			$("#local").html(json["name"] + ', ' + json["sys"].country);
			// 3. Get F temp from API
    		$('#temp').html(Math.round(json["main"].temp) + "° C");
			// 4. Get description from API
    		$('#skies').html(json["weather"][0].description);
    		var iconSource = "http://openweathermap.org/img/w/" + json["weather"][0].icon + ".png"
    		$('#icon').html('<img src=' + iconSource+ '>');
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
