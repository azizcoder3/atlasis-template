// ============================================================
//  BLOG.JS — Atlasis Page Blog
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------
    // 1. Hero Canvas — particules flottantes (même système que pricing.js)
    // ----------------------------------------------------------
    const heroCanvas = document.querySelector('.bl-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];

        const resizeHero = () => {
            heroCanvas.width = window.innerWidth;
            heroCanvas.height = heroCanvas.closest('.bl-hero').offsetHeight;
        };

        class Particle {
            constructor(init = false) { this.reset(init); }
            reset(init = false) {
                this.x = Math.random() * heroCanvas.width;
                this.y = init ? Math.random() * heroCanvas.height : heroCanvas.height + 5;
                this.r = Math.random() * 1.4 + 0.2;
                this.alpha = Math.random() * 0.45 + 0.06;
                this.speed = Math.random() * 0.32 + 0.1;
                this.drift = (Math.random() - 0.5) * 0.22;
                this.twinkle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y -= this.speed;
                this.x += this.drift;
                this.twinkle += 0.018;
                this.disp = this.alpha * (0.65 + 0.35 * Math.sin(this.twinkle));
                if (this.y < -4) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${this.disp})`;
                ctx.fill();
            }
        }

        const initHero = () => {
            resizeHero();
            const count = Math.min(Math.floor((heroCanvas.width * heroCanvas.height) / 6500), 160);
            particles = Array.from({ length: count }, () => new Particle(true));
        };

        const animateHero = () => {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateHero);
        };

        initHero();
        animateHero();
        window.addEventListener('resize', initHero);
    }

    // ----------------------------------------------------------
    // 2. Newsletter Canvas — particules montantes (même système que CTA canvas)
    // ----------------------------------------------------------
    const nlCanvas = document.querySelector('.bl-nl-canvas');
    if (nlCanvas) {
        const ctx2 = nlCanvas.getContext('2d');
        let nlStars = [];

        const resizeNl = () => {
            nlCanvas.width = nlCanvas.closest('.bl-newsletter').offsetWidth;
            nlCanvas.height = nlCanvas.closest('.bl-newsletter').offsetHeight;
        };

        class NlStar {
            constructor(init = false) { this.reset(init); }
            reset(init = false) {
                this.x = Math.random() * nlCanvas.width;
                this.y = init ? Math.random() * nlCanvas.height : nlCanvas.height + 5;
                this.r = Math.random() * 1.2 + 0.2;
                this.alpha = Math.random() * 0.4 + 0.06;
                this.speed = Math.random() * 0.28 + 0.08;
                this.drift = (Math.random() - 0.5) * 0.18;
                this.twinkle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y -= this.speed;
                this.x += this.drift;
                this.twinkle += 0.016;
                this.disp = this.alpha * (0.65 + 0.35 * Math.sin(this.twinkle));
                if (this.y < -4) this.reset();
            }
            draw() {
                ctx2.beginPath();
                ctx2.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx2.fillStyle = `rgba(255,255,255,${this.disp})`;
                ctx2.fill();
            }
        }

        const initNl = () => {
            resizeNl();
            const count = Math.min(Math.floor((nlCanvas.width * nlCanvas.height) / 8000), 100);
            nlStars = Array.from({ length: count }, () => new NlStar(true));
        };

        const animateNl = () => {
            ctx2.clearRect(0, 0, nlCanvas.width, nlCanvas.height);
            nlStars.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animateNl);
        };

        initNl();
        animateNl();
        window.addEventListener('resize', initNl);
    }

    // ----------------------------------------------------------
    // 3. Filtres par catégorie
    // ----------------------------------------------------------
    const filterBtns = document.querySelectorAll('.bl-filter-btn');
    const cards = document.querySelectorAll('.bl-card');
    const countEl = document.getElementById('bl-count');
    const noResults = document.getElementById('bl-no-results');

    const updateCount = (visible) => {
        if (countEl) {
            countEl.textContent = visible === 1
                ? '1 article publié'
                : `${visible} articles publiés`;
        }
    };

    const applyFilter = (cat) => {
        let visible = 0;
        cards.forEach(card => {
            const cardCat = card.dataset.cat;
            const show = cat === 'all' || cardCat === cat;
            if (show) {
                card.classList.remove('bl-hidden');
                visible++;
            } else {
                card.classList.add('bl-hidden');
            }
        });

        if (noResults) {
            noResults.style.display = visible === 0 ? 'flex' : 'none';
        }
        updateCount(visible);
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.cat);
        });
    });

    // Init
    updateCount(cards.length);

    // ----------------------------------------------------------
    // 4. Recherche en temps réel
    // ----------------------------------------------------------
    const searchInput = document.getElementById('bl-search-input');
    const searchBtn = document.querySelector('.bl-search-btn');

    const applySearch = (query) => {
        const q = query.trim().toLowerCase();
        if (!q) {
            // Si vide, réappliquer le filtre actif
            const activeCat = document.querySelector('.bl-filter-btn.active')?.dataset.cat || 'all';
            applyFilter(activeCat);
            return;
        }

        let visible = 0;
        cards.forEach(card => {
            const title = card.querySelector('.bl-card-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.bl-card-excerpt')?.textContent.toLowerCase() || '';
            const author = card.querySelector('.bl-card-author span')?.textContent.toLowerCase() || '';
            const match = title.includes(q) || excerpt.includes(q) || author.includes(q);

            if (match) {
                card.classList.remove('bl-hidden');
                visible++;
            } else {
                card.classList.add('bl-hidden');
            }
        });

        if (noResults) {
            noResults.style.display = visible === 0 ? 'flex' : 'none';
        }
        updateCount(visible);
    };

    if (searchInput) {
        searchInput.addEventListener('input', (e) => applySearch(e.target.value));
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchInput) applySearch(searchInput.value);
        });
    }

    // ----------------------------------------------------------
    // 5. Scroll Reveal — IntersectionObserver
    // ----------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal:not(.active)');
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        revealEls.forEach(el => observer.observe(el));
    }

    // ----------------------------------------------------------
    // 6. Btn flip — géré uniquement en CSS via ::before / ::after
    // ----------------------------------------------------------

    // ----------------------------------------------------------
    // 7. Bouton "Charger plus" — simulation
    // ----------------------------------------------------------
    /**
     * Cette section gère le chargement d'articles supplémentaires.
     * Les articles sont récupérés depuis la constante BLOG_DATABASE (définie dans script.js).
     */
    const loadMoreBtn = document.getElementById('bl-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = loadMoreBtn.dataset.front || 'Charger plus d\'articles';
        let loaded = false;

        loadMoreBtn.addEventListener('click', () => {
            if (loaded) return;

            loadMoreBtn.textContent = loadMoreBtn.dataset.back || 'Chargement…';
            loadMoreBtn.disabled = true;

            // Simulation d'un chargement asynchrone pour l'effet visuel
            setTimeout(() => {
                const grid = document.getElementById('bl-grid');
                if (!grid) return;

                // Récupérer les IDs des articles déjà présents dans le DOM
                const existingIds = Array.from(grid.querySelectorAll('article')).map(a => {
                    // On essaie de d'extraire l'ID du lien s'il existe
                    const link = a.querySelector('.bl-card-link')?.getAttribute('href');
                    const match = link?.match(/id=([^&]+)/);
                    return match ? match[1] : null;
                }).filter(id => id !== null);

                // Filtrer BLOG_DATABASE pour trouver les articles non affichés
                const extraArticles = BLOG_DATABASE.filter(art => !existingIds.includes(art.id)).slice(0, 3);

                if (extraArticles.length > 0) {
                    extraArticles.forEach((art, i) => {
                        // Déterminer la classe de catégorie
                        let catClass = 'bl-cat-ia';
                        if (art.category.includes('Data')) catClass = 'bl-cat-data';
                        if (art.category.includes('Cloud')) catClass = 'bl-cat-cloud';
                        if (art.category.includes('Stratégie')) catClass = 'bl-cat-strategy';
                        if (art.category.includes('Sécurité')) catClass = 'bl-cat-securite';

                        const article = document.createElement('article');
                        article.className = 'bl-card reveal';
                        article.dataset.cat = art.category.toLowerCase().includes('ia') ? 'ia' :
                            art.category.toLowerCase().includes('data') ? 'data' :
                                art.category.toLowerCase().includes('cloud') ? 'cloud' :
                                    art.category.toLowerCase().includes('stratégie') ? 'business' : 'all';

                        article.innerHTML = `
                            <div class="bl-card-image">
                                <img src="${art.image}" alt="${art.title}" loading="lazy">
                                <span class="bl-cat-tag ${catClass}">${art.category}</span>
                            </div>
                            <div class="bl-card-body">
                                <div class="bl-card-meta">
                                    <span><iconify-icon icon="solar:calendar-linear"></iconify-icon> ${art.date}</span>
                                    <div class="bl-card-author">
                                        <img src="${art.authorAvatar}" alt="${art.author}">
                                        <span>${art.author}</span>
                                    </div>
                                </div>
                                <h3 class="bl-card-title">${art.title}</h3>
                                <p class="bl-card-excerpt">${art.title.substring(0, 100)}...</p>
                                <a href="blog-detail.html?id=${art.id}" class="bl-card-link">
                                    Lire la suite
                                    <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                                </a>
                            </div>
                        `;
                        grid.appendChild(article);

                        // Déclencher l'animation d'apparition
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                article.classList.add('active');
                                article.style.opacity = '1';
                                article.style.transform = 'translateY(0)';
                                article.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
                            });
                        });
                    });

                    // Mettre à jour le compteur
                    const visibleCards = grid.querySelectorAll('.bl-card:not(.bl-hidden)');
                    updateCount(visibleCards.length);

                    // Réactiver le hover glow sur les nouvelles cartes
                    document.querySelectorAll('.bl-card').forEach(card => {
                        if (card._glowBound) return;
                        card._glowBound = true;
                        card.addEventListener('mousemove', (e) => {
                            const rect = card.getBoundingClientRect();
                            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
                        });
                    });
                }

                loaded = true;
                loadMoreBtn.textContent = 'Tous les articles affichés';
                loadMoreBtn.style.opacity = '0.4';
                loadMoreBtn.style.cursor = 'default';

            }, 800);
        });
    }

    // ----------------------------------------------------------
    // 8. Newsletter form — feedback visuel
    // ----------------------------------------------------------
    const nlForm = document.getElementById('bl-nl-form');
    if (nlForm) {
        nlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = nlForm.querySelector('button[type="submit"]');
            const input = nlForm.querySelector('input[type="email"]');
            const email = input?.value;

            if (!email) return;

            if (btn) {
                btn.dataset.originalFront = btn.dataset.front || '';
                btn.dataset.originalBack = btn.dataset.back || '';
                btn.setAttribute('data-front', '✓ Abonné !');
                btn.setAttribute('data-back', '✓ Abonné !');
                btn.style.opacity = '0.9'; // Alternative to background changes that might be overridden by pseudo-elements
                btn.disabled = true;
            }

            if (input) {
                input.value = '';
                input.placeholder = 'Merci pour votre inscription 🎉';
                input.disabled = true;
            }

            // Reset après 4 secondes
            setTimeout(() => {
                if (btn) {
                    btn.setAttribute('data-front', btn.dataset.originalFront || '→ S\'abonner');
                    btn.setAttribute('data-back', btn.dataset.originalBack || 'C\'est parti !');
                    btn.style.opacity = '';
                    btn.disabled = false;
                }
                if (input) {
                    input.placeholder = 'votre@email.com';
                    input.disabled = false;
                }
            }, 4000);
        });
    }

    // ----------------------------------------------------------
    // 9. Hover glow sur les cartes (mouse tracking)
    // ----------------------------------------------------------
    document.querySelectorAll('.bl-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

});