const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");

function limpiarTextoEntrada(input, patron) {
    var texto = input.value
    var letras = texto.split("")
    for (var x in letras) {
        var letra = letras[x]
        if (!(new RegExp(patron, "i")).test(letra)) {
            letras[x] = ""
        }
    }
    input.value = letras.join("")
}

function validarEmail(valor) {
    /*if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
     showMessageError("La dirección de email " + valor + " es correcta!.", "success", "message_error");
    } else {
     showMessageError("La dirección de email es incorrecta!.", "error", "message_error");
    }
    return*/
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)
  }


function enviarFormulario() {
   let nameValue = nameInput.value;
   let emailValue = emailInput.value;
   let messageValue = messageInput.value;
   let emailValueLowerCase = emailValue.toLowerCase();
    if (nameValue === "" || nameValue.length < 5 ) {
        showMessageError("INGRESE POR FAVOR UN NOMBRE DE AL MENOS 5 LETRAS", "error", "message_error");
        return 
    }
    debugger;
   if (emailValue === "" || !validarEmail(emailValueLowerCase)) {
        showMessageError("INGRESE POR FAVOR UN EMAIL VALIDO", "error", "message_error");
        return 
   }

   if (messageValue === "") {
        showMessageError("INGRESE POR FAVOR UN COMENTARIO", "error", "message_error");
        return
    
   }

    showMessageError("SU COMENTARIO YA HA SIDO ENVIADO CON EXITO", "success", "message_error");
    
    //TODO: ENVIAR DATOS A LA API
    
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
}

function handleInputName() {
    limpiarTextoEntrada(nameInput, "[a-záéíóúñ ]");
};
