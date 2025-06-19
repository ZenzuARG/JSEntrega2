// ----- 1. Datos y Local Storage -----
const STORAGE_KEY = 'rutinaEntrenamiento';
let rutina = [];

// Cargar desde storage al iniciar
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    rutina = JSON.parse(saved);
  }
  renderRutina();
});

// ----- 2. Selección de elementos DOM -----
const form = document.getElementById('exercise-form');
const listEl = document.getElementById('exercise-list');
const clearBtn = document.getElementById('clear-all');

// ----- 3. Eventos -----

// 3.1 Al enviar el formulario: agregar ejercicio
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const sets = parseInt(document.getElementById('sets').value, 10);
  const reps = parseInt(document.getElementById('reps').value, 10);
  if (!name || sets < 1 || reps < 1) return;

  // Crear objeto ejercicio
  const ejercicio = { id: Date.now(), name, sets, reps };
  rutina.push(ejercicio);
  saveAndRender();

  form.reset();
});

// 3.2 Al hacer click en “Eliminar” de un ejercicio
listEl.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
    const id = Number(e.target.dataset.id);
    rutina = rutina.filter(ex => ex.id !== id);
    saveAndRender();
  }
});

// 3.3 Vaciar toda la rutina
clearBtn.addEventListener('click', () => {
  rutina = [];
  saveAndRender();
});

// ----- 4. Funciones de lógica -----

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rutina));
  renderRutina();
}

function renderRutina() {
  listEl.innerHTML = '';
  if (rutina.length === 0) {
    listEl.innerHTML = '<li>No hay ejercicios agregados.</li>';
    return;
  }
  rutina.forEach(ex => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${ex.name} — ${ex.sets} × ${ex.reps}</span>
      <button data-id="${ex.id}">X</button>
    `;
    listEl.appendChild(li);
  });
}
