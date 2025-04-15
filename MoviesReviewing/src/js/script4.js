document.addEventListener("DOMContentLoaded", () => {
    const allReviewsContainer = document.getElementById("allReviews");
    const savedReviews = JSON.parse(localStorage.getItem("movieReviews")) || {};
    const movieDetails = JSON.parse(localStorage.getItem("movieDetails")) || {}; // Retrieve movie images

    if (Object.keys(savedReviews).length === 0) {
        allReviewsContainer.innerHTML = "<p>No reviews available.</p>";
        return;
    }

    for (let movieTitle in savedReviews) {
        const movieReviews = savedReviews[movieTitle];
        const movieSection = document.createElement("div");
        movieSection.classList.add("movie-review-section");

        // Get the movie image from stored details
        const movieImage = movieDetails[movieTitle]?.image || "default-placeholder.jpg"; // Use placeholder if missing

        // Add movie title and image
        movieSection.innerHTML = `
            <h2>${movieTitle}</h2>
            <img src="${movieImage}" alt="${movieTitle} poster" class="movie-image">
        `;

        movieReviews.forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.classList.add("review-item");
            reviewItem.innerHTML = `
                <p><strong>Rating:</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                <p>${review.reviewText}</p>
            `;
            movieSection.appendChild(reviewItem);
        });

        allReviewsContainer.appendChild(movieSection);
    }
});
