const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navOverlay = document.getElementById("nav-overlay");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("show-menu");
        if (isOpen) {
            closeMenu();
        } else {
            navMenu.classList.add("show-menu");
            navOverlay.classList.add("show");
            navToggle.classList.add("active");
            navToggle.setAttribute("aria-expanded", "true");
        }
    });
}

function closeMenu() {
    navMenu.classList.remove("show-menu");
    navOverlay.classList.remove("show");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
}

if (navClose) {
    navClose.addEventListener("click", closeMenu);
}

if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
}

const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

const rotatingEl = document.querySelector(".hero__rotating");
if (rotatingEl) {
    let words = [];
    try { words = JSON.parse(rotatingEl.dataset.words); } catch(e) {}
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % words.length;
        rotatingEl.textContent = words[idx];
    }, 3000);
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
