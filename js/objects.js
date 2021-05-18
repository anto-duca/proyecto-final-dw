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

const PLAN_PERSONALIZADO = new Servicios (1, 'Plan de alimentación personalizado', '~/../multimedia/dieta-saludable.jpg', 'Este plan te da los tips para alimentarte bien según tus necesidades', 'Un hermoso plan', 'planes', 200);
const ANTROPOMETRIA = new Servicios (2, 'Antropometría','~/../multimedia/alimentacion-saludable.jpg', 'Evaluación y seguimiento de tu composición corporal', '', 'antropometria', 400);
const RECETARIO_VEGETARIANO = new Servicios (3, 'Recetario vegetariano', '~/../multimedia/pancakes-desayuno.jpg', 'Ideas para adoptar hábitos alimenticios saludables', '', 'recetarios', 1000);
const RECETARIO_HIPERPROTEICO = new Servicios (4, 'Recetario hiperproteico', 'g~/../multimedia/almuerzo-rapido.jpg', 'Ideas para adoptar hábitos alimenticios saludables', '', 'recetarios', 500);
const RECETARIO_HIPERCOLESTEROLEMIA = new Servicios (5, 'Recetario hipercolesterolemia', '~/../multimedia/ayuno-intermitente.jpg', 'Ideas para adoptar hábitos alimenticios saludables', '', 'recetarios', 500);
const CONSULTA_ONLINE = new Servicios (4, 'Consulta inicial online', '~/../multimedia/consultas-online.jpg', 'Trabajemos juntos en cambiar tus hábitos alimenticios con una primera llamada', '', 'online', 500);
const CONSULTA_PRESENCIAL = new Servicios (5, 'Consulta inicial presencial', '~/../multimedia/consultas-presenciales.jpg', 'En mi consultorio podremos iniciar un camino para cambiar tus hábitos', '', 'presencial', 500);

const SERVICIOS = [PLAN_PERSONALIZADO, ANTROPOMETRIA, RECETARIO_VEGETARIANO, RECETARIO_HIPERPROTEICO, RECETARIO_HIPERCOLESTEROLEMIA, CONSULTA_ONLINE, CONSULTA_PRESENCIAL];