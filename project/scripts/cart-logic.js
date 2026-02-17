/**
 * CART-LOGIC.JS - Las Repollas del Abuelo
 * Handles the shopping cart rendering, quantity updates, and calculations.
 */

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items-container");
    const subtotalEl = document.getElementById("subtotal");
    const finalTotalEl = document.getElementById("final-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    // 1. Check if the cart is empty
    if (cart.length === 0) {
        if (container) {
            container.innerHTML = `
                <div class="empty-cart-msg">
                    <p>Your cart is currently empty.</p>
                    <a href="index.html" class="cta-button">Browse Products</a>
                </div>`;
        }
        
        if (subtotalEl) subtotalEl.textContent = `$0.00`;
        if (finalTotalEl) finalTotalEl.textContent = `$0.00`;
        
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.innerHTML = "Proceed to Checkout";
            checkoutBtn.classList.remove("btn-active");
            checkoutBtn.onclick = null; // Remove click action if empty
        }
        return;
    }

    // 2. Render items if cart has products
    if (container) {
        container.innerHTML = ""; // Clear container
        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.qty;
            
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                        <button class="delete-btn" onclick="removeItem(${index})" 
                                style="margin-left: 20px; background:none; border:none; cursor:pointer; font-size: 1.2rem;">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(itemElement);
        });

        // 3. Final Calculations
        const shipping = 5.00;
        const total = subtotal + shipping;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (finalTotalEl) finalTotalEl.textContent = `$${total.toFixed(2)}`;

        // 4. Update Checkout Button action and text
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = `Proceed to Pay $${total.toFixed(2)}`;
            checkoutBtn.classList.add("btn-active");
            
            // Link to the checkout page
            checkoutBtn.onclick = () => {
                window.location.href = "checkout.html";
            };
        }
    }
}

/**
 * Update product quantity
 */
window.updateQty = (index, change) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart[index]) {
        cart[index].qty += change;

        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
};

/**
 * Remove item from cart completely
 */
window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};