var weatherData;

//function to check weather by geolocation API
function getWeather() {
	//Check if browser supports geolocation
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
		navigator.geolocation.getCurrentPosition(function(position) {
			//retrieve data from API, store in weatherData object
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather",
				//data: to be sent to API server
				data: {
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					units: "metric",
					APPID: "8d33069c47bb58b1671aa96f7063b548"
				},
				async: true,
				cache: false,
				//data to ask from API server
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
						"windMetric": data["wind"].speed,
						"windMPH": Math.round((data["wind"].speed)/0.44704)
					};
					displayWeather(weatherData); //app.js.61
					displayExtra(weatherData); //app.js.69
					return(weatherData);
				}
			}) //close ajax method
		}, //close getCurrentPosition success callback
		displayError, //app.js.50
		{enableHighAccuracy:true, timeout:timeoutVal, maximumAge:0}
		) //close getCurrentPosition method
	} else { //If browser doesn't support geolocation
		$("#noLoc").html("We are having trouble finding you at the moment, please enter your zip code below to get your current weather");
	}
}

//Error handling for geolocation //Called at app.js.41
function displayError(error) {
  var errors = { 
    1: 'Geolocation permission denied. Please enter your zip code below [E.01]',
    2: 'Automatic location unavailable at this time, please enter your zip code below [E.02]',
    3: 'Automatic location unavailable at this time, please enter your zip code below [E.03]'
  };
  $("#noLoc").html(errors[error.code]);
  console.log(errors[error.code]);
}

//Add weatherData to HTML //Called at app.js.35
function displayWeather(info) {
	$("#local").html(info.city + ", " + info.country);
	$("#temp").html(info.tempC + "°C").addClass("metric");
	$("#skies").html(info.description);
	changeBackground(info.icon); //Defined at app.js.76
}

//Add additional weatherData on desktop view //Call at app.js.36
function displayExtra(info) {
	$("#pressure").html(info.pressure + " hpa");
	$("#humidity").html(info.humidity + "%");
	$("#wind").html(info.windMetric + " m/s");
}

//Update background image depending on [weather][0].description //Called at app.js.65
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

//Toggle Celsius/Fahrenheit when temp is clicked, also updates wind speed units
$("#temp").on("click", function(){
	if ($("#temp").hasClass("metric")){
		$("#temp").html(weatherData.tempF + "°F").removeClass("metric");
		$("#wind").html(weatherData.windMPH + " mph");
	} else {
		$("#temp").html(weatherData.tempC + "°C").addClass("metric");
		$("#wind").html(weatherData.windMetric + " m/s");
	}
});

//Function to check weather by zip code lookup //Called in index.html.48
function getWeatherZip(zipCode) {
	$("#noLoc").html("");
	if (validZip(zipCode)) { //Defined at app.js.165
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather",
			// data: to be sent to API server
			data: {
				zip: zipCode,
				units: "metric",
				APPID: "8d33069c47bb58b1671aa96f7063b548"
			},
			async: true,
			cache: false,
			success: function(data) {
				//data to ask from API server
				weatherData = {
					"city": data["name"],
					"country": data["sys"].country,
					"tempC": Math.round(data["main"].temp),
					"tempF": Math.round((data["main"].temp * 9 / 5) + 32),
					"description": data["weather"][0].description,
					"icon": data["weather"][0].icon,
					"pressure": data["main"].pressure,
					"humidity": data["main"].humidity,
					"windMetric": data["wind"].speed,
					"windMPH": Math.round((data["wind"].speed)/0.44704)
				};
				displayWeather(weatherData); //Defined at app.js.61
				displayExtra(weatherData); //Defined at app.js.69
				return(weatherData);
			},
			error: function() {
				$("noZip").html("Something went wrong. Please try again later");
			}
		}) //close ajax
	} else {
		$("#noZip").html("Please enter a 5-digit zip code");
	} // close if validZip
}

//Check if user entered 5 numbers //Called at app.js.132
function validZip(el) {
	var zipPattern = /^(\d{5})?$/;
	return(zipPattern.test(el));
}

//Prevent browser refresh on zip code submit
$("#zipForm").submit(function(e) {
	e.preventDefault();
});

//Tries to get weather by geolocation on page load
getWeather();


