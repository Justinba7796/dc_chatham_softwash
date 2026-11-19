
const hero = document.querySelector(".hero");

let ticking = false;

function updateWater() {
    // How far has the visitor scrolled?
    const scrollDistance = window.scrollY;

    // How tall is the hero section?
    const heroHeight = hero.offsetHeight;

    // Convert scrolling into a value between 0 and 1
    const progress = Math.min(
        Math.max(scrollDistance / heroHeight, 0),
        1
    );

    // Send the value to CSS
    hero.style.setProperty("--scroll", progress);

    ticking = false;
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(updateWater);
        ticking = true;
    }
}

window.addEventListener("scroll", onScroll, {
    passive: true
});

window.addEventListener("resize", onScroll);

updateWater();

const comparison = document.querySelector(".comparison");
const slider = document.querySelector(".comparison-slider");

slider.addEventListener("input", function () {
    comparison.style.setProperty(
        "--position",
        slider.value + "%"
    );
});

/* ==============================
   MOBILE HAMBURGER MENU
============================== */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu when a navigation link is clicked
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });

    // Close menu when switching back to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navigation.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}
