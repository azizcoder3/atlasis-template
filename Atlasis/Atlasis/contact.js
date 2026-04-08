// ============================================================
//  CONTACT.JS — Atlasis · Page Nous Contacter
// ============================================================
'use strict';

document.addEventListener('DOMContentLoaded', () => {




    // ----------------------------------------------------------
    // 2. CANVAS — Particules flottantes (hero)
    // ----------------------------------------------------------
    const canvas = document.getElementById('ct-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouseX = -1000, mouseY = -1000;

        const hero = canvas.closest('.ct-hero');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = hero.offsetHeight;
        };

        // Suivi de la souris pour repulsion légère
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        hero.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        class Particle {
            constructor(init = false) { this.reset(init); }

            reset(init = false) {
                this.x = Math.random() * canvas.width;
                this.y = init ? Math.random() * canvas.height : canvas.height + 10;
                this.r = Math.random() * 1.6 + 0.3;
                this.baseAlpha = Math.random() * 0.4 + 0.06;
                this.alpha = this.baseAlpha;
                this.speedY = Math.random() * 0.35 + 0.08;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.twinkle = Math.random() * Math.PI * 2;
                this.twinkleSpeed = Math.random() * 0.02 + 0.008;
                // Teinte : blanc ou bleu
                this.isBlue = Math.random() < 0.15;
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.twinkle += this.twinkleSpeed;
                this.alpha = this.baseAlpha * (0.65 + 0.35 * Math.sin(this.twinkle));

                // Répulsion légère du curseur
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 80) {
                    const force = (80 - dist) / 80;
                    this.x += (dx / dist) * force * 0.8;
                    this.y += (dy / dist) * force * 0.8;
                    this.alpha = Math.min(this.alpha * (1 + force * 1.5), 0.9);
                }

                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) this.reset();
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                if (this.isBlue) {
                    ctx.fillStyle = `rgba(80,140,255,${this.alpha})`;
                } else {
                    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
                }
                ctx.fill();
            }
        }

        // Connexions entre particules proches
        const drawConnections = () => {
            const maxDist = 100;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0,102,255,${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const initParticles = () => {
            resizeCanvas();
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 5500), 160);
            particles = Array.from({ length: count }, () => new Particle(true));
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawConnections();
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };

        initParticles();
        animate();
        window.addEventListener('resize', initParticles);
    }

    // ----------------------------------------------------------
    // 3. MOUSE TRACKING GLOW — cartes de canal
    // ----------------------------------------------------------
    document.querySelectorAll('.ct-channel-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    // ----------------------------------------------------------
    // 4. SUBJECT PILLS
    // ----------------------------------------------------------
    const pills = document.querySelectorAll('.ct-pill');
    const subjectVal = document.getElementById('ct-subject-val');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('ct-pill--active'));
            pill.classList.add('ct-pill--active');
            if (subjectVal) subjectVal.value = pill.dataset.subject;
        });
    });

    // ----------------------------------------------------------
    // 5. CHARACTER COUNT — textarea
    // ----------------------------------------------------------
    const textarea = document.getElementById('ct-message');
    const charCount = document.getElementById('ct-char-count');

    if (textarea && charCount) {
        const updateCount = () => {
            const len = textarea.value.length;
            const max = textarea.maxLength || 600;
            charCount.textContent = `${len} / ${max}`;
            charCount.classList.toggle('ct-char-count--warn', len >= max * 0.8 && len < max);
            charCount.classList.toggle('ct-char-count--max', len >= max);
        };

        textarea.addEventListener('input', updateCount);
    }

    // ----------------------------------------------------------
    // 6. VALIDATION FORMULAIRE + SUBMIT
    // ----------------------------------------------------------
    const form = document.getElementById('ct-form');
    const submitBtn = document.getElementById('ct-submit');
    const success = document.getElementById('ct-success');
    const confirmEmail = document.getElementById('ct-confirm-email');

    const validators = {
        'ct-firstname': (v) => v.trim().length >= 2 ? '' : 'Prénom trop court (min. 2 caractères)',
        'ct-lastname': (v) => v.trim().length >= 2 ? '' : 'Nom trop court (min. 2 caractères)',
        'ct-email': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Adresse email invalide',
        'ct-message': (v) => v.trim().length >= 20 ? '' : 'Message trop court (min. 20 caractères)',
    };

    const showError = (field, msg) => {
        const input = document.getElementById(field);
        if (!input) return;
        const error = input.closest('.ct-field')?.querySelector('.ct-error');
        if (!error) return;

        if (msg) {
            input.classList.add('ct-input--error');
            error.textContent = msg;
            error.classList.add('ct-error--visible');
        } else {
            input.classList.remove('ct-input--error');
            error.textContent = '';
            error.classList.remove('ct-error--visible');
        }
    };

    // Validation en temps réel sur blur
    Object.keys(validators).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (!input) return;
        input.addEventListener('blur', () => {
            showError(fieldId, validators[fieldId](input.value));
        });
        input.addEventListener('input', () => {
            if (input.classList.contains('ct-input--error')) {
                showError(fieldId, validators[fieldId](input.value));
            }
        });
    });

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Valider tous les champs
            let hasError = false;

            Object.keys(validators).forEach(fieldId => {
                const input = document.getElementById(fieldId);
                if (!input) return;
                const msg = validators[fieldId](input.value);
                showError(fieldId, msg);
                if (msg) hasError = true;
            });

            // RGPD
            const gdpr = document.getElementById('ct-gdpr');
            const gdprError = document.getElementById('ct-gdpr-error');
            if (gdpr && !gdpr.checked) {
                gdprError.textContent = 'Vous devez accepter la politique de confidentialité';
                gdprError.classList.add('ct-error--visible');
                hasError = true;
            } else if (gdprError) {
                gdprError.textContent = '';
                gdprError.classList.remove('ct-error--visible');
            }

            if (hasError) {
                // Shake animation sur le bouton
                submitBtn.style.animation = 'none';
                submitBtn.offsetHeight; // reflow
                submitBtn.style.animation = 'ct-shake 0.35s ease';
                setTimeout(() => submitBtn.style.animation = '', 400);
                return;
            }

            // ── État loading ──
            submitBtn.classList.add('ct-submit--loading');
            submitBtn.disabled = true;

            // Simulation envoi (remplacer par fetch() réel)
            await new Promise(res => setTimeout(res, 1800));

            // ── Succès ──
            submitBtn.classList.remove('ct-submit--loading');
            submitBtn.style.display = 'none';

            const emailInput = document.getElementById('ct-email');
            if (confirmEmail && emailInput) {
                confirmEmail.textContent = emailInput.value;
            }

            if (success) {
                success.classList.add('ct-success--visible');
            }

            // Confetti-like burst via CSS
            triggerSuccessParticles();
        });
    }

    // Shake keyframe injection dynamique
    if (!document.querySelector('#ct-shake-style')) {
        const style = document.createElement('style');
        style.id = 'ct-shake-style';
        style.textContent = `
            @keyframes ct-shake {
                0%,100% { transform: translateX(0); }
                20%      { transform: translateX(-6px); }
                40%      { transform: translateX(6px); }
                60%      { transform: translateX(-4px); }
                80%      { transform: translateX(4px); }
            }
        `;
        document.head.appendChild(style);
    }

    // ----------------------------------------------------------
    // 7. SUCCESS PARTICLES — mini burst sur succès
    // ----------------------------------------------------------
    const triggerSuccessParticles = () => {
        const formWrap = document.querySelector('.ct-form-wrap');
        if (!formWrap) return;

        for (let i = 0; i < 18; i++) {
            const dot = document.createElement('span');
            const angle = (Math.PI * 2 / 18) * i;
            const radius = 60 + Math.random() * 60;
            const size = 4 + Math.random() * 4;
            const isBlue = Math.random() < 0.5;

            Object.assign(dot.style, {
                position: 'fixed',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: isBlue ? '#0066ff' : '#ffffff',
                left: `50%`,
                top: `50%`,
                pointerEvents: 'none',
                zIndex: '9999',
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.8s cubic-bezier(0.23,1,0.32,1)',
                opacity: '1',
            });

            document.body.appendChild(dot);

            // Trigger animation
            requestAnimationFrame(() => {
                dot.style.transform = `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))`;
                dot.style.opacity = '0';
            });

            setTimeout(() => dot.remove(), 900);
        }
    };

    // ----------------------------------------------------------
    // 8. SCROLL REVEAL — fallback si script.js ne couvre pas
    // ----------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal:not(.active)');
    if (revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    // ----------------------------------------------------------
    // 9. COUNTER ANIMÉ — section proof
    // ----------------------------------------------------------
    const counters = document.querySelectorAll('.ct-proof-num[data-target]');

    const animateCounter = (el) => {
        const target = +el.dataset.target;
        const duration = 1800;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => counterObserver.observe(el));
    }

    // ----------------------------------------------------------
    // 10. CHAT DEMO — ouvre un faux chat live
    // ----------------------------------------------------------
    const openChatBtn = document.getElementById('ct-open-chat');
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            // Intégration réelle : Intercom, Crisp, Drift, etc.
            // Pour la démo : notification visuelle
            const notif = document.createElement('div');
            Object.assign(notif.style, {
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                background: 'rgba(0,102,255,0.95)',
                color: '#fff',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '0.88rem',
                fontWeight: '700',
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                zIndex: '10000',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 30px rgba(0,102,255,0.5)',
                transform: 'translateY(80px)',
                opacity: '0',
                transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
            });
            notif.textContent = '💬 Connexion au chat en cours…';
            document.body.appendChild(notif);

            requestAnimationFrame(() => {
                notif.style.transform = 'translateY(0)';
                notif.style.opacity = '1';
            });

            setTimeout(() => {
                notif.style.transform = 'translateY(80px)';
                notif.style.opacity = '0';
                setTimeout(() => notif.remove(), 400);
            }, 3000);
        });
    }

    // ----------------------------------------------------------
    // 11. INPUTS — focus animation & label float effect
    // ----------------------------------------------------------
    document.querySelectorAll('.ct-input').forEach(input => {
        // Feedback sonore/visuel sur validation
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                const next = input.closest('.ct-field')?.nextElementSibling?.querySelector('.ct-input');
                if (next) next.focus();
            }
        });
    });

});