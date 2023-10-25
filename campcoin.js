// VERIFICADOR DE INFORMACIÓN DEL FORMULARIO
function validar() {
    var identificacion = document.getElementById("identificacion").value;
    var name = document.getElementById("name").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var grupo = document.getElementById("grupo").value;
    
    if( identificacion == "") {
        alert("La identifiación es requerida");
        return false;
    } else if (identificacion < 1 ){
        alert('La identifiación debe ser un número positivo, mayor a cero.');
        return false;
    }

    if( name == "") {
        alert("El nombre es requerido");
        return false;
    }


    if( telefono == "") {
        alert("El Telefono es requerido");
        return false;
    } else if (telefono < 0 ){
        alert('El teléfono debe ser un número positivo');
    }
    
    if( email == "") {
        alert("El Email es requerido");
        return false;
    } 

    if( grupo == "") {
        alert("El grupo es requerido");
        return false;
    }



    return true;
}



// FUNCIÓN PARA MOSTRAR LA INFORMACIÓN
function showData(){
    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }
    var html = "";
        peopleList.forEach(function (element,index){
            html += "<tr>";
            html += "<td>" + element.identificacion + "</td>";
            html += "<td>" + element.name + "</td>";
            html += "<td>" + element.points + "</td>";
            html += "<td>" + element.email + "</td>";
            html += '<td><button onclick="EditarData('+index+')" class="btn btn-warning m-2">Editar</button><button onclick="deleteData('+index+')" class="btn btn-danger">Delete</button></td>';
            html += "</tr>";
        }
    );

document.querySelector("#crudTable tbody").innerHTML = html;

}

//CARGA TODA LA DATA CUANDO EL DOCUMENTO O LA PAGINA CARGA
document.onload = showData();


//FUNCIÓN PARA AGREGAR DATA
function AddData() {
    if (validar() == true) {
        var identificacion = document.getElementById("identificacion").value;
        var name = document.getElementById("name").value;
        var telefono = document.getElementById("telefono").value;
        var email = document.getElementById("email").value;
        var grupo = document.getElementById("grupo").value;
        var points = document.getElementById("points").value;

        var peopleList;
        if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
        } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
        }
        peopleList.push({
            name: name,
            identificacion: identificacion,
            telefono: telefono,
            email: email,
            grupo: grupo,
            points: points
        });
        localStorage.setItem('peopleList', JSON.stringify(peopleList));
        showData();
        document.getElementById("identificacion").value = "";
        document.getElementById("name").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("email").value = "";
        document.getElementById("grupo").value = "";
        document.getElementById("points").value = "";
        alert('El camper ha sido almacenado exitosamente.')
    }
}


//FUNCIÓN PARA ELIMINAR LA INFORMACIÓN
function deleteData(index){
    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }
    peopleList.splice(index,1);
    localStorage.setItem('peopleList', JSON.stringify(peopleList));
    showData();
    alert('El cliente ha sido eliminado exitosamente')
}

//FUNCIÓN PARA EDITAR LA INFORMACIÓN

function EditarData(index){
    document.getElementById("Submit").style.display = 'none';
    document.getElementById("Update").style.display = 'block';

    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("identificacion").value = peopleList[index].identificacion;
    document.getElementById("telefono").value = peopleList[index].telefono;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("grupo").value = peopleList[index].grupo;
    document.getElementById("points").value = peopleList[index].points;

    document.getElementById("Update").onclick = function() {
        if (validar() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].identificacion = document.getElementById("identificacion").value;
            peopleList[index].telefono = document.getElementById("telefono").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].grupo = document.getElementById("grupo").value;
            peopleList[index].points = document.getElementById("points").value;


        localStorage.setItem('peopleList', JSON.stringify(peopleList));
    
        showData();
        document.getElementById("name").value = "";
        document.getElementById("identificacion").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("email").value = "";
        document.getElementById("grupo").value = "";
        document.getElementById("points").value = "";

        
        document.getElementById("Submit").style.display = 'block';
        document.getElementById("Update").style.display = 'none';
        }
    }
};




function SumarCampcoins(id,cantidad) {
    var id = document.getElementById("buscar_identificacion").value;
    var cantidad = document.getElementById("sumar_puntos").value;

    var peopleList = JSON.parse(localStorage.getItem('peopleList'));


    if (cantidad==""){
        alert("No seleciono un concepto")
    } else if (cantidad == "companerismo"){
        cantidad = 2;
    } else{
        cantidad = 5;
    }

    
    peopleList.forEach(function (element, index) {
        if (element.identificacion == id) {
            peopleList[index].points = parseFloat(peopleList[index].points)+ cantidad;

            alert('Se ha sumado exitosamente '+cantidad+" puntos, al id "+id);
            localStorage.setItem('peopleList', JSON.stringify(peopleList));
            location.reload();
        }
    }
    );
};

function RestarCampcoins(id,cantidad) {
    var id = document.getElementById("buscar_miidentificacion").value;
    var cantidad = document.getElementById("restar_puntos").value;
    var peopleList = JSON.parse(localStorage.getItem('peopleList'));
    if (cantidad==""){
    alert("No seleciono un concepto")
    } else if (cantidad == "tarde"){
        cantidad = -3;
    } else{
        cantidad = -10;
    }   
    peopleList.forEach(function (element, index) {
        if (element.identificacion == id) {
            peopleList[index].points = parseFloat(peopleList[index].points)+ cantidad;}
            localStorage.setItem('peopleList', JSON.stringify(peopleList));
            location.reload();
        }
    )  
    alert('Se ha restado exitosamente '+cantidad+" puntos, al id "+id);

}


// FUNCIÓN PARA MOSTRAR LA INFORMACIÓN
function showpuntosData(){
    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }
    var html = "";
        peopleList.forEach(function (element,index){
            html += "<tr>";
            html += "<td>" + element.identificacion + "</td>";
            html += "<td>" + element.name + "</td>";
            html += "<td>" + element.points + "</td>";
            html += "</tr>";
        }
    );

document.querySelector("#puntosTABLE tbody").innerHTML = html;

}

//CARGA TODA LA DATA CUANDO EL DOCUMENTO O LA PAGINA CARGA
document.onload = showpuntosData();
