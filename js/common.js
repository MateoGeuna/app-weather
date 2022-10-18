const apiKeyOpenWeatherMap = "eb7bb8512b2b45594aa39a158de79fb4";

function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function addNewCityToLocalStorage(newCity) {
    let cities = getCitiesFromLocalStorage();
    cities.push(newCity);
    localStorage.setItem("CITIES", JSON.stringify(cities));
}

function showMessageError(message, type, idElement) {
    document.getElementById(idElement).innerHTML = `
        <div class="message ${type}">
            <p>${message}</p>
        </div>
    `;
}

function requestApiOpenWeatherMapCurrent(cityName) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeyOpenWeatherMap}&units=metric&lang=es`)
            .then(dataApi => dataApi.json())
            .then(dataJson => resolve(dataJson))
            .catch(e => reject(e));
    });
}

function requestApiOpenWeatherMapExtended(cityName) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKeyOpenWeatherMap}&units=metric&lang=es`)
            .then(dataApi => dataApi.json())
            .then(dataJson => resolve(dataJson))
            .catch(e => reject(e));
    });
}