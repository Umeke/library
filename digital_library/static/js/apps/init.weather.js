"use strict";

//=> Class definition
var WeatherDemo = function () {

    //=> Get Current Data
    var getCurrentData = function () {
        currentDate = moment().format('MMM Do YY');
        currentDay = moment().format('dddd');
        currentTime = moment().format('LT');
    };

    //=> Image Path
    var imgPath = function () {
        const url = window.location.pathname,
            urlPath = url.split('/'),
            htmlPage = urlPath[urlPath.length - 1],
            src = 'src',
            dist = 'dist',
            theme = 'theme';
        var index;
        for(var i = 0; i < urlPath.length; i++) {
            if(urlPath[i] === src || urlPath[i] === dist || urlPath[i] === theme) {
                index = i;
            }
        }

        if(index) {
            for(var j = index + 1; j < urlPath.length; j++) {
                if(urlPath[j] !== htmlPage) {
                    imgSrc += '../';
                }
            }
        } else {
            for(var l = 1; l < urlPath.length; l++) {
                if(urlPath[l] !== htmlPage) {
                    imgSrc += '../';
                }
            }
        }
        imgSrc += 'assets/img/weather/';
    };

    //=> Init Weather Widget
    var initWeatherWidget = function (location) {
        if($weatherWidget === 0) {
            return;
        }

        getCurrentData();
        $.simpleWeather({
            location: location,
            woeid: '',
            unit: 'c',
            success: function(weather) {
                html = '<div class="js-weather">';
                html += '<div class="js-weather-left">';
                html += '<div class="d-flex align-items-center">';
                html += '<img src="' +imgSrc+weather.code+ '.svg">';
                html += '<span class="js-temp">' +weather.temp+ '<span class="js-unit">&deg;' +weather.units.temp+ '</span></span>';
                html += '</div>';
                html += '<div class="js-currently">' +weather.currently+ '</div>';
                html += '</div>';
                html += '<div class="js-weather-right">';
                html += '<ul>';
                html += '<li class="js-day">' +currentDay+ '</li>';
                html += '<li class="js-date">' +currentDate+ '</li>';
                html += '<li class="js-city">' +weather.city+ '</li>';
                html += '</ul>';
                html += '</div>';
                html += '</div>';
                html += '<ul class="js-weather-details">';
                html += '<li><span>Wind:</span><b>' +weather.wind.direction+ ' ' +weather.wind.chill+ ' ' +weather.wind.speed+weather.units.speed+ '</b></li>';
                if(currentTime <= weather.sunset) {
                    html += '<li><span>Sunset:</span><b>' +weather.sunset+ '</b></li>';
                }
                if(currentTime > weather.sunrise) {
                    html += '<li><span>Sunrise:</span><b>' +weather.sunrise+ '</b></li>';
                }
                html += '<li><span>Humidity:</span><b>' +weather.humidity+ '%</b></li>';
                html += '<li><span>Pressure:</span><b>' +weather.pressure+weather.units.pressure+ '</b></li>';
                html += '</ul>';
                html += '<div class="js-forcast-week">';
                html += '<ul>';
                for(var i=1;i<weather.forecast.length -2 ;i++) {
                    html += '<li><span class="js-forcast-day">' +weather.forecast[i].day+ '</span>' +
                        '<img src="' +imgSrc+weather.forecast[i].code+ '.svg">' +
                        '<span class="js-forcast-high">' +weather.forecast[i].high+
                        '<span class="js-deg">&deg;C</span></span></li>';
                }
                html += '</ul>';
                html += '</div>';

                $weatherWidget.html(html);
            },
            error: function(error) {
                $weatherWidget.html('<p>'+error+'</p>');
            }
        });
    };

    //=> Weather Code
    var weatherCode = function (weatherCode) {
        weatherCode = parseInt(weatherCode);
        if(weatherCode === 0 || weatherCode === 1) {
            iconClass = "tornado";
            weatherBg = 'bg-gray';
        } else if(weatherCode === 2) {
            iconClass = "hurricane";
            weatherBg = 'bg-gray';
        } else if(weatherCode === 3 || weatherCode === 4 || weatherCode === 37 || weatherCode === 38 || weatherCode === 39) {
            iconClass = "thunderstorm";
            weatherBg = 'bg-gray';
        } else if(weatherCode === 5 || weatherCode === 6 || weatherCode === 7 || weatherCode === 35) {
            iconClass = "rain-mix";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 8 || weatherCode === 9 || weatherCode === 11 || weatherCode === 12 || weatherCode === 40 ||
            weatherCode === 42 || weatherCode === 45 || weatherCode === 46 || weatherCode === 47) {
            iconClass = "showers";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 10) {
            iconClass = "rain";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 13 || weatherCode === 14 || weatherCode === 15 || weatherCode === 16 || weatherCode === 41 ||
            weatherCode === 43) {
            iconClass = "snow";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 17) {
            iconClass = "hail";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 18) {
            iconClass = "sleet";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 19) {
            iconClass = "dust";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 20) {
            iconClass = "fog";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 21) {
            iconClass = "day-haze";
            weatherBg = 'bg-orange';
        } else if(weatherCode === 22) {
            iconClass = "smoke";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 23) {
            iconClass = "strong-wind";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 24) {
            iconClass = "windy";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 25) {
            iconClass = "cloud";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 26 || weatherCode === 44) {
            iconClass = "cloudy";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 27) {
            iconClass = "night-cloudy";
            weatherBg = 'bg-gray';
        } else if(weatherCode === 28 || weatherCode === 30) {
            iconClass = "day-cloudy";
            weatherBg = 'bg-blue';
        } else if(weatherCode === 29) {
            iconClass = "night-partly-cloudy";
            weatherBg = 'bg-gray';
        } else if(weatherCode === 31 || weatherCode === 33) {
            iconClass = "night-clear";
            weatherBg = 'bg-gray';
        } else if(weatherCode === 32 || weatherCode === 34) {
            iconClass = "day-sunny";
            weatherBg = 'bg-yellow';
        } else if(weatherCode === 36) {
            iconClass = "hot";
            weatherBg = 'bg-yellow';
        } else if(weatherCode === 3200) {
            iconClass = "na";
            weatherBg = 'bg-red';
        }
    };

    //=> Weather Card
    var weatherCard = function () {
        if($weatherCard === 0) {
            return;
        }

        $.simpleWeather({
            location: 'Austin, TX',
            woeid: '',
            unit: 'c',
            success: function(weather) {
                html = '<div class="js-weather">';
                html += '<div class="js-weather-left">';
                html += '<div class="d-flex align-items-center">';
                html += '<img src="' +imgSrc+weather.code+ '.svg">';
                html += '<span class="js-temp">' +weather.temp+ '<span class="js-unit">&deg;' +weather.units.temp+ '</span></span>';
                html += '</div>';
                html += '<div class="js-currently">' +weather.currently+ '</div>';
                html += '</div>';
                html += '</div>';

                $weatherCard.html(html);
            },
            error: function(error) {
                $weatherCard.html('<p>'+error+'</p>');
            }
        });
    };

    //=> Weather Deck
    var weatherDeck = function () {
        if($weatherDeck === 0) {
            return;
        }

        getCurrentData();
        $.simpleWeather({
            location: 'Delhi, DL, IN',
            woeid: '',
            unit: 'c',
            success: function(weather) {
                weatherCode(weather.code);
                html = '<div class="js-weather">';
                html += '<div class="js-weather-left">';
                html += '<div class="d-flex align-items-center">';
                html += '<i class="wi wi-' +iconClass+ '"></i>';
                html += '<span class="js-currently">' +weather.currently+ '</span>';
                html += '</div>';
                html += '<div class="js-temp">' +weather.temp+ '<span class="js-unit">&deg;</span></div>';
                html += '</div>';
                html += '<div class="js-weather-right">';
                html += '<ul>';
                html += '<li class="js-day">' +currentDay+ '</li>';
                html += '<li class="js-date">' +currentDate+ '</li>';
                html += '<li class="js-city">' +weather.city+ '</li>';
                html += '</ul>';
                html += '</div>';
                html += '</div>';
                $weatherDeck.html(html).addClass(weatherBg);
            },
            error: function(error) {
                $weatherDeck.html('<p>'+error+'</p>');
            }
        });
    };

    var html = '',
        currentDay = '',
        currentDate = '',
        currentTime = '',
        imgSrc = '',
        iconClass = '',
        weatherBg = '',
        $weatherCard = $("#weather-card"),
        $weatherDeck = $("#weather-deck"),
        $weatherWidget = $("#weather-widget"),
        $weatherOption = $("#weather-option");

    $weatherOption.on('change', function () {
        var locValue = $(this).val();
        initWeatherWidget(locValue);
    });

    return {
        //=> Init
        init: function() {
            imgPath();
            initWeatherWidget('Delhi, DL, IN');
            weatherCard();
            weatherDeck();
        }
    };
}();

//=> Class Initialization
$(document).ready(function() {
    WeatherDemo.init();
});