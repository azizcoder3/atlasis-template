/**
 * INTEGRATIONS_DATABASE : Liste de tous les outils partenaires.
 * Pour ajouter un outil :
 * 1. Ajoutez un objet avec un 'id' unique.
 * 2. Définissez le nom, l'icône (Solar), la catégorie et les statistiques.
 * 3. Remplissez les descriptions et la liste des 'features'.
 */
const INTEGRATIONS_DATABASE = [
    {
        id: 'overlay',
        name: 'Overlay',
        icon: 'solar:layers-bold-duotone',
        category: 'analytics',
        installs: '735 installs',
        rating: '4.9',
        version: '3.1.2',
        tags: ['Analytics', 'BI', 'Sync'],
        shortDesc: 'Créez, assignez et gérez vos tâches via une interface drag-and-drop ou un calendrier intégré.',
        longDesc: 'Overlay aide les entreprises à intégrer leurs données de manière transparente dans leurs systèmes existants, créant une couche unifiée de clarté, d\'accessibilité et d\'efficacité. Avec Overlay, vos équipes collaborent mieux, prennent des décisions éclairées plus rapidement et s\'assurent que les données sont toujours exploitables.',
        features: [
            { icon: 'solar:database-bold-duotone', title: 'Couche de données unifiée', desc: 'Combine plusieurs sources de données dans une plateforme unique pour une vue holistique, permettant aux équipes d\'analyser les tendances, saisir les opportunités et prendre des décisions stratégiques avec une confiance totale.' },
            { icon: 'solar:refresh-bold-duotone', title: 'Synchronisation temps réel', desc: 'Assure que chaque mise à jour, métrique ou changement se reflète instantanément dans tous les systèmes, maintenant toutes les parties prenantes informées, alignées et capables d\'agir sur les informations les plus récentes.' },
            { icon: 'solar:pie-chart-bold-duotone', title: 'Dashboards personnalisés', desc: 'Visualisations adaptées qui donnent aux équipes les bonnes informations au bon moment, les aidant à comprendre facilement des données complexes et à les transformer en stratégies business actionnables.' },
            { icon: 'solar:graph-up-bold-duotone', title: 'Architecture scalable', desc: 'Évolue avec votre organisation, supportant des besoins de données croissants sans compromis sur les performances, assurant fiabilité, scalabilité et efficacité continue.' },
        ],
        whyChoose: 'Overlay simplifie les workflows de données complexes, brise les silos et fournit une source de vérité unique. Il autonomise les équipes avec des insights temps réel, améliore la prise de décision collaborative, booste l\'efficacité et scale sans effort à mesure que votre organisation grandit et évolue.',
    },
    {
        id: 'frameflow',
        name: 'Frameflow',
        icon: 'solar:widget-5-bold-duotone',
        category: 'productivity',
        installs: '35 installs',
        rating: '4.7',
        version: '2.4.1',
        tags: ['Workflow', 'Automation', 'Collaboration'],
        shortDesc: 'Frameflow connecte vos outils de manière transparente, permettant des workflows fluides sans friction.',
        longDesc: 'Frameflow est la plateforme qui connecte vos applications disparates en un écosystème cohérent. Fini les copier-coller entre outils, les données perdues dans les emails ou les synchronisations manuelles chronophages. Frameflow automatise les ponts entre vos applications.',
        features: [
            { icon: 'solar:bolt-bold-duotone', title: 'Workflows automatisés', desc: 'Déclenchez des actions sur plusieurs applications avec un seul événement, éliminant les tâches répétitives et les erreurs humaines.' },
            { icon: 'solar:folder-bold-duotone', title: 'Centralisation des assets', desc: 'Gardez tous vos fichiers projet en un seul endroit, accessible à toute l\'équipe avec des contrôles de permissions granulaires.' },
        ],
        whyChoose: 'Frameflow réduit la friction entre les différentes plateformes, permettant à votre équipe de se concentrer sur ce qui compte vraiment : créer des résultats exceptionnels.',
    },
    {
        id: 'dataflow',
        name: 'Dataflow',
        icon: 'solar:database-bold-duotone',
        category: 'analytics',
        installs: '43 installs',
        rating: '4.8',
        version: '1.9.5',
        tags: ['Big Data', 'Pipeline', 'ML'],
        shortDesc: 'Dataflow unifie vos sources de données et délivre des insights en temps réel pour des décisions éclairées.',
        longDesc: 'Dataflow est l\'épine dorsale des entreprises modernes axées sur les données. Il fournit un pipeline robuste pour l\'ingestion, le traitement et la visualisation de datasets à grande échelle. Conçu pour des équipes data-driven qui ne veulent pas sacrifier la rapidité pour la fiabilité.',
        features: [
            { icon: 'solar:server-bold-duotone', title: 'Infrastructure scalable', desc: 'Conçu pour gérer des pétaoctets de données sans broncher, assurant des performances constantes à mesure que vous scalez.' },
            { icon: 'solar:cpu-bold-duotone', title: 'Analytics prédictive', desc: 'Utilisez les modèles IA intégrés pour prévoir les tendances et identifier les problèmes potentiels avant qu\'ils n\'impactent votre business.' },
        ],
        whyChoose: 'Dataflow vous donne l\'agilité de répondre instantanément aux changements du marché, soutenu par des données concrètes et une prévision intelligente.',
    },
    {
        id: 'blazelo',
        name: 'Blazelo',
        icon: 'solar:bolt-circle-bold-duotone',
        category: 'cloud',
        installs: '95 installs',
        rating: '4.6',
        version: '2.0.3',
        tags: ['Speed', 'Low-latency', 'Integration'],
        shortDesc: 'Blazelo optimise vos workflows, connectant vos outils avec une latence ultra-faible pour une collaboration sans friction.',
        longDesc: 'Blazelo est un moteur d\'intégration haute performance qui priorise la vitesse et la simplicité. Il permet des transferts de données ultra-faible latence entre des systèmes divers, idéal pour les équipes qui ont besoin de synchronisation instantanée.',
        features: [
            { icon: 'solar:flash-bold-duotone', title: 'Intégration instantanée', desc: 'Connectez de nouveaux outils en secondes grâce à nos templates préconstruits et notre assistant intuitif.' },
        ],
        whyChoose: 'Quand la vitesse est votre avantage concurrentiel, Blazelo est le moteur dont vous avez besoin pour garder une longueur d\'avance.',
    },
    {
        id: 'clodey',
        name: 'Clodey',
        icon: 'solar:cloud-bold-duotone',
        category: 'cloud',
        installs: '1.6k installs',
        rating: '4.9',
        version: '4.2.0',
        tags: ['Multi-cloud', 'DevOps', 'Kubernetes'],
        shortDesc: 'Clodey centralise la gestion de vos environnements cloud multi-régions avec une visibilité complète.',
        longDesc: 'Clodey est une plateforme de gestion cloud tout-en-un qui simplifie la façon dont vous interagissez avec les environnements multi-cloud. AWS, Azure, GCP — gérez tout depuis une interface unifiée avec des politiques cohérentes et un suivi des coûts en temps réel.',
        features: [
            { icon: 'solar:cloud-check-bold-duotone', title: 'Gouvernance Multi-Cloud', desc: 'Gérez AWS, Azure et Google Cloud côte à côte avec des politiques cohérentes et un suivi des coûts unifié.' },
        ],
        whyChoose: 'Clodey élimine la complexité de la gestion cloud, vous donnant une vision claire sur toute votre infrastructure digitale.',
    },
    {
        id: 'flightly',
        name: 'Flightly',
        icon: 'solar:plain-2-bold-duotone',
        category: 'productivity',
        installs: '128 installs',
        rating: '4.5',
        version: '1.3.8',
        tags: ['Agile', 'Sprint', 'Planning'],
        shortDesc: 'Flightly simplifie la gestion de projet Agile pour les équipes en forte croissance qui veulent aller vite.',
        longDesc: 'Flightly est un outil de gestion de projet spécifiquement conçu pour les équipes à forte croissance qui ont besoin d\'avancer vite sans perdre de vue la qualité. Sprints, backlogs, roadmaps — tout dans une interface moderne et épurée.',
        features: [
            { icon: 'solar:map-bold-duotone', title: 'Agile Planning', desc: 'Gestion de sprints, de backlogs et visualisation de roadmaps intégrés dans une interface moderne et intuitive.' },
        ],
        whyChoose: 'Flightly scale avec votre ambition, vous fournissant la structure nécessaire sans la lourdeur des logiciels enterprise traditionnels.',
    },
    {
        id: 'securify',
        name: 'Securify',
        icon: 'solar:shield-bold-duotone',
        category: 'security',
        installs: '312 installs',
        rating: '5.0',
        version: '3.0.1',
        tags: ['Zero-Trust', 'SIEM', 'Compliance'],
        shortDesc: 'Securify surveille et protège votre infrastructure avec une détection de menaces basée sur l\'IA.',
        longDesc: 'Securify apporte une couche de sécurité intelligente à votre infrastructure Atlasis. Monitoring en temps réel, détection des anomalies par IA, et conformité automatisée pour SOC2, ISO27001 et RGPD. Dormez sur vos deux oreilles.',
        features: [
            { icon: 'solar:eye-bold-duotone', title: 'Monitoring temps réel', desc: 'Surveillance continue avec alertes instantanées en cas d\'activité suspecte ou d\'anomalie détectée.' },
            { icon: 'solar:shield-check-bold-duotone', title: 'Conformité automatisée', desc: 'Génération automatique des rapports de conformité SOC2, ISO27001 et RGPD pour simplifier vos audits.' },
        ],
        whyChoose: 'Avec Securify, vous avez une posture de sécurité proactive, pas réactive. Détectez avant que l\'incident ne se produise.',
    },
    {
        id: 'notifybox',
        name: 'NotifyBox',
        icon: 'solar:bell-bold-duotone',
        category: 'communication',
        installs: '547 installs',
        rating: '4.7',
        version: '2.1.4',
        tags: ['Slack', 'Email', 'Webhooks'],
        shortDesc: 'NotifyBox centralise toutes vos notifications et alertes d\'infrastructure dans un hub unifié.',
        longDesc: 'NotifyBox transforme le chaos des notifications en un flux d\'information clair et priorisé. Connectez Slack, Teams, email, SMS et vos systèmes internes pour une gestion des alertes intelligente et sans bruit.',
        features: [
            { icon: 'solar:filter-bold-duotone', title: 'Smart Filtering', desc: 'Filtrage intelligent des alertes pour ne recevoir que ce qui compte vraiment, éliminant le bruit de notification.' },
            { icon: 'solar:routing-bold-duotone', title: 'Routage conditionnel', desc: 'Routez les alertes vers les bonnes équipes selon leur criticité, horaire et canal préféré.' },
        ],
        whyChoose: 'NotifyBox vous assure de ne jamais manquer une alerte critique, tout en évitant la saturation d\'informations qui nuit à la réactivité.',
    },
    {
        id: 'designsync',
        name: 'DesignSync',
        icon: 'solar:pallete-2-bold-duotone',
        category: 'design',
        installs: '89 installs',
        rating: '4.8',
        version: '1.5.2',
        tags: ['Figma', 'Storybook', 'Tokens'],
        shortDesc: 'DesignSync synchronise vos composants Figma directement avec votre codebase de production.',
        longDesc: 'DesignSync comble le fossé entre designers et développeurs en synchronisant automatiquement les design tokens, composants et spécifications entre Figma, Storybook et votre système de design. Fini les specs décalées.',
        features: [
            { icon: 'solar:pen-bold-duotone', title: 'Token Sync automatique', desc: 'Synchronisation bidirectionnelle des design tokens entre Figma et votre codebase, sans intervention manuelle.' },
            { icon: 'solar:code-bold-duotone', title: 'Export de composants', desc: 'Génération automatique de code React/Vue/Angular depuis vos composants Figma avec documentation intégrée.' },
        ],
        whyChoose: 'DesignSync élimine les allers-retours entre designers et développeurs, accélérant la livraison tout en maintenant la cohérence visuelle.',
    },
    {
        id: 'gitpulse',
        name: 'GitPulse',
        icon: 'solar:code-scan-bold-duotone',
        category: 'cloud',
        installs: '423 installs',
        rating: '4.9',
        version: '3.3.0',
        tags: ['GitHub', 'GitLab', 'CI/CD'],
        shortDesc: 'GitPulse surveille vos repositories et déclenche des actions Atlasis sur chaque événement Git.',
        longDesc: 'GitPulse s\'intègre nativement avec GitHub, GitLab et Bitbucket pour déclencher des pipelines Atlasis à chaque push, PR ou tag. Automatisez vos déploiements et synchronisez votre infrastructure avec votre code.',
        features: [
            { icon: 'solar:git-branch-bold-duotone', title: 'Webhooks Git natifs', desc: 'Connexion directe avec GitHub, GitLab et Bitbucket pour réagir instantanément à chaque événement de repository.' },
            { icon: 'solar:play-bold-duotone', title: 'Déclencheurs CI/CD', desc: 'Lancez automatiquement vos pipelines Atlasis depuis n\'importe quel événement Git : push, merge, tag ou review.' },
        ],
        whyChoose: 'GitPulse ferme la boucle entre votre code et votre infrastructure, garantissant que chaque commit déclenche les bonnes actions au bon moment.',
    },
    {
        id: 'metricshub',
        name: 'MetricsHub',
        icon: 'solar:chart-2-bold-duotone',
        category: 'analytics',
        installs: '218 installs',
        rating: '4.6',
        version: '2.7.1',
        tags: ['Prometheus', 'Grafana', 'KPI'],
        shortDesc: 'MetricsHub agrège toutes vos métriques d\'infrastructure dans des dashboards temps réel personnalisables.',
        longDesc: 'MetricsHub centralise les métriques de tous vos services et intégrations dans des dashboards Grafana personnalisés. Compatible Prometheus, InfluxDB et OpenMetrics pour une observabilité complète de votre stack.',
        features: [
            { icon: 'solar:eye-bold-duotone', title: 'Observabilité unifiée', desc: 'Consolidez toutes vos métriques dans une vue unique, quelle que soit leur source ou leur format.' },
        ],
        whyChoose: 'MetricsHub vous donne la visibilité complète dont vous avez besoin pour anticiper les problèmes et optimiser les performances en continu.',
    },
    {
        id: 'slackhook',
        name: 'SlackHook',
        icon: 'logos:slack-icon',
        category: 'communication',
        installs: '1.2k installs',
        rating: '4.9',
        version: '4.0.0',
        tags: ['Slack', 'Notifications', 'Bot'],
        shortDesc: 'SlackHook connecte Atlasis à Slack pour des notifications intelligentes et des commandes slash directes.',
        longDesc: 'SlackHook transforme Slack en centre de commande Atlasis. Recevez des alertes contextualisées, déclenchez des actions depuis des commandes slash et construisez des workflows interactifs directement dans vos channels.',
        features: [
            { icon: 'solar:chat-bold-duotone', title: 'Commandes slash', desc: 'Pilotez votre infrastructure Atlasis directement depuis Slack avec des commandes simples et intuitives.' },
            { icon: 'solar:bell-bold-duotone', title: 'Alertes contextualisées', desc: 'Notifications enrichies avec contexte, graphiques et actions directement dans vos channels Slack.' },
        ],
        whyChoose: 'SlackHook fait de Slack votre interface principale avec Atlasis, réduisant le contexte-switching et accélérant le temps de réponse aux incidents.',
    },
];

