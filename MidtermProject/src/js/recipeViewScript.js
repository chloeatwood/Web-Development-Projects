//Gets the recipe information of the selected recipe
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const getArrayParam = (param) => params.get(param) ? params.get(param).split(",") : [];

    return { 
        name: params.get("name") || "Please Select a Recipe from the Recipes Screen",
        imageUrl: params.get("imageUrl") || "",
        directions: getArrayParam("directions"),
        price: params.get("price") || "N/A",
        tags: getArrayParam("tags"),
        prepTime: params.get("prepTime") || "N/A",
        cookTime: params.get("cookTime") || "N/A",
        ingredients: getArrayParam("ingredients")
    };
}

//Fetchs the recipe information and calls getQueryParams on it to extract to needed information
async function fetchRecipeData() {
    try {
        const response = await fetch("../assets/data.json");
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging line

        // Ensure data.recipes is an array before using find()
        return Array.isArray(data.recipes) 
            ? data.recipes.find(r => r.name === getQueryParams().name) || getQueryParams()
            : getQueryParams();
    } catch (error) {
        console.error("Error fetching recipe data:", error);
        return getQueryParams();
    }
}


//Displays the recipe card with the information from the selected recipe
async function displayRecipeDetails() {
    const recipe = await fetchRecipeData();
    console.log(recipe);

    document.getElementById("recipe-name").textContent = recipe.name;
    document.getElementById("recipe-prep-time").textContent = recipe.prepTime;
    document.getElementById("recipe-cook-time").textContent = recipe.cookTime;
    

    // Set the image source
    let recipeImage = document.getElementById("recipe-image");
    recipeImage.src = recipe.imageUrl;
    recipeImage.style.display = "block"; // Ensure image is visible

    // Display directions
    const directionsContainer = document.getElementById("recipe-directions");
    directionsContainer.innerHTML = ""; // Clear previous content
    recipe.directions.forEach(direction => {
        const p = document.createElement("p");
        p.textContent = direction;
        directionsContainer.appendChild(p);
    });

    // Display ingredients
    const ingredientsContainer = document.getElementById("recipe-ingredients");
    ingredientsContainer.innerHTML = ""; // Clear previous content
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsContainer.appendChild(li);
    });
}

//Takes user to last screen they where on
function goBackToRecipes() {
    window.location.href = "../html/recipes.html";
}

//Updates the recipe card if user selects one of the options listed in the popular items area
async function updateRecipeCard(recipeName) {
    try {
        // Fetch the recipe data from the JSON file
        const response = await fetch("../assets/data.json");
        const data = await response.json();

        // Find the recipe that matches the clicked recipe name
        const recipe = data.recipes.find(r => r.name === recipeName);

        if (recipe) {
            // Update the recipe card with the data from the selected recipe
            document.getElementById("recipe-name").textContent = recipe.name;
            document.getElementById("recipe-prep-time").textContent = recipe.prepTime;
            document.getElementById("recipe-cook-time").textContent = recipe.cookTime;

            // Update the recipe image
            const recipeImage = document.getElementById("recipe-image");
            recipeImage.src = recipe.imageUrl;
            recipeImage.style.display = "block";

            // Update ingredients
            const ingredientsContainer = document.getElementById("recipe-ingredients");
            ingredientsContainer.innerHTML = ""; // Clear previous ingredients
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement("li");
                li.textContent = ingredient;
                ingredientsContainer.appendChild(li);
            });

            // Update directions
            const directionsContainer = document.getElementById("recipe-directions");
            directionsContainer.innerHTML = ""; // Clear previous directions
            recipe.directions.forEach(direction => {
                const p = document.createElement("p");
                p.textContent = direction;
                directionsContainer.appendChild(p);
            });
        }
    } catch (error) {
        console.error("Error fetching recipe data:", error);
    }
}


document.addEventListener("DOMContentLoaded", displayRecipeDetails);
