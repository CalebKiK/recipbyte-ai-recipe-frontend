"use client";

import Navbar from "@/components/Navbar";
import RecipeChoice from "@/components/RecipeChoice";
import RecipeSuggestions from "@/components/RecipeSuggestions";
import WhyRecipe from "@/components/WhyRecipe";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function RecipePage() {
    const searchParams = useSearchParams();
    const recipesData = searchParams.get('recipes');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const [error, setError] = useState(null);     // New error state

    // useEffect(() => {
    //     if (recipesData) {
    //         try {
    //             const parsedRecipes = JSON.parse(decodeURIComponent(recipesData));
    //             setRecipes(parsedRecipes);

    //             if (parsedRecipes.length === 1) {
    //                 setSelectedRecipe(parsedRecipes[0]);
    //             } else {
    //                 setSelectedRecipe(null);
    //             }
    //         } catch (error) {
    //             console.error("Error parsing recipes data:", error);
    //             setRecipes([]);
    //             setSelectedRecipe(null);
    //         }
    //     }
    // }, [recipesData]);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null); // Clear previous errors

            const ingredients = searchParams.get('ingredients');
            const dietaryRestrictions = searchParams.get('dietaryRestrictions');
            const isRandom = searchParams.get('random'); // Check for the random flag

            let apiUrl = '';

            if (isRandom === 'true') {
                apiUrl = 'http://127.0.0.1:8000/api/recipes/random/';
            } else if (ingredients) {
                // Construct the API URL using the parameters from the current URL
                apiUrl = `http://127.0.0.1:8000/api/recipes/filter_by_ingredients/?ingredients=${ingredients}`;
                if (dietaryRestrictions) {
                    apiUrl += `&dietaryRestrictions=${dietaryRestrictions}`;
                }
            } else {
                // No ingredients or random flag, so nothing to fetch
                setError('No search criteria provided to fetch recipes.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(apiUrl);

                if (response.ok) {
                    const data = await response.json();
                    
                    // If it was a random recipe request, the backend returns a single object.
                    // We need to wrap it in an array for consistency with RecipeSuggestions.
                    const fetchedRecipes = isRandom === 'true' ? [data] : data;
                    
                    setRecipes(fetchedRecipes);
                    
                    // If only one recipe is fetched (either random or filtered to one result),
                    // automatically select it for display in RecipeChoice.
                    if (fetchedRecipes.length === 1) {
                        setSelectedRecipe(fetchedRecipes[0]);
                    } else {
                        setSelectedRecipe(null); // Clear selection if multiple recipes are loaded
                    }

                } else {
                    const errorData = await response.json();
                    setError(errorData.error || `Failed to fetch recipes: ${response.status}`);
                    setRecipes([]); // Clear recipes on error
                    setSelectedRecipe(null); // Clear selected recipe on error
                }
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError("An error occurred while fetching recipes. Please check your network connection or the backend server.");
                setRecipes([]); // Clear recipes on error
                setSelectedRecipe(null); // Clear selected recipe on error
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [searchParams]);

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    return(
        <div className="recipe-page">
            <Navbar />
            {loading && <p>Loading recipes...</p>}
            {error && <p className="error-message">Error: {error}</p>}

            {!loading && !error && recipes.length > 0 && (
                <>
                    {/* Display suggestions if there are multiple recipes or if a single one isn't yet selected */}
                    {recipes.length > 1 && (
                         <RecipeSuggestions recipes={recipes} onSelectRecipe={handleSelectRecipe} />
                    )}

                    {/* Always display RecipeChoice if a recipe is selected */}
                    {selectedRecipe && (
                        <RecipeChoice recipe={selectedRecipe} />
                    )}

                    {/* If only one recipe was returned initially, and it's not yet selected,
                        or if no recipe was selected from multiple, show a message.
                        This condition might need fine-tuning based on desired UX. */}
                    {recipes.length === 1 && !selectedRecipe && (
                        <p>No recipe selected from the single result.</p>
                    )}
                </>
            )}
            
            {!loading && !error && recipes.length === 0 && !selectedRecipe && (
                <p>No recipes found based on your criteria.</p>
            )}
            {/* {recipes.length > 0 && ( // Display suggestions if there are any recipes
                <RecipeSuggestions recipes={recipes} onSelectRecipe={handleSelectRecipe} /> // <-- PASS THE NEW FUNCTION
            )}

            {selectedRecipe && ( // Only render RecipeChoice if a recipe is selected
                <RecipeChoice recipe={selectedRecipe} />
            )}

            {!recipes.length && !selectedRecipe && ( // Message if no recipes and none selected
                <p>No recipes found based on your ingredients, or no recipe selected yet.</p>
            )} */}

            {/* {recipes.length > 0 && <WhyRecipe />} */}
        </div>
    )
}