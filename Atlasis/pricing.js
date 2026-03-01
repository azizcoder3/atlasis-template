// ============================================================
//  PRICING.JS — Atlasis Tarifs Page
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------
    // 1. Hero Canvas — particules montantes
    // ----------------------------------------------------------
    const canvas = document.querySelector('.pr-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.closest('.pr-hero').offsetHeight;
        };

        class Particle {
            constructor(init = false) { this.reset(init); }
            reset(init = false) {
                this.x = Math.random() * canvas.width;
                this.y = init ? Math.random() * canvas.height : canvas.height + 5;
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

        const init = () => {
            resize();
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 6500), 140);
            particles = Array.from({ length: count }, () => new Particle(true));
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };

        init();
        animate();
        window.addEventListener('resize', init);
    }

    // ----------------------------------------------------------
    // 2. CTA Canvas — starfield
    // ----------------------------------------------------------
    const ctaCanvas = document.querySelector('.pr-cta-canvas');
    if (ctaCanvas) {
        const ctx2 = ctaCanvas.getContext('2d');
        let stars = [];

        const resizeCta = () => {
            ctaCanvas.width = ctaCanvas.closest('.pr-cta').offsetWidth;
            ctaCanvas.height = ctaCanvas.closest('.pr-cta').offsetHeight;
        };

        class Star {
            constructor(init = false) { this.reset(init); }
            reset(init = false) {
                this.x = Math.random() * ctaCanvas.width;
                this.y = init ? Math.random() * ctaCanvas.height : ctaCanvas.height + 5;
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

        const initCta = () => {
            resizeCta();
            const count = Math.min(Math.floor((ctaCanvas.width * ctaCanvas.height) / 8000), 100);
            stars = Array.from({ length: count }, () => new Star(true));
        };

        const animateCta = () => {
            ctx2.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
            stars.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animateCta);
        };

        initCta();
        animateCta();
        window.addEventListener('resize', initCta);
    }

    // ----------------------------------------------------------
    // 3. Pricing toggle — mensuel / annuel
    // ----------------------------------------------------------
    const toggle = document.getElementById('pr-toggle');
    const labelMonthly = document.getElementById('pr-label-monthly');
    const labelAnnual = document.getElementById('pr-label-annual');
    const amounts = document.querySelectorAll('.pr-amount[data-monthly]');
    const priceNotes = document.querySelectorAll('.pr-price-note');

    if (toggle) {
        const updatePrices = (isAnnual) => {
            amounts.forEach(el => {
                const from = isAnnual ? +el.dataset.monthly : +el.dataset.annual;
                const to = isAnnual ? +el.dataset.annual : +el.dataset.monthly;

                // Animate counter
                const start = performance.now();
                const duration = 400;

                const step = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(from + (to - from) * eased);
                    if (progress < 1) requestAnimationFrame(step);
                };

                requestAnimationFrame(step);
            });

            // Update price notes
            priceNotes.forEach(note => {
                note.textContent = isAnnual
                    ? 'Facturé annuellement (−20%)'
                    : 'Facturé mensuellement';
            });

            // Update labels
            labelMonthly.classList.toggle('pr-toggle-label--active', !isAnnual);
            labelAnnual.classList.toggle('pr-toggle-label--active', isAnnual);
        };

        toggle.addEventListener('change', () => updatePrices(toggle.checked));

        // Click on labels
        labelMonthly.addEventListener('click', () => { toggle.checked = false; updatePrices(false); });
        labelAnnual.addEventListener('click', () => { toggle.checked = true; updatePrices(true); });
    }

    // ----------------------------------------------------------
    // 4. Cards — mouse tracking glow
    // ----------------------------------------------------------
    document.querySelectorAll('.pr-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    // ----------------------------------------------------------
    // 5. FAQ accordion
    // ----------------------------------------------------------
    document.querySelectorAll('.pr-faq-item').forEach(item => {
        const btn = item.querySelector('.pr-faq-q');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.pr-faq-item.open').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.pr-faq-q').setAttribute('aria-expanded', 'false');
            });

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Open first item by default
    const firstItem = document.querySelector('.pr-faq-item');
    if (firstItem) {
        firstItem.classList.add('open');
        firstItem.querySelector('.pr-faq-q').setAttribute('aria-expanded', 'true');
    }

    // ----------------------------------------------------------
    // 6. Scroll reveal — fallback si script.js ne couvre pas
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
        }, { threshold: 0.1 });
        revealEls.forEach(el => observer.observe(el));
    }

    // ----------------------------------------------------------
    // 7. Btn flip — géré uniquement en CSS via ::before / ::after
    // (L'ajout de texte direct casse le layout flex avec les pseudo-éléments)

});