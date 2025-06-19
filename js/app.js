// Metadatos de cada ejercicio con tipo (reps/time), series y repeticiones/tiempo base
const metaEjercicios = {
    Flexiones:              { tipo: 'reps', baseSeries: 3, baseReps: 12 },
    Sentadillas:            { tipo: 'reps', baseSeries: 3, baseReps: 15 },
    Fondos:                 { tipo: 'reps', baseSeries: 3, baseReps: 10 },
    Planchas:               { tipo: 'time', baseSeries: 3, baseTime: 30 },
    'Pull-ups':             { tipo: 'reps', baseSeries: 3, baseReps: 6 },
    'Mountain Climbers':    { tipo: 'time', baseSeries: 3, baseTime: 40 },
    Calentamiento:          { tipo: 'time', baseSeries: 1, baseTime: 600 },
    'Ciclismo moderado':    { tipo: 'time', baseSeries: 1, baseTime: 900 },
    Sprints:                { tipo: 'time', baseSeries: 5, baseTime: 20 },
    'Recuperación':         { tipo: 'time', baseSeries: 5, baseTime: 60 },
    Enfriamiento:           { tipo: 'time', baseSeries: 1, baseTime: 300 },
    'Press de Banca':       { tipo: 'reps', baseSeries: 4, baseReps: 8 },
    'Peso Muerto':          { tipo: 'reps', baseSeries: 4, baseReps: 6 },
    'Sentadilla Barra':     { tipo: 'reps', baseSeries: 4, baseReps: 10 },
    'Remo Barra':           { tipo: 'reps', baseSeries: 3, baseReps: 10 },
    'Press Militar':        { tipo: 'reps', baseSeries: 3, baseReps: 8 },
    Burpees:                { tipo: 'reps', baseSeries: 4, baseReps: 10 },
    'Jumping Jacks':        { tipo: 'time', baseSeries: 4, baseTime: 45 },
    'High Knees':           { tipo: 'time', baseSeries: 4, baseTime: 30 },
    'Tuck Jumps':           { tipo: 'reps', baseSeries: 3, baseReps: 12 },
    'Saludo al Sol':        { tipo: 'time', baseSeries: 2, baseTime: 60 },
    'Perro Abajo':          { tipo: 'time', baseSeries: 2, baseTime: 45 },
    'Guerrero I':           { tipo: 'time', baseSeries: 2, baseTime: 30 },
    Árbol:                  { tipo: 'time', baseSeries: 2, baseTime: 30 },
    'Postura Niño':         { tipo: 'time', baseSeries: 1, baseTime: 120 },
    'Trote suave':          { tipo: 'time', baseSeries: 1, baseTime: 900 },
    'Intervalos velocidad': { tipo: 'time', baseSeries: 6, baseTime: 30 },
    Cuestas:                { tipo: 'time', baseSeries: 5, baseTime: 45 },
    'Stride largo':         { tipo: 'time', baseSeries: 1, baseTime: 600 }
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
        Flexiones: 'Colócate boca abajo con las manos apoyadas ligeramente más anchas que los hombros. Activa el core, baja el cuerpo manteniendo la espalda recta hasta que el pecho quede a pocos centímetros del suelo, y empuja de forma explosiva exhalando para volver a la posición inicial. Mantén los codos en un ángulo de 45° respecto al torso.',
        Sentadillas: 'Párate con los pies separados al ancho de caderas, apuntando ligeramente hacia afuera. Inhala y empuja las caderas hacia atrás como si te sentaras en una silla, manteniendo el pecho erguido y las rodillas alineadas con los pies. Baja hasta que los muslos estén paralelos al suelo y regresa exhalando con fuerza de piernas.',
        Fondos: 'Coloca las manos en un banco o silla detrás de ti, extiende las piernas y apoya los talones. Baja el cuerpo flexionando los codos hacia atrás, mantén los hombros bajos y el torso cerca del banco, y empuja hasta extender completamente los brazos.',
        Planchas: 'Apoya los antebrazos y las puntas de los pies en el suelo. Alinea cabeza, espalda y piernas en línea recta, activa el abdomen y glúteos, y sostiene la posición sin levantar ni hundir las caderas. Respira de forma controlada durante todo el ejercicio.',
        'Pull-ups': 'Agarra la barra con las palmas mirando hacia adelante y separadas al ancho de hombros. Cuelga con los brazos totalmente extendidos, retrae los omóplatos y tira con fuerza hasta que la barbilla sobrepase la barra. Baja controlando el movimiento hasta la extensión total de brazos.',
        'Mountain Climbers': 'Colócate en posición de plancha alta con manos bajo hombros. Lleva alternativamente cada rodilla hacia el pecho de forma rápida, manteniendo los glúteos bajos y el core firme. Mantén muñecas, hombros y caderas alineados.',
        Calentamiento: 'Camina o pedalea a ritmo suave unos minutos para calentar articulaciones y elevar ligeramente la frecuencia cardíaca. Incorpora movimientos de brazos y piernas de forma pausada para preparar el cuerpo.',
        'Ciclismo moderado': 'Mantén una cadencia estable entre 60-80 RPM, posición de torso neutra y mirada al frente. Pedalea suave durante 10-15 minutos, evitando tensar cuello o hombros.',
        Sprints: 'Ejecuta intervalos de 20 segundos de máxima intensidad, empujando fuerte con las piernas y balanceando brazos, seguido de 40 segundos de pedaleo muy suave para recuperar antes del siguiente sprint.',
        Recuperación: 'Pedalea a ritmo muy suave, manteniendo movimientos amplios y controlando la respiración para ayudar a eliminar ácido láctico y bajar el pulso.',
        Enfriamiento: 'Reduce progresivamente la intensidad y dedica 5-10 minutos a estirar suavemente los principales grupos musculares, concentrándote en respiraciones profundas.',
        'Press de Banca': 'Acuéstate en banco, pies firmes en el suelo. Agarra la barra al ancho de hombros, baja controladamente hasta el pecho inhalando y empuja explosivamente exhalando. Mantén muñecas firmes y hombros retraídos.',
        'Peso Muerto': 'Párate con pies al ancho de caderas, barra cerca de las espinillas. Flexiona caderas y rodillas manteniendo espalda neutra, agarra la barra y levanta empujando con caderas y piernas, extendiendo completamente. Desciende controlado.',
        'Sentadilla Barra': 'Coloca la barra sobre la parte alta de la espalda, pies al ancho de caderas. Baja empujando caderas atrás, mantén rodillas alineadas y torso erguido. Extiende caderas y rodillas para volver arriba.',
        'Remo Barra': 'Inclina el torso hacia adelante manteniendo espalda recta, piernas ligeramente flexionadas. Tira de la barra hacia el estómago apretando omóplatos, baja controlado hasta brazos extendidos.',
        'Press Militar': 'Siéntate o párate con la barra o mancuernas a la altura de hombros. Empuja verticalmente hasta estirar brazos inhalando al bajar y exhalando al subir, manteniendo core firme.',
        Burpees: 'Desde parado, baja a cuclillas, apoya manos en el suelo, salta a posición de plancha, realiza una flexión, vuelve a cuclillas y salta vertical con brazos arriba. Flujo continuo.',
        'Jumping Jacks': 'Salta abriendo piernas y levantando brazos por encima de la cabeza, luego vuelve a posición inicial juntando piernas y brazos junto al cuerpo con movimiento controlado.',
        'High Knees': 'Corre en el lugar elevando rodillas hasta la altura de la cadera, mantén espalda recta y balancea brazos para impulsar el movimiento.',
        'Tuck Jumps': 'Salta verticalmente llevando las rodillas al pecho, aterriza suavemente con rodillas ligeramente flexionadas y repite de forma explosiva.',
        'Saludo al Sol': 'Secuencia de posturas fluida: comienza en posición de pie, lleva manos arriba, flexiona hacia adelante, plancha baja a cobra y perro abajo, retorna paso a paso.',
        'Perro Abajo': 'Desde cuatro apoyos, eleva caderas formando una V invertida, alarga columna y empuja talones hacia el suelo, hombros alejados de orejas.',
        'Guerrero I': 'Da un gran paso adelante con una pierna, flexiona 90° y extiende la otra atrás, brazos arriba y cadera nivelada, mirada al frente.',
        Árbol: 'Equilibra tu cuerpo apoyando un pie en muslo interno contrario, junta manos frente al pecho o estíralas hacia arriba, mantén mirada fija.',
        'Postura Niño': 'Desde rodillas, apoya glúteos sobre talones y estira brazos hacia adelante o al costado, relajando hombros y respirando profundamente.',
        'Trote suave': 'Corre a un ritmo cómodo que te permita mantener conversación, brazos relajados, pisada suave y mirada al frente.',
        'Intervalos velocidad': 'Alterna sprints de 30 segundos con trote suave de 30 segundos para mejorar resistencia y velocidad.',
        Cuestas: 'Corre colina arriba enfocándote en impulso de caderas y zancada controlada, recupera bajando trotando suave.',
        'Stride largo': 'Realiza zancadas más amplias de lo habitual, empujando con caderas y aterrizando con el talón de forma controlada para fortalecer glúteos y cuádriceps.'
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
