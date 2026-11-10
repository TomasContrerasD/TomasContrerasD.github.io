# Sitio personal de Tomás Contreras

Sitio personal en español con una portada que permite elegir entre soluciones para empresas y mentoría 1:1. Sitio estático compatible con GitHub Pages, sin dependencias ni compilación.

## Estructura

- `index.html`: saludo «Hola, ¿en qué te puedo ayudar?» y dos botones hacia empresas y mentoría 1:1, sin foto ni biografía.
- `empresas.html`: página original, con el relato dividido en nueve secciones, metodología y contacto.
- `mentoria.html`: mentoría para construir una carrera en datos, con historia personal, temas de trabajo, público, proceso, dos alternativas y contacto.
- `assets/css/mentoria.css`: ajustes exclusivos de mentoría para la presentación, los precios y el espacio del formulario.
- `assets/css/style.css`: diseño adaptable a escritorio y móvil; contempla movimiento reducido.
- `assets/js/main.js`: año del pie de página y aparición gradual del contenido al avanzar. El contenido, la navegación y el contacto funcionan sin JavaScript.
- `assets/js/hero-network.js`: fondo de nodos y conexiones en la presentación, con reacción al cursor. La animación se pausa fuera de pantalla y respeta la preferencia de movimiento reducido.
- `assets/fonts/`: fuentes locales Manrope y Kalam con sus licencias abiertas.
- `assets/img/1.jpg`: fotografía original.
- `assets/img/monogram.svg`: favicon ligero.
- `projects/**/index.html`: redirecciones de las antiguas páginas hacia la historia en `empresas.html`.
- `files/`: CV en español e inglés, enlazados desde las banderas del header.

## Vista local

Desde esta carpeta:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:8000`. También es posible abrir `index.html` directamente.

## Contenido y contacto

El relato usa una columna de lectura continua, títulos discretos y listas. El diseño combina azul y celeste, pequeños acentos amarillos y sombras suaves. Manrope se utiliza para la presentación, los títulos, la metodología y el contacto; Kalam aporta una letra manuscrita legible a la narración. Ambas fuentes se sirven localmente y sus licencias están en `assets/fonts/`.

Edita el saludo y los dos botones en `index.html`, el texto de empresas en `empresas.html` y el de mentoría en `mentoria.html`. Puedes agregar o quitar párrafos y secciones según necesites. El texto de mentoría conserva el relato proporcionado y presenta una sesión de 90 minutos por $35.000 CLP, o una sesión inicial de 90 minutos más dos seguimientos de 60 minutos por $90.000 CLP. La primera conversación de 15 minutos es gratuita.

Los botones «Cuéntame tu caso» y «Quiero contar mi caso», junto con el enlace en «¿Cómo funciona?», abren el formulario externo de mentoría en una pestaña nueva: https://form.jotform.com/263127289879071. El correo sigue habilitado como alternativa para contar cada caso.

Las dos páginas de servicios comparten los estilos y las animaciones de la página original. Sus headers permiten volver al inicio, cambiar de página o ir a `#contacto`; el nombre en el header y footer también vuelve al inicio. El botón «Correo» y el correo del cierre abren el cliente de correo; el asunto distingue empresas de mentoría.

La sección de contacto contiene botones de Correo y LinkedIn con sus iconos, y la dirección de correo debajo. El footer muestra el nombre y el año.

La metodología contempla entender el negocio, construir soluciones y transferirlas al equipo o continuar acompañándolo según sus necesidades.

La cifra de más de 50 horas de trabajo manual liberadas al mes y el cargo actual de Data Analyst en BHP corresponden al contenido proporcionado por Tomás para esta versión.

El CSS lleva un parámetro de versión en su URL para que esta actualización no reutilice los estilos anteriores en caché. Al modificar el diseño en futuras versiones, actualizar ese parámetro.

Estos archivos son el resultado local. Su publicación se realiza mediante la configuración de GitHub Pages del repositorio; editar aquí no publica automáticamente los cambios.
