document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. Λειτουργία Hamburger Menu (με έλεγχο ασφαλείας)
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }


    // ==========================================
    // 2. Λειτουργία Back to Top (με έλεγχο ασφαλείας)
    // ==========================================
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ==========================================
    // 3. Αυτόματος Φωτισμός Ενεργού Συνδέσμου (Active Link)
    // ==========================================
    const pathArray = window.location.pathname.split("/");
    let currentPage = pathArray[pathArray.length - 1];

    if (currentPage === "" || currentPage === "index.html") {
        currentPage = "index.html";
    }

    const menuLinks = document.querySelectorAll(".nav-links a");

    menuLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        
        if (linkHref) {
            const linkPathArray = linkHref.split("/");
            const linkPage = linkPathArray[linkPathArray.length - 1];

            if (currentPage === linkPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    });


    // ==========================================
    // 4. Αυτόματη Ενημέρωση Έτους στο Footer
    // ==========================================
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 5. Λειτουργία για τα Skill Dots Animation
    // ==========================================
    const skillItems = document.querySelectorAll(".skill-bar-item");
    
    if (skillItems.length > 0) {
        console.log("Βρέθηκαν " + skillItems.length + " στοιχεία δεξιοτήτων.");
        skillItems.forEach((item) => {
            const level = parseInt(item.getAttribute("data-level")) || 0;
            const dots = item.querySelectorAll(".dot");

            dots.forEach((dot, index) => {
                if (index < level) {
                    setTimeout(() => {
                        dot.classList.add("active");
                    }, index * 120);
                }
            });
        });
    }

});


// ==========================================
// 6. Custom Cursor (Πράσινο Dot στη μύτη του βέλους)
// ==========================================
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

const speed = 0.15; // Ταχύτητα απόκρισης (smoothness)

if (cursorDot) {
    // Καταγράφουμε τη θέση του ποντικιού
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Το animation loop
    function animateCursor() {
        // Υπολογισμός της smooth κίνησης
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        /* 
          Αφαιρούμε 2px (cursorX - 2, cursorY - 2) στον τελικό μετασχηματισμό.
          Αυτό «τραβάει» το κέντρο της πράσινης κουκκίδας ακριβώς πάνω στην 
          πάνω αριστερή αιχμή (μύτη) του default λευκού κέρσορα συστήματος.
        */
        cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}


// ==========================================
// 7. Lightbox Λειτουργία (με πλήρη έλεγχο ασφαλείας)
// ==========================================
const lightbox = document.getElementById("custom-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
const triggers = document.querySelectorAll(".lightbox-trigger");

// Εκτελείται ΜΟΝΟ αν το lightbox υπάρχει στη συγκεκριμένη σελίδα
if (lightbox && lightboxImg && closeBtn) {
    
    // Άνοιγμα Lightbox
    triggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            lightbox.style.display = "flex";
            lightboxImg.src = this.src;
        });
    });

    // Κλείσιμο με το 'X'
    closeBtn.addEventListener("click", function() {
        lightbox.style.display = "none";
    });

    // Κλείσιμο με κλικ στο μαύρο background
    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('nav-links');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Ελέγχουμε αν το μενού είναι ανοιχτό (δηλαδή αν έχει την κλάση active ή open - άλλαξε το 'active' αν χρησιμοποιείς άλλη κλάση στο CSS σου για το άνοιγμα)
    const isMenuOpen = navLinks.classList.contains('active'); // <-- Τσέκαρε αν η κλάση ανοίγματος στο CSS σου λέγεται 'active' ή κάτι άλλο (π.χ. 'open')
    
    if (isMenuOpen) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnButton = mobileMenu.contains(event.target);
        
        // Αν το κλικ έγινε έξω από το κουμπί και έξω από τα links
        if (!isClickInsideMenu && !isClickOnButton) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active'); // Αν αφαιρείται κλάση και από το κουμπί
        }
    }
});