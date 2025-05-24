// Function to fetch random dish from API
async function getRandomDish() {
    try {
        // Используем TheMealDB API для получения случайного блюда
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];

        // Преобразуем данные в нужный формат
        return {
            name: meal.strMeal,
            description: meal.strInstructions, // Возвращаем полное описание
            calories: '~' + Math.floor(Math.random() * 300 + 200) + ' ккал', // Примерная калорийность
            image: meal.strMealThumb
        };
    } catch (error) {
        console.error('Error fetching dish:', error);
        // Возвращаем дефолтное блюдо в случае ошибки
        return {
            name: "Ошибка загрузки",
            description: "Не удалось загрузить данные о блюде",
            calories: "Н/Д",
            image: "images/default-dish.jpg"
        };
    }
}

// Function to update dish of the day
async function updateDishOfTheDay() {
    try {
        const dish = await getRandomDish();
        
        // Update dish name
        document.querySelector('.overlay-text').textContent = dish.name;
        
        // Update description
        document.querySelector('.overlay_p').textContent = dish.description;
        
        // Update calories
        document.querySelector('.calories').textContent = `Калорийность: ${dish.calories}`;
        
        // Update image
        const dayfot = document.getElementById('dayfot');
        dayfot.src = dish.image;
        dayfot.alt = dish.name;
    } catch (error) {
        console.error('Error updating dish:', error);
    }
}

// Update dish when page loads
document.addEventListener('DOMContentLoaded', updateDishOfTheDay);

// Update dish every 24 hours
setInterval(updateDishOfTheDay, 24 * 60 * 60 * 1000);

// Add loading state
function showLoading() {
    document.querySelector('.overlay-text').textContent = 'Загрузка...';
    document.querySelector('.overlay_p').textContent = 'Пожалуйста, подождите';
    document.querySelector('.calories').textContent = 'Калорийность: загрузка...';
}

// Add error handling
function showError() {
    document.querySelector('.overlay-text').textContent = 'Ошибка загрузки';
    document.querySelector('.overlay_p').textContent = 'Не удалось загрузить данные о блюде';
    document.querySelector('.calories').textContent = 'Калорийность: Н/Д';
} 