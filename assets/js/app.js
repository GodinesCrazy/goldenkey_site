// ======= State & i18n =======
const state = {
  theme: localStorage.getItem('theme') || 'onyx',
  lang: localStorage.getItem('lang') || 'es',
  apps: [
    {
      id: 'astrodia',
      nombre: { es: 'AstroDía', en: 'AstroDay' },
      descripcion: {
        es: 'Horóscopos diarios con animaciones, música y monetización con AdMob.',
        en: 'Daily horoscopes with animations, music, and AdMob monetization.'
      },
      plataformas: ['android'],
      tags: ['Contenido', 'Animaciones', 'Monetización'],
      links: { play: '#', repo: '#' }
    },
    {
      id: 'rovecast',
      nombre: { es: 'RoveCast', en: 'RoveCast' },
      descripcion: {
        es: 'Radio online global: favoritos, temporizador, Chromecast y anuncios controlados.',
        en: 'Global online radio: favorites, sleep timer, Chromecast and gentle ads.'
      },
      plataformas: ['android', 'web'],
      tags: ['Streaming', 'Chromecast', 'AdMob'],
      links: { play: '#', repo: '#' }
    },
    {
      id: 'chistazo',
      nombre: { es: 'Chistazo Diario', en: 'Daily Chuckles' },
      descripcion: {
        es: 'Chistes por categorías, API y modo sin conexión, interstitials éticos.',
        en: 'Jokes by category, API and offline mode, with ethical interstitials.'
      },
      plataformas: ['android'],
      tags: ['API', 'Share', 'AdMob'],
      links: { play: '#', repo: '#' }
    },
    {
      id: 'gemas',
      nombre: { es: 'Gemas Místicas', en: 'Mystic Gems' },
      descripcion: {
        es: 'Match-3 con bombas, cascadas y efectos; arte estilo candy world.',
        en: 'Match-3 with bombs, cascades and effects; candy-world art style.'
      },
      plataformas: ['game', 'android'],
      tags: ['Juego', 'FX', 'Optimización'],
      links: { play: '#', repo: '#' }
    },
    {
      id: 'maya',
      nombre: { es: 'Maya Adventure', en: 'Maya Adventure' },
      descripcion: {
        es: 'Plataformas 2D, controles táctiles, arte pixel y niveles progresivos.',
        en: '2D platformer, touch controls, pixel art and progressive levels.'
      },
      plataformas: ['game', 'android'],
      tags: ['Pixel Art', 'Platformer'],
      links: { play: '#', repo: '#' }
    },
    {
      id: 'greenmate',
      nombre: { es: 'GreenMate', en: 'GreenMate' },
      descripcion: {
        es: 'Asistente de cultivo hidropónico con IA y sensores (app companion).',
        en: 'Hydroponic growing assistant with AI and sensors (companion app).'
      },
      plataformas: ['android', 'web'],
      tags: ['IoT', 'AI'],
      links: { play: '#', repo: '#' }
    },
    {
      id: 'tiradamistica',
      nombre: { es: 'Tirada Mística', en: 'Mystic Draw' },
      descripcion: {
        es: 'Tarot diario con baraja personalizada, animaciones y diseño místico.',
        en: 'Daily tarot with custom deck, animations and mystical design.'
      },
      plataformas: ['android'],
      tags: ['Tarot', 'Animaciones'],
      links: { play: '#', repo: '#' }
    }
  ]
};

