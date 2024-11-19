import React, { useEffect, useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]); //State to store the list of recipes
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to keep track of the currently selected recipe
  const [searchQuery, setSearchQuery] = useState(""); //State for search query input

  const [showButton, setShowButton] = useState(false); //It determines whether the "Back to Top" button is visible.

  // Show the button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300); //checks if the user scrolled more than 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      //Cleanup function that removes the scroll listener to prevent memory leaks when the component unmounts.
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); //Scrolls the page to the top with a smooth transition.
  };

  // Load recipes from localstorage on initial render
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (savedRecipes && Array.isArray(savedRecipes)) {
      console.log("Loaded Recipes from localStorage:", savedRecipes);
      setRecipes(savedRecipes); // Update the state with the saved recipes if available
    } else {
      console.log("No recipes found in localStorage.");
    }
  }, []);

  //Save recipes to localStorage whenever recipes state updates
  useEffect(() => {
    console.log("Saved to localStorage:", recipes);
    if (recipes.length > 0) {
      console.log("Saved to localStorage:", recipes);
      localStorage.setItem("recipes", JSON.stringify(recipes));
    } else {
      // Clear localStorage if no recipes remain
      console.log("Clearing localStorage as recipes are empty");
      localStorage.removeItem("recipes"); // Clear localStorage if no recipes
    }
  }, [recipes]);

  // Function to add a new recipe, including image handling and unique ID assignment
  const addRecipe = (newRecipe) => {
    const recipeWithId = { ...newRecipe, id: newRecipe.id || Date.now() }; // Add unique id to the recipe
    if (newRecipe.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        recipeWithId.image = reader.result; // Convert image to base64 string
        setRecipes((prevRecipes) => [...prevRecipes, recipeWithId]); //adding new recipe with an image
      };
      reader.readAsDataURL(newRecipe.image);
    } else {
      setRecipes((prevRecipes) => [...prevRecipes, recipeWithId]); //adding new recipe without an image
    }
  };

  // Function to delete a recipe by its unique ID
  const deleteRecipe = (id) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = prevRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem("recipies", JSON.stringify(updatedRecipes)); // Update localStorage
      return updatedRecipes; //Update state
    });
  };

  // Function to set the selected recipe for detailed view
  const selectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Function to go back to the recipe list view from the detailed view
  const goBackToList = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="App">
      <h1 className="d-flex justify-content-center align-items-center text-success fs-1 fst-italic">
        Recipe Book
      </h1>
      {/* Pass addRecipe function to RecipeForm */}
      <RecipeForm onAddRecipe={addRecipe} />

      {/* Search input */}
      <div className="search-container">
        <h5 className="d-flex justify-content-center align-items-center mt-2 text-success fs-1 fst-italic">
          Search Recipe
        </h5>
        <input
          type="text"
          placeholder="Search by name or ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />
      </div>
      {/* Conditionally render RecipeDetail or RecipeList based on selection */}
      {selectedRecipe ? ( // display recipe details if a recipe is selected
        <RecipeDetail recipe={selectedRecipe} onBack={goBackToList} />
      ) : (
        // Show list of recipes with search and delete functionality
        <RecipeList
          recipes={recipes} // Passing recipes as prop
          onSelectRecipe={selectRecipe}
          searchQuery={searchQuery} //Passing search query as prop
          onDeleteRecipe={deleteRecipe} // Passing delete function as prop
        />
      )}

      {/* Existing components */}
      {/* Conditionally renders the "Back to Top" button if showButton is true. */}
      {showButton && (
        <button className="btn btn-success back-to-top" onClick={scrollToTop}>
          ↑ Top
        </button>
      )}
    </div>
  );
}

export default App;
