/* ============================================================
   Portafolio Personal - Andy
   main.js - JavaScript Vanilla (sin librerías externas)
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   1. Menú de navegación responsive
   ------------------------------------------------------------ */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
    nav.classList.toggle('site-nav--open', !isOpen);
  });

  // Cierra el menú al elegir un enlace (útil en móvil).
  nav.addEventListener('click', function (event) {
    if (event.target.tagName !== 'A') return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    nav.classList.remove('site-nav--open');
  });
}

/* ------------------------------------------------------------
   2. Validación del formulario de contacto
   ------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('formulario-contacto');
  const status = document.getElementById('estado-formulario');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const campos = form.querySelectorAll('[required]');
    let esValido = true;

    campos.forEach(function (campo) {
      const error = document.getElementById('error-' + campo.id);
      const mensaje = campo.validity.valueMissing
        ? 'Este campo es obligatorio.'
        : campo.validity.typeMismatch
          ? 'Introduce un formato válido.'
          : '';

      if (error) error.textContent = mensaje;
      campo.setAttribute('aria-invalid', String(Boolean(mensaje)));

      if (mensaje) esValido = false;
    });

    if (!esValido) {
      if (status) status.textContent = 'Revisa los campos marcados antes de enviar.';
      return;
    }

    // Fase 1: sin backend. El envío real se conectará más adelante.
    if (status) status.textContent = 'Mensaje listo para enviar. Gracias por escribir.';
    form.reset();
  });
}

/* ------------------------------------------------------------
   3. Filtro de proyectos por categoría
   ------------------------------------------------------------ */
function initProjectFilter() {
  const contenedor = document.querySelector('.projects__filters');
  const estado = document.getElementById('estado-filtro');

  if (!contenedor) return;

  const botones = contenedor.querySelectorAll('.filter-btn');
  const tarjetas = document.querySelectorAll('.project-card');

  function aplicarFiltro(categoria) {
    let visibles = 0;

    tarjetas.forEach(function (tarjeta) {
      const coincide = categoria === 'all' || tarjeta.dataset.category === categoria;

      tarjeta.classList.toggle('is-hidden', !coincide);
      if (coincide) visibles += 1;
    });

    botones.forEach(function (boton) {
      boton.setAttribute('aria-pressed', String(boton.dataset.filter === categoria));
    });

    if (estado) {
      estado.textContent = visibles === 1
        ? 'Mostrando 1 proyecto.'
        : 'Mostrando ' + visibles + ' proyectos.';
    }
  }

  contenedor.addEventListener('click', function (event) {
    const boton = event.target.closest('.filter-btn');

    if (boton) aplicarFiltro(boton.dataset.filter);
  });

  aplicarFiltro('all');
}

/* ------------------------------------------------------------
   4. Tema claro / oscuro con persistencia en localStorage
   ------------------------------------------------------------ */
const CLAVE_TEMA = 'portafolio-tema';

function aplicarTema(tema) {
  const esClaro = tema === 'light';
  const boton = document.getElementById('theme-toggle');

  document.body.classList.toggle('light-theme', esClaro);

  if (boton) {
    boton.setAttribute('aria-pressed', String(esClaro));
    const etiqueta = boton.querySelector('.theme-toggle__label');
    if (etiqueta) etiqueta.textContent = esClaro ? 'Tema oscuro' : 'Tema claro';
  }

  pintarMuestrasDeColor();
}

/* Lee la preferencia guardada; si no hay ninguna, respeta la del sistema. */
function leerTemaGuardado() {
  let guardado = null;

  try {
    guardado = localStorage.getItem(CLAVE_TEMA);
  } catch (error) {
    guardado = null; // modo privado o almacenamiento bloqueado
  }

  if (guardado === 'light' || guardado === 'dark') return guardado;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function initThemeToggle() {
  aplicarTema(leerTemaGuardado());

  const boton = document.getElementById('theme-toggle');

  if (!boton) return;

  boton.addEventListener('click', function () {
    const nuevoTema = document.body.classList.contains('light-theme') ? 'dark' : 'light';

    aplicarTema(nuevoTema);

    try {
      localStorage.setItem(CLAVE_TEMA, nuevoTema);
    } catch (error) {
      // Si no se puede persistir, el tema sigue funcionando en esta sesión.
    }
  });
}

/* ------------------------------------------------------------
   5. Muestras de color del Design System
   Pinta cada muestra y escribe su valor leyendo el token real.
   Se vuelve a ejecutar al cambiar de tema para que la documentación
   refleje siempre los colores vigentes.
   ------------------------------------------------------------ */
function pintarMuestrasDeColor() {
  const muestras = document.querySelectorAll('.ds-swatch__sample[data-token]');

  if (muestras.length === 0) return;

  // Los tokens del tema claro se declaran sobre body, no sobre :root.
  const estilos = getComputedStyle(document.body);

  muestras.forEach(function (muestra) {
    const token = muestra.getAttribute('data-token');
    const valor = estilos.getPropertyValue(token).trim();

    if (!valor) return;

    muestra.style.backgroundColor = valor;

    const salida = muestra.closest('.ds-swatch').querySelector('.ds-swatch__value code');
    if (salida) salida.textContent = valor;
  });
}

/* ------------------------------------------------------------
   6. Año dinámico en el footer
   ------------------------------------------------------------ */
function initFooterYear() {
  const anio = new Date().getFullYear();

  document.querySelectorAll('.site-footer time').forEach(function (nodo) {
    nodo.textContent = String(anio);
    nodo.setAttribute('datetime', String(anio));
  });
}

/* ------------------------------------------------------------
   7. Arranque
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
  initNavToggle();
  initContactForm();
  initProjectFilter();
  pintarMuestrasDeColor();
  initFooterYear();
});
