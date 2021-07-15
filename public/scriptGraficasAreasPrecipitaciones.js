// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var array1 = JSON.parse(document.getElementById("datosPrecipitacion").value)
console.log("datos recogidos del servidor: ", array1)

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let tituloM = document.getElementById('tituloM');
let calendario = document.getElementById('calendario');
let canvas1 = document.getElementById('c1');
let paramP = document.getElementById('paramP').value;

let mes = new Date().getMonth()+1;
let anno = new Date().getFullYear();

calendario.addEventListener('change', () =>{
    mes = calendario.value.substring(5);
    anno = calendario.value.substring(0,4);
    //Esto se hace para que no sucedan bugs en las graficas
    canvas1.innerHTML = `<canvas id="grafica" width="100%" height="40"></canvas>`;
    representarGraficasAreas(paramP, 'grafica',['rgba(5, 174, 255, 0.4)','rgba(5, 174, 255, 1)','rgba(5, 174, 220, 1)','rgba(5, 190, 255, 1)']);
})


function representarGraficasAreas(parametro, idCanvas, arrayColores) {
    
    tituloM.innerHTML = `Precipitaciones Mensuales: ${meses[new Date(0,mes,0).getMonth()]} ${anno}`;

    let maxV;
    let minV;
    let array = [];
    let valores = []
    let ctx1 = document.getElementById(idCanvas);

    
    let valoresMes = [];

    for (i = 0; i < array1.length; i++) {
        if (new Date(array1[i].fecha).getMonth()+1==mes && new Date(array1[i].fecha).getFullYear()==anno) {
            valoresMes.push(array1[i]);
        }
    }

    if (valoresMes.length!==0) {
        maxV = valoresMes[0][parametro];

        //Aqui recogemos los valores de los datos a representar
        for (i = 0; i < valoresMes.length; i++) {
            if (maxV < valoresMes[i][parametro]) maxV = valoresMes[i][parametro];
            if (minV > valoresMes[i][parametro]) minV = valoresMes[i][parametro];
            valores.push(valoresMes[i][parametro]);
        }
    }

    //Aqui recogemos las horas
    for (i = 0; i < valoresMes.length; i++) {
        array.push(new Date(valoresMes[i].fecha).getDate());
    }

    let myLineChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: array,
            datasets: [{
                label: 'mmaT',
                lineTension: 0.3,
                backgroundColor: arrayColores[0],
                borderColor: arrayColores[1],
                pointRadius: 5,
                pointBackgroundColor: arrayColores[2],
                pointBorderColor: arrayColores[0],
                pointHoverRadius: 5,
                pointHoverBackgroundColor: arrayColores[3],
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: valores,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: minV,
                        max: maxV
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `Datos Diarios ${meses[new Date(0,mes,0).getMonth()]} ${anno}`,
            }
        }
    });
}

//Representaciones
representarGraficasAreas(paramP, 'grafica',['rgba(5, 174, 255, 0.4)','rgba(5, 174, 255, 1)','rgba(5, 174, 220, 1)','rgba(5, 190, 255, 1)']);
