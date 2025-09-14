// Obtenemos los elementos del documento con los que vamos a trabajar
const start_btn = document.getElementById("iniciar");
const stop_btn = document.getElementById("detener");
const display = document.getElementById("display")
const alarma = document.getElementById("alarma");

// Añadimos los eventos
start_btn.addEventListener("click", comenzar_temporizador);
stop_btn.addEventListener("click", () => {
    alarma.pause();
    alarma.currentTime = 0;
    stop_btn.style.display = "none";
    start_btn.style.display = "inline-block";
})

let total_segundos;
let intervalID; // Variable para almacenear el ID del timer (necesario para su manipulación)

function comenzar_temporizador() {
    // Detenemos cualquier temporizador ya existente (si el usuario clickea + de 1 vez)
    if (intervalID) clearInterval(intervalID); 
    // Obtenemos los valores del documento -> asignamos valores por defecto si no se ingresan valores
    let horas = parseInt(document.getElementById("horas").value) || 0;
    let minutos = parseInt(document.getElementById("minutos").value) || 0;
    let segundos = parseInt(document.getElementById("segundos").value) || 0;

    // Calculamos los segundos totales
    total_segundos = (horas * 3600) + (minutos * 60) + segundos

    //console.log(total_segundos)

    // Iniciamos el timer (llama a la función actualizar_display cada 1 segundo)
    intervalID = setInterval(actualizar_display, 1000)
}

//function formatTiempo(num) {
    // Función para formatear la cadena con el formato 00:00:00
//    return num < 10 ? '0' + num : num;
//}

function actualizar_display() {
    // Convertimos los segundos en horas, minutos y segundos
    let h = Math.floor(total_segundos / 3600);
    let m = Math.floor((total_segundos % 3600) / 60);
    let s = total_segundos % 60;
    //console.log(h)
    //console.log(m)
    //console.log(s)

    const formatTiempo = (num) => num < 10 ? '0' + num : num;

    // Mostramos el texto en el display
    display.innerText = `${formatTiempo(h)}:${formatTiempo(m)}:${formatTiempo(s)}`

    // Si el timer llega a 0
    if (total_segundos === 0) {
        // Frenamos el timer
        clearInterval(intervalID)
        // Mostramos el boton para detener la alarma
        stop_btn.style.display = "inline-block"
        start_btn.style.display = "none"
        // Suena el la alarma
        alarma.play()
    }

    console.log(total_segundos)
    total_segundos--
}

//function detener_alarma(){
//    alarma.pause()
//    alarma.currentTime = 0; // Resetea el tiempo de reproducción del archivo
//    stop_btn.style.display ="none" // Seteamos el boton nuevamente  a none para que no se vea
//}