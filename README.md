# GoldenKey Studios — Sitio de Portafolio (ES/EN)

Portafolio estático, bilingüe (ES por defecto, EN conmutables) y con 5 temas seleccionables.

## Estructura
```
/
├─ index.html
├─ manifest.json
├─ robots.txt
├─ sitemap.xml
└─ assets/
   ├─ css/styles.css
   ├─ js/app.js
   └─ img/* (logo, iconos, hero)
```

## Personalización
- Idioma por defecto: `localStorage.lang` o valor inicial en `app.js` (`state.lang`).
- Tema por defecto: atributo `data-theme` en `<html>` o `state.theme` en `app.js`.
- Proyectos: editar `state.apps` en `assets/js/app.js` (títulos/descripciones ES/EN).
- Email: en `index.html` (Contacto) usar `mailto:goldenkeystudios0@gmail.com`.
- Imagen OG: reemplazar `assets/img/og-cover.png` (1200×630).

## Despliegue
Sube la carpeta a Netlify/Vercel/Pages. Ajusta `sitemap.xml`/`robots.txt` con tu dominio real (actual: https://goldenkeystudios.netlify.app/).
