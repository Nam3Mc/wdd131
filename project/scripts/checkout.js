document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemsList = document.getElementById("checkout-items-list");
    const subtotalEl = document.getElementById("check-subtotal");
    const totalEl = document.getElementById("check-total");
    const shippingFeeEl = document.getElementById("shipping-fee-display");
    const shippingSection = document.getElementById("shipping-address-section");
    const checkoutForm = document.getElementById("checkout-form");
    const deliveryRadios = document.querySelectorAll('input[name="delivery-method"]');

    if (cart.length === 0) {
        window.location.href = "index.html";
        return;
    }

    // --- INITIAL RENDER ---
    let subtotal = 0;
    itemsList.innerHTML = "";
    cart.forEach(item => {
        subtotal += item.price * item.qty;
        const row = document.createElement("div");
        row.className = "summary-item-row"; // Add styling as needed
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        row.innerHTML = `<span>${item.qty}x ${item.name}</span><span>$${(item.price * item.qty).toFixed(2)}</span>`;
        itemsList.appendChild(row);
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    // --- CALCULATION LOGIC ---
    const updateTotals = () => {
        const selectedMethod = document.querySelector('input[name="delivery-method"]:checked').value;
        let shippingFee = selectedMethod === "delivery" ? 5.00 : 0.00;

        // Toggle address visibility
        if (selectedMethod === "pickup") {
            shippingSection.classList.add("hidden");
            // Remove 'required' from hidden inputs so form can submit
            shippingSection.querySelectorAll("input[required]").forEach(input => input.dataset.wasRequired = "true");
            shippingSection.querySelectorAll("input").forEach(input => input.required = false);
        } else {
            shippingSection.classList.remove("hidden");
            // Restore 'required' for visible inputs
            shippingSection.querySelectorAll("input").forEach(input => {
                if (input.dataset.wasRequired === "true") input.required = true;
            });
        }

        // Update UI
        shippingFeeEl.textContent = `$${shippingFee.toFixed(2)}`;
        totalEl.textContent = `$${(subtotal + shippingFee).toFixed(2)}`;
    };

    // Listen for changes in delivery method
    deliveryRadios.forEach(radio => {
        radio.addEventListener("change", updateTotals);
    });

    // Run once on load to set initial state
    updateTotals();

    // --- FORM SUBMISSION ---
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Order received! We are preparing your Repollas.");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });
});

