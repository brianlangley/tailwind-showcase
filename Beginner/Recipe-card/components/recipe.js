const recipe = {
    data() {
        return {
            recipe: null,
            categories: {
                Beef: "🥩",
                Chicken: "🍗",
                Dessert: "🍰",
                Lamb: "🐑",
                Miscellaneous: "🍴",
                Pasta: "🍝",
                Pork: "🐖",
                Seafood: "🦞",
                Side: "🥗",
                Starter: "🥣",
                Vegan: "🥬",
                Vegetarian: "🥕",
                Breakfast: "🍳",
                Goat: "🐐"
            },
            countries: {
                American: "🇺🇸",
                British: "🇬🇧",
                Canadian: "🇨🇦",
                Chinese: "🇨🇳",
                Croatian: "🇭🇷",
                Dutch: "🇳🇱",
                Egyptian: "🇪🇬",
                Filipino: "🇵🇭",
                French: "🇫🇷",
                Greek: "🇬🇷",
                Indian: "🇮🇳",
                Irish: "🇮🇪",
                Italian: "🇮🇹",
                Jamaican: "🇯🇲",
                Japanese: "🇯🇵",
                Kenyan: "🇰🇪",
                Malaysian: "🇲🇾",
                Mexican: "🇲🇽",
                Moroccan: "🇲🇦",
                Polish: "🇵🇱",
                Portugeuse: "🇵🇹",
                Russian: "🇷🇺",
                Spanish: "🇪🇸",
                Thai: "🇹🇭",
                Tunisian: "🇹🇳",
                Turkish: "🇹🇷",
                Unknown: "🌎",
                Vietnamese: "🇻🇳",
            },
        };
    },
    methods: {
        async fetchRecipe() {
            try {
                const data = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                if (!data.ok) {
                    throw new Error(`🐞: ${data.status}`);
                } else {
                    const recipe = await data.json();
                    this.recipe = recipe.meals[0];
                    // Sort ingredients and measurements
                    const ingredients = [];
                    const measurements = [];
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = this.recipe[`strIngredient${i}`];
                        const measurement = this.recipe[`strMeasure${i}`];
                        if (ingredient && measurement) {
                            ingredients.push(ingredient);
                            measurements.push(measurement);
                        }
                    }
                    this.recipe.ingredients = ingredients;
                    // Capitalize the first letter of each ingredient
                    this.recipe.ingredients = this.recipe.ingredients.map(ingredient => {
                        return ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
                    });
                    this.recipe.measurements = measurements;
                }
            } catch (error) {
                console.log(`🤖: ${error}`);
                this.error = "An error occurred while fetching the recipe. Please try again later.";
            }
        },
        fetchRecipeAndScrollToTop() {
            this.fetchRecipe();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
    },
    template: /*html*/ `
    <article class="p-4 bg-gray-100 rounded-lg flex flex-col shadow-xl" style="background-color: rgba(255, 255, 255, .95);">
        <div v-if="recipe">
            <div class="flex items-center justify-center flex-col pb-3">
                <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="rounded-md w-auto h-auto object-cover sm:max-w-full sm:h-auto md:max-w-full md:h-auto lg:max-w-[90vw] lg:h-auto shadow-lg">
                <h1 class="text-2xl md:text-4xl lg:text-5xl font-semibold mt-2">{{ recipe.strMeal }}</h1>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <p class="mt-2">
                Origin: <span class="font-bold">{{ recipe.strArea }} {{ countries[recipe.strArea] }}</span>
                </p>
                <p class="mt-2">
                Category: <span class="font-bold">{{ recipe.strCategory }} {{ categories[recipe.strCategory] }}</span>
                </p>
            </div>
            <div v-if="recipe.strSource">
                <p class="mt-2">Author: <a :href="recipe.strSource" target="_blank" class="font-bold text-blue-500 hover:text-blue-700">{{ recipe.strSource }}</a></p>
            </div>
            <div class="mt-4">
            <h3 class="text-xl font-bold pb-2 mt-2">Ingredients:</h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
              <li v-for="index in recipe.ingredients.length" :key="index" class="flex items-center">
                <!-- Adjust the index to match the array indices starting from 0 -->
                <span class="font-bold">{{ recipe.ingredients[index - 1] }}</span>:  {{ recipe.measurements[index - 1] }}
              </li>
            </ul>
          </div>          
            <h3 class="text-lg font-bold mt-4">Instructions:</h3>
            <p class="mt-2">{{ recipe.strInstructions }}</p>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-4 rounded" @click="fetchRecipeAndScrollToTop">Find a new recipe</button>
  </article>  
  `
};