// components.js — injecte la nav, le footer, les boutons flottants et le sélecteur de thème

const LIENS_NAV = [
  { texte: 'Accueil', href: 'index.html', page: 'accueil' },
  { texte: 'Le Professeur', href: 'le-professeur.html', page: 'professeur' },
  { texte: 'Consultations', href: 'consultations.html', page: 'consultations' },
  { texte: 'Découvrir', href: 'decouvrir.html', page: 'decouvrir' },
  { texte: 'Boutique', href: 'boutique.html', page: 'boutique' },
  { texte: 'Événements', href: 'evenements.html', page: 'evenements' },
  { texte: 'Vibration Sacrée', href: 'vibration-sacree.html', page: 'vibration' },
  { texte: 'Médias', href: 'medias.html', page: 'medias' },
  { texte: 'Contact', href: 'contact.html', page: 'contact' },
];

const WHATSAPP_NUMERO = '22967668799';
const WHATSAPP_URL = (texte = 'Bonjour, je souhaite prendre rendez-vous avec le Cabinet Gbêmadoyômin.') =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texte)}`;

// ---- GESTION DU THÈME ----
function getThemePreference() {
  const saved = localStorage.getItem('theme');
  if (saved === 'clair' || saved === 'sombre') return saved;
  // Détection du thème du navigateur
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'clair';
  }
  return 'sombre';
}

function applyTheme(theme) {
  const body = document.body;
  if (theme === 'clair') {
    body.classList.add('clair');
  } else {
    body.classList.remove('clair');
  }
  localStorage.setItem('theme', theme);
  // Mettre à jour l'icône du bouton
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === 'clair' ? '🌙' : '☀️';
    btn.setAttribute('aria-label', theme === 'clair' ? 'Passer en mode sombre' : 'Passer en mode clair');
  }
}

function toggleTheme() {
  const current = document.body.classList.contains('clair') ? 'clair' : 'sombre';
  const next = current === 'clair' ? 'sombre' : 'clair';
  applyTheme(next);
}

// ---- CONSTRUCTION DE LA NAV ----
function construireNav(pageActive) {
  const liens = LIENS_NAV.map(l =>
    `<a class="nav-lien${l.page === pageActive ? ' actif' : ''}" href="${l.href}">${l.texte}</a>`
  ).join('');

  return `
  <nav class="nav" aria-label="Navigation principale">
    <a href="index.html" class="nav-logo">
      <img src="logo.jpeg" alt="Cabinet Gbêmadoyômin" class="nav-logo-img" height="40">
      <div class="nav-logo-texte">
        <span class="nav-logo-principal">GBÊMADOYÔMIN</span>
        <span class="nav-logo-sous">TODAAA..!</span>
      </div>
    </a>
    <div class="nav-liens" id="nav-liens">
      ${liens}
      <a class="btn-or nav-rdv-mobile" href="${WHATSAPP_URL()}" target="_blank" rel="noopener">Prendre RDV</a>
    </div>
    <div class="nav-droite">
      <button class="nav-theme" id="theme-toggle" aria-label="Basculer le thème"></button>
      <a class="nav-rdv" href="${WHATSAPP_URL()}" target="_blank" rel="noopener">Prendre RDV</a>
      <button class="nav-burger" id="nav-burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-liens">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

