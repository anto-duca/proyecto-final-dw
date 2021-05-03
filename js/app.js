
const CONTENEDOR = document.getElementById('servicios');
const FILTRO_SHOP = document.getElementById('categoria');
const AGREGAR_CARRITO = document.getElementById('agregarAlCarrito');
const CONTENEDOR_MODAL = document.getElementsByClassName('modal-contenedor')[0];
const BTN_ABRIR_CARRITO = document.getElementById('botonAbrir');
const BTN_CERRAR_CARRITO = document.getElementById('carritoCerrar');
const MODAL_CARRITO = document.getElementsByClassName('modal-carrito')[0];
const CONTENEDOR_CARRITO = document.getElementById('contenedor-carrito');
const PRECIO_TOTAL = document.getElementById('precioTotal');
const CONTADOR = document.getElementById('contadorCarrito');

// Creación de arrays CARRITO para el proceso de compra del usuario
let carrito = [];

// Función para imprimir los productos del local storage en el modal del carrito
let carritoLocal = JSON.parse(localStorage.getItem('carrito'));

const LOCAL_STORAGE = () => {

    if (carritoLocal != null) {
        carritoLocal.forEach ( (servicios) => {
            let div = document.createElement('div');
            div.classList.add('producto-carrito');
    
            div.innerHTML = `
                <p>${servicios.nombre}</p>
                <p>$ ${servicios.precio}</p>
                <p>Cantidad: 1</p>
                <a href="#" onclick=ELIMINAR_SERVICIO(${servicios.id})><span class="iconify" data-icon="bi:trash" data-inline="false"></span></a>
            `
            CONTENEDOR_CARRITO.appendChild(div)
        })

        PRECIO_TOTAL.innerText = carritoLocal.reduce( (acc, el) => acc += el.precio, 0 );
    }

    return carritoLocal
}

// Función para generar las cards del shop
mostrarServicios(SERVICIOS);

function mostrarServicios (array) {
    CONTENEDOR.innerHTML = '';

    array.forEach ( (servicios) => {
        let article = document.createElement('article');
        article.classList.add('shop-container__item');
        article.innerHTML += `
            <img src=${servicios.imagen} alt="nutrición y maternidad">
            <h3>${servicios.nombre}</h3>
            <p>${servicios.descripcion}</p>
            <p class="shop-container__precio">$ ${servicios.precio}</p>
            <a href="#" class="btn" onclick="AGREGAR_AL_CARRITO(${servicios.id})"><span class="btn__text">Agregar al carrito</span></a>
        `

        CONTENEDOR.appendChild(article);
    })
}

// Función que permite filtrar las categorías del shop
const FILTRAR_SHOP = () => {
    let valorFiltro = FILTRO_SHOP.value;
    
    if (valorFiltro == 'todos') {
        mostrarServicios(SERVICIOS);
    } else {
        mostrarServicios(SERVICIOS.filter (el => el.categoria == FILTRO_SHOP.value))
    }
}

FILTRAR_SHOP();

// Función para pasar los productos al carrito 
const ACTUALIZAR_CARRITO = () => {
    CONTENEDOR_CARRITO.innerHTML=''
    carrito.forEach ( (servicios) => {
        let div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <p>${servicios.nombre}</p>
            <p>$ ${servicios.precio}</p>
            <p>Cantidad: 1</p>
            <a href="#" onclick=ELIMINAR_SERVICIO(${servicios.id})><span class="iconify" data-icon="bi:trash" data-inline="false"></span></a>
        `
        CONTENEDOR_CARRITO.appendChild(div)
    })
    CONTADOR.innerText = carrito.length;

    PRECIO_TOTAL.innerText = carrito.reduce( (acc, el) => acc += el.precio, 0 )
}

// Función para agregar al carrito
const AGREGAR_AL_CARRITO = (id) => {
    let productoElegido = SERVICIOS.find( servicios => servicios.id == id );
    carrito.push(productoElegido)
    ACTUALIZAR_CARRITO();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar elementos del carrito 
const ELIMINAR_SERVICIO = (id) => {
    let productoEliminado = carrito.find (el => el.id == id);
    let indice = carrito.indexOf(productoEliminado);
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    ACTUALIZAR_CARRITO();
}

// Evento para filtrar shop según la categoría del servicio elegida.
FILTRO_SHOP.addEventListener('change', FILTRAR_SHOP)

// Evento para que al hacer clic sobre el icono carrito se abra el modal
BTN_ABRIR_CARRITO.addEventListener('click', () =>
    CONTENEDOR_MODAL.classList.add('modal-activo')
)

// Evento para que al hacer clic sobre el icono cerrar del carrito, se cierre el modal
BTN_CERRAR_CARRITO.addEventListener('click', () =>
    CONTENEDOR_MODAL.classList.remove('modal-activo')
)

// Evento para que cuando se cliquee fuera del modal también se cierre el carrito
CONTENEDOR_MODAL.addEventListener('click', () => {
    CONTENEDOR_MODAL.classList.remove('modal-activo')
})

// Evento para que no se cierre el modal del carrito cuando hacemos clic sobre cualquier elemento que no sea el botón cerrar
MODAL_CARRITO.addEventListener('click', (ev) => {
    ev.stopPropagation()
})

/* Evento para cargar el carrito almacenado en el LocalStorage cuando se cargue el DOM y a su vez ejecuta la función LOCAL_STORAGE que imprime los servicios en el modal */
document.addEventListener('DOMContentLoaded', () => {
    if (JSON.parse(localStorage.getItem('carrito'))) {
        carrito = carritoLocal
        CONTADOR.innerText = carritoLocal.length;

    } else {
        carrito 
        CONTADOR.innerText = carrito.length;
    }

    LOCAL_STORAGE();
})