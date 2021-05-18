// Creación de objetos (servicios) con propiedades y un método.
class Servicios {
    constructor (id, nombre, imagen, descripcion, inclusiones, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.inclusiones = inclusiones;
        this.categoria = categoria;
        this.precio = precio;
    }

    descuento () {
        if (this.precio >= 950) {
            this.precio = (this.precio - ((this.precio*5)/100));
        } else {
            this.precio = this.precio;
        }
    }
}

const PLAN_SEMANAL = new Servicios (1, 'Plan semanal', '~/..//multimedia/dieta-saludable.jpg', 'Este plan te da los tips para alimentarte bien durante tu rutina laboral', 'Un hermoso plan', 'planes', 200);
const PLAN_MENSUAL = new Servicios (2, 'Plan mensual','~/..//multimedia/alimentacion-saludable.jpg', 'Este completo plan te da las bases por un mes, para adquirir habitos alimenticios', '', 'planes', 400);
const PLAN_ANUAL = new Servicios (3, 'Plan anual', '~/..//multimedia/almuerzo-rapido.jpg', 'El plan más completo si te cuesta mucho y necesitas una guía todo el tiempo', '', 'planes', 1000);
const CONSULTA_INICIAL_ONLINE = new Servicios (4, 'Consulta inicial online', '~/..//multimedia/consultas-online.jpg', 'Trabajemos juntos en cambiar tus hábitos alimenticios con una primera llamada', '', 'online', 500);
const CONSULTA_INICIAL_PRESENCIAL = new Servicios (5, 'Consulta inicial presencial', '~/..//multimedia/consultas-presenciales.jpg', 'En mi consultorio podremos iniciar un camino para cambiar tus hábitos', '', 'presenciales', 500);

PLAN_ANUAL.descuento();

const SERVICIOS = [PLAN_SEMANAL, PLAN_MENSUAL, PLAN_ANUAL, CONSULTA_INICIAL_ONLINE, CONSULTA_INICIAL_PRESENCIAL];