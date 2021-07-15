// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var array1 = JSON.parse(document.getElementById("datosMetorologicos").value)
console.log("datos recogidos del servidor: ", array1)

function representarGraficasAreas(parametro,variacionMaxMin,idCanvas, nombreDato, arrayColores) {
  let maxV = 1, minV = 0;
  let array = [];
  let valores = []
  let ctx = document.getElementById(idCanvas);
  
  //try/catch hecho ya que si el array no tiene datos no podemos recoger el parametro y va a saltar error
  //Por ello si esta vacio y salta error se pondran los maximos y minimos por defecto
  try {

    if (array1.length!==0) {
  
      //Aqui recogemos las horas
      for (i = 0; i < array1.length; i++) {
        array.push(new Date(array1[i].fechaSistema).getHours());
      }
  
      //Aqui recogemos los valores de los datos a representar
      maxV = array1[0][parametro];
      minV = array1[0][parametro];
      for (i = 0; i < array1.length; i++) {
        if(maxV < array1[i][parametro]) maxV = array1[i][parametro];
        if(minV > array1[i][parametro]) minV = array1[i][parametro];
        valores.push(array1[i][parametro])
      }
  
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: array,
          datasets: [{
            label: nombreDato,
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
                min: minV - variacionMaxMin,
                max: maxV + variacionMaxMin
              },
              gridLines: {
                color: "rgba(0, 0, 0, .125)",
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });
  
    }
  } catch (error) {

    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: array,
        datasets: [{
          label: nombreDato,
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
        }
      }
    });
  }

}

//Representaciones
representarGraficasAreas('temperatura',5,'myAreaChartTemperatura','Temperatura',['rgba(255, 195, 5, 0.59)','rgba(255, 180, 5, 0.59)','rgba(255, 180, 5, 0.89)','rgba(255, 195, 5, 1)']);
representarGraficasAreas('presion',100,'myAreaChartPresion','Presion',['rgba(255, 89, 149, 0.65)','rgba(255, 89, 149, 1)','rgba(255, 36, 116, 1)','rgba(255, 36, 116, 0.79)']);
representarGraficasAreas('humedad',0,'myAreaChartHumedad','Humedad Relativa',['rgba(124, 209, 0, 0.45)','rgba(124, 209, 0, 1)','rgba(124, 209, 0, 1)','rgba(118, 255, 104, 1)']);
representarGraficasAreas('intUltravioleta',0,'myAreaChartRadiacion','Radiacion Ultravioleta',['rgba(159, 5, 255, 0.43)','rgba(159, 5, 255, 0.66)','rgba(159, 5, 255, 1)','rgba(159, 5, 255, 0.79)']);