const inputCity = document.getElementById("inputCity");


function agregarNuevaCiudad() {
    let inputText = inputCity.value.toLowerCase();
    // Valido si el usuario ingreso algo
    if(inputText === "") {
        //motrar el error
        showMessageError("INGRESE UNA CIUDAD", "error");

        return;
    }

    // Valido si la ciudad ingresada ya existe en localStorage
    const cityStorage = getCitiesFromLocalStorage();
    for (let a = 0; a < cityStorage.length; a++) {
        if (inputText === cityStorage[a]) {
            showMessageError("LA CIUDAD YA HA SIDO INGRESADA", "warning")
            return
        }
    }

    // Recién una vez que paso todas las validaciones, guardo la ciudad
    addNewCityToLocalStorage(inputText);
    showMessageError("CIUDAD AGREGADA CORRECTAMENTE", "success");
}