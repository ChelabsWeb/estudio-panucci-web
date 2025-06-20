# Estudio Panucci - P?gina Web Moderna

## ? Descripci?n

P?gina web moderna y responsiva para Estudio Panucci, una empresa especializada en servicios contables profesionales con m?s de 20 a?os de experiencia en Uruguay.

## ? Caracter?sticas

- **Dise?o Moderno**: Interfaz limpia y profesional con border-radius de 9px en todos los elementos
- **Totalmente Responsivo**: Optimizado para dispositivos m?viles, tablets y desktop
- **Carrusel Interactivo**: Hero section con carrusel de im?genes autom?tico y navegaci?n manual
- **Animaciones Suaves**: Efectos de scroll y transiciones con CSS moderno
- **Google Maps Integrado**: Mapa interactivo con la ubicaci?n del estudio
- **Formulario de Contacto**: Sistema de contacto con validaci?n en tiempo real
- **SEO Optimizado**: Meta tags y estructura sem?ntica
- **Carga R?pida**: Optimizado para rendimiento

## ? Secciones

1. **Hero Section**: Carrusel con llamadas a la acci?n
2. **Servicios**: Grid de servicios con iconos y descripciones
3. **Sobre Nosotros**: Informaci?n de la empresa y equipo
4. **Contacto**: Formulario y informaci?n de contacto con Google Maps
5. **Footer**: Enlaces y redes sociales

## ?? Tecnolog?as Utilizadas

- **HTML5**: Estructura sem?ntica
- **CSS3**: Estilos modernos con variables CSS y Flexbox/Grid
- **JavaScript**: Funcionalidad interactiva vanilla JS
- **Font Awesome**: Iconos
- **Google Fonts**: Tipograf?a Inter
- **Google Maps API**: Mapa interactivo

## ? Deploy

Esta p?gina est? configurada para funcionar con GitHub Pages. Para activar el deploy:

1. Ve a Settings del repositorio
2. Scroll hasta "Pages"
3. En "Source" selecciona "Deploy from a branch"
4. Selecciona "main" como branch
5. Deja "/" (root) como folder
6. Haz click en "Save"

La p?gina estar? disponible en: `https://chelabsweb.github.io/estudio-panucci-web/`

## ? Estructura del Proyecto

```
estudio-panucci-web/
??? index.html          # P?gina principal
??? styles.css          # Estilos CSS
??? script.js           # JavaScript funcional
??? assets/             # Im?genes y media
?   ??? logo-panucci.png
?   ??? hero1.jpg
?   ??? hero2.jpg
?   ??? hero3.jpg
?   ??? team1.jpg
?   ??? team2.jpg
?   ??? team3.jpg
?   ??? team4.jpg
??? README.md           # Documentaci?n
```

## ? Configuraci?n

### Google Maps API

Para que el mapa funcione correctamente:

1. Obt?n una API key de Google Cloud Console
2. Habilita la Maps JavaScript API
3. Reemplaza `YOUR_API_KEY` en `index.html` l?nea 211
4. Ajusta las coordenadas en `script.js` l?nea 308 si es necesario

### Im?genes

Coloca las siguientes im?genes en la carpeta `assets/`:

- `logo-panucci.png` - Logo del estudio
- `hero1.jpg`, `hero2.jpg`, `hero3.jpg` - Im?genes para el carrusel (1920x1080px recomendado)
- `team1.jpg`, `team2.jpg`, `team3.jpg`, `team4.jpg` - Fotos del equipo (300x300px recomendado)

## ? Caracter?sticas de Dise?o

- **Border Radius**: Todos los elementos usan 9px de border-radius
- **Colores**: Paleta profesional en azules (#2c5aa0, #1e3d5c, #3498db)
- **Tipograf?a**: Inter para una apariencia moderna
- **Animaciones**: Suaves y profesionales
- **Responsivo**: Breakpoints en 768px y 480px

## ? Compatibilidad

- ? Chrome 60+
- ? Firefox 60+
- ? Safari 12+
- ? Edge 79+
- ? iOS Safari 12+
- ? Android Chrome 60+

## ? Actualizaciones

Para actualizar el contenido:

1. Edita `index.html` para cambios de texto o estructura
2. Modifica `styles.css` para cambios de dise?o
3. Actualiza `script.js` para cambios de funcionalidad
4. Reemplaza im?genes en `assets/` manteniendo los nombres

## ? Soporte

Para soporte t?cnico o modificaciones, contacta al desarrollador.

## ? Licencia

? 2024 Estudio Panucci. Todos los derechos reservados.

---

**Desarrollado con ?? para Estudio Panucci**