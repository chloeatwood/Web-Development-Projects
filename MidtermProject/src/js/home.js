fetch("../assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    const selectedData = data.recipes.slice(0, 3); // Select first 3 recipes
    const carouselInner = document.querySelector(".carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // Clear existing carousel items and indicators
    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    selectedData.forEach((item, index) => {
      const activeClass = index === 0 ? "active" : "";

      // Encode recipe details for the URL
      const queryString = `?name=${encodeURIComponent(
        item.name
      )}&imageUrl=${encodeURIComponent(
        item.imageUrl
      )}&description=${encodeURIComponent(
        item.description
      )}&price=${encodeURIComponent(item.price)}&tags=${encodeURIComponent(
        item.tags
      )}`;

      // Create carousel item
      const carouselItem = `
        <div class="carousel-item ${activeClass}">
          <img src="${item.imageUrl}" class="img-fluid" alt="${item.name}">
          <div class="container">
            <div class="carousel-caption text-start">
              <h1>${item.name}</h1>
              <p>${item.description}</p>
              <p>
                <a class="recipe-btn btn btn-success px-4 py-2 mt-3" href="../html/fullRecipeCard.html${queryString}">
                  Get Recipe
                </a>
              </p>
            </div>
          </div>
        </div>
      `;

      // Create carousel indicator
      const indicator = `
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index}" 
          class="${activeClass}" aria-label="Slide ${index + 1}"></button>
      `;

      // Append new elements
      carouselInner.innerHTML += carouselItem;
      carouselIndicators.innerHTML += indicator;
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));

function viewRecipe(name, imageUrl, description, price, tags) {
  const queryString = `?name=${encodeURIComponent(
    name
  )}&imageUrl=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(
    description
  )}&price=${encodeURIComponent(price)}&tags=${encodeURIComponent(tags)}`;

  // Redirect to fullRecipeCard.html with recipe details
  window.location.href = "../html/fullRecipeCard.html" + queryString;
}

// Apply the sections at the bottem of the homepage to browse by tag
document.addEventListener("DOMContentLoaded", function () {
  fetch("../assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      const allRecipes = data.recipes;
      const usedRecipes = new Set(); // Store recipe names already used

      const tagSections = document.getElementById("tag-sections");
      const row = document.createElement("div");
      row.classList.add("row");
      tagSections.appendChild(row);

      // Build 3 columns: Breakfast, Healthy, Dinner
      createTagColumn(row, "Breakfast", allRecipes, usedRecipes);
      createTagColumn(row, "Healthy", allRecipes, usedRecipes);
      createTagColumn(row, "Dinner", allRecipes, usedRecipes);
    })
    .catch((err) => console.error("Error fetching JSON:", err));

  // Returns recipes that include the specified tag
  function getRecipesByTag(recipes, tag) {
    return recipes.filter((recipe) => recipe.tags.includes(tag));
  }

  // Picks a random recipe from the list that hasn't been used
  function getRandomUnusedRecipe(recipes, usedRecipes) {
    const available = recipes.filter((recipe) => !usedRecipes.has(recipe.name));
    if (available.length === 0) return null;
    const randIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randIndex];
    usedRecipes.add(chosen.name);
    return chosen;
  }

  //  Creates one column with the desired tag
  function createTagColumn(row, tag, allRecipes, usedRecipes) {
    // Create the column div
    const col = document.createElement("div");
    col.classList.add("col-lg-4");
    row.appendChild(col);

    // Convert tag to lowercase
    const formattedTag = tag.toLowerCase();

    col.innerHTML = `
      <svg class="bd-placeholder-img rounded-circle" width="140" height="140"
          xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder"
          preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
      </svg>
      <h2 class="fw-normal" style="padding-top: 20px;">${tag}</h2>
      <p>Explore our delicious ${formattedTag} meal prep options.</p>
      <p><a class="recipe-btn" href="./recipes.html?tag=${encodeURIComponent(
        tag
      )}">Browse &raquo;</a></p>
    `;

    // Get matching recipes for this tag
    const matching = getRecipesByTag(allRecipes, tag);
    // Pick a random recipe from matching that hasn't been used yet
    const chosen = getRandomUnusedRecipe(matching, usedRecipes);

    if (chosen) {
      // Replace the SVG placeholder with the chosen recipe's image
      const svg = col.querySelector("svg");
      if (svg) {
        svg.outerHTML = `
          <img src="${chosen.imageUrl}" class="bd-placeholder-img rounded-circle"
               width="140" height="140" alt="${chosen.name}">
        `;
      }
    }
  }
});
