/**
 * ATLASIS - Main Script File
 * 
 * Ce fichier gère les interactions globales, les animations de défilement,
 * le carrousel de témoignages et les effets de particules.
 */

'use strict';

// ============================================================
//  1. CONFIGURATION & DONNÉES (DATABASE)
// ============================================================

/**
 * BLOG_DATABASE : Liste des articles affichés sur le site.
 * Pour ajouter un article :
 * 1. Ajoutez un objet avec un 'id' unique.
 * 2. Remplissez le titre, la catégorie, l'auteur, la date et le contenu (HTML accepté).
 * 3. L'image doit être une URL valide.
 */
const BLOG_DATABASE = [
    {
        "id": "ia-infrastructure",
        "title": "L'IA Générative révolutionne l'infrastructure cloud : ce que vous devez savoir en 2026",
        "category": "Intelligence Artificielle",
        "author": "Sophie Laurent",
        "authorAvatar": "https://i.pravatar.cc/150?u=sophie",
        "date": "12 Jan, 2026",
        "readTime": "8 min de lecture",
        "image": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
        "content": "<p>Les modèles de langage avancés ne se contentent plus de générer du texte — ils orchestrent désormais des pipelines de données, gèrent des clusters et optimisent les coûts en temps réel.</p><h2>1. L'automatisation intelligente remplace les scripts statiques</h2><p>Dans un passé pas si lointain, l'infrastructure cloud dépendait largement de scripts Terraform ou Ansible difficiles à maintenir au fil du temps. Aujourd'hui, l'<strong>IA Générative</strong> permet de concevoir des environnements dynamiques. Elle peut lire des logs de performance, identifier des goulots d'étranglement et proposer (ou appliquer) des correctifs d'infrastructure de manière autonome.</p><blockquote>\"L'intégration de l'IA au cœur de nos processus cloud a réduit nos incidents de production de 40%, tout en diminuant nos factures de 25%. Ce n'est plus une option, c'est le nouveau standard.\"</blockquote><h3>Des outils qui s'adaptent</h3><p>Ces outils utilisent le contexte réel de l'entreprise. Plutôt que de configurer manuellement un auto-scaling group, il suffit désormais d'indiquer l'intention : \"Maintiens une latence sous les 50ms pour notre application de paiement\". L'IA s'occupe de la configuration sous-jacente des pods Kubernetes ou des instances serveurs.</p><h2>2. La sécurité devient proactive grâce à l'analyse prédictive</h2><p>Les attaquants utilisent désormais l'IA pour trouver des failles dans les architectures. La seule façon de répondre est d'utiliser les mêmes armes. Les plateformes modernes comme Atlasis intègrent des agents IA capables de :</p><ul><li>Simuler des attaques 24/7 pour auditer en continu les politiques IAM.</li><li>Analyser des millions de logs en quelques secondes pour détecter des signaux faibles.</li><li>Générer des règles de firewall ou de WAF instantanément lorsqu'une nouvelle menace émergente est identifiée.</li></ul><img src=\"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80\" alt=\"Dashboard analytique IA\"><h2>3. Démocratisation de l'accès à la donnée</h2><p>L'un des impacts les plus sous-estimés de l'IA dans le cloud est la <em>démocratisation des requêtes</em>. Il n'est plus nécessaire d'être un ingénieur de données avec 10 ans d'expérience en SQL pour comprendre ce qui se passe dans la base de données de production.</p><p>Les interfaces conversationnelles permettent de poser des questions en langage naturel. \"Quelle est la consommation cloud du département marketing le mois dernier par rapport à notre budget prévisionnel ?\" L'IA interroge les services de facturation, consolide les données, et génère un rapport en temps réel.</p>"
    },
    {
        "id": "culture-data",
        "title": "Comment construire des processus et des systèmes qui créent une culture axée sur les données.",
        "category": "Data & Analytics",
        "author": "John Smith",
        "authorAvatar": "https://i.pravatar.cc/150?u=john",
        "date": "6 Sep, 2025",
        "readTime": "5 min de lecture",
        "image": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
        "content": "<p>Transformer une organisation autour de la donnée nécessite bien plus que des outils — cela demande une refonte profonde de la culture.</p><p>Découvrez comment implémenter des systèmes favorisant cette transition en douceur et de manière pérenne au sein de vos équipes.</p><h2>Des processus alignés</h2><p>L'adoption des données passe d'abord par la simplicité de l'accès à celles-ci pour les différents acteurs de l'entreprise. En démystifiant les dashboards et les analyses, vous gagnez l'adhésion de tous.</p>"
    },
    {
        "id": "organisation-data",
        "title": "Créer une organisation axée sur les données : Systèmes, Processus.",
        "category": "Data & Analytics",
        "author": "Evelyn Parker",
        "authorAvatar": "https://i.pravatar.cc/150?u=evelyn",
        "date": "6 Sep, 2025",
        "readTime": "4 min de lecture",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        "content": "<p>Des systèmes robustes et des processus clairs sont les piliers d'une organisation véritablement data-driven.</p><p>La structuration des bases de données de l'entreprise et la gouvernance associée sont des briques fondatrices à un développement de l'activité axé sur la donnée.</p>"
    },
    {
        "id": "culture-decision",
        "title": "Construire une culture où les données guident chaque décision.",
        "category": "Stratégie",
        "author": "Lucas Morgan",
        "authorAvatar": "https://i.pravatar.cc/150?u=lucas",
        "date": "6 Sep, 2025",
        "readTime": "6 min de lecture",
        "image": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
        "content": "<p>La prise de décision data-driven n'est pas qu'une méthode — c'est un changement de mentalité qui doit être cultivé à tous les niveaux.</p><p>Explorez les meilleures stratégies de change management pour que toutes vos équipes adhèrent à cette nouvelle vision orientée datas.</p>"
    },
    {
        "id": "workflows-productivite",
        "title": "Créer des workflows qui boostent la productivité et l'efficacité des équipes.",
        "category": "Stratégie",
        "author": "Sophia Reed",
        "authorAvatar": "https://i.pravatar.cc/150?u=sophia",
        "date": "6 Sep, 2025",
        "readTime": "5 min de lecture",
        "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
        "content": "<p>L'optimisation des flux de travail est l'un des leviers les plus puissants pour libérer le potentiel de vos équipes.</p><p>En utilisant les bons outils, vous pouvez automatiser plus de 40% des tâches manuelles de vos employés.</p>"
    },
    {
        "id": "strategies-innovation",
        "title": "Implémenter des stratégies qui stimulent l'innovation et la croissance business.",
        "category": "Intelligence Artificielle",
        "author": "Daniel Hughes",
        "authorAvatar": "https://i.pravatar.cc/150?u=daniel",
        "date": "6 Sep, 2025",
        "readTime": "7 min de lecture",
        "image": "https://images.unsplash.com/photo-1655720031554-a929595ffad7?w=600&q=80",
        "content": "<p>L'IA n'est plus un avantage compétitif — c'est un prérequis. Voici comment définir une feuille de route pragmatique.</p><p>L'innovation requiert des investissements initiaux, mais les retours peuvent très vite amortir les dépenses engagées, notamment en réduisant considérablement les risques opérationnels liés à votre infrastructure.</p>"
    },
    {
        "id": "systemes-collaboration",
        "title": "Concevoir des systèmes qui amélioreront la collaboration entre départements.",
        "category": "Cloud & Infra",
        "author": "Isabella Clarke",
        "authorAvatar": "https://i.pravatar.cc/150?u=isabella",
        "date": "6 Sep, 2025",
        "readTime": "5 min de lecture",
        "image": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
        "content": "<p>Une architecture cloud bien pensée brise les silos et permet une collaboration fluide entre toutes les équipes.</p><p>Il devient naturel pour l'équipe Data de collaborer avec le Marketing lorsque les outils sont mutualisés et les dashboards compréhensibles par tous.</p>"
    },
    {
        "id": "decisions-intelligentes",
        "title": "Comment exploiter les données pour prendre des décisions plus intelligentes.",
        "category": "Data & Analytics",
        "author": "Nathan Cole",
        "authorAvatar": "https://i.pravatar.cc/150?u=nathan",
        "date": "6 Sep, 2025",
        "readTime": "4 min de lecture",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "content": "<p>Des dashboards en temps réel aux modèles prédictifs — voici les outils et méthodes qui transforment vos données en avantages stratégiques.</p><p>Vous ne pouvez plus avancer à l'aveuglette sur les marchés actuels. La donnée est le phare de l'entreprise de demain.</p>"
    },
    {
        "id": "scalabilite-cloud",
        "title": "Construire des processus scalables qui soutiennent le succès à long terme.",
        "category": "Cloud & Infra",
        "author": "Chloé Bennett",
        "authorAvatar": "https://i.pravatar.cc/150?u=chloe",
        "date": "6 Sep, 2025",
        "readTime": "6 min de lecture",
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        "content": "<p>La scalabilité n'est pas un luxe réservé aux grandes entreprises — c'est un fondement que toute organisation croissante doit intégrer dès le départ.</p><p>Choisir l'infrastructure cloud adaptée pour ne pas plafonner lors de pics de connexion est l'assurance de maintenir un service impeccable en toute circonstance.</p>"
    },
    {
        "id": "optimiser-operations",
        "title": "Optimiser les opérations pour maximiser les performances et les résultats.",
        "category": "Sécurité",
        "author": "Lucas Morgan",
        "authorAvatar": "https://i.pravatar.cc/150?u=lucas2",
        "date": "6 Sep, 2025",
        "readTime": "5 min de lecture",
        "image": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80",
        "content": "<p>La cybersécurité et la performance ne s'opposent plus — découvrez comment les architectures Zero Trust boostent aussi l'efficacité opérationnelle.</p><p>Tout en maintenant une étanchéité accrue contre les menaces externes, ces infrastructures permettent d'accélérer drastiquement les flux de traitement pour des utilisateurs authentifiés.</p>"
    }
];

