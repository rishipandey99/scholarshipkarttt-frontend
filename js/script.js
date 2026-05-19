document.body.classList.add("is-loading");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const serviceCopy = {
    planning: {
        title: "Planning Stage",
        text: "ScholarshipKart is an IT-enabled education consultancy focused on helping students plan their international education with accurate, real-time information on universities.",
    },
    application: {
        title: "Application Stage",
        text: "Get guided support for university shortlisting, document checks, statement writing, admission forms, and scholarship applications.",
    },
    execution: {
        title: "Execution Stage",
        text: "Move ahead with visa guidance, education loan assistance, interview preparation, and final pre-departure support.",
    },
};

window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");

    window.setTimeout(() => {
        preloader?.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
    }, prefersReducedMotion ? 0 : 450);
});

document.addEventListener("DOMContentLoaded", () => {
    initStickyHeader();
    initReveal();
    initServiceTabs();
    initSliders();
    initForms();
});

function initStickyHeader() {
    const header = document.querySelector("[data-header]");
    const backToTop = document.querySelector("[data-back-to-top]");

    const update = () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 20);
        backToTop?.classList.toggle("is-visible", window.scrollY > 520);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

    document.querySelectorAll(".navbar a[href^='#']").forEach((link) => {
        link.addEventListener("click", () => {
            const menu = document.querySelector("#mainMenu");
            if (!menu?.classList.contains("show")) return;
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        });
    });
}

function initReveal() {
    const items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
}

function initServiceTabs() {
    const tabs = document.querySelectorAll("[data-service]");
    const title = document.querySelector("[data-service-title]");
    const text = document.querySelector("[data-service-text]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const current = serviceCopy[tab.dataset.service];
            if (!current) return;

            tabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");
            title.textContent = current.title;
            text.textContent = current.text;
        });
    });
}

function initSliders() {
    if (typeof Swiper === "undefined") return;

    new Swiper(".programmeSwiper", {
        slidesPerView: 1,
        spaceBetween: 26,
        speed: 650,
        loop: true,
        grabCursor: true,
        autoplay: prefersReducedMotion ? false : { delay: 3800, disableOnInteraction: false },
        navigation: {
            nextEl: ".programme-next",
            prevEl: ".programme-prev",
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
        },
    });

    new Swiper(".testimonialSwiper", {
        slidesPerView: 1,
        spaceBetween: 12,
        speed: 650,
        loop: true,
        grabCursor: true,
        autoplay: prefersReducedMotion ? false : { delay: 3200, disableOnInteraction: false },
        breakpoints: {
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
        },
    });
}

function initForms() {
    const forms = [
        { form: document.querySelector("[data-contact-form]"), note: document.querySelector("[data-form-note]") },
        { form: document.querySelector("[data-footer-form]"), note: document.querySelector("[data-footer-note]") },
    ];

    forms.forEach(({ form, note }) => {
        form?.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const firstName = String(formData.get("name") || "").trim().split(" ")[0] || "there";

            note.textContent = `Thanks, ${firstName}. Our counsellor will contact you shortly.`;
            form.reset();
        });
    });
}
