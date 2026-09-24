/* ============================================
   PORTAFOLIO — AMARO LEZANA MUÑOZ
   Script Principal
   ============================================ */

// ---- Arreglo de Proyectos ----
const proyectos = [
    {
        id: 1,
        nombre: "Camino a la Leyenda",
        descripcion: "Juego de fútbol escolar interactivo donde el jugador debe superar desafíos para convertirse en leyenda.",
        tecnologias: ["HTML", "CSS", "Java/JS"],
        link: "https://lezana07.github.io/camino-leyenda/",
        icono: "bi-controller",
        iconClass: "icon-1"
    },
    {
        id: 2,
        nombre: "Tienda Urbana",
        descripcion: "Página de e-commerce creada como proyecto Coef 2 del liceo, con catálogo de productos y diseño moderno.",
        tecnologias: ["HTML", "CSS", "Java/JS"],
        link: "https://lezana07.github.io/coef2/",
        icono: "bi-shop",
        iconClass: "icon-2"
    }
];

// ---- Renderizar Proyectos Dinámicamente ----
function renderProyectos() {
    const contenedor = document.getElementById("projects-container");
    if (!contenedor) return;

    contenedor.innerHTML = proyectos.map(proyecto => `
        <div class="col-md-6 col-lg-5">
            <div class="glass-card project-card reveal">
                <div class="project-header">
                    <span class="project-number">0${proyecto.id}</span>
                    <div class="project-icon ${proyecto.iconClass}">
                        <i class="bi ${proyecto.icono}"></i>
                    </div>
                </div>
                <div class="project-body">
                    <h3>${proyecto.nombre}</h3>
                    <p>${proyecto.descripcion}</p>
                    <div class="project-techs">
                        ${proyecto.tecnologias.map(tech => `<span>${tech}</span>`).join("")}
                    </div>
                </div>
                <div class="project-footer">
                    <a href="${proyecto.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                        Ver proyecto <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join("");
}

// ---- Navbar: efecto scroll ----
function initNavbarScroll() {
    const nav = document.querySelector(".glass-nav");
    if (!nav) return;

    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 50);
    });
}

// ---- Cerrar menú móvil al hacer clic en un enlace ----
function initMobileNavClose() {
    const navLinks = document.querySelectorAll(".glass-nav .nav-link");
    const collapse = document.getElementById("navbarContent");
    if (!collapse) return;

    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });
}

// ---- Active nav link highlight on scroll ----
function initActiveNavHighlight() {
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".glass-nav .nav-link");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" });

    sections.forEach(section => observer.observe(section));
}

// ---- Scroll Reveal Animation ----
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal, .glass-card, .timeline-item, .skill-chip");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("revealed");
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

// ---- Skill Bars Animation ----
function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-fill");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.style.getPropertyValue("--fill");
                entry.target.style.width = fill;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ---- Smooth scroll for all anchor links ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

// ---- Initialize Everything on DOM Ready ----
document.addEventListener("DOMContentLoaded", () => {
    renderProyectos();
    initNavbarScroll();
    initMobileNavClose();
    initActiveNavHighlight();
    initSmoothScroll();
    initFooterYear();
    initBackToTop();

    // Small delay to let DOM paint before activating animations
    requestAnimationFrame(() => {
        initScrollReveal();
        initSkillBars();
    });
});

// ---- Dynamic Footer Year ----
function initFooterYear() {
    const footer = document.querySelector(".site-footer p");
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace(/\d{4}/, year);
    }
}

// ---- Back to Top Button ----
function initBackToTop() {
    // Create button dynamically
    const btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.setAttribute("aria-label", "Volver al inicio");
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(108, 92, 231, 0.15);
        color: #a29bfe;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.35s ease;
        z-index: 999;
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(btn);

    // Show/hide on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btn.style.opacity = "1";
            btn.style.visibility = "visible";
        } else {
            btn.style.opacity = "0";
            btn.style.visibility = "hidden";
        }
    });

    // Scroll to top on click
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Hover effect
    btn.addEventListener("mouseenter", () => {
        btn.style.background = "rgba(108, 92, 231, 0.35)";
        btn.style.transform = "translateY(-3px)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.background = "rgba(108, 92, 231, 0.15)";
        btn.style.transform = "translateY(0)";
    });
}