/**
 * TESTIMONIALS : Citations affichées dans le carrousel.
 */
const TESTIMONIALS = [
    {
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        quote: "« Notre partenariat avec Atlasis a été inestimable. Nous avons renforcé la sécurité, minimisé les risques et pu nous développer sereinement sur les marchés mondiaux avec facilité et confiance. »",
        name: "Amelia Johnson",
        role: "Directeur de l'exploitation, Groupe financier",
        company: "DataStack"
    },
    {
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
        quote: "« Leurs analyses avancées ont transformé notre façon de gérer les menaces, en transformant des données complexes en stratégies claires et exploitables qui permettent de prendre des décisions plus intelligentes. »",
        name: "Daniel Chen",
        role: "Responsable de la cybersécurité",
        company: "BlazeCore"
    },
    {
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
        quote: "« Collaborer avec Atlasis a été une véritable révolution. Leurs stratégies innovantes nous ont permis de tripler notre engagement en ligne en seulement six mois. Un potentiel énorme. »",
        name: "Noah Ramirez",
        role: "Spécialiste SEO",
        company: "Overlay"
    }
];

// ============================================================
//  2. INITIATION DES INTERACTIONS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        const updateHeader = () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', updateHeader);
        updateHeader();
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // Card Hover Effects (3D Tilt & Flashlight)
    const tiltCards = document.querySelectorAll('.bento-card, .feature-card, .modular-card, .pricing-card, .about-feature-item');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 25;
            const rotateY = (x - centerX) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (btn) {
            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('faq-open');
                item.classList.toggle('faq-open', !isOpen);
                btn.setAttribute('aria-expanded', !isOpen);
            });
        }
    });

    // Pricing Toggle Logic
    initPricing();

    // Testimonials Carousel
    initTestimonials();

    // Particles Effects
    initParticles();

    // About Timeline Progress
    initTimeline();

    // Team Selector
    initTeam();

    // Scroll-Linked Marquee for Team Section
    initScrollMarquee();
});