const i18n = {
  es: {
    'nav.apps': 'Apps',
    'nav.services': 'Servicios',
    'nav.about': 'Sobre nosotros',
    'nav.contact': 'Contacto',
    'cta.talk': 'Hablemos',
    'hero.kicker': 'Estudio de producto',
    'hero.title': 'Creamos <span class="accent">apps</span> y <span class="accent">juegos</span> que la gente ama.',
    'hero.lede': 'Android nativo, juegos 2D y soluciones con IA. Performance real, monetización ética y diseño impecable.',
    'hero.seeProjects': 'Ver proyectos',
    'hero.downloadCV': 'Descargar dossier',
    'stats.apps': 'Apps publicadas',
    'stats.years': 'Años creando',
    'stats.rating': 'Valoración media',
    'apps.title': 'Apps destacadas',
    'filters.all': 'Todas',
    'filters.game': 'Juego',
    'services.title': 'Servicios',
    'services.android.title': 'Desarrollo Android',
    'services.android.desc': 'Apps nativas (Java/Kotlin), arquitectura limpia (MVVM), APIs, AdMob y publicación en Google Play.',
    'services.android.li1': 'Rendimiento y accesibilidad',
    'services.android.li2': 'Monetización ética',
    'services.android.li3': 'Automatización de builds y testing',
    'services.games.title': 'Juegos 2D',
    'services.games.desc': 'Match-3, plataformas y casual. Efectos, audio y arte coherente con la marca.',
    'services.games.li1': 'Core loops y progresión',
    'services.games.li2': 'Analítica y LiveOps',
    'services.games.li3': 'Optimización de performance',
    'services.web.title': 'Sitios & Landing',
    'services.web.desc': 'Sitios ultra-rápidos y accesibles. SEO técnico, analítica y despliegue en Vercel/Netlify.',
    'services.web.li1': 'Core Web Vitals',
    'services.web.li2': 'Diseño responsivo',
    'services.web.li3': 'Microinteracciones',
    'services.ai.title': 'Integración de IA',
    'services.ai.desc': 'Asistentes, automatizaciones y pipelines con OpenAI/Google, prompts y guardrails.',
    'services.ai.li1': 'Evaluación y A/B',
    'services.ai.li2': 'Agentes multi-herramienta',
    'services.ai.li3': 'Seguridad y privacidad',
    'about.title': 'Sobre nosotros',
    'about.body': 'Somos <strong>GoldenKey Studios</strong>, un estudio en Chile. Diseñamos y construimos productos móviles y juegos con obsesión por el detalle: cargas mínimas, animaciones fluidas y UX clara. También nos encargamos de monetización y publicación.',
    'about.availability': 'Disponibilidad',
    'about.recogTitle': 'Reconocimientos',
    'about.recog1': '⭐ Apps destacadas en la comunidad',
    'about.recog2': '🚀 Lanzamientos con 4.7★ promedio',
    'about.recog3': '📈 Crecimiento continuo de usuarios',
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Tienes un proyecto en mente? Hablemos.',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar'
    'app.storeLink': 'Ver en tienda',
    'app.repoLink': 'Repositorio',
    'app.searchPlaceholder': 'Buscar apps...',
    'app.iconAlt': 'Icono de {appName}'
  },
  en: {
    'nav.apps': 'Apps',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'cta.talk': "Let's talk",
    'hero.kicker': 'Product studio',
    'hero.title': 'We craft <span class="accent">apps</span> and <span class="accent">games</span> people love.',
    'hero.lede': 'Native Android, 2D games and AI solutions. Real performance, ethical monetization and polished design.',
    'hero.seeProjects': 'See projects',
    'hero.downloadCV': 'Download dossier',
    'stats.apps': 'Published apps',
    'stats.years': 'Years building',
    'stats.rating': 'Average rating',
    'apps.title': 'Featured apps',
    'filters.all': 'All',
    'filters.game': 'Game',
    'services.title': 'Services',
    'services.android.title': 'Android Development',
    'services.android.desc': 'Native apps (Java/Kotlin), clean architecture (MVVM), APIs, AdMob and Play Store publishing.',
    'services.android.li1': 'Performance & accessibility',
    'services.android.li2': 'Ethical monetization',
    'services.android.li3': 'Build automation & testing',
    'services.games.title': '2D Games',
    'services.games.desc': 'Match-3, platformers and casual. Effects, audio and brand-coherent art.',
    'services.games.li1': 'Core loops & progression',
    'services.games.li2': 'Analytics & LiveOps',
    'services.games.li3': 'Performance optimization',
    'services.web.title': 'Web & Landing',
    'services.web.desc': 'Ultra-fast accessible sites. Technical SEO, analytics and deploys on Vercel/Netlify.',
    'services.web.li1': 'Core Web Vitals',
    'services.web.li2': 'Responsive design',
    'services.web.li3': 'Micro-interactions',
    'services.ai.title': 'AI Integration',
    'services.ai.desc': 'Assistants, automations and pipelines with OpenAI/Google, prompts and guardrails.',
    'services.ai.li1': 'Evaluation & A/B',
    'services.ai.li2': 'Tool-using agents',
    'services.ai.li3': 'Security & privacy',
    'about.title': 'About',
    'about.body': 'We are <strong>GoldenKey Studios</strong>, based in Chile. We design and build mobile products and games with a detail-obsessed approach: fast loads, smooth animations and clear UX. We also handle monetization and store publishing.',
    'about.availability': 'Availability',
    'about.recogTitle': 'Highlights',
    'about.recog1': '⭐ Community-featured apps',
    'about.recog2': '🚀 Launches with 4.7★ average',
    'about.recog3': '📈 Ongoing user growth',
    'contact.title': 'Contact',
    'contact.subtitle': "Got a project in mind? Let’s talk.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send'
    'app.storeLink': 'Store page',
    'app.repoLink': 'Repository',
    'app.searchPlaceholder': 'Search apps...',
    'app.iconAlt': 'Icon for {appName}'
  }
};

