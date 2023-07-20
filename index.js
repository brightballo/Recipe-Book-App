const API_KEY = "7503a899e97945f68377d71028343d60";
const recipeListEl = document.getElementById("recipe-list");

async function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  if (recipes[0] && !recipes[0].extendedIngredients) {
    const recipesId = recipes.map((r) => r.id).join(",");
    const response = await fetch(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${recipesId}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    recipes = data;
  }
  recipes.forEach(async (recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");
    recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";

    recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    recipeIngredientsEl = document.createElement("p");

    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

// Get the input field
var searchbar = document.getElementById("searchbar");

// Execute a function when the user presses a key on the keyboard
searchbar.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    search_recipe();
  }
});

async function search_recipe() {
  input = searchbar.value.toLowerCase();

  if (input.length < 3) {
    alert("3 or more character is required to filter recipes");
    return;
  }

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=${API_KEY}&query=${input}`
  );

  const data = await response.json();

  displayRecipes(data.results);

  // let x = document.getElementsByClassName('recipe-list');

  // for (i = 0; i < x.length; i++) {
  //     if (!x[i].innerHTML.toLowerCase().includes(input)) {
  //         x[i].style.display="none";
  //     }
  //     else {
  //         x[i].style.display="list-item";
  //     }
  // }
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();
