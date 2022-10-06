const inputCity = document.getElementById("inputCity");

function agregarNuevaCiudad() {
    let inputText = inputCity.value.toLowerCase();
    if(inputText === "") {
        showMessageError("INGRESE UNA CIUDAD", "error", 'section-result-add-city');
        inputCity.value = "";
        return;
    }

    const cityStorage = getCitiesFromLocalStorage();
    for (let a = 0; a < cityStorage.length; a++) {
        if (inputText === cityStorage[a]) {
            showMessageError("LA CIUDAD YA HA SIDO INGRESADA", "warning", 'section-result-add-city');
            inputCity.value = "";
            return;
        }
        
    }
    
    addNewCityToLocalStorage(inputText);
    showMessageError("CIUDAD AGREGADA CORRECTAMENTE", "success", 'section-result-add-city');
    inputCity.value = "";
}