// Recibo el JSON del objeto y lo vuelvo a convertir en el objeto 
const USUARIO = JSON.parse(localStorage.getItem('usuario'));

// Obtengo mediante ID los span que necesito para reflejar la info del user
const CONTAINER_USUARIO = document.getElementById('usuario');
const CONTAINER_EMAIL = document.getElementById('email');

// Inserto los datos del usuario en el HTML
const IMPRESION_DATOS = () => {
    CONTAINER_USUARIO.innerHTML = `${USUARIO.nombre}`
    CONTAINER_EMAIL.innerHTML = `${USUARIO.email}`
};

IMPRESION_DATOS();