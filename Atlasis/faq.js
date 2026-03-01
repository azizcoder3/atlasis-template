// ============================================================
//  FAQ.JS — Atlasis Page FAQ
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------
    // 1. Hero Canvas — particules flottantes (même système que pricing.js)
    // ----------------------------------------------------------
    const heroCanvas = document.querySelector('.fq-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            heroCanvas.width = window.innerWidth;
            heroCanvas.height = heroCanvas.closest('.fq-hero').offsetHeight;
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

        const initParticles = () => {
            resizeCanvas();
            const count = Math.min(Math.floor((heroCanvas.width * heroCanvas.height) / 6500), 160);
            particles = Array.from({ length: count }, () => new Particle(true));
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
        window.addEventListener('resize', initParticles);
    }

    // ----------------------------------------------------------
    // 2. Accordéon FAQ
    // ----------------------------------------------------------
    const allItems = document.querySelectorAll('.fq-item');

    allItems.forEach(item => {
        const btn = item.querySelector('.fq-q');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Fermer tous les autres items de la même catégorie pour économiser l'espace
            const group = item.closest('.fq-accordion');
            if (group) {
                group.querySelectorAll('.fq-item.open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('open');
                        openItem.querySelector('.fq-q')?.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // Toggle l'item courant
            item.classList.toggle('open', !isOpen);
            btn.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    // Ouvrir le premier item de la première catégorie par défaut
    const firstItem = document.querySelector('.fq-item');
    if (firstItem) {
        firstItem.classList.add('open');
        firstItem.querySelector('.fq-q')?.setAttribute('aria-expanded', 'true');
    }

    // ----------------------------------------------------------
    // 3. Recherche en temps réel
    // ----------------------------------------------------------
    const searchInput = document.getElementById('fq-search-input');
    const searchHint = document.getElementById('fq-search-hint');
    const noResults = document.getElementById('fq-no-results');
    const allGroups = document.querySelectorAll('.fq-cat-group');
    const mainContent = document.getElementById('fq-main');

    const clearSearch = () => {
        allItems.forEach(item => {
            item.style.display = '';
            item.classList.remove('fq-highlight');
        });
        allGroups.forEach(group => {
            group.style.display = '';
        });
        if (noResults) noResults.style.display = 'none';
        if (searchHint) searchHint.textContent = '';
    };

    const applySearch = (query) => {
        const q = query.trim().toLowerCase();

        if (!q) {
            clearSearch();
            return;
        }

        let totalVisible = 0;

        allGroups.forEach(group => {
            const items = group.querySelectorAll('.fq-item');
            let groupHits = 0;

            items.forEach(item => {
                const keywords = (item.dataset.keywords || '').toLowerCase();
                const qText = item.querySelector('.fq-q-text')?.textContent.toLowerCase() || '';
                const aText = item.querySelector('.fq-a-inner')?.textContent.toLowerCase() || '';
                const match = keywords.includes(q) || qText.includes(q) || aText.includes(q);

                item.style.display = match ? '' : 'none';
                item.classList.toggle('fq-highlight', match);

                if (match) {
                    groupHits++;
                    totalVisible++;
                    // Auto-ouvrir les résultats de recherche
                    item.classList.add('open');
                    item.querySelector('.fq-q')?.setAttribute('aria-expanded', 'true');
                } else {
                    item.classList.remove('open');
                }
            });

            group.style.display = groupHits > 0 ? '' : 'none';
        });

        if (noResults) {
            noResults.style.display = totalVisible === 0 ? 'flex' : 'none';
        }

        if (searchHint && q) {
            searchHint.textContent = totalVisible > 0
                ? `${totalVisible} résultat${totalVisible > 1 ? 's' : ''} pour "${q}"`
                : '';
        }
    };

    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => applySearch(e.target.value), 220);
        });

        // Raccourci clavier ⌘K / Ctrl+K
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                applySearch('');
                searchInput.blur();
            }
        });
    }

    // ----------------------------------------------------------
    // 4. Filtres catégories (cartes du haut + liens sidebar)
    // ----------------------------------------------------------
    const catCards = document.querySelectorAll('.fq-cat-card');
    const sidebarLinks = document.querySelectorAll('.fq-sidebar-link');

    const setActiveCategory = (cat) => {
        // Mettre à jour les cartes
        catCards.forEach(card => {
            card.classList.toggle('active', card.dataset.cat === cat);
        });
        // Mettre à jour la sidebar
        sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.cat === cat);
        });
        // Scroll vers le groupe
        const targetGroup = document.querySelector(`#cat-${cat}`);
        if (targetGroup) {
            const offset = 110;
            const top = targetGroup.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    catCards.forEach(card => {
        card.addEventListener('click', () => {
            // Si une recherche est active, la vider
            if (searchInput && searchInput.value.trim()) {
                searchInput.value = '';
                applySearch('');
            }
            setActiveCategory(card.dataset.cat);
        });
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (searchInput && searchInput.value.trim()) {
                searchInput.value = '';
                applySearch('');
            }
            setActiveCategory(link.dataset.cat);
        });
    });

    // ----------------------------------------------------------
    // 5. Mise à jour de la sidebar au scroll (IntersectionObserver)
    // ----------------------------------------------------------
    const observeGroups = () => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cat = entry.target.dataset.cat;
                        catCards.forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
                        sidebarLinks.forEach(l => l.classList.toggle('active', l.dataset.cat === cat));
                    }
                });
            },
            { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
        );

        allGroups.forEach(group => observer.observe(group));
    };

    observeGroups();

    // ----------------------------------------------------------
    // 6. Glow sur les cat cards (mouse tracking)
    // ----------------------------------------------------------
    catCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    // ----------------------------------------------------------
    // 7. Glow sur les contact cards (mouse tracking)
    // ----------------------------------------------------------
    document.querySelectorAll('.fq-contact-card--featured').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    // ----------------------------------------------------------
    // 8. Animation compteurs hero
    // ----------------------------------------------------------
    const statNums = document.querySelectorAll('.fq-stat-num[data-count]');

    const animateCount = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNums.forEach(el => counterObserver.observe(el));

    // ----------------------------------------------------------
    // 9. Scroll Reveal global
    // ----------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal:not(.active)');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );
        revealEls.forEach(el => revealObserver.observe(el));
    }

    // ----------------------------------------------------------
    // 10. Btn flip — géré uniquement en CSS via ::before / ::after
    // ----------------------------------------------------------

    // ----------------------------------------------------------
    // 11. Scroll indicator — masquer au scroll
    // ----------------------------------------------------------
    const scrollIndicator = document.querySelector('.fq-scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const hidden = window.scrollY > 80;
            scrollIndicator.style.opacity = hidden ? '0' : '';
            scrollIndicator.style.pointerEvents = hidden ? 'none' : '';
        }, { passive: true });

        scrollIndicator.addEventListener('click', () => {
            const target = document.querySelector('.fq-cats-section');
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    }

});