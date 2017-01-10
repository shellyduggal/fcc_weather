var weatherData;

function getWeather() {
	//Check if browser supports geolocation
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
					weatherData = {
						"city": data["name"],
						"country": data["sys"].country,
						"tempC": Math.round(data["main"].temp),
						"tempF": Math.round((data["main"].temp * 9 / 5) + 32),
						"description": data["weather"][0].description,
						"icon": data["weather"][0].icon,
						"pressure": data["main"].pressure,
						"humidity": data["main"].humidity,
						"windSpeed": data["wind"].speed,
						"windDir": data["wind"].deg
					};
					displayWeather(weatherData);
					return(weatherData);
				}
			}) //close ajax method
		}, //close getCurrentPosition success callback
		displayError,
		{enableHighAccuracy:true, timeout:timeoutVal, maximumAge:0}
		) //close getCurrentPosition method
	} else { //If browser doesn't support geolocation
		$(".current").html("We are having trouble finding you at the moment, please enter your zip code below to get your current weather");
	}
}

//Error handling for geolocation
function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  $(".current").html("Error: " + errors[error.code]);
}

//Add weatherData to HTML, called inside getWeather > getCurrentPosition > ajax() > success callback
function displayWeather(info){
	$("#local").html(info.city + ", " + info.country);
	$("#temp").html(info.tempC + "°C").addClass("metric");
	$("#skies").html(info.description);
	changeBackground(info.icon);
}

//Update background image depending on [weather][0].description, called inside displayWeather
function changeBackground(type) {
	switch(type) {
			  case "01d":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2012/03/04/00/01/background-21717_1280.jpg)"); //clear sky
			  	break;
			  case "01n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2017/01/02/14/31/starry-sky-1946936_1280.jpg)"); //clear night sky
			  	break;
			  case "02d":
			  case "03d":
			  case "04d":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2013/11/14/20/23/clouds-210649_1280.jpg)"); // clouds
			  	break;
			  case "02n":
			  case "03n":
			  case "04n":
				  $("body").css("background-image", "url(https://cdn.pixabay.com/photo/2013/07/03/17/49/moon-142977_1280.jpg)"); // clouds @ night
				  break;
			  case "09d":
			  case "10d":
				$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2015/08/02/15/05/drip-871152_1280.jpg)"); // rain
			  	break;
			  case "09n":
			  case "10n":
			  	$("body").css("background-image","url(https://cdn.pixabay.com/photo/2015/03/24/09/41/bokeh-687293_1280.jpg)"); // rain @ night
			  	break;
			  case "11d":
			  case "11n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2016/10/25/12/28/california-1768742_1280.jpg)"); // thunderstorms
				break;
			  case "13d":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2015/01/16/18/39/kermit-601711_1280.jpg)"); // snow
			  	break;
			  case "13n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2016/12/18/14/51/midnight-snow-1915907_1280.jpg)"); // snow @ night
			  	break;
			  case "50d":
			  case "50n":
			  	$("body").css("background-image", "url(https://cdn.pixabay.com/photo/2015/08/15/00/58/mountains-889131_1280.jpg)"); // mist
			  	break;
			}
}

$("#temp").on("click", function(){
	if ($("#temp").hasClass("metric")){
		$("#temp").html(weatherData.tempF + "°F").removeClass("metric");
	} else {
		$("#temp").html(weatherData.tempC + "°C").addClass("metric");
	}
});

function validZip(el) {
	var zipPattern = /^(\d{5})?$/;
	return(zipPattern.test(el));
}

function getWeatherZip(zipCode) {
	console.log(zipCode);
	if (validZip(zipCode)) {
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather",
			data: {
				zip: zipCode,
				units: "metric",
				APPID: "8d33069c47bb58b1671aa96f7063b548"
			},
			async: true,
			cache: false,
			success: function(data) {
				weatherData = {
					"city": data["name"],
					"country": data["sys"].country,
					"tempC": Math.round(data["main"].temp),
					"tempF": Math.round((data["main"].temp * 9 / 5) + 32),
					"description": data["weather"][0].description,
					"icon": data["weather"][0].icon,
					"pressure": data["main"].pressure,
					"humidity": data["main"].humidity,
					"windSpeed": data["wind"].speed,
					"windDir": data["wind"].deg
				};
				displayWeather(weatherData);
				return(weatherData);
			}
		})
	} else {
		$(".error").html("Please enter a 5-digit zip code");
	}
}


getWeather();

