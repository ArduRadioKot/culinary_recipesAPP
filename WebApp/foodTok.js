// Array to store loaded recipes
let recipes = [];
let currentIndex = 0;

// Function to fetch multiple recipes
async function fetchRecipes(count = 5) {
    try {
        const recipes = [];
        for (let i = 0; i < count; i++) {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            const meal = data.meals[0];
            
            recipes.push({
                name: meal.strMeal,
                description: meal.strInstructions,
                image: meal.strMealThumb,
                ingredients: getIngredients(meal)
            });
        }
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

// Helper function to extract ingredients from meal data
function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    return ingredients;
}

// Function to update recipe card
function updateRecipeCard(recipe) {
    const card = document.querySelector('.recipe-card');
    
    // Update image
    const image = card.querySelector('.recipe-image');
    image.src = recipe.image;
    image.alt = recipe.name;
    
    // Update title
    card.querySelector('.recipe-title').textContent = recipe.name;
    
    // Update description
    card.querySelector('.recipe-description').textContent = recipe.description;
}

// Function to handle scroll events
function handleScroll() {
    const container = document.querySelector('.foodtok-container');
    const scrollPosition = container.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Load more recipes when reaching the end
    if (scrollPosition + windowHeight >= container.scrollHeight - 100) {
        loadMoreRecipes();
    }
}

// Function to load more recipes
async function loadMoreRecipes() {
    const newRecipes = await fetchRecipes(3);
    recipes = [...recipes, ...newRecipes];
    
    // Create new recipe cards
    newRecipes.forEach(recipe => {
        const card = document.querySelector('.recipe-card').cloneNode(true);
        document.querySelector('.foodtok-container').appendChild(card);
        updateRecipeCard(recipe);
    });
}

// Initialize the app
async function init() {
    // Load initial recipes
    recipes = await fetchRecipes(3);
    updateRecipeCard(recipes[0]);
    
    // Add event listeners
    document.querySelector('.foodtok-container').addEventListener('scroll', handleScroll);
    document.querySelector('.cook-button').addEventListener('click', () => {
        // TODO: Implement recipe details page
        alert('Функция приготовления будет доступна в следующем обновлении!');
    });
}

// Start the app when the page loads
document.addEventListener('DOMContentLoaded', init);