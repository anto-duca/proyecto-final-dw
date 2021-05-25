const FORMULARIO = document.getElementById('form');
const INPUTS = document.querySelectorAll('#form input');

const REGEX = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const CAMPOS = {
    Fullname: false,
    Email: false,
    Telephone: false,
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

FORMULARIO.addEventListener('submit', (e) => {
    e.preventDefault();

    const TEXT_AREA = document.getElementById('textarea')
    const COMENTARIO = TEXT_AREA.value.trim(); 

    if(CAMPOS.Fullname && CAMPOS.Email && CAMPOS.Telephone && COMENTARIO != '') {
        FORMULARIO.reset();

        document.getElementById('formSuccess').classList.add('form__message-success-active');
        setTimeout( () => {
            document.getElementById('formSuccess').classList.remove('form__message-success-active');
        }, 4000);

        document.querySelectorAll('.iconify').forEach((icono) => {
            icono.classList.add('hidden');
        });

        document.querySelectorAll('.form__group').forEach((input) => {
            input.classList.remove('form__group-right');
        });
    } else {
        document.getElementById('formMessage').classList.add('form__message-active');
        setTimeout( () => {
            document.getElementById('formMessage').classList.remove('form__message-active');
        }, 2000);
    }
});