// ──────────────────────────────────────────────────────────────
//  CANVAS — Particules flottantes (réutilisé pour hero + CTA)
// ──────────────────────────────────────────────────────────────
function initCanvas(canvasEl, sectionEl) {
    if (!canvasEl || !sectionEl) return;
    const ctx = canvasEl.getContext('2d');
    let particles = [];

    const resize = () => {
        canvasEl.width = sectionEl.offsetWidth;
        canvasEl.height = sectionEl.offsetHeight;
    };

    class Particle {
        constructor(init = false) { this.reset(init); }
        reset(init = false) {
            this.x = Math.random() * canvasEl.width;
            this.y = init ? Math.random() * canvasEl.height : canvasEl.height + 8;
            this.r = Math.random() * 1.4 + 0.2;
            this.base = Math.random() * 0.35 + 0.05;
            this.alpha = this.base;
            this.speedY = Math.random() * 0.32 + 0.08;
            this.speedX = (Math.random() - 0.5) * 0.18;
            this.tick = Math.random() * Math.PI * 2;
            this.tickSpd = Math.random() * 0.018 + 0.007;
            this.isBlue = Math.random() < 0.12;
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.tick += this.tickSpd;
            this.alpha = this.base * (0.65 + 0.35 * Math.sin(this.tick));
            if (this.y < -6 || this.x < -6 || this.x > canvasEl.width + 6) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.isBlue
                ? `rgba(80,140,255,${this.alpha})`
                : `rgba(255,255,255,${this.alpha})`;
            ctx.fill();
        }
    }

    const init = () => {
        resize();
        const count = Math.min(Math.floor((canvasEl.width * canvasEl.height) / 6000), 150);
        particles = Array.from({ length: count }, () => new Particle(true));
    };

    const loop = () => {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    };

    init();
    loop();
    window.addEventListener('resize', init);
}

