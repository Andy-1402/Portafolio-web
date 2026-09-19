# Portafolio Web Personal

Portafolio personal de Andy Chafla, estudiante de Ingeniería en Software en la Universidad Estatal de Milagro. El sitio reúne su perfil profesional, sus áreas de especialización y una selección de proyectos, con enfoque en arquitectura de sistemas, desarrollo backend y automatización de pruebas.

Está construido sin frameworks ni dependencias: solo HTML, CSS y JavaScript nativos.

## Tecnologías utilizadas

- **HTML5 semántico:** estructura basada en `header`, `nav`, `main`, `section`, `article` y `footer`, con atributos ARIA donde el marcado no basta por sí solo.
- **CSS Custom Properties:** un único conjunto de tokens en `:root` (color, tipografía, espaciado y radios) del que dependen todos los componentes. El tema claro se resuelve reescribiendo esos mismos tokens.
- **JavaScript Vanilla:** sin librerías externas.

Layout resuelto con **CSS Grid** (grillas de habilidades y proyectos) y **Flexbox** (navegación, tarjetas y formularios). Diseño responsive mediante media queries en 900px y 768px.

## Funcionalidades

- Navegación fija con menú desplegable táctil en móvil.
- Tema claro/oscuro con persistencia en `localStorage`, que respeta `prefers-color-scheme` cuando no hay preferencia guardada y evita el parpadeo inicial.
- Filtro de proyectos por categoría (Frontend, Backend/Fullstack, Testing).
- Validación del formulario de contacto con mensajes de error por campo.
- Página de sistema de diseño que documenta los tokens leyendo sus valores reales en tiempo de ejecución.

## Estructura del proyecto

```
Portafolio-web-personal/
├── index.html            # Página principal
├── design-system.html    # Documentación de tokens y componentes
├── css/
│   └── style.css         # Tokens, layout, componentes y responsive
├── js/
│   └── main.js           # Tema, filtro, menú, validación
└── assets/
    └── img/              # Imágenes del sitio
```

## Cómo visualizarlo

El sitio es estático, así que basta con abrir `index.html` en el navegador.

```bash
git clone https://github.com/Andy-1402/Portafolio-web.git
cd Portafolio-web
```

Para que el tema y el filtro funcionen igual que en producción conviene servirlo por HTTP, ya que algunos navegadores restringen `localStorage` sobre `file://`:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador. La página del sistema de diseño está en `http://localhost:8000/design-system.html`.

## Accesibilidad

- Todos los pares de color texto/fondo cumplen el contraste mínimo WCAG AA (4.5:1) en ambos temas.
- Navegación completa por teclado, con `:focus-visible` visible y enlace de salto al contenido principal.
- Áreas táctiles de 44px como mínimo en móvil.
- Las animaciones se desactivan bajo `prefers-reduced-motion`.

## Autor

**Andy Chafla** · [GitHub](https://github.com/Andy-1402) · [LinkedIn](https://www.linkedin.com/in/andy-chafla-635527258)
