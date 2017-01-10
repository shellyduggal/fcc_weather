function getWeather() {
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
		navigator.geolocation.getCurrentPosition(function(position) {
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather",
				data: {
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					units: "metric",
					APPID: "8d33069c47bb58b1671aa96f7063b548"
				},
				async: true,
				cache: false,
				success: function(data) {
					var weatherData = {
						"city":data["name"],
						"country":data["sys"].country,
						"temp":Math.round(data["main"].temp),
						"description":data["weather"][0].description,
						"icon":data["weather"][0].icon
					};
					displayWeather(weatherData);
				}
			})
		}, 
		displayError,
		{enableHighAccuracy:true, timeout:timeoutVal, maximumAge:0})
	} else {
		$(".current").html("We are having trouble finding you at the moment, please enter your zip code below to get your current weather");
	}
}

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  $(".current").html("Error: " + errors[error.code]);
}

function displayWeather(info){
	$("#local").html(info.city + ", " + info.country);
	$("#temp").html(info.temp + "° C");
	$("#skies").html(info.description);
	var icon = info.icon;
	changeBackground(icon);
}

function changeBackground(type) {
	switch(type) {
			  case "01d":
			  case "01n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2012/03/04/00/01/background-21717_1280.jpg)");
			  	break;
			  case "02d":
			  case "02n":
			  case "03d":
			  case "03n":
			  case "04d":
			  case "04n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2013/11/14/20/23/clouds-210649_1280.jpg)");
			  	break;
			  case "09d":
			  case "09n":
			  case "10d":
			  case "10n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2015/08/02/15/05/drip-871152_1280.jpg)");
			  	break;
			  case "11d":
			  case "11n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2016/10/25/12/28/california-1768742_1280.jpg)");
				break;
			  case "13d":
			  case "13n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2015/01/16/18/39/kermit-601711_1280.jpg)");
			  	break;
			  case "50d":
			  case "50n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2015/08/15/00/58/mountains-889131_1280.jpg)");
			  	break;
			}
}

function convertFahrenheit(celsius) {
 fahrenheit = (celsius * 9 / 5) + 32;
	return fahrenheit;
}

getWeather();

