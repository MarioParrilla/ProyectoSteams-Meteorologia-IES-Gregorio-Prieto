let tarjetaTemperaturaActual = document.getElementById('temperaturaCard');
let tarjetaPresionActual = document.getElementById('presionCard');
let tarjetaHumedadActual = document.getElementById('humedadCard');
let tarjetaRadiacionActual = document.getElementById('radiacionCard');
let tarjetaMMAActual = document.getElementById('precipitacionesCard');

let datosR = JSON.parse(document.getElementById("datosMetorologicos").value);
let datosR2 = JSON.parse(document.getElementById("datosPrecipitaciones").value);

function recorrer(parametroACoger,array, idTarjeta, textoInicial, textoFinal) {
    let valoresX = [];
    for (i = 0; i < array.length; i++) {
        valoresX.push(array[i][parametroACoger])
    }
    
    if(valoresX.length!==0) idTarjeta.innerHTML = `<b>${textoInicial}: ${valoresX[valoresX.length-1]} ${textoFinal}</b>`;
    else idTarjeta.innerHTML = `<b>${textoInicial}:</b> 0 ${textoFinal} `;
}

//Temperatura
recorrer('temperatura',datosR,tarjetaTemperaturaActual,'TEMPERATURA','º');

//Presion
recorrer('presion',datosR,tarjetaPresionActual,'PRESION','Pa');

//Humedad
recorrer('humedad',datosR,tarjetaHumedadActual,'HUMEDAD RELATIVA','%');

//Radiacion
recorrer('intUltravioleta',datosR,tarjetaRadiacionActual,'RADIACION ULTRAVIOLETA',' mW/cm2');

//Precipitacion
recorrer('mma',datosR2,tarjetaMMAActual,'LLUVIAS ACUMULADAS','mm');
