const CONTENEDOR_CHECKOUT = document.getElementById('containerCheckout');
const PRECIO_CHECKOUT = document.getElementById('containerPrecio')
const FORMULARIO_CHECKOUT = document.getElementById('formCheckout');
const INPUTS = document.querySelectorAll('#formCheckout input');

// Mostrar productos en carrito
let carrito = [];
let carritoLocal = JSON.parse(localStorage.getItem('carrito'));
carrito = [...carritoLocal];

mostrarServicios(carrito);

function mostrarServicios (array) {
    CONTENEDOR_CHECKOUT.innerHTML = '';

    array.forEach ( (servicio) => {
        let article = document.createElement('article');
        article.classList.add('checkout__item');
        article.innerHTML += `
            <h3>${servicio.nombre}</h3>
            <p>${servicio.inclusiones}</p>
            <p> Cantidad: ${servicio.cantidad} </p>
            <p class="checkout__precio">$ ${servicio.precio}</p>
            `

        CONTENEDOR_CHECKOUT.appendChild(article);
    })

    PRECIO_CHECKOUT.innerText = carrito.reduce( (acc, el) => acc += el.precio, 0 )
}

// Validación formulario checkout con expresiones regulares
const REGEX = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const CAMPOS = {
    Fullname: false,
    Email: false,
    Telephone: false
}

const VALIDAR_FORMULARIO = (e) => {
	switch (e.target.name) {
		case 'nombre':
			VALIDACION_INPUTS(REGEX.nombre, e.target, 'Fullname');
		break;
		case 'email':
			VALIDACION_INPUTS(REGEX.email, e.target, 'Email');
		break;
		case 'telefono':
			VALIDACION_INPUTS(REGEX.telefono, e.target, 'Telephone');
		break;
	}
}

const VALIDACION_INPUTS = (REGEX, INPUTS, campo) => {
	if (REGEX.test(INPUTS.value)) {
		document.getElementById(`group${campo}`).classList.remove('form__group-wrong');
		document.getElementById(`group${campo}`).classList.add('form__group-right');
		document.getElementById(`wrongIcon${campo}`).classList.add('hidden');
		document.getElementById(`rightIcon${campo}`).classList.remove('hidden');
		document.querySelector(`#group${campo} .form__input-error`).classList.remove('form__input-error-active');
        CAMPOS[campo] = true;
	} else {
		document.getElementById(`group${campo}`).classList.add('form__group-wrong');
		document.getElementById(`group${campo}`).classList.remove('form__group-right');
		document.getElementById(`rightIcon${campo}`).classList.add('hidden');
		document.getElementById(`wrongIcon${campo}`).classList.remove('hidden');
		document.querySelector(`#group${campo} .form__input-error`).classList.add('form__input-error-active');
        CAMPOS[campo] = false;
	}
}

INPUTS.forEach( (input) => {
	input.addEventListener('keyup', VALIDAR_FORMULARIO);
	input.addEventListener('blur', VALIDAR_FORMULARIO);
})

FORMULARIO_CHECKOUT.addEventListener('submit', (e) => {
    e.preventDefault();

    if(CAMPOS.Fullname && CAMPOS.Email && CAMPOS.Telephone) {
        finalizarCompra();
		GUARDAR_DATOS_USUARIO();
    } else {
        document.getElementById('formMessage').classList.add('form__message-active');
        setTimeout( () => {
            document.getElementById('formMessage').classList.remove('form__message-active');
        }, 2000);
    }
});

// API MERCADO PAGO, al clickear PAGAR.
async function finalizarCompra() {
	const carritoFinal = carrito.map((e) => {
		let nuevoElemento = {
			title: e.nombre,
			description: "",
			picture_url: "",
			category_id: e.id,
			quantity: Number(e.cantidad),
			currency_id: "ARS",
			unit_price: Number(e.precio),
		};
		return nuevoElemento;
	});

    const response = await fetch (
		"https://api.mercadopago.com/checkout/preferences",
		{
			method: "POST",
			headers: {
				Authorization: "Bearer TEST-5522414011847637-052422-7bf45f6741e66556e621ea815f134da2-214360281",
			},
			body: JSON.stringify({
				items: carritoFinal,
                "back_urls": {
                    success: "http://127.0.0.1:5500/fincompra.html",
                    failure: "http://127.0.0.1:5500/shop.html",
                    pending: "http://127.0.0.1:5500/shop.html"
                },
                auto_return: "approved",
			}),
		}
	);
	const data = await response.json();
	window.open(data.init_point, "_blank");
	
    //vacia el carrito despues del checkout y lo refleja en localStorage
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
	
	window.location.replace('http://127.0.0.1:5500/shop.html');
}

/* Guardo los datos del usuario para mostrarlo en el mensaje de agradecimiento por la compra*/
const GUARDAR_DATOS_USUARIO = () => {
	class Comprador {
		constructor (nombre, email) {
			this.nombre = nombre
			this.email = email
		}
	}

	let capturaNombre = document.getElementById('nombre').value;
	let capturaEmail = document.getElementById('email').value;

	const USUARIO = new Comprador(capturaNombre, capturaEmail);
	localStorage.setItem('usuario', JSON.stringify(USUARIO));
}

