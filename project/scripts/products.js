/**
 * PRODUCTS.JS - Las Repollas del Abuelo
 * Defines the product catalog and handles home page rendering.
 */

const products = [
    { id: 1, name: "Classic Vanilla", price: 2.50, category: "Traditional", image: "images/classic.webp", desc: "Pastry cream infused with natural vanilla beans." },
    { id: 2, name: "Belgian Chocolate", price: 3.00, category: "Premium", image: "images/choco.webp", desc: "70% cocoa chocolate glaze with a creamy filling." },
    { id: 3, name: "Salted Caramel", price: 3.25, category: "Premium", image: "images/caramel.webp", desc: "Perfect balance between sweetness and a touch of sea salt." },
    { id: 4, name: "Wild Berries", price: 2.75, category: "Fruity", image: "images/berry.webp", desc: "Filled with yogurt cream and fresh raspberry coulis." },
    { id: 5, name: "Sicilian Pistachio", price: 3.50, category: "Exotic", image: "images/pistachio.webp", desc: "Pure toasted pistachio cream with crunchy bits." },
    { id: 6, name: "Espresso Coffee", price: 2.75, category: "Traditional", image: "images/coffee.webp", desc: "For lovers of intense coffee and smooth pastry cream." },
    { id: 7, name: "Lemon Meringue", price: 3.00, category: "Fruity", image: "images/lemon.webp", desc: "Refreshing citrus curd with a touch of toasted meringue." },
    { id: 8, name: "Dulce de Leche", price: 2.50, category: "Traditional", image: "images/ddl.webp", desc: "The South American classic that never fails." },
    { id: 9, name: "Hazelnut & Nutella", price: 3.25, category: "Premium", image: "images/hazelnut.webp", desc: "Silky hazelnut filling topped with creamy chocolate." },
    { id: 10, name: "Gold Edition (Saffron)", price: 4.50, category: "Exotic", image: "images/gold.webp", desc: "A unique gourmet experience with saffron and honey." }
];

// Function to render products on the Home page
function displayProducts(filteredProducts) {
    const container = document.getElementById("product-grid");
    if (!container) return; // Safety check
    
    container.innerHTML = ""; // Clear before rendering

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="category-tag">${product.category}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="price-action">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" class="add-to-cart" aria-label="Add ${product.name} to cart">
                        + Add
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * Initial Render
 */
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
});