// ──────────────────────────────────────────────────────────────
//  CARD BUILDER (partagé grille + similaires)
// ──────────────────────────────────────────────────────────────
function buildCard(item, index = 0) {
    const featured = index === 0 ? 'ig-card--featured' : '';
    const tagsHTML = item.tags.map(t => `<span class="ig-card-tag">${t}</span>`).join('');

    return `
        <a href="integration-detail.html?id=${item.id}"
           class="ig-card ${featured} reveal"
           data-category="${item.category}"
           data-name="${item.name.toLowerCase()}"
           data-desc="${item.shortDesc.toLowerCase()}"
        >
            <div class="ig-card-glow"></div>
            <div class="ig-card-head">
                <div class="ig-card-icon">
                    <iconify-icon icon="${item.icon}"></iconify-icon>
                </div>
                <span class="ig-card-installs">${item.installs}</span>
            </div>
            <div class="ig-card-body">
                <h3 class="ig-card-name">${item.name}</h3>
                <p class="ig-card-desc">${item.shortDesc}</p>
            </div>
            <div class="ig-card-tags">${tagsHTML}</div>
            <div class="ig-card-link">
                En savoir plus
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </div>
        </a>
    `;
}

// ──────────────────────────────────────────────────────────────
//  GRILLE — filtres + recherche + rendu
// ──────────────────────────────────────────────────────────────
function initGrid() {
    const gridEl = document.getElementById('ig-grid');
    const emptyEl = document.getElementById('ig-empty');
    const countEl = document.getElementById('ig-count');
    const filterEl = document.getElementById('ig-active-filter');
    const searchEl = document.getElementById('ig-search');
    const filterBtns = document.querySelectorAll('.ig-filter');

    if (!gridEl) return;

    let currentFilter = 'all';
    let currentSearch = '';

    const categoryLabels = {
        all: 'Toutes les catégories',
        communication: 'Communication',
        cloud: 'Cloud & Dev',
        analytics: 'Analytics',
        design: 'Design',
        productivity: 'Productivité',
        security: 'Sécurité',
    };

    const render = () => {
        const filtered = INTEGRATIONS_DATABASE.filter(item => {
            const matchCat = currentFilter === 'all' || item.category === currentFilter;
            const matchSearch = !currentSearch
                || item.name.toLowerCase().includes(currentSearch)
                || item.shortDesc.toLowerCase().includes(currentSearch)
                || item.tags.some(t => t.toLowerCase().includes(currentSearch));
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            gridEl.style.display = 'none';
            emptyEl.style.display = 'flex';
        } else {
            gridEl.style.display = 'grid';
            emptyEl.style.display = 'none';
            gridEl.innerHTML = filtered.map((item, i) => buildCard(item, i)).join('');
        }
        // Mettre à jour compteur

        // Mettre à jour compteur
        if (countEl) countEl.textContent = `${filtered.length} intégration${filtered.length > 1 ? 's' : ''}`;
        if (filterEl) filterEl.textContent = categoryLabels[currentFilter] || 'Toutes';

        // Activer mouse tracking glow sur les nouvelles cards
        attachCardGlow();

        // Scroll reveal pour les nouvelles cards
        triggerReveal();
    };

    // Filtres catégorie
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('ig-filter--active'));
            btn.classList.add('ig-filter--active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });

    // Recherche live
    if (searchEl) {
        searchEl.addEventListener('input', () => {
            currentSearch = searchEl.value.trim().toLowerCase();
            render();
        });

        // Raccourci ⌘K / Ctrl+K
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchEl.focus();
                searchEl.select();
            }
        });
    }

    // Rendu initial
    render();
}

