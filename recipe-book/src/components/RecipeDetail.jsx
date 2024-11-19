//This component will show the full details of a recipe when clicked.
import React from "react";
import styles from "./RecipeDetail.module.css";

const RecipeDetail = ({ recipe, onBack }) => {
  // Check if the recipe exists, if not, display a message
  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  return (
    <div className={`card ${styles.recipeDetailCard} my-3`}>
      <div className="card-body d-flex flex-column justify-content-between">
        {/* Display the recipe title */}
        <h5 className={`card-title ${styles.recipeTitle}`}>{recipe.name}</h5>

        {/* Display the ingredients of the recipe */}
        <p className="card-text">
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>

        {/* Display the preparation steps of the recipe */}
        <p className="card-text">
          <strong>Steps:</strong> {recipe.steps}
        </p>

        {/* If the recipe has an image, display it */}
        {recipe.image && (
          <img
            src={recipe.image} // Use the base64 string here as well
            alt={recipe.name}
            className={`img-fluid ${styles.recipeImage}`} //Styling for the image
          />
        )}

        {/* Button to go back to the recipe list */}
        <div className="d-flex justify-content-end w-100">
          <button onClick={onBack} className="btn btn-success mt-3">
            Back to list
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