// ============================================================
//  3. FONCTIONS MODULAIRES
// ============================================================

function initScrollMarquee() {
    const section = document.querySelector('.team-section');
    const row1 = document.querySelector('.row-1 .marquee-content-team');
    const row2 = document.querySelector('.row-2 .marquee-content-team');

    if (!section || !row1 || !row2) return;

    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        const winHeight = window.innerHeight;

        // On ne calcule que si la section est visible
        if (rect.top < winHeight && rect.bottom > 0) {
            const scrollPercent = (winHeight - rect.top) / (winHeight + rect.height);
            const movement = scrollPercent * 200; // Ajustez la valeur pour l'amplitude

            row1.style.transform = `translateX(-${movement}px)`;
            row2.style.transform = `translateX(${movement}px)`;
        }
    }, { passive: true });
}

function initPricing() {
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceValues = document.querySelectorAll('.price-value');
    const labelMonthly = document.getElementById('label-monthly');
    const labelAnnual = document.getElementById('label-annual');

    if (!pricingToggle) return;

    pricingToggle.addEventListener('change', () => {
        const isAnnual = pricingToggle.checked;
        labelAnnual.classList.toggle('active', isAnnual);
        labelMonthly.classList.toggle('active', !isAnnual);

        priceValues.forEach(price => {
            const targetPrice = isAnnual ? price.dataset.annual : price.dataset.monthly;
            price.style.opacity = '0';
            price.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                price.innerText = targetPrice;
                price.style.opacity = '1';
                price.style.transform = 'translateY(0)';
            }, 200);
        });
    });
}

