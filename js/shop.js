// Creación de arrays CARRITO para el proceso de compra del usuario
let carrito = [];

const BTN_ABRIR_CARRITO = document.getElementById('botonAbrir');
const BTN_CERRAR_CARRITO = document.getElementById('carritoCerrar');
const CONTENEDOR_MODAL = document.getElementsByClassName('modal-contenedor')[0];
const MODAL_CARRITO = document.getElementsByClassName('modal-carrito')[0];
const CONTENEDOR_CARRITO = document.getElementById('contenedor-carrito');
const PRECIO_TOTAL = document.getElementById('precioTotal');
const CONTADOR = document.getElementById('contadorCarrito');

// Función para imprimir los productos del local storage en el modal del carrito
let carritoLocal = JSON.parse(localStorage.getItem('carrito'));

const LOCAL_STORAGE = () => {
    
    if (carritoLocal != null) {
        carritoLocal.forEach ( (SERVICIOS) => {
            let {nombre, precio, id, cantidad = 1} = SERVICIOS

            let div = document.createElement('div');
            div.classList.add('producto-carrito');
            
            div.innerHTML = `
            <p>${nombre}</p>
            <p>$ ${precio}</p>
            <p> Cantidad: ${cantidad} </p>
            <a href="#" onclick=ELIMINAR_SERVICIO(${id})><span class="iconify btn-eliminar" data-icon="bi:trash" data-inline="false"></span></a>
        `
            CONTENEDOR_CARRITO.appendChild(div)
        })
        
        PRECIO_TOTAL.innerText = carritoLocal.reduce( (acc, el) => acc += el.precio, 0 );
    } 

    return carritoLocal
}

/* Evento para cargar el carrito almacenado en el LocalStorage cuando se cargue el DOM y a su vez ejecuta la función LOCAL_STORAGE que imprime los servicios en el modal */
document.addEventListener('DOMContentLoaded', () => {
    if (JSON.parse(localStorage.getItem('carrito'))) {
        carrito = [...carritoLocal]
        CONTADOR.innerText = carritoLocal.length;

    } else {
        carrito 
        CONTADOR.innerText = carrito.length;
    }

    LOCAL_STORAGE();
})

// Función para generar las cards del shop
mostrarServicios(SERVICIOS);

function mostrarServicios (array) {
    const CONTENEDOR = document.getElementById('servicios');

    CONTENEDOR.innerHTML = '';

    array.forEach ( (servicio) => {
        let article = document.createElement('article');
        article.classList.add('shop-container__item');
        article.innerHTML += `
            <img src=${servicio.imagen} alt="nutrición y maternidad">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <p class="shop-container__precio">$ ${servicio.precio}</p>
            <button class="btn" id="agregarCarrito" onclick=AGREGAR_AL_CARRITO(${servicio.id})><span class="btn__text">Agregar al carrito</span></button>
            `

        CONTENEDOR.appendChild(article);
    })
}

// Función que permite filtrar las categorías del shop
const FILTRAR_SHOP = () => {
    const FILTRO_SHOP = document.getElementById('categoria');

    let valorFiltro = FILTRO_SHOP.value;
    
    if (valorFiltro == 'todos') {
        mostrarServicios(SERVICIOS);
    } else {
        mostrarServicios(SERVICIOS.filter (el => el.categoria == FILTRO_SHOP.value))
    }

    // Evento para filtrar shop según la categoría del servicio elegida.
    FILTRO_SHOP.addEventListener('change', FILTRAR_SHOP)
}

FILTRAR_SHOP();

// Función para agregar al carrito
const AGREGAR_AL_CARRITO = (servicioId) => {
    let itemEnCarrito = carrito.find(element => element.id == servicioId)

    if (itemEnCarrito) {
        const ALERTA_MODAL = document.getElementById('warning');
        
        ALERTA_MODAL.innerHTML = '';
        let div = document.createElement('div');
        div.classList.add('warning-duplicado');
        div.innerHTML = `<p> ${itemEnCarrito.nombre} ya fue agregado al carrito</p>
                        <button id="warning-close"><span class="iconify" data-icon="clarity:window-close-line" data-inline="false"></span></button>`
        ALERTA_MODAL.appendChild(div)
        
        const BTN_AGREGAR_CARRITO = document.getElementById('agregarCarrito');
        BTN_AGREGAR_CARRITO.addEventListener('click', () =>
            ALERTA_MODAL.classList.add('warning-visible'),
            ALERTA_MODAL.classList.remove('warning-hide')
        );

        const BTN_CERRAR_WARNING = document.getElementById('warning-close');
        BTN_CERRAR_WARNING.addEventListener('click', () =>
            ALERTA_MODAL.classList.add('warning-hide'),
        );

        ALERTA_MODAL.addEventListener('click', () =>
        ALERTA_MODAL.classList.add('warning-hide'),
        );

    } else {
        let {id, nombre, precio} = SERVICIOS.find( servicios => servicios.id == servicioId );
        carrito.push({id, nombre, precio, cantidad: 1})
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    ACTUALIZAR_CARRITO();
}

// Función para pasar los productos al carrito 
const ACTUALIZAR_CARRITO = () => {
    CONTENEDOR_CARRITO.innerHTML = ''

    carrito.forEach( (SERVICIOS) => {
        let {nombre, precio, id, cantidad = 1} = SERVICIOS;
        
        let div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <p>${nombre}</p>
            <p> Cantidad: ${cantidad} </p>
            <p>$ ${precio}</p>
            <a href="#" onclick=ELIMINAR_SERVICIO(${id})><span class="iconify btn-eliminar" data-icon="bi:trash" data-inline="false"></span></a>
        `
        CONTENEDOR_CARRITO.appendChild(div)
    })

    CONTADOR.innerText = carrito.length;

    PRECIO_TOTAL.innerText = carrito.reduce( (acc, el) => acc += el.precio, 0 )
}

// Función para eliminar elementos del carrito 
const ELIMINAR_SERVICIO = (id) => {
    let productoEliminado = carrito.find (el => el.id == id);
    let indice = carrito.indexOf(productoEliminado);
    carrito.splice(indice, 1);
    let carritoLocal = localStorage.setItem('carrito', JSON.stringify(carrito));
    ACTUALIZAR_CARRITO();

    if (carritoLocal === undefined) {
        let div = document.createElement('div');
        div.classList.add('carrito-vacio');
        div.innerHTML = `<p>No hay productos en tu carrito</p>`
        CONTENEDOR_CARRITO.appendChild(div)
    }
}

// Evento para que al hacer clic sobre el icono carrito se abra el modal
BTN_ABRIR_CARRITO.addEventListener('click', () =>
    CONTENEDOR_MODAL.classList.add('modal-activo')
)

// Evento para que cuando se cliquee fuera del modal también se cierre el carrito
CONTENEDOR_MODAL.addEventListener('click', () => {
    CONTENEDOR_MODAL.classList.remove('modal-activo')
})

// Evento para que no se cierre el modal del carrito cuando hacemos clic sobre cualquier elemento que no sea el botón cerrar
MODAL_CARRITO.addEventListener('click', (ev) => {
    ev.stopPropagation()
})

// Evento para que al hacer clic sobre el icono cerrar del carrito, se cierre el modal
BTN_CERRAR_CARRITO.addEventListener('click', () =>
    CONTENEDOR_MODAL.classList.remove('modal-activo')
)
