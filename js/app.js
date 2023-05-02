// variables
const carrito = document.querySelector('#carrito');
const contenerdorCarrito = document.querySelector('#lista-carrito tbody');
const listarCursos = document.querySelector('#lista-cursos');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');

let arrayCarrito = [];

cargarEventListeners();
// funciones
function cargarEventListeners() {
    listarCursos.addEventListener('click', agregarCurso);

    // elimina cursos del carrito
    carrito.addEventListener('click', eliminaCurso);

    btnVaciarCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        arrayCarrito = [];
        carritoHTML();
    });
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement; // seleccionar card
        leerDatosCurso(cursoSeleccionado);
    }

    
}

function leerDatosCurso(curso) {
    
    const infoCurso = {
        id: curso.querySelector('A').getAttribute('data-id'),
        imagen: curso.querySelector('IMG').src,
        titulo: curso.querySelector('H4').textContent,
        precio: curso.querySelector('.precio SPAN').textContent,
        cantidad: 1,
    }

    const precio = Number(curso.querySelector('.precio SPAN').textContent.substring(1));
    const existe = arrayCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizar array
        const cursos = arrayCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                curso.precio = `$${precio * curso.cantidad}`
                return curso;
            } else {
                return curso; // no soy duplicados
            }
        });

        arrayCarrito = [...cursos];
    } else {
        // agrega elementos al arreglo carrito
        arrayCarrito = [...arrayCarrito, infoCurso];
    }
    
    
    carritoHTML();
}

// muestra el carrito de compras en el HTMl
function carritoHTML() {
    limpiarHTML();
    let total = 0;
    arrayCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad,id} = curso;
        const row = document.createElement('TR');
        row.innerHTML = `
        <td><img src="${imagen}" width=100></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>`;
        // agrega el html del carrito en el tbody
        contenerdorCarrito.appendChild(row);
        
        total += Number(precio.substring(1))
    });
    
    document.querySelector('#total').textContent = `Total a pagar $${total}`;
}

// elimina el html previo
function limpiarHTML() {
    while(contenerdorCarrito.firstChild) {
        contenerdorCarrito.removeChild(contenerdorCarrito.firstChild);
    }
}

function eliminaCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id');
        arrayCarrito = arrayCarrito.filter(curso => curso.id !== id);
        carritoHTML();
    }
}