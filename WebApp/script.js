// Function to translate text to Russian
async function translateToRussian(text) {
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        return data[0][0][0];
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

// Function to create short description
function createShortDescription(meal) {
    // Создаем краткое описание на основе категории и основных ингредиентов
    const category = meal.strCategory || 'блюдо';
    const area = meal.strArea || '';
    const ingredients = [];
    
    // Собираем основные ингредиенты (первые 3)
    for (let i = 1; i <= 3; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(ingredient);
        }
    }

    // Формируем краткое описание
    let description = `${category}`;
    if (area) {
        description += ` ${area} кухни`;
    }
    if (ingredients.length > 0) {
        description += ` с ${ingredients.join(', ')}`;
    }

    return description;
}

// Function to fetch random dish from API
async function getRandomDish() {
    try {
        // Show loading state
        showLoading();

        // Fetch random meal from TheMealDB
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];

        // Создаем краткое описание
        const shortDescription = createShortDescription(meal);

        // Переводим название и краткое описание
        const [translatedName, translatedDescription] = await Promise.all([
            translateToRussian(meal.strMeal),
            translateToRussian(shortDescription)
        ]);

        // Return formatted dish data
        return {
            name: translatedName,
            description: translatedDescription,
            calories: '~' + Math.floor(Math.random() * 300 + 200) + ' ккал',
            image: meal.strMealThumb
        };
    } catch (error) {
        console.error('Error fetching dish:', error);
        showError();
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
        showError();
    }
}

// Show loading state
function showLoading() {
    document.querySelector('.overlay-text').textContent = 'Загрузка...';
    document.querySelector('.overlay_p').textContent = 'Пожалуйста, подождите';
    document.querySelector('.calories').textContent = 'Калорийность: загрузка...';
}

// Show error state
function showError() {
    document.querySelector('.overlay-text').textContent = 'Ошибка загрузки';
    document.querySelector('.overlay_p').textContent = 'Не удалось загрузить данные о блюде';
    document.querySelector('.calories').textContent = 'Калорийность: Н/Д';
}

// Update dish when page loads
document.addEventListener('DOMContentLoaded', updateDishOfTheDay);

// Update dish every 24 hours
setInterval(updateDishOfTheDay, 24 * 60 * 60 * 1000); 