// Metadatos de cada ejercicio: tipo, baseSeries, baseReps o baseTime(seg)
const metaEjercicios = {
    Flexiones:      { tipo: 'reps', baseSeries: 3, baseReps: 12 },
    Sentadillas:    { tipo: 'reps', baseSeries: 3, baseReps: 15 },
    Fondos:         { tipo: 'reps', baseSeries: 3, baseReps: 10 },
    Planchas:       { tipo: 'time', baseSeries: 3, baseTime: 30 },
    'Pull-ups':     { tipo: 'reps', baseSeries: 3, baseReps: 6 },

    Calentamiento:  { tipo: 'time', baseSeries: 1, baseTime: 600 },
    'Ciclismo a ritmo moderado': { tipo: 'time', baseSeries: 1, baseTime: 900 },
    Sprints:        { tipo: 'time', baseSeries: 5, baseTime: 20 },

    'Recuperación activa': { tipo: 'time', baseSeries: 5, baseTime: 60 },
    Enfriamiento:   { tipo: 'time', baseSeries: 1, baseTime: 300 },

    'Press de Banca': { tipo: 'reps', baseSeries: 4, baseReps: 8 },
    'Peso Muerto':     { tipo: 'reps', baseSeries: 4, baseReps: 6 },
    'Sentadilla con Barra': { tipo: 'reps', baseSeries: 4, baseReps: 10 },
    'Remo con Barra':  { tipo: 'reps', baseSeries: 3, baseReps: 10 },
    'Press Militar':   { tipo: 'reps', baseSeries: 3, baseReps: 8 },

    Burpees:       { tipo: 'reps', baseSeries: 4, baseReps: 10 },
    'Jumping Jacks': { tipo: 'time', baseSeries: 4, baseTime: 45 },
    'High Knees':    { tipo: 'time', baseSeries: 4, baseTime: 30 },
    'Tuck Jumps':    { tipo: 'reps', baseSeries: 3, baseReps: 12 },
    'Mountain Climbers': { tipo: 'time', baseSeries: 4, baseTime: 40 },

    'Saludo al Sol':       { tipo: 'time', baseSeries: 2, baseTime: 60 },
    'Perro Boca Abajo':     { tipo: 'time', baseSeries: 2, baseTime: 45 },
    'Guerrero I':          { tipo: 'time', baseSeries: 2, baseTime: 30 },
    Árbol:                 { tipo: 'time', baseSeries: 2, baseTime: 30 },
    'Postura del Niño':    { tipo: 'time', baseSeries: 1, baseTime: 120 },

    'Trote suave':        { tipo: 'time', baseSeries: 1, baseTime: 900 },
    'Intervalos de velocidad': { tipo: 'time', baseSeries: 6, baseTime: 30 },
    Cuestas:              { tipo: 'time', baseSeries: 5, baseTime: 45 },
    'Stride largo':       { tipo: 'time', baseSeries: 1, baseTime: 600 },
    'Enfriamiento caminando': { tipo: 'time', baseSeries: 1, baseTime: 300 },
};

const ejerciciosPorActividad = {
    calistenia: ['Flexiones','Sentadillas','Fondos','Planchas','Pull-ups','Mountain Climbers'],
    spinning: ['Calentamiento','Ciclismo a ritmo moderado','Sprints','Recuperación activa','Enfriamiento'],
    weightlifting: ['Press de Banca','Peso Muerto','Sentadilla con Barra','Remo con Barra','Press Militar'],
    hiit: ['Burpees','Jumping Jacks','High Knees','Tuck Jumps','Mountain Climbers'],
    yoga: ['Saludo al Sol','Perro Boca Abajo','Guerrero I','Árbol','Postura del Niño'],
    running: ['Trote suave','Intervalos de velocidad','Cuestas','Stride largo','Enfriamiento caminando'],
};

// Captura del form y generación de rutina personalizada

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('datosUsuario');
    const contenedor = document.getElementById('rutinaResultante');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const datos = {
            peso: +form.peso.value,
            altura: +form.altura.value,
            edad: +form.edad.value,
            actividad: form.actividad.value
        };

        const rutina = generarRutina(datos);
        mostrarRutina(rutina, contenedor);
    })
});

function generarRutina({ actividad, peso, edad }) {
    const lista = ejerciciosPorActividad[actividad] || [];
    const seleccion = lista.slice(0, 5);

    // Factores de ajuste: personas mayores hacen menos reps/time
    const factorEdad = edad > 60 ? 0.7 : edad > 40 ? 0.85 : 1;
    const factorPeso = peso > 85 ? 1.1 : peso < 60 ? 0.9 : 1;

    return seleccion.map(nombre => {
        const meta = metaEjercicios[nombre];
        if (!meta) return null;
        let { baseSeries, tipo } = meta;
        baseSeries = Math.max(1, Math.round(baseSeries * factorEdad));

        if (tipo === 'reps') {

            let reps = Math.round(meta.baseReps * factorEdad * factorPeso);
            return { nombre, tipo, series: baseSeries, reps, descripcion: obtenerDescripcion(nombre) };
        }
        // time
        let tiempo = Math.round(meta.baseTime * factorEdad * (factorPeso < 1 ? factorPeso : 1));
        return { nombre, tipo, series: baseSeries, tiempo, descripcion: obtenerDescripcion(nombre) };
    }).filter(Boolean);
}

function obtenerDescripcion(nombre) {
    // reutiliza el objeto desc previo
    const descs = obtenerDescMap();
    return descs[nombre] || 'Ejercicio para trabajar ' + nombre;
}

function obtenerDescMap() {
    return {
        Flexiones: 'Acuéstate boca abajo, apoya manos al ancho de hombros y empuja cuerpo hacia arriba con core firme.',
        // ... (misma lista de antes, omitida por brevedad) ...
        Planchas: 'Mantén posición de plancha apoyado en antebrazos con cuerpo en línea recta durante el tiempo indicado.',
        // completa para cada ejercicio según el objeto metaEjercicios
        };
    }

function mostrarRutina(rutina, contenedor) {
    contenedor.innerHTML = '';
    rutina.forEach(e => {
        const card = document.createElement('div');
        card.className = 'ejercicio-card';
        let detalle = e.tipo === 'reps'

        ? `<p><strong>Series:</strong> ${e.series}</p><p><strong>Reps:</strong> ${e.reps}</p>`
        : `<p><strong>Series:</strong> ${e.series}</p><p><strong>Tiempo:</strong> ${e.tiempo}s</p>`;

        card.innerHTML = `

        <h3>${e.nombre}</h3>
        ${detalle}
        <p>${e.descripcion}</p>
        `;
        contenedor.appendChild(card);
    });
}
