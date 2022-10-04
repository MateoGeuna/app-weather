
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

function showMessageError(message, type){
    document.getElementById('errors').innerHTML = `
        <div class="message ${type}">
            <p>${message}</p>
        </div>
    `;
}