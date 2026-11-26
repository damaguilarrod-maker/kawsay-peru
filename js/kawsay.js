// vvalidar email
function validarEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// validar telefono
function validarTelefono(telefono) {
    var regex = /^(\+\d{1,3}[- ]?)?\d{9,10}$/;
    return regex.test(telefono);
}

// validar que ninbgun campo este vacio
function validarNoVacio(input) {
    return input.trim() !== "";
}

// validar destino seleccionado
function validarDestino(destino) {
    return destino !== "";
}

// validar form completo
function validarFormulario(datos) {
    return validarNoVacio(datos.nombre) &&
        validarEmail(datos.correo) &&
        validarTelefono(datos.celular) &&
        validarDestino(datos.destino);
}

//mostar error fadein y faeout

function mostrarError(campoId, tieneError) {
    var $input = $("#" + campoId);
    var $error = $("#error-" + campoId);

    if (tieneError) {
        $input.addClass("is-invalid").removeClass("is-valid");
        $error.fadeIn(200);
    } else {
        $input.removeClass("is-invalid").addClass("is-valid");
        $error.fadeOut(150);
    }
}

// jQuery 

$(document).ready(function () {

    // --- hover en boton de enviar consult ---
    $(".contact-submit").on("mouseenter", function () {
        $(this).stop(true).animate({ opacity: 0.85 }, 150);
    }).on("mouseleave", function () {
        $(this).stop(true).animate({ opacity: 1 }, 150);
    });

    // --- validcion en tiempo real ---

    // nombre
    $("#nombre").on("blur", function () {
        mostrarError("nombre", !validarNoVacio($(this).val()));
    }).on("input", function () {
        if ($(this).hasClass("is-invalid")) {
            mostrarError("nombre", !validarNoVacio($(this).val()));
        }
    });

    // correo
    $("#correo").on("blur", function () {
        mostrarError("correo", !validarEmail($(this).val()));
    }).on("input", function () {
        if ($(this).hasClass("is-invalid")) {
            mostrarError("correo", !validarEmail($(this).val()));
        }
    });

    // celular
    $("#celular").on("blur", function () {
        mostrarError("celular", !validarTelefono($(this).val()));
    }).on("input", function () {
        if ($(this).hasClass("is-invalid")) {
            mostrarError("celular", !validarTelefono($(this).val()));
        }
    });

    // select destino
    $("#destino").on("change", function () {
        mostrarError("destino", !validarDestino($(this).val()));
    });

    // --- submit slidedown y fadeout) ---
    $("#formContacto").on("submit", function (e) {
        e.preventDefault();

        var nombreVal = $("#nombre").val();
        var correoVal = $("#correo").val();
        var celularVal = $("#celular").val();
        var destinoVal = $("#destino").val();

        var datosFormulario = {
            nombre: nombreVal,
            correo: correoVal,
            celular: celularVal,
            destino: destinoVal
        };

        $("#success-msg").hide();
        $("#error-msg-global").hide();

        var formularioValido = true;

        if (!validarNoVacio(nombreVal)) {
            mostrarError("nombre", true); formularioValido = false;
        } else { mostrarError("nombre", false); }

        if (!validarEmail(correoVal)) {
            mostrarError("correo", true); formularioValido = false;
        } else { mostrarError("correo", false); }

        if (!validarTelefono(celularVal)) {
            mostrarError("celular", true); formularioValido = false;
        } else { mostrarError("celular", false); }

        if (!validarDestino(destinoVal)) {
            mostrarError("destino", true); formularioValido = false;
        } else { mostrarError("destino", false); }

        if (validarFormulario(datosFormulario) && formularioValido) {
            // Guardar todas las consultas utilizando JSON
            var consultas = JSON.parse(localStorage.getItem("consultaKawasy"));

            if (!Array.isArray(consultas)) {
                consultas = consultas ? [consultas] : [];
            }

            // Agregar la consulta nueva sin eliminar las anteriores
            consultas.push(datosFormulario);

            // Actualizar el almacenamiento
            localStorage.setItem("consultaKawasy", JSON.stringify(consultas));

            $("#success-msg").hide().slideDown(350);
            setTimeout(function () {
                $("#formContacto")[0].reset();
                $("#formContacto .is-valid, #formContacto .is-invalid")
                    .removeClass("is-valid is-invalid");
                $("#success-msg").fadeOut(400);
            }, 2800);
        } else {
            $("#error-msg-global").hide().slideDown(300);
        }
    });

});
