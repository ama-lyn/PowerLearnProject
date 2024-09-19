function searchRecipes() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const recipeItems = document.getElementsByClassName('recipe-card');

    for(item=0; item < recipeItems.length; item++){
        let recipe = recipeItems[item].getElementsByTagName('h3')[0];
        let recipeText = recipe.textContent || recipe.innerText;
        
        if (recipeText.toLowerCase().includes(input)) {
            recipeItems[item].style.display = '';
        } else {
            recipeItems[item].style.display = 'none';
        }
    }
}

