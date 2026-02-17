/**
 * MAIN.JS - Las Repollas del Abuelo
 * Unified logic for Navigation, Reviews, and Cart Persistence.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. ELEMENT SELECTORS
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const track = document.getElementById("product-grid");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const yearSpan = document.getElementById("currentyear");
    const lastMod = document.getElementById("lastModified");

    // 2. NAVIGATION LOGIC (Mobile Menu)
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.innerHTML = isOpen ? "✕" : "≡";
        });

        // Close menu when clicking on a link
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.innerHTML = "≡";
            });
        });
    }

    // 3. PRODUCT CAROUSEL LOGIC
    if (nextBtn && prevBtn && track) {
        const getScrollAmount = () => {
            // Calculate the width of the first card dynamically
            const firstCard = track.querySelector(".product-card");
            return firstCard ? firstCard.offsetWidth + 32 : 300;
        };

        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // 4. INITIALIZE REVIEWS (Infinite Loop)
    initReviews();

    // 5. FOOTER DATA (Dates and Modification)
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = document.lastModified;
});

/**
 * REVIEWS LOGIC
 */
function initReviews() {
    const track = document.getElementById("reviews-track");
    if (!track) return;

    const reviews = [
        { name: "John Smith", text: "The best repollas I've tasted in years, absolutely incredible!", stars: 5 },
        { name: "Mary Garcia", text: "The pistachio one is from another world. Very professional service.", stars: 5 },
        { name: "Charles Davis", text: "Reminded me of the sweets my grandmother used to make. 100% recommended.", stars: 5 },
        { name: "Anna White", text: "Perfect texture and the cream isn't too sweet. Just right.", stars: 4 },
        { name: "Luis Miller", text: "Shipping was fast and they arrived fresh. Great quality.", stars: 5 },
        { name: "Ellen S.", text: "Tried the Belgian chocolate one and it's a masterpiece.", stars: 5 },
        { name: "Robert V.", text: "Excellent customer service and impeccable presentation.", stars: 5 },
        { name: "Lucy M.", text: "Perfect for gifts, the packaging is beautiful.", stars: 4 },
        { name: "Peter J.", text: "Pure tradition. You can taste the love in every bite.", stars: 5 },
        { name: "Sophie T.", text: "My favorite dessert from now on. Thank you!", stars: 5 }
    ];

    const content = reviews.map(rev => `
        <div class="review-card">
            <div class="stars">${"★".repeat(rev.stars)}${"☆".repeat(5 - rev.stars)}</div>
            <p>"${rev.text}"</p>
            <h4>- ${rev.name}</h4>
        </div>
    `).join('');

    // Duplicate content for the visual infinite scroll effect
    track.innerHTML = content + content;
}

/**
 * GLOBAL CART LOGIC (Accessible from index and cart)
 */
window.addToCart = function(id) {
    // Note: 'products' must be defined in products.js or globally
    if (typeof products === 'undefined') {
        console.error("Error: The 'products' array is not loaded.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);

    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Visual feedback on the button
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = "✓ Added";
    btn.style.backgroundColor = "#28a745"; // Success green

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = ""; // Reverts to original (chocolate)
    }, 1500);
}