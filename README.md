# Sitio personal de Tomás Contreras

Sitio personal en español con una presentación inicial y un relato dividido por títulos sobre mi historia, mi visión del trabajo con datos y cómo puedo ayudar a las empresas. Sitio estático compatible con GitHub Pages, sin dependencias ni compilación.

## Estructura

- `index.html`: presentación personal y el nuevo storytelling íntegro, dividido en diez partes, con metodología y contacto.
- `assets/css/style.css`: diseño adaptable a escritorio y móvil; contempla movimiento reducido.
- `assets/js/main.js`: año del pie de página y sección activa en la navegación. El contenido, la navegación y el contacto funcionan sin JavaScript.
- `assets/js/hero-network.js`: fondo de nodos y conexiones en la presentación, con reacción al cursor. La animación se pausa fuera de pantalla y respeta la preferencia de movimiento reducido.
- `assets/img/1.jpg`: fotografía original.
- `assets/img/monogram.svg`: favicon ligero.
- `projects/**/index.html`: redirecciones de las antiguas páginas hacia la historia principal.
- `files/`: CV originales conservados como archivos, fuera de la navegación principal.

## Vista local

Desde esta carpeta:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:8000`. También es posible abrir `index.html` directamente.

## Contenido y contacto

El relato usa una columna de lectura sencilla, títulos y listas. Se prioriza revisar el mensaje antes de trabajar el diseño. El texto se edita directamente en `index.html`. Los enlaces del menú apuntan a `#mi-historia`, `#como-puedo-ayudar` y `#contacto`. El botón «Conversemos» y el correo del cierre abren el cliente de correo.

La cifra de más de 50 horas de trabajo manual liberadas al mes y el cargo actual de Data Analyst en BHP corresponden al contenido proporcionado por Tomás para esta versión.

El CSS lleva un parámetro de versión en su URL para que esta actualización no reutilice los estilos anteriores en caché. Al modificar el diseño en futuras versiones, actualizar ese parámetro.

Estos archivos son el resultado local. Su publicación se realiza mediante la configuración de GitHub Pages del repositorio; editar aquí no publica automáticamente los cambios.