// ---- CONSTRUCTION DU FOOTER ----
function construireFooter() {
  return `
  <footer class="footer">
    <div class="conteneur">
      <div class="footer-grille">
        <div>
          <div class="f-logo">
            <img src="logo.jpeg" alt="Cabinet Gbêmadoyômin" height="32" style="display:inline-block; vertical-align:middle; margin-right:10px;">
            GBÊMADOYÔMIN
          </div>
          <div class="f-slogan">Savoir • Transmission • Héritage • Innovation</div>
          <p class="f-desc">Construire un patrimoine de connaissances transmissible, capable de voyager, d'être enseigné et légué aux générations futures.</p>
          <div class="f-socials">
            <a class="f-social" href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a class="f-social" href="#" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.97a8.16 8.16 0 004.77 1.52V8.05a4.85 4.85 0 01-1-.36z"/></svg></a>
            <a class="f-social" href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>
          </div>
        </div>
        <div>
          <div class="f-col-titre">Navigation</div>
          <div class="f-liens">
            <a class="f-lien" href="index.html">Accueil</a>
            <a class="f-lien" href="le-professeur.html">Le Professeur</a>
            <a class="f-lien" href="consultations.html">Consultations</a>
            <a class="f-lien" href="decouvrir.html">Découvrir</a>
            <a class="f-lien" href="evenements.html">Événements</a>
            <a class="f-lien" href="medias.html">Médias</a>
          </div>
        </div>
        <div>
          <div class="f-col-titre">Univers</div>
          <div class="f-liens">
            <a class="f-lien" href="boutique.html">Boutique TODAAA</a>
            <a class="f-lien" href="boutique.html#livres">Livres & Éditions</a>
            <a class="f-lien" href="boutique.html#mode">Mode TODAAA 2026</a>
            <a class="f-lien" href="boutique.html#spiritualite">Spiritualité & Objets</a>
            <a class="f-lien" href="vibration-sacree.html">Vibration Sacrée</a>
            <a class="f-lien" href="vibration-sacree.html#avs">AVS</a>
          </div>
        </div>
        <div>
          <div class="f-col-titre">Contact officiel</div>
          <div class="f-contact-item">
            <span class="f-contact-icon">📱</span>
            <div class="f-contact-texte"><strong>WhatsApp</strong><a href="${WHATSAPP_URL()}" target="_blank" rel="noopener">+229 67 66 87 99</a></div>
          </div>
          <div class="f-contact-item">
            <span class="f-contact-icon">✉️</span>
            <div class="f-contact-texte"><strong>Email</strong><a href="mailto:cabinetgbemadoyomin@gmail.com">cabinetgbemadoyomin@gmail.com</a></div>
          </div>
          <div class="f-contact-item">
            <span class="f-contact-icon">📍</span>
            <div class="f-contact-texte"><strong>Localisation</strong>Abomey-Calavi, Bénin</div>
          </div>
          <div class="f-alerte">⚠️ Utilisez uniquement les coordonnées officielles du Cabinet pour éviter les faux comptes.</div>
        </div>
      </div>
      <div class="footer-bas">
        <span class="f-copy">© 2026 Cabinet GBÊMADOYÔMIN. Tous droits réservés. | TODAAA..!</span>
        <span class="f-todaaa">TODAAA..!</span>
      </div>
    </div>
  </footer>`;
}

// ---- BOUTONS FLOTTANTS ----
function construireFlottants() {
  return `
  <div class="flottants">
    <a class="flottant-wa pulse-doux" href="${WHATSAPP_URL()}" target="_blank" rel="noopener" aria-label="Contacter sur WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </a>
    <a class="flottant-rdv" href="${WHATSAPP_URL()}" target="_blank" rel="noopener">Prendre RDV</a>
  </div>`;
}

// ---- MENU MOBILE ----
function activerMenuMobile() {
  const burger = document.getElementById('nav-burger');
  const liens = document.getElementById('nav-liens');
  if (!burger || !liens) return;
  burger.addEventListener('click', () => {
    const ouvert = liens.classList.toggle('ouvert');
    burger.classList.toggle('ouvert', ouvert);
    burger.setAttribute('aria-expanded', String(ouvert));
  });
  liens.querySelectorAll('.nav-lien, .nav-rdv-mobile').forEach(a =>
    a.addEventListener('click', () => {
      liens.classList.remove('ouvert');
      burger.classList.remove('ouvert');
      burger.setAttribute('aria-expanded', 'false');
    })
  );
}

// ---- INITIALISATION ----
document.addEventListener('DOMContentLoaded', () => {
  const pageActive = document.body.dataset.page || '';
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (navPlaceholder) navPlaceholder.outerHTML = construireNav(pageActive);
  if (footerPlaceholder) footerPlaceholder.outerHTML = construireFooter() + construireFlottants();

  activerMenuMobile();

  // ---- INITIALISATION DU THÈME ----
  const theme = getThemePreference();
  applyTheme(theme);

  // Écouteur sur le bouton de bascule
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  // Écouteur pour détecter les changements de thème du navigateur (en temps réel)
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', (e) => {
      // Ne change que si l'utilisateur n'a pas fait de choix explicite
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'clair' : 'sombre');
      }
    });
  }

  document.dispatchEvent(new Event('composants:prets'));
});