function initTestimonials() {
    let currentTestimonial = 0;
    const testimonialImg = document.getElementById('testimonial-img');
    const testimonialQuote = document.getElementById('testimonial-quote');
    const testimonialName = document.getElementById('testimonial-name');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (!testimonialImg || !TESTIMONIALS.length) return;

    const update = (index) => {
        const data = TESTIMONIALS[index];
        testimonialQuote.classList.add('fade-out');
        testimonialImg.style.opacity = '0';

        setTimeout(() => {
            testimonialImg.src = data.image;
            testimonialQuote.innerText = data.quote;
            testimonialName.innerText = data.name;
            if (document.getElementById('testimonial-role')) document.getElementById('testimonial-role').innerText = data.role;
            if (document.getElementById('testimonial-company')) document.getElementById('testimonial-company').innerText = data.company;

            testimonialQuote.classList.remove('fade-out');
            testimonialImg.style.opacity = '1';
        }, 500);
    };

    update(0);

    prevBtn?.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
        update(currentTestimonial);
    });

    nextBtn?.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS.length;
        update(currentTestimonial);
    });
}

function initParticles() {
    const ctaCanvas = document.querySelector('.cta-particles');
    if (!ctaCanvas) return;

    const ctx = ctaCanvas.getContext('2d');
    let particles = [];

    const resize = () => {
        const section = ctaCanvas.closest('.cta-section');
        ctaCanvas.width = section.offsetWidth;
        ctaCanvas.height = section.offsetHeight;
    };

    class Particle {
        constructor() { this.reset(true); }
        reset(initial = false) {
            this.x = Math.random() * ctaCanvas.width;
            this.y = initial ? Math.random() * ctaCanvas.height : ctaCanvas.height + 10;
            this.r = Math.random() * 1.4 + 0.3;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.speed = Math.random() * 0.4 + 0.15;
            this.drift = (Math.random() - 0.5) * 0.3;
            this.twinkle = Math.random() * Math.PI * 2;
        }
        update() {
            this.y -= this.speed;
            this.x += this.drift;
            this.twinkle += 0.02;
            this.displayAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.twinkle));
            if (this.y < -5) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.displayAlpha})`;
            ctx.fill();
        }
    }

    const init = () => {
        resize();
        const count = Math.min(Math.floor((ctaCanvas.width * ctaCanvas.height) / 8000), 120);
        particles = Array.from({ length: count }, () => new Particle());
    };

    const loop = () => {
        ctx.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    };

    init();
    loop();
    window.addEventListener('resize', init);
}

function initTimeline() {
    const timelineSection = document.querySelector('.about-timeline');
    const progressFill = document.querySelector('.timeline-progress-fill');

    if (!timelineSection || !progressFill) return;

    const update = () => {
        const rect = timelineSection.getBoundingClientRect();
        const total = timelineSection.offsetHeight - window.innerHeight;
        const ratio = Math.min(Math.max(-rect.top / total, 0), 1);
        progressFill.style.height = `${ratio * 100}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
}

function initTeam() {
    const teamItems = document.querySelectorAll('.team-list-item');
    const teamPhotos = document.querySelectorAll('.team-photo');
    const badgeRole = document.querySelector('.badge-member-role');
    const badgeName = document.querySelector('.badge-member-name');

    if (!teamItems.length) return;

    const members = [
        { role: 'Directeur Général', name: 'Marc Dupont' },
        { role: 'Directrice Technique', name: 'Sofia Chen' },
        { role: 'Directeur des Opérations', name: 'Karim Benali' },
        { role: 'Responsable Produit', name: 'Léa Martin' },
        { role: 'Lead Data Scientist', name: 'James Okafor' },
    ];

    const activate = (index) => {
        teamItems.forEach(item => item.classList.remove('active'));
        teamItems[index]?.classList.add('active');
        teamPhotos.forEach(photo => photo.classList.remove('active'));
        document.querySelector(`.team-photo[data-index="${index}"]`)?.classList.add('active');

        if (badgeRole && badgeName && members[index]) {
            badgeRole.style.opacity = '0';
            badgeName.style.opacity = '0';
            setTimeout(() => {
                badgeRole.textContent = members[index].role;
                badgeName.textContent = members[index].name;
                badgeRole.style.opacity = '1';
                badgeName.style.opacity = '1';
            }, 250);
        }
    };

    teamItems.forEach((item, i) => {
        item.addEventListener('mouseenter', () => activate(i));
        item.querySelector('.team-list-btn')?.addEventListener('click', () => activate(i));
    });
}

