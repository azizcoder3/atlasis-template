/* =====================================================
   ATLASIS — blog-detail.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Barre de progression de lecture
    const progressBar = document.getElementById('bd-progress-bar');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            // Distance du scroll (depuis le haut)
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Hauteur totale défilable = hauteur totale du document - hauteur de la fenêtre visible
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            // Calcul du pourcentage
            const progress = (scrollTop / scrollHeight) * 100;

            // Appliquer au style de la barre
            progressBar.style.width = progress + '%';
        });
    }

    // 2. Dynamic Article Loading
    const urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get('id');

    // Fallback if ID is missing (Alternative requirement)
    if (!postId && typeof BLOG_DATABASE !== 'undefined' && BLOG_DATABASE.length > 0) {
        postId = BLOG_DATABASE[0].id;
    }

    if (postId && typeof BLOG_DATABASE !== 'undefined') {
        const post = BLOG_DATABASE.find(p => p.id === postId);

        if (post) {
            // Update document title
            document.title = `${post.title} — Blog Atlasis`;

            // Update tag
            const tagEl = document.querySelector('.bd-badge-wrap .badge-text');
            if (tagEl) tagEl.textContent = post.category;

            // Update title
            const titleEl = document.querySelector('.bd-title');
            if (titleEl) titleEl.textContent = post.title;

            // Update Author
            const authorImg = document.querySelector('.bd-author img');
            if (authorImg) {
                authorImg.src = post.authorAvatar;
                authorImg.alt = post.author;
            }
            const authorName = document.querySelector('.bd-author-name');
            if (authorName) authorName.textContent = post.author;

            // Update Date & Read Time
            const metaItems = document.querySelectorAll('.bd-meta-item');
            if (metaItems.length >= 2) {
                metaItems[0].innerHTML = `<iconify-icon icon="solar:calendar-linear"></iconify-icon> ${post.date}`;
                metaItems[1].innerHTML = `<iconify-icon icon="solar:clock-circle-linear"></iconify-icon> ${post.readTime}`;
            }

            // Update Featured Image
            const featuredImg = document.querySelector('.bd-featured-img');
            if (featuredImg) {
                featuredImg.src = post.image;
                featuredImg.alt = post.title;
            }

            // Update Content Area
            const contentArea = document.querySelector('.bd-content');
            if (contentArea) {
                const shareWrap = contentArea.querySelector('.bd-share-wrap');

                // Set content
                contentArea.innerHTML = post.content;

                // Re-append share wrap if it existed
                if (shareWrap) {
                    // Update tags
                    const tagsContainer = shareWrap.querySelector('.bd-tags');
                    if (tagsContainer) {
                        tagsContainer.innerHTML = `<a href="#" class="bd-tag">${post.category}</a>`;
                    }
                    contentArea.appendChild(shareWrap);
                }
            }

            // Populate Similar Articles
            const similarGrid = document.getElementById('similar-articles-grid');
            if (similarGrid) {
                // Filter current post and pick 3 random ones
                const others = BLOG_DATABASE.filter(p => p.id !== postId);
                const shuffled = others.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 3);

                selected.forEach((art, index) => {
                    const card = document.createElement('article');
                    card.className = `bl-card reveal stagger-${index + 2}`;

                    // Determine category class
                    let catClass = 'bl-cat-ia';
                    if (art.category.includes('Data')) catClass = 'bl-cat-data';
                    if (art.category.includes('Cloud')) catClass = 'bl-cat-cloud';
                    if (art.category.includes('Stratégie')) catClass = 'bl-cat-strategy';
                    if (art.category.includes('Sécurité')) catClass = 'bl-cat-securite';

                    card.innerHTML = `
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
                            <a href="blog-detail.html?id=${art.id}" class="bl-card-link">
                                Lire la suite
                                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                            </a>
                        </div>
                    `;
                    similarGrid.appendChild(card);
                });

                // Trigger animations for new cards
                if (typeof revealObserver !== 'undefined') {
                    similarGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
                } else {
                    // Fallback if observer not in scope or defined elsewhere
                    setTimeout(() => {
                        similarGrid.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
                    }, 500);
                }
            }

        } else {
            showError();
        }
    } else if (postId) {
        // ID present but posts not found
        showError();
    } // else: no ID, keep default page or show error? Requirement says "Si l'ID n'existe pas, la page doit afficher un message 'Article non trouvé'". So "else showError()".
    else {
        showError();
    }

    function showError() {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = `
                <section style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:80vh; text-align:center;">
                    <iconify-icon icon="solar:ghost-bold-duotone" style="font-size: 5rem; color: var(--accent-color); margin-bottom: 1rem;"></iconify-icon>
                    <h1 style="color:var(--text-primary); font-size:3rem; margin-bottom:1rem;">Article non trouvé</h1>
                    <p style="color:var(--text-secondary); margin-bottom:2rem; font-size: 1.1rem;">L'article que vous recherchez a disparu dans le cloud ou n'existe pas.</p>
                    <a href="blog.html" class="btn btn-primary" style="padding: 12px 30px; font-weight: 600;">Retour aux articles</a>
                </section>
            `;
        }
    }
});
