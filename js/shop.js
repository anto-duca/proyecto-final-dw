// Creación de arrays CARRITO para el proceso de compra del usuario
let carrito = [];

const BTN_ABRIR_CARRITO = document.getElementById('botonAbrir');
const BTN_CERRAR_CARRITO = document.getElementById('carritoCerrar');
const CONTENEDOR_MODAL = document.getElementsByClassName('modal-contenedor')[0];
const MODAL_CARRITO = document.getElementsByClassName('modal-carrito')[0];
const CONTENEDOR_CARRITO = document.getElementById('contenedorCarrito');
const PRECIO_TOTAL = document.getElementById('precioTotal');
const CONTADOR = document.getElementById('contadorCarrito');
const CONTENEDOR_CARRITO_VACIO = document.getElementById('carritoVacio');
const BTN_ELIMINAR_SERVICIO = document.getElementById('eliminarServicio');

CONTADOR.innerText = '0';

// Función para imprimir los productos del local storage en el modal del carrito
const LOCAL_STORAGE = () => {
    let carritoLocal = JSON.parse(localStorage.getItem('carrito'));
    carrito = [...carritoLocal]
    CONTADOR.innerText = carrito.length;
    ACTUALIZAR_CARRITO();
}

/* Evento que espera a que se cargue el DOM y a ejecuta la función LOCAL_STORAGE que imprime los servicios en el modal del carrito*/
document.addEventListener('DOMContentLoaded', () => {
    LOCAL_STORAGE();
})

let servicios = [];

/* Función asíncrona para simular la obtención de los servicios desde una "base de datos" que en realidad es el json ubicado en la raíz del proyecto */
const obtenerServicios = async () => {
    const respuesta = await fetch('./servicios.json')
    const data = await respuesta.json()
    servicios = data
    mostrarServicios(servicios)
}

obtenerServicios();

// Función para generar las cards del shop
mostrarServicios(servicios);

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
    
    valorFiltro == 'todos' ? (
        mostrarServicios(servicios)
    ) : (
        mostrarServicios(servicios.filter (el => el.categoria == FILTRO_SHOP.value))
    )
    
    // Evento para filtrar shop según la categoría del servicio elegida.
    FILTRO_SHOP.addEventListener('change', FILTRAR_SHOP)
}

FILTRAR_SHOP();

// Función para agregar al carrito
const AGREGAR_AL_CARRITO = (servicioId) => {
    let itemEnCarrito = carrito.find(element => element.id == servicioId);
    const ALERTA_MODAL = document.getElementsByClassName('warning-contenedor')[0];
    let mensajeAgregado = $("#agregadoCarrito");

    if (itemEnCarrito) {
        ALERTA_MODAL.innerHTML = '';
        let div = document.createElement('div');
        div.classList.add('warning-alert');
        div.innerHTML = `<button id="warning-close"><span class="iconify" data-icon="clarity:window-close-line" data-inline="false"></span><button>
                        <p> ${itemEnCarrito.nombre} ya fue agregado al carrito</p>
                        `
        ALERTA_MODAL.appendChild(div)

        $('.shop-container').on("click", "#agregarCarrito", () => {
            ALERTA_MODAL.classList.add('warning-visible');
        });

        const BTN_CERRAR_WARNING = document.getElementById('warning-close');
        BTN_CERRAR_WARNING.addEventListener('click', () =>
            ALERTA_MODAL.classList.remove('warning-visible'),
        );

        $('.shop-container').on('click', "#agregarCarrito", () => {
            mensajeAgregado.hide();
        });

        ALERTA_MODAL.addEventListener('click', () => 
            ALERTA_MODAL.classList.remove('warning-visible'),
        );

    } else {
        let {id, nombre, inclusiones, precio} = servicios.find( servicios => servicios.id == servicioId );
        carrito.push({id, nombre, inclusiones,precio, cantidad: 1});

        $('.shop-container').on('click', "#agregarCarrito", () => {
            mensajeAgregado.show();
            mensajeAgregado.fadeOut(2000);
        })

        $('.shop-container').on('click', "#agregarCarrito", () => {
            ALERTA_MODAL.classList.remove('warning-visible');
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    ACTUALIZAR_CARRITO();
}

/* Función para imprimir los productos en el carrito, si no hay productos en el carrito se muestra el texto "no hay productos en tu carrito" */
const ACTUALIZAR_CARRITO = () => {
    CONTENEDOR_CARRITO.innerHTML = '';

    carrito.forEach( (servicios) => {
        let {nombre, precio, id, cantidad = 1} = servicios;
        
        let div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <p>${nombre}</p>
            <p> Cantidad: ${cantidad} </p>
            <p>$ ${precio}</p>
            <a  id="eliminarServicio" onclick=ELIMINAR_SERVICIO(${id})><span class="iconify btn-eliminar" data-icon="bi:trash" data-inline="false"></span></a>
        `
        CONTENEDOR_CARRITO.appendChild(div)
    })

    if(carrito.length > 0) {
        BTN_ABRIR_CARRITO.addEventListener('click', () => {
            CONTENEDOR_CARRITO_VACIO.classList.add('carrito-vacio-hide')
        })
    } 
    
    CONTADOR.innerText = carrito.length;

    PRECIO_TOTAL.innerText = carrito.reduce( (acc, el) => acc += el.precio, 0 )
}

// Función para eliminar elementos del carrito 
const ELIMINAR_SERVICIO = (id) => {
    let productoEliminado = carrito.find (el => el.id == id);
    let indice = carrito.indexOf(productoEliminado);
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    ACTUALIZAR_CARRITO();

    if (carrito.length === 0) {
        let div = document.createElement('div');
        div.classList.add('carrito-vacio');
        div.innerHTML = `<p>No hay productos en tu carrito</p>`
        CONTENEDOR_CARRITO.appendChild(div)
    }

    // if (carrito.length === 0) {
    //     $('.modal-carrito').on("click", "#eliminarServicio", () => {
    //         CONTENEDOR_CARRITO_VACIO.classList.remove('carrito-vacio-hide')
    //     })
    // }
}

// Evento para que al hacer clic sobre el icono carrito se abra el modal
BTN_ABRIR_CARRITO.addEventListener('click', () => {
    CONTENEDOR_MODAL.classList.add('modal-activo')
})

// Evento para que cuando se cliquee fuera del modal también se cierre el carrito
CONTENEDOR_MODAL.addEventListener('click', () => {
    CONTENEDOR_MODAL.classList.remove('modal-activo')
})

// Evento para que no se cierre el modal del carrito cuando hacemos clic sobre cualquier elemento que no sea el botón cerrar
MODAL_CARRITO.addEventListener('click', (e) => {
    e.stopPropagation()
})

// Evento para que al hacer clic sobre el icono cerrar del carrito, se cierre el modal
BTN_CERRAR_CARRITO.addEventListener('click', () => {
    CONTENEDOR_MODAL.classList.remove('modal-activo')
})






