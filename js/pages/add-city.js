const inputCity = document.getElementById("inputCity");

function agregarNuevaCiudad() {
    let inputText = inputCity.value.toLowerCase();
    if(inputText === "") {
        showMessageError("INGRESE UNA CIUDAD", "error", 'section-result-add-city');
        inputCity.value = "";
        return;
    }
    
    if (inputText == "godeken") {
        inputText = "gödeken";
    }

    const cityStorage = getCitiesFromLocalStorage();
    for (let a = 0; a < cityStorage.length; a++) {
        if (inputText === cityStorage[a]) {
            showMessageError("LA CIUDAD YA HA SIDO INGRESADA", "warning", 'section-result-add-city');
            inputCity.value = "";
            return;
        }
        
    }
    
    showMessageError ('CARGANDO...', 'warning', 'section-result-add-city');
    requestApiOpenWeatherMap(inputText)
        .then(dataCityWeather => {
            if (dataCityWeather.cod == 200) {
                addNewCityToLocalStorage(inputText);
                inputCity.value = "";
                showMessageError("CIUDAD AGREGADA CORRECTAMENTE", "success", 'section-result-add-city');
            } else {
                showMessageError('CIUDAD NO ENCONTRADA', 'error', 'section-result-add-city');
            }
        }).catch((error) => {
            showMessageError('OCURRIO UN ERROR DE CONEXION INTENTE MAS TARDE', 'warning', 'section-result-add-city');
        });
}