const selectCity = document.getElementById("selectCity");

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

function consultarClima() {
    let selectedCity = selectCity.value;
    if (selectedCity === "") {
        showMessageError('Ingrese una ciudad', 'error', 'section-weather-result');
        return 
    }
    
    requestApiOpenWeatherMap(selectedCity)
        .then(dataCityWeather => {
            showCardCityWeather(dataCityWeather);
        });
    // TO-DO: MANEJAR ERROR
    showMessageError('CONSULTANDO...', 'success', 'section-weather-result');
}

function showCardCityWeather(dataCityWeather) {
    document.getElementById("section-weather-result").innerHTML = `
        <div class="card">
            <h3>${dataCityWeather.name}</h3>
            <p>Temperatura: ${dataCityWeather.main.temp}°</p>
            <img src="http://openweathermap.org/img/wn/${dataCityWeather.weather[0].icon}@2x.png" alt="">
            <p>Sensación térmica: ${dataCityWeather.main.feels_like}°</p>
            <p>Humedad: ${dataCityWeather.main.humidity}%</p>
            <p>Velocidad del viento: ${dataCityWeather.wind.speed}km/h</p>
            <p>Presión: ${dataCityWeather.main.pressure}(hPa)</p>
        </div>`;
}
