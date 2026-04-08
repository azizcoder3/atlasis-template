// ============================================================
//  SOLUTIONS.JS — Atlasis Solutions Page
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------
    // 1. Hero Canvas — particules montantes (reprise du style hero)
    // ----------------------------------------------------------
    const heroCanvas = document.querySelector('.sol-hero-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];

        const resize = () => {
            heroCanvas.width  = window.innerWidth;
            heroCanvas.height = window.innerHeight;
        };

        class Particle {
            constructor(initial = false) { this.reset(initial); }
            reset(initial = false) {
                this.x       = Math.random() * heroCanvas.width;
                this.y       = initial ? Math.random() * heroCanvas.height : heroCanvas.height + 5;
                this.r       = Math.random() * 1.5 + 0.2;
                this.alpha   = Math.random() * 0.45 + 0.05;
                this.speed   = Math.random() * 0.35 + 0.1;
                this.drift   = (Math.random() - 0.5) * 0.25;
                this.twinkle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y       -= this.speed;
                this.x       += this.drift;
                this.twinkle += 0.018;
                this.display  = this.alpha * (0.65 + 0.35 * Math.sin(this.twinkle));
                if (this.y < -4) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${this.display})`;
                ctx.fill();
            }
        }

        const init = () => {
            resize();
            const count = Math.min(Math.floor((heroCanvas.width * heroCanvas.height) / 6000), 150);
            particles = Array.from({ length: count }, () => new Particle(true));
        };

        const animate = () => {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };

        init();
        animate();
        window.addEventListener('resize', init);
    }

    // ----------------------------------------------------------
    // 2. CTA Canvas — même effet starfield
    // ----------------------------------------------------------
    const ctaCanvas = document.querySelector('.sol-cta-canvas');
    if (ctaCanvas) {
        const ctx2 = ctaCanvas.getContext('2d');
        let stars2 = [];

        const resizeCta = () => {
            const section = ctaCanvas.closest('.sol-cta');
            ctaCanvas.width  = section.offsetWidth;
            ctaCanvas.height = section.offsetHeight;
        };

        class Star {
            constructor(initial = false) { this.reset(initial); }
            reset(initial = false) {
                this.x       = Math.random() * ctaCanvas.width;
                this.y       = initial ? Math.random() * ctaCanvas.height : ctaCanvas.height + 5;
                this.r       = Math.random() * 1.2 + 0.2;
                this.alpha   = Math.random() * 0.4 + 0.08;
                this.speed   = Math.random() * 0.28 + 0.08;
                this.drift   = (Math.random() - 0.5) * 0.2;
                this.twinkle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y       -= this.speed;
                this.x       += this.drift;
                this.twinkle += 0.016;
                this.display  = this.alpha * (0.65 + 0.35 * Math.sin(this.twinkle));
                if (this.y < -4) this.reset();
            }
            draw() {
                ctx2.beginPath();
                ctx2.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx2.fillStyle = `rgba(255,255,255,${this.display})`;
                ctx2.fill();
            }
        }

        const initCta = () => {
            resizeCta();
            const count = Math.min(Math.floor((ctaCanvas.width * ctaCanvas.height) / 7500), 110);
            stars2 = Array.from({ length: count }, () => new Star(true));
        };

        const animateCta = () => {
            ctx2.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
            stars2.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animateCta);
        };

        initCta();
        animateCta();
        window.addEventListener('resize', initCta);
    }

    // ----------------------------------------------------------
    // 3. Solution Cards — mouse tracking glow
    // ----------------------------------------------------------
    const solCards = document.querySelectorAll('.sol-card');
    solCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mx', `${x}px`);
            card.style.setProperty('--my', `${y}px`);
        });
    });

    // ----------------------------------------------------------
    // 4. Scroll Reveal — réutilise l'IntersectionObserver global
    //    (déjà dans script.js via la classe .reveal)
    //    Ce bloc gère les éléments sol-* spécifiques si besoin
    // ----------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(el => observer.observe(el));
    }

    // ----------------------------------------------------------
    // 5. Metrics counter animation (hero)
    // ----------------------------------------------------------
    const metrics = document.querySelectorAll('.sol-metric-value');
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'sol-counter-in 0.6s cubic-bezier(0.23,1,0.32,1) forwards';
                metricObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(m => metricObserver.observe(m));

    // ----------------------------------------------------------
    // 6. Ecosystem logos — staggered entrance
    // ----------------------------------------------------------
    const ecoLogos = document.querySelectorAll('.sol-eco-logo');
    const ecoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logos = entry.target.querySelectorAll('.sol-eco-logo');
                logos.forEach((logo, i) => {
                    logo.style.transitionDelay = `${i * 0.05}s`;
                    logo.style.opacity = '1';
                    logo.style.transform = 'translateY(0)';
                });
                ecoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.sol-eco-category').forEach(cat => {
        const logos = cat.querySelectorAll('.sol-eco-logo');
        logos.forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(12px)';
            logo.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
        ecoObserver.observe(cat);
    });

    // ----------------------------------------------------------
    // 7. Step screens — trigger deploy animation on enter
    // ----------------------------------------------------------
    const deployFill = document.querySelector('.sol-deploy-fill');
    if (deployFill) {
        deployFill.style.animation = 'none';
        const depObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    deployFill.style.animation = 'deploy-fill 2s ease-out forwards';
                    depObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        depObserver.observe(deployFill);
    }

});