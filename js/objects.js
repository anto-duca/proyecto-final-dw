// Creación de objetos con propiedades y un método.
class Plan {
    constructor (id, nombre, imagen, descripcion, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
    }

    descuento () {
        if (this.precio >= 190) {
            this.precio = (this.precio - ((this.precio*5)/100));
        } else {
            this.precio = this.precio;
        }
    }
}

const PLAN_SEMANAL = new Plan (1, 'Plan semanal', '/multimedia/dieta-saludable.jpg', 'Este plan te da los tips para alimentarte bien durante tu rutina laboral', 'plan', 200);
const PLAN_MENSUAL = new Plan (2, 'Plan mensual','/multimedia/alimentacion-saludable.jpg', 'Este completo plan te da las bases por un mes, para adquirir habitos alimenticios', 'plan', 400);
const PLAN_ANUAL = new Plan (3, 'Plan anual', '/multimedia/almuerzo-rapido.jpg', 'El plan más completo si te cuesta mucho y necesitas una guía todo el tiempo', 'plan', 1000);

PLAN_ANUAL.descuento();

const PRODUCTOS = [PLAN_SEMANAL, PLAN_MENSUAL, PLAN_ANUAL];

