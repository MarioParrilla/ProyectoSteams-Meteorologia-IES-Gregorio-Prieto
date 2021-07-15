// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) document.getElementById('parrafoInfo').style.display = 'inline';
if (navigator.userAgent.toLowerCase().indexOf('safari') >= 0) document.getElementById('parrafoInfo').style.display = 'inline';
if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) document.getElementById('parrafoInfo').style.display = 'none';
// Area Chart Example
var array1 = JSON.parse(document.getElementById("datosMetorologicos").value)
console.log("datos recogidos del servidor: ", array1)

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let tituloM = document.getElementById('tituloM');
let calendario = document.getElementById('calendario');
let canvas1 = document.getElementById('c1');
let canvas2 = document.getElementById('c2');
let paramMax = document.getElementById('paramMax').value;
let paramMin = document.getElementById('paramMin').value;
let tituloV = document.getElementById('view').value;


let mes = new Date().getMonth()+1;
let anno = new Date().getFullYear();

calendario.addEventListener('change', () =>{
    mes = calendario.value.substring(5);
    anno = calendario.value.substring(0,4);

    //Esto se hace para que no sucedan bugs en las graficas
    canvas1.innerHTML = `<canvas id="graficaMax" width="100%" height="40"></canvas>`;
    canvas2.innerHTML = `<canvas id="graficaMin" width="100%" height="40"></canvas>`;
    representarGraficasAreas(paramMax,paramMin, 'graficaMax','graficaMin',['rgba(255, 89, 149, 0.65)','rgba(255, 89, 149, 1)','rgba(255, 36, 116, 1)','rgba(255, 36, 116, 0.79)'],['rgba(5, 174, 255, 0.4)','rgba(5, 174, 255, 1)','rgba(5, 174, 220, 1)','rgba(5, 190, 255, 1)']);
})


function representarGraficasAreas(parametroMax, parametroMin, idCanvasMax,idCanvasMin, arrayColoresMax, arrayColoresMin) {
    
    tituloM.innerHTML = `${tituloV} ${meses[new Date(0,mes,0).getMonth()]} ${anno}`;

    let maxV = 0;
    let minV = 1;
    let array = [];
    let valores = []
    let ctx1 = document.getElementById(idCanvasMax);
    let ctx2 = document.getElementById(idCanvasMin);

    
    let valoresMes = [];

    for (i = 0; i < array1.length; i++) {
        if (new Date(array1[i].fechaSistema).getMonth()+1==mes && new Date(array1[i].fechaSistema).getFullYear()==anno) {
            valoresMes.push(array1[i]);
        }
    }

    if (valoresMes.length!==0) {
        maxV = 0;
        minV = 0;

        //Aqui recogemos los valores de los datos a representar
        for (i = 0; i < valoresMes.length; i++) {
            if (maxV < valoresMes[i][parametroMax]) maxV = valoresMes[i][parametroMax];
            if(minV > valoresMes[i][parametroMax]) minV = valoresMes[i][parametroMax];
            valores.push(valoresMes[i][parametroMax]);
        }
    }

    //Aqui recogemos las horas
    for (i = 0; i < valoresMes.length; i++) {
        array.push(new Date(valoresMes[i].fechaSistema).getDate());
    }

    let myLineChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: array,
            datasets: [{
                label: 'Maxima',
                lineTension: 0.3,
                backgroundColor: arrayColoresMax[0],
                borderColor: arrayColoresMax[1],
                pointRadius: 5,
                pointBackgroundColor: arrayColoresMax[2],
                pointBorderColor: arrayColoresMax[0],
                pointHoverRadius: 5,
                pointHoverBackgroundColor: arrayColoresMax[3],
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

    //Aqui recogemos los valores de los datos a representar
    valores = [];
    for (i = 0; i < valoresMes.length; i++) {
        if(minV > valoresMes[i][parametroMin]) minV = valoresMes[i][parametroMin];
        valores.push(valoresMes[i][parametroMin]);
    }

    let myLineChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: array,
            datasets: [{
                label: 'Minima',
                lineTension: 0.3,
                backgroundColor: arrayColoresMin[0],
                borderColor: arrayColoresMin[1],
                pointRadius: 5,
                pointBackgroundColor: arrayColoresMin[2],
                pointBorderColor: arrayColoresMin[0],
                pointHoverRadius: 5,
                pointHoverBackgroundColor: arrayColoresMin[3],
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
representarGraficasAreas(paramMax,paramMin, 'graficaMax','graficaMin',['rgba(255, 89, 149, 0.65)','rgba(255, 89, 149, 1)','rgba(255, 36, 116, 1)','rgba(255, 36, 116, 0.79)'],['rgba(5, 174, 255, 0.4)','rgba(5, 174, 255, 1)','rgba(5, 174, 220, 1)','rgba(5, 190, 255, 1)']);