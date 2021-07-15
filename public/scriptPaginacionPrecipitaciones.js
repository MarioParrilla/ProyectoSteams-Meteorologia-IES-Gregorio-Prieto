
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
                <th scope="col">mmacumulada</th>
            </tr>
        </thead>
        <tbody id="cuerpoTabla" ></tbody>
    </table>
</div>`);

function cargarDatosTabla() {

    for (i=0; i<datos1.length ;i++){
        let fechaX = new Date(datos1[i].fecha);
        let fecha2 = new Date(calendarioDatosMensuales.value);
        fila = document.createElement("tr");
        fila.setAttribute("scope","row");

        if (new Date(datos1[i].fecha).getUTCDate()==fecha2.getUTCDate() && new Date(datos1[i].fecha).getUTCMonth()==fecha2.getUTCMonth() && new Date(datos1[i].fecha).getUTCFullYear()==fecha2.getUTCFullYear()) {
            fila.innerHTML=`        <td>${fechaX.getDate()}/${fechaX.getMonth()+1}/${fechaX.getFullYear()}</td>
            <td>${fechaX.toLocaleTimeString()}</td>
            <td>${datos1[i].mma}</td>
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
pTitulo.innerHTML = `Tabla Datos Precipitaciones -- ${new Date(fechaActual).getUTCDate()}/${new Date(fechaActual).getUTCMonth()+1}/${new Date(fechaActual).getUTCFullYear()}`;
cargarDatosTabla();

calendarioDatosMensuales.addEventListener('change', ()=>{

    pTitulo.innerHTML = `Tabla Datos Precipitaciones -- ${new Date(calendarioDatosMensuales.value).getUTCDate()}/${new Date(calendarioDatosMensuales.value).getUTCMonth()+1}/${new Date(calendarioDatosMensuales.value).getUTCFullYear()}`;
    document.getElementById(`cuerpoTabla`).innerHTML = '';
    cargarDatosTabla();

});