const selectCity = document.getElementById("selectCity");
const sectionWeatherResult = document.getElementById("section-weather-result");
const timeAprox = document.getElementById("time-aprox");


function initApp() {
    const cityStorage = getCitiesFromLocalStorage();
    for (let a = 0; a < cityStorage.length; a++) {
        selectCity.innerHTML += '<option value="' + cityStorage[a] + '">' + primeraLetraMayuscula3(cityStorage[a]) + '</option>';
    }
}
initApp();

function primeraLetraMayuscula3(strTest) {
    let nombreCiudades = strTest;
    let palabras = strTest.split(" ");
    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1);
    }
    return palabras.join(" ");
}

function consultarClimaExtended() {
    timeAprox.style.display = "none"
    let selectedCity = selectCity.value;
    if (selectedCity === "") {
        showMessageError('Ingrese una ciudad', 'error', 'section-weather-result');
        return 
    }
    showMessageError('CONSULTANDO...', 'warning', 'section-weather-result');
    requestApiOpenWeatherMapExtended(selectedCity)
        .then(dataCityWeather => {

            showCardCityWeatherExtended(dataCityWeather);
            //showMessageError('CIUDAD ENCONTRADA', 'success', 'section-weather-result')
        }).catch((error) => {

            showMessageError('CIUDAD NO ENCONTRADA', 'error', 'section-weather-result');
        });
}

function showCardCityWeatherExtended(dataCityWeather) {
    sectionWeatherResult.innerHTML = "";
    for (let a = 0; a < dataCityWeather.list.length; a++) {
        const weather = dataCityWeather.list[a];
        const weatherTime = weather.dt_txt.split(' ');
        if(weatherTime[1] === '12:00:00') {
            const separarDate = weatherTime[0].split('-');
            const reverseDate = separarDate.reverse();
            const unirDate = reverseDate.join('/');
            document.getElementById("section-weather-result").innerHTML += `
                <div id="card-${a}" class="card">
                    <h3>${unirDate}</h3>
                    <p>Temperatura: ${weather.main.temp}°</p>
                    <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="">
                    <p>Sensación térmica: ${weather.main.feels_like}°</p>
                    <p>Humedad: ${weather.main.humidity}%</p>
                    <p>Velocidad del viento: ${weather.wind.speed}km/h</p>
                    <p>Presión: ${weather.main.pressure}(hPa)</p>
                </div>`;
        }
    }
    timeAprox.style.display = "flex";
}
