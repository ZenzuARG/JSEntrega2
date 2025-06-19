document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('datosUsuario');
  const contenedor = document.getElementById('rutinaResultante');

  form.addEventListener('submit', event => {
    event.preventDefault();

    // Leer datos
    const datos = {
      peso: +form.peso.value,
      altura: +form.altura.value,
      edad: +form.edad.value,
      actividad: form.actividad.value,
      series: +form.series.value,
      repeticiones: +form.repeticiones.value,
    };

    // Guardar en localStorage
    localStorage.setItem('usuarioDatos', JSON.stringify(datos));

    // Generar y mostrar rutina
    const rutina = generarRutina(datos);
    mostrarRutina(rutina, contenedor);
  });
});

// Mejora de la lógica de generación
function generarRutina({ actividad, series, repeticiones, peso, edad }) {
  // Map de ejercicios con dificultad según edad o peso
  const base = {
    calistenia: ['Flexiones', 'Sentadillas', 'Fondos'],
    spinning: ['Calentamiento', 'Intervalos', 'Enfriamiento'],
    weightlifting: ['Press de Banca', 'Peso Muerto', 'Sentadilla con Barra'],
  };
  
  // Ajustar repeticiones según edad/peso (ejemplo simple)
  const factorEdad = edad > 50 ? 0.8 : 1;
  const factorPeso = peso > 80 ? 1.1 : 1;

  return base[actividad].map(nombre => ({
    nombre,
    series,
    repeticiones: Math.round(repeticiones * factorEdad * factorPeso),
    descripcion: obtenerDescripcion(nombre, actividad)
  }));
}

// Descripciones más ricas
function obtenerDescripcion(ejercicio, actividad) {
  const desc = {
    Flexiones: 'Empuja tu cuerpo hacia arriba con tus brazos, mantén el core firme.',
    Sentadillas: 'Baja flexionando rodillas, mantén la espalda recta y vuelve a subir.',
    Fondos: 'Apoya las manos en un banco y baja el cuerpo flexionando codos.',
    Calentamiento: 'Pedalea a ritmo suave para elevar gradualmente tu frecuencia cardíaca.',
    Intervalos: 'Alterna entre alta y baja intensidad para mejorar tu resistencia.',
    Enfriamiento: 'Reduce el ritmo para normalizar tu pulso y estirar ligeramente.',
    'Press de Banca': 'Empuja la barra hacia arriba desde el pecho, controla el movimiento.',
    'Peso Muerto': 'Levanta la barra desde el suelo con la espalda recta y piernas firmes.',
    'Sentadilla con Barra': 'Coloca la barra en la espalda alta, baja con rodillas alineadas.'
  };
  return desc[ejercicio] || `Ejercicio de ${actividad}: ${ejercicio}.`;
}

// Inyecta la rutina en el DOM
function mostrarRutina(rutina, contenedor) {
  contenedor.innerHTML = '';
  rutina.forEach(e => {
    const card = document.createElement('div');
    card.className = 'ejercicio-card';
    card.innerHTML = `
      <h3>${e.nombre}</h3>
      <p><strong>Series:</strong> ${e.series}</p>
      <p><strong>Repeticiones:</strong> ${e.repeticiones}</p>
      <p>${e.descripcion}</p>
    `;
    contenedor.appendChild(card);
  });
}
