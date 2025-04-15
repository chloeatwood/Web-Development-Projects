// Global variable to store recipes after fetching
let allRecipesGlobal = [];

// Fetch and display recipes
async function fetchAndDisplayRecipes() {
  try {
    const response = await fetch("../assets/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    allRecipesGlobal = data.recipes;
    // Display all recipes and generate filters
    displayRecipes(allRecipesGlobal);
    generateTagFilters(allRecipesGlobal);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
}

// Function to generate recipe cards dynamically
function displayRecipes(recipes) {
  const container = document.getElementById("recipe-container");
  container.innerHTML = ""; // Clear existing content

  if (!recipes || recipes.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.imageUrl}" alt="${recipe.name}" width="200">
         <h3>Tags:</h3>
          <ul>${
            Array.isArray(recipe.tags)
              ? recipe.tags.map((tag) => `<li>${tag}</li>`).join("")
              : `<li>${recipe.tags}</li>`
          }</ul>
          <h3>Description:</h3>
          <p>${recipe.description}</p>
          <h3>Price:</h3>
          <p>${recipe.price}</p>
          <button onclick="viewRecipe('${recipe.name}', '${
      recipe.imageUrl
    }', '${recipe.description}', '${recipe.price}', '${
      recipe.tags
    }')">View More</button>
                `;

    container.appendChild(card);
  });
}

// Function to redirect to recipe details page
function viewRecipe() {
  //const queryString = `?name=${encodeURIComponent(name)}&imageUrl=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}&price=${encodeURIComponent(price)}&tags=${encodeURIComponent(tags)}`;

  // Redirect to recipe.html with the recipe details
  window.location.href = "../html/fullRecipeCard.html";
  //queryString;
}

// Fetch and display recipes when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayRecipes);

function generateTagFilters(recipes) {
  const tags = new Set();
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => tags.add(tag));
  });

  const filterContainer = document.getElementById("filter-tags");
  filterContainer.innerHTML = ""; // Clear previous filters

  tags.forEach((tag) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = tag;
    checkbox.id = `filter-${tag}`;
    checkbox.addEventListener("change", () => applyFilters(recipes));

    const label = document.createElement("label");
    label.setAttribute("for", `filter-${tag}`);
    label.innerText = tag;

    const filterWrapper = document.createElement("div");
    filterWrapper.appendChild(checkbox);
    filterWrapper.appendChild(label);
    filterContainer.appendChild(filterWrapper);
  });

  // After generating filters, check if ?tag= param is present
  const queryTag = getQueryParam("tag");
  if (queryTag) {
    const targetCheckbox = document.getElementById(`filter-${queryTag}`);
    if (targetCheckbox) {
      targetCheckbox.checked = true;
      applyFilters(recipes); // Show only the recipes with that tag
    }
  }
}

// Function to filter recipes based on selected tags
function filterRecipes(recipes, selectedTags) {
  if (selectedTags.length === 0) {
    return recipes; // If no tags are selected, show all recipes
  }
  return recipes.filter((recipe) => {
    return selectedTags.some((tag) => recipe.tags.includes(tag));
  });
}

// Function to apply filters based on selected checkboxes
function applyFilters(recipes) {
  const selectedTags = [];
  const checkboxes = document.querySelectorAll(
    '#filter-tags input[type="checkbox"]:checked'
  );
  checkboxes.forEach((checkbox) => {
    selectedTags.push(checkbox.value);
  });

  const filteredRecipes = filterRecipes(recipes, selectedTags);
  displayRecipes(filteredRecipes);
}

// Updated clearFilters function that unchecks all checkboxes and re-displays all recipes
function clearFilters() {
  const checkboxes = document.querySelectorAll(
    '#filter-tags input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  displayRecipes(allRecipesGlobal);
}

// Function to redirect to recipe details page
function viewRecipe(name, imageUrl, description, price, tags) {
  const queryString = `?name=${encodeURIComponent(
    name
  )}&imageUrl=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(
    description
  )}&price=${encodeURIComponent(price)}&tags=${encodeURIComponent(tags)}`;
  window.location.href = "../html/fullRecipeCard.html" + queryString;
}

// Functionality for homepage section to browse by tags
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
