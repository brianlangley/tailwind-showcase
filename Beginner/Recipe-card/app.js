const app = Vue.createApp({
    mounted() {
        this.$refs.recipeCard.fetchRecipe();
    }
});

app.component('recipe-card', recipe);

app.mount('#app');
