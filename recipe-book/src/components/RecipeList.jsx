//Component for displaying the list of recipes,receive the recipes data from App.jsx as a prop and display each recipe's details.
import React from "react";
import styles from "./RecipeList.module.css";
const RecipeList = ({
  recipes,
  onSelectRecipe,
  searchQuery,
  onDeleteRecipe,
}) => {
  // Filter recipes based on the search query (name or ingredients)
  const filteredRecipes = recipes.filter(
    (recipe) =>
      (recipe.name &&
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (recipe.ingredients &&
        recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  // Logging filtered recipes for debugging
  console.log("Filtered Recipes:", filteredRecipes);
  return (
    <div className={`${styles.recipeList} container`}>
      <h2 className="d-flex justify-content-center align-items-center mt-2 text-success fs-1 fst-italic">
        Recipies
      </h2>
      {/* check if there are recipes in the recipes that match the search query */}
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => {
          // Log recipe ID to ensure each recipe has a unique ID
          console.log("Rendering recipe with ID:", recipe.id);
          return (
            <div
              key={recipe.id} //Using recipe.id as the key for each recipe card
              className={`${styles.recipeCard} card mb-3`}
              // When clicked, calls onSelectRecipe function passed from App.jsx
              onClick={() => onSelectRecipe(recipe)}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className={`${styles.cardTitle} card-title`}>
                  {recipe.name}
                </h5>
                <p className="card-text">
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p className="card-text">
                  <strong>Steps:</strong> {recipe.steps}
                </p>

                {/* Display the recipe image if available */}
                {recipe.image ? (
                  <img
                    src={
                      typeof recipe.image === "string"
                        ? recipe.image // If the image is a URL (base64)
                        : URL.createObjectURL(recipe.image) // If the image is a file object
                    }
                    alt={recipe.name}
                    className={`${styles.cardImage} img-fluid`}
                  />
                ) : (
                  <img
                    src="/path-to-placeholder-image.png" // Add your placeholder image here
                    alt="No Image Available"
                    className={`${styles.cardImage} img-fluid`}
                  />
                )}
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick for selecting recipe
                    onDeleteRecipe(recipe.id); // Calls onDeleteRecipe function to delete the recipe by ID
                  }}
                  className="btn btn-danger align-self-end mt-3"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        // Display this message if no recipes match the search
        <div className="text-center mt-3 text-muted">
          <h3 className="d-flex justify-content-center align-items-center mb-3 text-danger fs-3 fw-medium">
            No recipes found!
          </h3>
          <p className="d-flex justify-content-center align-items-center mb-3 bg-success text-black bg-opacity-50 fs-4 fst-italic fw-medium">
            Start adding your delicious recipes to see them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
