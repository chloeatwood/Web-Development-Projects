// Function to fetch and display movies
async function fetchAndDisplayMovies() {
    try {
        const response = await fetch("../assets/movies1.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const horrorMovies = data.horrorMovies; // Change this based on genre
        console.log("Fetched movies:", horrorMovies);

        // Retrieve existing stored movies
        let storedMovieDetails = JSON.parse(localStorage.getItem("movieDetails")) || {};

        // Add new movies without deleting previous ones
        horrorMovies.forEach(movie => {
            storedMovieDetails[movie.title] = { image: movie.image };
        });

        // Save updated movie details in localStorage
        localStorage.setItem("movieDetails", JSON.stringify(storedMovieDetails));

        loadMovies(horrorMovies);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    }
}



// Function to generate movie cards dynamically
function loadMovies(horrorMovies) {
    const container = document.getElementById("horror-Movie-list");
    container.innerHTML = ""; // Clear existing content

    if (!horrorMovies || horrorMovies.length === 0) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
    }

    // Generate cards for each movie (only 8 per page)
    const moviesToDisplay = horrorMovies.slice(0, 8);
    //const moviesToDisplay = horrorMovies.slice(4, 5); // Only show the 5th movie


    moviesToDisplay.forEach((movie) => {
        const { title, releaseYear, genre, cast, description, director, image } = movie;
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col");


        // Create Bootstrap card
        cardDiv.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${image}" class="card-img-top" alt="${title} poster">
                <div class="card-body">
                    <h5 class="card-title">${title} (${releaseYear})</h5>
                    <p class="card-text"><strong>Genre:</strong> ${genre}</p>
                    <p class="card-text"><strong>Cast:</strong> ${cast.join(', ')}</p>
                    <p class="card-text"><strong>Director:</strong> ${director}</p>
                    <p class="card-text">${description}</p>
                    <button class="btn btn-primary" onclick="navigateToReviewSubmission('${title}')">Write Review</button>
                    <button class="btn btn-secondary" onclick="navigateToReviewSummary()">View Reviews</button>
                </div>
            </div>
        `;

        // Append new movie card
        container.appendChild(cardDiv);
    });
}

// Function to search movies by title on the current page
function searchMovies() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const allMovies = document.querySelectorAll('.card');
    let foundMovies = 0;

    allMovies.forEach(movieCard => {
        const title = movieCard.querySelector('.card-title').innerText.toLowerCase();
        
        if (title.includes(searchQuery)) {
            movieCard.style.display = 'block';
            foundMovies++;
        } else {
            movieCard.style.display = 'none';
        }
    });

    if (foundMovies === 0) {
        document.getElementById('horror-Movie-list').innerHTML = "<p>No matching movies found.</p>";
    }
}

// Global reviews object to store reviews for each movie
let reviews = {};

// Open the modal when the "Write Review" button is clicked
function navigateToReviewSubmission(movieTitle) {
    const modal = document.getElementById("reviewModal");
    const reviewForm = document.getElementById("reviewForm");

    // Clear any previous review text
    document.getElementById("reviewText").value = ""; 

    // Display the modal
    modal.style.display = "block";

    // When the review form is submitted
    reviewForm.onsubmit = function(event) {
        event.preventDefault(); // Prevent default form submission

        const reviewText = document.getElementById("reviewText").value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value; // Get the selected rating

        if (reviewText && rating) {
            submitReview(movieTitle, reviewText, rating); // Function to handle review submission
            closeModal(); // Close the modal after submitting
        } else {
            alert("Please write a review and select a rating before submitting.");
        }
    };
}

// Close the modal when the "X" button is clicked
function closeModal() {
    const modal = document.getElementById("reviewModal");
    modal.style.display = "none";
}

// Function to handle the review submission
function submitReview(movieTitle, reviewText, rating) {
    // Load existing reviews from localStorage or initialize an empty object
    let savedReviews = JSON.parse(localStorage.getItem("movieReviews")) || {};

    // If the movie already has reviews, append the new review
    if (!savedReviews[movieTitle]) {
        savedReviews[movieTitle] = [];
    }

    // Push the new review into the movie's reviews array
    savedReviews[movieTitle].push({
        reviewText: reviewText,
        rating: rating
    });

    // Save back to localStorage
    localStorage.setItem("movieReviews", JSON.stringify(savedReviews));

    console.log(`Review saved for ${movieTitle}: ${reviewText} with rating ${rating}`);
}


// Function to navigate to the review summary page
function navigateToReviewSummary() {
    window.location.href = "../html/index4.html";
}

// Function to display the submitted reviews for a specific movie
function displayReviews(movieTitle) {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = ''; // Clear previous reviews

    if (!reviews[movieTitle] || reviews[movieTitle].length === 0) {
        reviewsList.innerHTML = '<p>No reviews submitted yet.</p>';
        return;
    }

    reviews[movieTitle].forEach((review) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        // Add the movie title, review text, and rating to the review item
        reviewItem.innerHTML = `
            <p><strong>Rating:</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
            <p>${review.reviewText}</p>
        `;

        // Append the review item to the reviews list
        reviewsList.appendChild(reviewItem);
    });
}

// Function to navigate back to the movies listing view
function backToMovies() {
    // Reset review section and show movie list
    document.getElementById('reviewsSection').style.display = 'none';
    document.getElementById('horror-Movie-list').style.display = 'flex';
}

// Fetch and display movies when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayMovies);

// Handle the search functionality
document.getElementById('searchBar').addEventListener('input', searchMovies);
