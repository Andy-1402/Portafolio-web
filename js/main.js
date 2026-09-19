/* ============================================================
   Portafolio Personal — Andy
   main.js — JavaScript Vanilla (sin librerías externas)
   Fase 1: estructura base e interacciones mínimas
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
   3. Muestras de color del Design System
   Pinta cada muestra leyendo el token real desde :root.
   ------------------------------------------------------------ */
function initColorSwatches() {
  const muestras = document.querySelectorAll('.ds-swatch__sample[data-token]');

  if (muestras.length === 0) return;

  const raiz = getComputedStyle(document.documentElement);

  muestras.forEach(function (muestra) {
    const token = muestra.getAttribute('data-token');
    const valor = raiz.getPropertyValue(token).trim();

    if (valor) muestra.style.backgroundColor = valor;
  });
}

/* ------------------------------------------------------------
   4. Año dinámico en el footer
   ------------------------------------------------------------ */
function initFooterYear() {
  const anio = new Date().getFullYear();

  document.querySelectorAll('.site-footer time').forEach(function (nodo) {
    nodo.textContent = String(anio);
    nodo.setAttribute('datetime', String(anio));
  });
}

/* ------------------------------------------------------------
   5. Arranque
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initContactForm();
  initColorSwatches();
  initFooterYear();
});
