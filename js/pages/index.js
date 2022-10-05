const selectCity = document.getElementById("selectCity");

// traer la data del localStorage (almacenarla en una constante)

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
// Iterar esa data y construir los options que se debe inyectar en el select

function consultarClima() {
    let selectedCity = selectCity.value;
    if (selectedCity === "") {
        showMessageError('Ingrese una ciudad', 'error', 'section-weather-result');
        return 
    }


    // alert("Has seleccionado " + selectedCity);

    // Llamamos a la API

    requestApiOpenWeatherMap(selectedCity)
        .then(dataCityWeather => {
            //alert("Temperatura: " +  dataCityWeather.main.temp);
            // Manipular el dom para mostrar en la card
            showCardCityWeather(dataCityWeather);
        });

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
// Inyecyar el select


// Dentro de la función: Obtener el valor que tiene el select y validar que tenga una opcion seleccionada (que no sea la que esta por defecto)
// Cuando el usuario haga click en el boton se va a dispara la func "consultarClima"