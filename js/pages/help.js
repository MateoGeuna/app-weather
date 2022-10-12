const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");;
const API_KEY_EMAILJS = 'GBAtsxXRp4_KZlPy-';

window.addEventListener('DOMContentLoaded', (event) => {
    // Inicializo EmailJS
    emailjs.init(API_KEY_EMAILJS);
    // Escucho evento submit del formulario
});

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
  
   if (emailValue === "" || !validarEmail(emailValueLowerCase)) {
        showMessageError("INGRESE POR FAVOR UN EMAIL VALIDO", "error", "message_error");
        return 
   }

   if (messageValue === "") {
        showMessageError("INGRESE POR FAVOR UN COMENTARIO", "error", "message_error");
        return
   }

    showMessageError("ENVIANDO MENSAJE", "warning", "message_error");
    emailjs.send("contact_service","template_climaapp",{
        from_name: nameValue,
        message: messageValue,
        reply_to: emailValueLowerCase,
    }).then((success) => {
        showMessageError("SU COMENTARIO YA HA SIDO ENVIADO CON EXITO", "success", "message_error");
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    }).catch((error) => {
        showMessageError("SU COMENTARIO NO HA PODIDO SER ENVIADO CORRECTAMENTE, INTENTE NUEVAMENTE MAS TARDE", "error", "message_error");
    });
}

function handleInputName() {
    limpiarTextoEntrada(nameInput, "[a-záéíóúñ ]");
};


