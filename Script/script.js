// Παίρνουμε το κουμπί
const backToTopBtn = document.getElementById("backToTop");

// Όταν ο χρήστης σκρολάρει, τρέχει η συνάρτηση
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    // Εμφανίζεται αν σκρολάρουμε πάνω από 300px από την κορυφή
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

// Όταν πατηθεί το κουμπί, πηγαίνει στην κορυφή
backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Ομαλό σκρολάρισμα
    });
});