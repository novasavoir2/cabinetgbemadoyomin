// animations.js — révélation au scroll, typewriter, compteur, parallax léger, loader

document.addEventListener('composants:prets', initAnimations);
// Filet de sécurité si les composants ne sont pas utilisés sur une page donnée
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('nav-placeholder')) initAnimations();
});

let animationsDejaInitialisees = false;

function initAnimations() {
  if (animationsDejaInitialisees) return;
  animationsDejaInitialisees = true;

  masquerLoader();
  initReveal();
  initTypewriter();
  initCompteurs();
  initParallax();
}

function masquerLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  window.requestAnimationFrame(() => {
    setTimeout(() => loader.classList.add('cache'), 250);
  });
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting) {
        entree.target.classList.add('est-visible');
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observateur.observe(el));
}

function initTypewriter() {
  document.querySelectorAll('[data-typewriter]').forEach(el => {
    const texte = el.textContent.trim();
    const vitesse = Number(el.dataset.vitesse) || 45;
    el.textContent = '';
    el.classList.add('typewriter');
    let i = 0;
    const ecrire = () => {
      if (i <= texte.length) {
        el.textContent = texte.slice(0, i);
        i++;
        setTimeout(ecrire, vitesse);
      } else {
        el.classList.remove('typewriter');
      }
    };
    ecrire();
  });
}

function initCompteurs() {
  const compteurs = document.querySelectorAll('[data-compteur]');
  if (!compteurs.length) return;

  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (!entree.isIntersecting) return;
      const el = entree.target;
      const cible = Number(el.dataset.compteur);
      const duree = 1400;
      const debut = performance.now();

      const animer = (maintenant) => {
        const progres = Math.min((maintenant - debut) / duree, 1);
        const valeur = Math.floor(progres * cible);
        el.textContent = valeur.toLocaleString('fr-FR');
        if (progres < 1) requestAnimationFrame(animer);
        else el.textContent = cible.toLocaleString('fr-FR') + (el.dataset.suffixe || '');
      };
      requestAnimationFrame(animer);
      observateur.unobserve(el);
    });
  }, { threshold: 0.5 });

  compteurs.forEach(el => observateur.observe(el));
}

function initParallax() {
  const elements = document.querySelectorAll('.parallax');
  if (!elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const majParallax = () => {
    elements.forEach(el => {
      const vitesse = Number(el.dataset.vitesseParallax) || 0.25;
      const rect = el.getBoundingClientRect();
      const decalage = rect.top * vitesse;
      el.style.setProperty('--parallax-y', `${decalage}px`);
    });
  };
  window.addEventListener('scroll', majParallax, { passive: true });
  majParallax();
}
