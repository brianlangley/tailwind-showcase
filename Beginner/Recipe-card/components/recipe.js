const recipe = {
    data() {
        return {
            recipe: null
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
                    this.recipe.measurements = measurements;
                }
            } catch (error) {
                console.log(`🤖: ${error}`);
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
    <article class="p-4 bg-gray-100 rounded-lg flex flex-col shadow-xl sm">
        <div v-if="recipe">
            <div class="flex items-center justify-center flex-col pb-3">
                <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="rounded-md w-auto h-auto object-cover sm:max-w-full sm:h-auto shadow-lg">
                <h1 class="text-2xl md:text-4xl lg:text-5xl font-semibold mt-2">{{ recipe.strMeal }}</h1>
            </div>
            <p class="mt-2">Area: <span class="font-bold">{{ recipe.strArea }}</span></p>
            <p class="mt-2">Tags: <span class="font-bold">{{ recipe.strTags }}</span></p>
            <div class="mt-4">
                <h3 class="text-lg font-bold">Ingredients:</h3>
                <ul class="list-disc ml-4 mt-2">
                    <li v-for="index in recipe.ingredients.length" :key="index">
                        <!-- Adjust the index to match the array indices starting from 0 -->
                        <span class="font-bold">{{ recipe.ingredients[index - 1] }}</span> - {{ recipe.measurements[index - 1] }}
                    </li>
                </ul>
            </div>
            <p class="mt-2">{{ recipe.strInstructions }}</p>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-4 rounded" @click="fetchRecipeAndScrollToTop">Find a new recipe</button>
  </article>  
  `
};