// ──────────────────────────────────────────────────────────────
//  MOUSE TRACKING GLOW sur les cards
// ──────────────────────────────────────────────────────────────
function attachCardGlow() {
    document.querySelectorAll('.ig-card').forEach(card => {
        // Évite de double-binding
        if (card._glowBound) return;
        card._glowBound = true;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });
}

// ──────────────────────────────────────────────────────────────
//  SCROLL REVEAL (fallback si script.js ne couvre pas)
// ──────────────────────────────────────────────────────────────
function triggerReveal() {
    const els = document.querySelectorAll('.reveal:not(.active)');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, i * 60);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(el => obs.observe(el));
}

// ──────────────────────────────────────────────────────────────
//  PAGE DÉTAIL
// ──────────────────────────────────────────────────────────────
function initDetailPage() {
    const titleEl = document.getElementById('igd-title');
    if (!titleEl) return; // Pas sur la page détail

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'overlay';
    const item = INTEGRATIONS_DATABASE.find(i => i.id === id) || INTEGRATIONS_DATABASE[0];

    // ── Mise à jour du titre de page
    document.title = `Atlasis — ${item.name}`;

    // ── Hero
    document.getElementById('igd-breadcrumb-name').textContent = item.name;
    document.getElementById('igd-main-icon').setAttribute('icon', item.icon);
    document.getElementById('igd-title').textContent = item.name;
    document.getElementById('igd-desc').textContent = item.shortDesc;
    document.getElementById('igd-installs').textContent = item.installs;
    document.getElementById('igd-rating').textContent = item.rating;
    document.getElementById('igd-url-slug').textContent = item.id;
    document.getElementById('igd-version').textContent = item.version;
    document.getElementById('igd-meta-category').textContent = item.category;

    // Catégorie badge
    const catLabels = {
        communication: 'Communication', cloud: 'Cloud & Dev',
        analytics: 'Analytics', design: 'Design',
        productivity: 'Productivité', security: 'Sécurité',
    };
    document.getElementById('igd-category-badge').textContent = catLabels[item.category] || item.category;

    // Tags
    const tagsEl = document.getElementById('igd-tags');
    if (tagsEl) {
        tagsEl.innerHTML = item.tags.map(t => `<span class="igd-tag">${t}</span>`).join('');
    }

    // Icône dans le mockup
    const mockupIcon = document.getElementById('igd-mockup-icon');
    if (mockupIcon) {
        mockupIcon.querySelector('iconify-icon') && (mockupIcon.querySelector('iconify-icon').setAttribute('icon', item.icon));
    }

    // ── CLI
    const cliEl = document.getElementById('igd-cli-cmd');
    if (cliEl) cliEl.textContent = `${item.id}`;

    // ── Copy button
    const copyBtn = document.getElementById('igd-copy-btn');
    if (copyBtn && cliEl) {
        copyBtn.addEventListener('click', () => {
            const cmd = `atlas install ${item.id}`;
            navigator.clipboard.writeText(cmd).then(() => {
                copyBtn.classList.add('igd-copy-btn--copied');
                const icon = copyBtn.querySelector('iconify-icon');
                if (icon) icon.setAttribute('icon', 'solar:check-bold');
                setTimeout(() => {
                    copyBtn.classList.remove('igd-copy-btn--copied');
                    if (icon) icon.setAttribute('icon', 'solar:copy-bold-duotone');
                }, 2000);
            });
        });
    }

    // ── Article principal
    const articleEl = document.getElementById('igd-article');
    if (articleEl) {
        const featuresHTML = `
            <div class="igd-features-grid">
                ${item.features.map(f => `
                    <div class="igd-feature-item">
                        <div class="igd-feature-icon">
                            <iconify-icon icon="${f.icon}"></iconify-icon>
                        </div>
                        <h4>${f.title}</h4>
                        <p>${f.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;

        articleEl.innerHTML = `
            <h2>Introduction à l'intégration ${item.name}</h2>
            <p>${item.longDesc}</p>

            <h2>Fonctionnalités Clés</h2>
            ${featuresHTML}

            <h2>Pourquoi choisir ${item.name}&nbsp;?</h2>
            <p>${item.whyChoose}</p>

            <h2>Note Finale</h2>
            <p>${item.name} n'est pas qu'un simple outil — c'est une intégration puissante qui transforme la façon dont les organisations interagissent avec leurs données et leurs workflows. En intégrant nativement avec Atlasis, ${item.name} aide vos équipes à rester compétitives, agiles et véritablement data-driven, ouvrant la voie à une croissance plus rapide, des stratégies plus intelligentes et des résultats mesurables.</p>
        `;
    }

    // ── Similaires
    const similarEl = document.getElementById('igd-similar-grid');
    if (similarEl) {
        const others = INTEGRATIONS_DATABASE.filter(i => i.id !== item.id).slice(0, 3);
        similarEl.innerHTML = others.map((i, idx) => buildCard(i, idx)).join('');
        attachCardGlow();
    }

    triggerReveal();
}

// ──────────────────────────────────────────────────────────────
//  INIT PRINCIPAL
// ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // Canvas hero
    const heroSection = document.querySelector('.ig-hero');
    if (heroSection) {
        initCanvas(document.getElementById('ig-canvas'), heroSection);
    }

    // Canvas hero détail
    const igdHero = document.querySelector('.igd-hero');
    if (igdHero) {
        initCanvas(document.getElementById('igd-canvas'), igdHero);
    }

    // Canvas CTA
    const ctaSection = document.querySelector('.ig-cta');
    if (ctaSection) {
        initCanvas(document.getElementById('ig-cta-canvas'), ctaSection);
    }

    // Page liste
    initGrid();

    // Page détail
    initDetailPage();

    // Reveal global
    triggerReveal();

    // Mouse tracking pour les cards existantes
    attachCardGlow();
});