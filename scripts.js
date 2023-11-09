const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
    const option1 = document.getElementById("diets").value;
    const option2 = document.getElementById("type").value;


    const apiKey = '36d1db0ce21241e890c0c09e446cbf48';

    fetch(`https://api.spoonacular.com/recipes/random?tags=${option1},${option2}&apiKey=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.recipes && data.recipes.length > 0) {
                createMeal(data.recipes[0]);
            } else {
                console.error('No recipes found in the response:', data);
                meal_container.innerHTML = 'No recipes found. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            meal_container.innerHTML = 'Failed to retrieve meal. Please try again.';
        });
});

const createMeal = (meal) => {
    const mealContainer = document.getElementById('meal');

    const mealInfoHTML = `
        <div class="meal-info">
            <h2 class="recipe-title">${meal.title}</h2>
            <p class="recipe-category">Category: ${meal.dishTypes}</p>
            <div class="recipe-meal-img">
                <img src="${meal.image}" alt="">
            </div>
        </div>
    `;

    const mealDetailsHTML = `
        <div class="meal-details">
            <div class="recipe-instruct">
                <h3>Summary:</h3>
                <p>${meal.summary}</p>
            </div>
            <div class="recipe-link">
                <a href="${meal.sourceUrl}" target="_blank">Get Recipe</a>
            </div>
        </div>
    `;

    mealContainer.innerHTML = mealInfoHTML + mealDetailsHTML;
}

