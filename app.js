var weatherData;

//function to check weather by autoIP
function getWeather() {
	//retrieve data from API, store in weatherData object
	$.ajax({
		url: "http://api.wunderground.com/api/27e02dc8739030f1/geolookup/conditions_v11/q/autoip.json",
		dataType: "jsonp",
		success: function(data) {
			if(!data["location"]) {
				displayErrorIP(data["response"]["error"]["description"]); //app.js.35
			}
			weatherData = {
				"city": data["location"]["city"],
				"state": data["location"]["state"],
				"country": data["location"]["country_name"],
				"tempC": Math.round(data["current_observation"]["temp_c"]),
				"tempF": Math.round(data["current_observation"]["temp_f"]),
				"description": data["current_observation"]["weather"],
				"icon": data["current_observation"]["icon"],
				"pressure_mb": data["current_observation"]["pressure_mb"],
				"humidity": data["current_observation"]["relative_humidity"],
				"windMetric": Math.round(data["current_observation"]["wind_kph"]),
				"windMPH": Math.round(data["current_observation"]["wind_mph"]),
				"windDir": data["current_observation"]["wind_dir"]
			};
			displayWeather(weatherData); //app.js.40
			displayExtra(weatherData); //app.js.48
			return(weatherData);
		}
	}) //close ajax
}

//Display location lookup error //Called app.js.11
function displayErrorIP(err) {
	$('#noLoc').html("We are unable to locate you at this time. Please enter your zip code below or try again later");
}

//Add weatherData to HTML //Called at app.js.27
function displayWeather(info) {
	$("#local").html(info.city + ", " + info.state + ", " + info.country);
	$("#temp").html(info.tempC + "°C").addClass("metric");
	$("#skies").html(info.description);
	changeBackground(info.icon); //Defined at app.js.55
}

//Add additional weatherData on desktop view //Call at app.js.28
function displayExtra(info) {
	$("#pressure").html(info.pressure_mb + " mb");
	$("#humidity").html(info.humidity);
	$("#wind").html(info.windMetric + " kph from the " + info.windDir);
}

//Update background image depending on [current_observation][icon] //Called at app.js.44
function changeBackground(type) {
	switch(type) {
		case "clear":
		case "sunny":
		case "mostlysunny":
			$("body").css("background-image", "url(http://res.cloudinary.com/duggalsf/image/upload/v1484532515/Weather/background-21717_1280_m3fd2x.jpg)");
			break;
		case "cloudy":
		case "mostlycloudy":
		case "partlysunny":
		case "partlycloudy":
			$("body").css("background-image", "url(http://res.cloudinary.com/duggalsf/image/upload/v1484532515/Weather/clouds-210649_1280_bbzg0g.jpg)");
			break;
		case "rain":
			$("body").css("background-image", "url(http://res.cloudinary.com/duggalsf/image/upload/v1484532515/Weather/drip-871152_1280_zyf8yj.jpg)"); 
			break;
		case "tstorms":
		case "sleet":
			$("body").css("background-image", "url(http://res.cloudinary.com/duggalsf/image/upload/v1484532515/Weather/california-1768742_1280_exsnus.jpg)"); 
			break;
		case "flurries":
		case "snow":
			$("body").css("background-image", "url(http://res.cloudinary.com/duggalsf/image/upload/v1484532515/Weather/kermit-601711_1280_tlj5sl.jpg)"); 
			break;
		case "hazy":
		case "fog":
			$("body").css("background-image", "url(http://res.cloudinary.com/duggalsf/image/upload/v1484532515/Weather/mountains-889131_1280_o7dewz.jpg)"); 
			break;
	}
}

//Toggle Celsius/Fahrenheit when temp is clicked, also updates wind 
$("#temp").on("click", function(){
	if ($("#temp").hasClass("metric")){
		$("#temp").html(weatherData.tempF + "°F").removeClass("metric");
		$("#wind").html(weatherData.windMPH + " mph from the " + weatherData.windDir);
	} else {
		$("#temp").html(weatherData.tempC + "°C").addClass("metric");
		$("#wind").html(weatherData.windMetric + " kph from the " + weatherData.windDir);
	}
});

// Function to check weather by zip code lookup //Called in index.html.48
function getWeatherZip(zipCode) {
	$(".error").html("");
	if (validZip(zipCode)) { //Defined at app.js.133
		$.ajax({
			url: "http://api.wunderground.com/api/27e02dc8739030f1/geolookup/conditions_v11/q/" + zipCode + ".json",
			dataType: "jsonp",
			success: function(data) {
				if(!data["location"]) {
					displayErrorZip(data["response"]["error"]["description"]); //app.js.139
				}
				weatherData = {
					"city": data["location"]["city"],
					"state": data["location"]["state"],
					"country": data["location"]["country_name"],
					"tempC": Math.round(data["current_observation"]["temp_c"]),
					"tempF": Math.round(data["current_observation"]["temp_f"]),
					"description": data["current_observation"]["weather"],
					"icon": (data["current_observation"]["icon"]).toLowerCase(),
					"pressure_mb": data["current_observation"]["pressure_mb"],
					"humidity": data["current_observation"]["relative_humidity"],
					"windMetric": Math.round(data["current_observation"]["wind_kph"]),
					"windMPH": Math.round(data["current_observation"]["wind_mph"]),
					"windDir": data["current_observation"]["wind_dir"]
				};
				displayWeather(weatherData); //app.js.40
				displayExtra(weatherData); //app.js.48
				return(weatherData);
			}
		}); //close ajax
	} else {
		$("#noZip").html("Please enter a 5-digit zip code");
	} // close if validZip
}

//Check if user entered 5 numbers //Called at app.js.100
function validZip(el) {
	var zipPattern = /^(\d{5})?$/;
	return(zipPattern.test(el));
}

//Check if location error (zip entry) // Called at app.js.106
function displayErrorZip(err) {
	$('#noZip').html(err + ". Please remember we only support postal codes in the United States at this time");
}

//Prevent browser refresh on zip code submit
$("#zipForm").submit(function(e) {
	e.preventDefault();
});

//Gets weather by IP location on page load
getWeather();


