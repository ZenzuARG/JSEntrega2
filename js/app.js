// Metadatos de cada ejercicio con tipo (reps/time), series y repeticiones/tiempo base
const metaEjercicios = {
    Flexiones:            { tipo: 'reps', baseSeries: 3, baseReps: 12 },
    Sentadillas:          { tipo: 'reps', baseSeries: 3, baseReps: 15 },
    Fondos:               { tipo: 'reps', baseSeries: 3, baseReps: 10 },
    Planchas:             { tipo: 'time', baseSeries: 3, baseTime: 30 },
    'Pull-ups':           { tipo: 'reps', baseSeries: 3, baseReps: 6 },
    'Mountain Climbers':  { tipo: 'time', baseSeries: 3, baseTime: 40 },

    Calentamiento:        { tipo: 'time', baseSeries: 1, baseTime: 600 },
    'Ciclismo moderado':  { tipo: 'time', baseSeries: 1, baseTime: 900 },
    Sprints:              { tipo: 'time', baseSeries: 5, baseTime: 20 },
    'Recuperación':       { tipo: 'time', baseSeries: 5, baseTime: 60 },
    Enfriamiento:         { tipo: 'time', baseSeries: 1, baseTime: 300 },

    'Press de Banca':     { tipo: 'reps', baseSeries: 4, baseReps: 8 },
    'Peso Muerto':        { tipo: 'reps', baseSeries: 4, baseReps: 6 },
    'Sentadilla Barra':   { tipo: 'reps', baseSeries: 4, baseReps: 10 },
    'Remo Barra':         { tipo: 'reps', baseSeries: 3, baseReps: 10 },
    'Press Militar':      { tipo: 'reps', baseSeries: 3, baseReps: 8 },

    Burpees:              { tipo: 'reps', baseSeries: 4, baseReps: 10 },
    'Jumping Jacks':      { tipo: 'time', baseSeries: 4, baseTime: 45 },
    'High Knees':         { tipo: 'time', baseSeries: 4, baseTime: 30 },
    'Tuck Jumps':         { tipo: 'reps', baseSeries: 3, baseReps: 12 },

    'Saludo al Sol':      { tipo: 'time', baseSeries: 2, baseTime: 60 },
    'Perro Abajo':        { tipo: 'time', baseSeries: 2, baseTime: 45 },
    'Guerrero I':         { tipo: 'time', baseSeries: 2, baseTime: 30 },
    Árbol:                { tipo: 'time', baseSeries: 2, baseTime: 30 },
    'Postura Niño':       { tipo: 'time', baseSeries: 1, baseTime: 120 },

    'Trote suave':        { tipo: 'time', baseSeries: 1, baseTime: 900 },
    'Intervalos velocidad':{ tipo: 'time', baseSeries: 6, baseTime: 30 },
    Cuestas:              { tipo: 'time', baseSeries: 5, baseTime: 45 },
    'Stride largo':       { tipo: 'time', baseSeries: 1, baseTime: 600 }
};

// Lista de ejercicios por actividad
const ejerciciosPorActividad = {
    calistenia:    ['Flexiones','Sentadillas','Fondos','Planchas','Pull-ups','Mountain Climbers'],
    spinning:      ['Calentamiento','Ciclismo moderado','Sprints','Recuperación','Enfriamiento'],
    weightlifting: ['Press de Banca','Peso Muerto','Sentadilla Barra','Remo Barra','Press Militar'],
    hiit:          ['Burpees','Jumping Jacks','High Knees','Tuck Jumps','Mountain Climbers'],
    yoga:          ['Saludo al Sol','Perro Abajo','Guerrero I','Árbol','Postura Niño'],
    running:       ['Trote suave','Intervalos velocidad','Cuestas','Stride largo','Enfriamiento']
};

// Captura de formulario
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('datosUsuario')
    .addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        const datos = { edad: +form.edad.value, peso: +form.peso.value, actividad: form.actividad.value };
        mostrarRutina(generarRutina(datos), document.getElementById('rutinaResultante'));
    });
});

// Genera rutina: número de ejercicios variable según edad
function generarRutina({ actividad, peso, edad }) {
    const lista = ejerciciosPorActividad[actividad] || [];
    // Más jóvenes hacen más ejercicios
    const maxEjercicios = edad < 30 ? 6 : edad < 50 ? 5 : edad < 65 ? 4 : 3;
    const seleccion = lista.slice(0, maxEjercicios);

    // Factores de ajuste
    const fEdad = edad > 60 ? 0.7 : edad > 40 ? 0.85 : 1;
    const fPeso = peso > 85 ? 1.1 : peso < 60 ? 0.9 : 1;

    return seleccion.map(nombre => {
        const m = metaEjercicios[nombre];
        let series = Math.max(1, Math.round(m.baseSeries * fEdad));
        if (m.tipo === 'reps') {

            const reps = Math.max(1, Math.round(m.baseReps * fEdad * fPeso));

            return { nombre, tipo: 'reps', series, reps, descripcion: obtenerDescMap()[nombre] };
        }
         const tiempo = Math.max(10, Math.round(m.baseTime * fEdad * (fPeso < 1 ? fPeso : 1)));
         return { nombre, tipo: 'time', series, tiempo, descripcion: obtenerDescMap()[nombre] };
        });
}

