// Component for the recipe input form, allowing users to add a recipe with a name, ingredients, steps, and an image.

import React, { useState, useRef } from "react";

const RecipeForm = ({ onAddRecipe }) => {
  //state to store form data (name, ingredients, steps, and image)
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
    image: null,
  });

  const fileInputRef = useRef(null); // A reference to reset the file input field after form submission

  // handleChange is triggered whenever the user types in any of the text fields (name, ingredients, steps)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value }); // Update the corresponding field in the recipe state
  };

  // handleImageChange is triggered when a user uploads an image
  const handleImageChange = (e) => {
    // setRecipe({ ...recipe, image: e.target.files[0] }); // Update the image field in the recipe state
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG and PNG files are allowed!");
      fileInputRef.current.value = ""; // Reset input field
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB!");
      fileInputRef.current.value = ""; // Reset input field
      return;
    }

    // Set the validated file to state
    setRecipe({ ...recipe, image: file });
  };

  //Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent the form from reloading the page on submission.

    // Validate that all fields are filled out before submitting
    if (!recipe.name || !recipe.ingredients || !recipe.steps) {
      alert("Please fill in all fields!"); // Show an alert if any field is empty
      return;
    }
    // Calls the onAddRecipe function (passed from App) to send the recipe data to the parent component.
    onAddRecipe(recipe);

    // Reset the form fields after submission.
    setRecipe({ name: "", ingredients: "", steps: "", image: null });

    // Clear the file input field using the fileInputRef
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
  };

  return (
    <div className=" container bg-overlay d-flex justify-content-center align-items-center vh-100 ">
      <form
        onSubmit={handleSubmit}
        className="my-3  p-4 rounded shadow-lg bg-white border border-success-subtle "
      >
        {/* Recipe Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Recipe Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Enter recipe name"
          />
        </div>

        {/* Ingredients Field */}
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <textarea
            className="form-control no-resize"
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients"
          />
        </div>

        {/* Preparation Steps Field */}
        <div className="mb-3">
          <label htmlFor="steps" className="form-label">
            Preparation Steps
          </label>
          <textarea
            className="form-control no-resize"
            id="steps"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            placeholder="Enter preparation steps"
          />
        </div>

        {/* Image Upload Field */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file" // allows the user to upload an image.
            className="form-control"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
            ref={fileInputRef} // Set the ref to reset the field after form submission
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