// ======= Helpers =======
const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => Array.from(ctx.querySelectorAll(q));

const getI18n = (key, replacements = {}) => {
  let text = i18n[state.lang][key] || i18n['es'][key] || key;
  for (const [placeholder, value] of Object.entries(replacements)) {
    text = text.replace(`{${placeholder}}`, value);
  }
  return text;
};

function applyTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  $('#themeSelect').value = name;
  localStorage.setItem('theme', name);
}
function applyLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  $('#langSelect').value = lang;
  localStorage.setItem('lang', lang);
  translatePage(lang);
}

function translatePage(lang) {
  // Elements with data-i18n keys
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getI18n(key);
    // Use innerHTML only if translation contains HTML tags
    if (translation.includes('<') && translation.includes('>')) {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });
  // Inputs placeholders
  $('#searchInput').placeholder = getI18n('app.searchPlaceholder');
  // Re-render apps with language
  renderApps(filteredApps());
}

// ======= Burger =======
const burger = $('.burger');
const mobileMenu = $('#mobileMenu');
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  mobileMenu.hidden = open;
});

// ======= Apps Rendering =======
const platformTag = (p, lang) => {
  const map = { android: 'Android', ios: 'iOS', web: 'Web', game: getI18n('filters.game') };
  return `<span class="tag">${map[p] || p}</span>`;
};

const getAppText = (app, field) => {
    return app[field][state.lang] || app[field]['es'];
};

function renderApps(apps) {
  const grid = $('#appsGrid');
  grid.innerHTML = '';
  apps.forEach(app => {
    const el = document.createElement('article');
    el.className = 'card';
    const appName = getAppText(app, 'nombre');
    el.innerHTML = `
      <div class="thumb">
        <img src="assets/img/${app.id}.svg" alt="${getI18n('app.iconAlt', { appName })}" width="96" height="96"/>
      </div>
      <h3>${appName}</h3>
      <p>${getAppText(app, 'descripcion')}</p>
      <div class="tags">
        ${app.plataformas.map(p => platformTag(p, state.lang)).join('')}
        ${(app.tags||[]).map(t => `<span class=\"tag\">${t}</span>`).join('')}
      </div>
      <div class="actions">
        ${app.links.play ? `<a class="btn ghost" href="${app.links.play}" target="_blank" rel="noopener">${getI18n('app.storeLink')}</a>` : ''}
        ${app.links.repo ? `<a class="btn ghost" href="${app.links.repo}" target="_blank" rel="noopener">${getI18n('app.repoLink')}</a>` : ''}
      </div>
    `;
    grid.appendChild(el);
  });
}

function filteredApps() {
  const term = $('#searchInput').value.toLowerCase().trim();
  const filter = $('#filterSelect').value;
  return state.apps.filter(a => {
    const bundle = [
      getAppText(a, 'nombre'),
      getAppText(a, 'descripcion'),
      ...(a.tags||[])
    ].join(' ').toLowerCase();
    const termMatch = bundle.includes(term);
    const platformMatch = filter === 'all' || a.plataformas.includes(filter);
    return termMatch && platformMatch;
  });
}

function applyFilters() { renderApps(filteredApps()); }
$('#searchInput').addEventListener('input', applyFilters);
$('#filterSelect').addEventListener('change', applyFilters);

// ======= Theme & Lang selects =======
$('#themeSelect').addEventListener('change', (e) => applyTheme(e.target.value));
$('#langSelect').addEventListener('change', (e) => { state.lang = e.target.value; applyLang(state.lang); });

// ======= Footer year =======
$('#year').textContent = new Date().getFullYear();

// ======= Init =======
applyTheme(state.theme);
applyLang(state.lang);
