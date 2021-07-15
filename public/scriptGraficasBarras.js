// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var array1 = JSON.parse(document.getElementById("datosPrecipitaciones").value)
console.log("datos recogidos del servidor: ", array1)

let maxMMA = 1;

var array = []
for (i = 0; i < array1.length; i++) {
  if(maxMMA < array1[i].mma) maxMMA = array1[i].mma;
  array.push(array1[i].mma)
}
var valores = []
for (i = 0; i < array1.length; i++) {
  valores.push(new Date(array1[i].fecha).getHours())
} 

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: valores,
    datasets: [{
      label: "mmacumulada",
      backgroundColor: "rgba(5, 174, 255, 0.4)",
      borderColor: "rgba(5, 174, 255, 1)",
      data: array,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: maxMMA
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
