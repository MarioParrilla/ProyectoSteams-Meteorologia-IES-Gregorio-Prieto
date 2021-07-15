
let contenedorPrincipal = document.getElementById('contenedorPrincipal');
let calendarioDatosMensuales = document.getElementById('calendarioDatosMensuales');
let pTitulo = document.getElementById('titulo');

var datos1=JSON.parse(document.getElementById("datos1").value);
var datostabla="";
var fila;

const fechaActual = new Date();
let mes = fechaActual.getUTCMonth();
let dia = fechaActual.getUTCDate();

const cantidadPaginas = Math.ceil(datos1.length/24);

contenedorPrincipal.insertAdjacentHTML("beforeend",
    `<div class="card-body" id="c1">
        <table id="tabla" class="table table-responsive table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Fecha Insercion</th>
                    <th scope="col">Hora Insercion</th>
                    <th scope="col">Temperatura</th>
                    <th scope="col">Presión</th>
                    <th scope="col">Humedad</th>
                    <th scope="col">Ultravioleta</th>
                </tr>
            </thead>
            <tbody id="cuerpoTabla" ></tbody>
        </table>
    </div>`);

function cargarDatosTabla() {
    for (i=0; i<datos1.length ;i++){
        let fecha = new Date(datos1[i].fechaSistema);
        let fecha2 = new Date(calendarioDatosMensuales.value);
        fila = document.createElement("tr");
        fila.setAttribute("scope","row");

        if (new Date(datos1[i].fechaSistema).getUTCDate()==fecha2.getUTCDate() && new Date(datos1[i].fechaSistema).getUTCMonth()==fecha2.getUTCMonth() && new Date(datos1[i].fechaSistema).getUTCFullYear()==fecha2.getUTCFullYear()) {
            fila.innerHTML=`        <td>${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}</td>
            <td>${fecha.toLocaleTimeString()}</td>
            <td>${datos1[i].temperatura}º</td>
            <td>${datos1[i].presion} Pa</td>
            <td>${datos1[i].humedad} %</td>
            <td>${datos1[i].intUltravioleta} mW/cm2</td>
                `;
            document.getElementById(`cuerpoTabla`).appendChild(fila);
        }
    }
}

//Se formatea segun su numero
if (mes.toString().length==1) {
    mes = '0'+(mes+1);
}

if (dia.toString().length==1) {
    dia = '0'+dia;
}


calendarioDatosMensuales.value = `${fechaActual.getFullYear()}-${mes}-${dia}`;
pTitulo.innerHTML = `Tabla Datos Meteorológicos -- ${new Date(fechaActual).getUTCDate()}/${new Date(fechaActual).getUTCMonth()+1}/${new Date(fechaActual).getUTCFullYear()}`;
cargarDatosTabla();

calendarioDatosMensuales.addEventListener('change', ()=>{

    pTitulo.innerHTML = `Tabla Datos Meteorológicos -- ${new Date(calendarioDatosMensuales.value).getUTCDate()}/${new Date(calendarioDatosMensuales.value).getUTCMonth()+1}/${new Date(calendarioDatosMensuales.value).getUTCFullYear()}`;
    document.getElementById(`cuerpoTabla`).innerHTML = '';
    cargarDatosTabla();

})