// Descripciones detalladas para todos los ejercicios
function obtenerDescMap() {
    return {
        Flexiones: 'Acuéstate boca abajo, manos al ancho de hombros. Empuja tu cuerpo manteniendo core firme y codos cerca.',
        Sentadillas: 'Pies al ancho de hombros, baja cadera como si te sentaras, rodillas alineadas y espalda recta.',
        Fondos: 'Con manos en banco, baja cuerpo flexionando codos y sube extendiéndolos sin encoger hombros.',
        Planchas: 'Apoya antebrazos y puntas de pies, mantén cuerpo en línea recta y abdomen apretado el tiempo indicado.',
        'Pull-ups': 'Cuelga de barra con agarre prono, tira con espalda y brazos hasta que barbilla supere la barra.',
        'Mountain Climbers': 'En plancha alta, lleva rodillas al pecho alternándolas rápido, mantén hips bajos.',
        Calentamiento: 'Pedalea o camina suave 5-10 min para aumentar flujo sanguíneo y preparar músculos.',
        'Ciclismo moderado': 'Mantén cadencia cómoda, espalda erguida y pedalea de forma continua 10-15 min.',
        Sprints: 'Realiza intervalos de alta velocidad de 20s seguidos de recuperación de 40s.',
        Recuperación: 'Pedalea o camina suave para bajar la frecuencia cardíaca sin detenerte.',
        Enfriamiento: 'Reduce la intensidad y realiza estiramientos suaves al finalizar.',
        'Press de Banca': 'Acuéstate en banco, agarra barra al ancho de hombros y empuja controlando el movimiento.',
        'Peso Muerto': 'Pies al ancho de caderas, espalda neutra, levanta barra empujando con caderas y piernas.',
        'Sentadilla Barra': 'Barra sobre trapecios, baja manteniendo torso vertical y rodillas alineadas.',
        'Remo Barra': 'Inclina torso, tira barra al abdomen manteniendo codos pegados y hombros bajos.',
        'Press Militar': 'De pie o sentado, empuja peso desde hombros hacia arriba sin arquear espalda.',
        Burpees: 'Desde parado baja a cuclillas, salta a plancha, haz flexión, vuelve y salta vertical.',
        'Jumping Jacks': 'Salta abriendo piernas y brazos, cierra de nuevo en posición inicial manteniendo ritmo.',
        'High Knees': 'Corre en sitio elevando rodillas a nivel de cadera, balanceando brazos para ritmo.',
        'Tuck Jumps': 'Salta llevando rodillas al pecho, aterriza suave y repite manteniendo core firme.',
        'Saludo al Sol': 'Secuencia fluida de posturas para estirar cadena posterior y fortalecer core.',
        'Perro Abajo': 'Desde 4 apoyos, eleva caderas y estira columna alargando talones hacia el suelo.',
        'Guerrero I': 'Gran paso adelante, flexiona rodilla delantera, brazos arriba y cadera neutral.',
        Árbol: 'Equilibrio sobre un pie, apoya otro en muslo opuesto y junta manos al pecho o arriba.',
        'Postura Niño': 'Siéntate sobre talones, baja torso apoyando frente y relaja brazos junto al cuerpo.',
        'Trote suave': 'Corre a ritmo cómodo, postura erguida y respiración controlada durante el tiempo designado.',
        'Intervalos velocidad': 'Alterna sprints de 30s con trote ligero de 30s para mejorar potencia.',
        Cuestas: 'Corre subiendo pendiente con paso controlado y baja trotando suave para recuperación.',
        'Stride largo': 'Da zancadas amplias, empuja con caderas y mantén torso erguido y mirada al frente.'
    };
}

// Mostrar rutina en el DOM
function mostrarRutina(rutina, contenedor) {
    contenedor.innerHTML = '';
    rutina.forEach(e => {
        const card = document.createElement('div');
        card.className = 'ejercicio-card';
        const detalle = e.tipo === 'reps'
        ? `<p><strong>Series:</strong> ${e.series}</p><p><strong>Reps:</strong> ${e.reps}</p>`
        : `<p><strong>Series:</strong> ${e.series}</p><p><strong>Tiempo:</strong> ${e.tiempo}s</p>`;
        card.innerHTML = `<h3>${e.nombre}</h3>${detalle}<p>${e.descripcion}</p>`;
        contenedor.appendChild(card);
    });
}
