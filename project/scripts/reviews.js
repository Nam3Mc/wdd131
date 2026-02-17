/**
 * REVIEWS.JS - Las Repollas del Abuelo
 * Manages the review submission form and the dynamic display of testimonials.
 */

document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("product-review-form");
    const reviewList = document.getElementById("reviews-list");

    // 1. Initial Load: Display any existing reviews
    displayReviews();

    // 2. Handle Form Submission
    if (reviewForm) {
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Capture data from the form
            const newReview = {
                product: document.getElementById("product-choice").value,
                rating: parseInt(document.getElementById("rating").value),
                text: document.getElementById("review-text").value,
                date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                })
            };

            // Save to LocalStorage
            const reviews = JSON.parse(localStorage.getItem("userReviews")) || [];
            reviews.unshift(newReview); // Add to the beginning of the array
            localStorage.setItem("userReviews", JSON.stringify(reviews));

            // Reset Form and Refresh List
            reviewForm.reset();
            displayReviews();
            
            // Visual feedback
            alert("Thank you for your review! It has been posted.");
        });
    }

    /**
     * Renders the list of reviews into the feed container
     */
    function displayReviews() {
        if (!reviewList) return;
        
        const reviews = JSON.parse(localStorage.getItem("userReviews")) || [];
        
        if (reviews.length === 0) {
            reviewList.innerHTML = `
                <div class="no-reviews">
                    <p>No reviews yet. Be the first to try our Repollas and share your experience!</p>
                </div>
            `;
            return;
        }

        // Map the reviews into HTML structure
        reviewList.innerHTML = reviews.map(r => `
            <div class="review-card user-submitted">
                <div class="review-header">
                    <span class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
                    <span class="review-date">${r.date}</span>
                </div>
                <div class="review-content">
                    <h4>${r.product}</h4>
                    <p>"${r.text}"</p>
                </div>
            </div>
        `).join("");
    }
});