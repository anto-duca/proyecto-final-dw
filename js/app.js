const CARRITO_LOCAL_STORAGE = JSON.parse( localStorage.getItem('carrito') );

// Creación de objetos con propiedades y un método.
class Plan {
    constructor (id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
    
    descuento () {
        if (this.precio === 190) {
            alert('Promo por tiempo limitado: El plan anual tiene un descuento especial del 5%');
            return this.precio - ((this.precio*5)/100);
        } else {
            return this.precio;
        }
    }
}

const PLAN_SEMANAL = new Plan (1, 'Plan semanal', 20);
const PLAN_MENSUAL = new Plan (2, 'Plan mensual', 40);
const PLAN_ANUAL = new Plan (3, 'Plan anual', 190);

// Creación de arrays PRODUCTOS y CARRITO para el proceso de compra del usuario
const PRODUCTOS = [PLAN_SEMANAL, PLAN_MENSUAL, PLAN_ANUAL];
let carrito = [];

// Comprobación nombre usuario

const USUARIO_LOCAL_STORAGE = localStorage.getItem('usuario');
let usuario;

const COMPROBACION_USUARIO = () => {
    if (USUARIO_LOCAL_STORAGE == null) {
        usuario = prompt('Hola!. Ingresá tu nombre');
    } else {
        usuario = USUARIO_LOCAL_STORAGE;
        alert(`'Bienvenido/a ' ${usuario}`);
    }
    localStorage.setItem('usuario', usuario);
}

COMPROBACION_USUARIO();

// Comprobación si el carrito tiene productos ya guardados
const COMPROBACION_CARRITO = () => {
    if ( CARRITO_LOCAL_STORAGE == null ) {
        carrito = [];
    } else {
        let continuarCompra = prompt('Querés continuar con tu compra?')
        if ( continuarCompra == 'si' ){
            carrito = CARRITO_LOCAL_STORAGE;
        }
    }
}

COMPROBACION_CARRITO ();

// Función para agregar al carrito los productos 
let inicio = 'inicio';

const AGREGAR_AL_CARRITO = () => {
    while (inicio !== 'salir') {
        let eleccionUsuario =  parseInt(prompt('Elegí el recetario que querés: Ingresá 1 para Plan semanal, 2 para Plan mensual y 3 para Plan anual. Si no querés más ingresa: salir'));
        let productoElegido = PRODUCTOS.find( elemento => elemento.id === eleccionUsuario );

        if (productoElegido) {
            carrito.push(productoElegido);
        } else {
            inicio = prompt('¿Estas seguro que no queres otro plan?. Si no querés más ingresá salir.');    
        }
    }

    localStorage.setItem( 'carrito', JSON.stringify(carrito) );

    return carrito;
}

AGREGAR_AL_CARRITO();

//Funcion para calcular el subtotal, antes de descuentos y cuotas
const SUBTOTAL_USUARIO = () => {
    // let subtotal = carrito.reduce( ( acumulador, elemento )=> acumulador += elemento.precio, 0 );
    let subtotal = 0;
    carrito.forEach(elemento => {
        subtotal += elemento.descuento();
    });
    alert(`'El total parcial de tu compra es: ' ${subtotal}`);
    console.log(subtotal)
    return subtotal;
}

// Función para calcular el descuento del 5% si compra más de 200
const DESCUENTO_COMPRA = () => {
    let aplicaDescuento = SUBTOTAL_USUARIO();
    if (aplicaDescuento >= 200) {
        alert('Aplica descuento adicional del 5% por tu compra');
        return (aplicaDescuento - ((aplicaDescuento*5)/100));
    } else {
        alert('No aplica descuento adicional por tu compra');
        return aplicaDescuento
    }
}

// Función para calcular cuotas, posibilidades 1 sin interes y 3 con 10% de interes y 6 con 20% de interes
const CUOTAS_CON_INTERES = () => {
    let compraTotal = DESCUENTO_COMPRA();
    let cuotas = Number(prompt('Ingresa cantidad de cuotas: 1, 3 o 6'));

    if (cuotas === 6) {
        let totalEnCuotas = compraTotal + ((compraTotal * 20) / 100);
        let totalEnCuotasDosDecimales = totalEnCuotas.toFixed(2);
        let totalCadaCuota = totalEnCuotasDosDecimales / cuotas;
        let dosDecimales = totalCadaCuota.toFixed(2);
        alert(`El total de la compra es ${totalEnCuotasDosDecimales} en ${cuotas} cuotas de ${dosDecimales} cada una`);
    } else if (cuotas === 3) {
        let totalEnCuotas = compraTotal + ((compraTotal * 10) / 100);
        let totalEnCuotasDosDecimales = totalEnCuotas.toFixed(2);
        let totalCadaCuota = totalEnCuotasDosDecimales / cuotas;
        let dosDecimales = totalCadaCuota.toFixed(2);
        alert(`El total de la compra es ${totalEnCuotasDosDecimales} en ${cuotas} cuotas de ${dosDecimales} cada una`);
    } else if (cuotas === 1 ) {
        alert(`El total de la compra es ${compraTotal} en ${cuotas} cuota`);
    } else {
        alert(cuotas = Number(prompt('Volvé a ingresar la cantidad de cuotas: 1, 3 o 6')));
    }
}

CUOTAS_CON_INTERES();