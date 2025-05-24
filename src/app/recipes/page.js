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

    useEffect(() => {
        if (recipesData) {
            try {
                const parsedRecipes = JSON.parse(decodeURIComponent(recipesData));
                setRecipes(parsedRecipes);

                if (parsedRecipes.length === 1) {
                    setSelectedRecipe(parsedRecipes[0]);
                } else {
                    setSelectedRecipe(null);
                }
            } catch (error) {
                console.error("Error parsing recipes data:", error);
                setRecipes([]);
                setSelectedRecipe(null);
            }
        }
    }, [recipesData]);

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    return(
        <div className="recipe-page">
            <Navbar />
            {recipes.length > 0 && ( // Display suggestions if there are any recipes
                <RecipeSuggestions recipes={recipes} onSelectRecipe={handleSelectRecipe} /> // <-- PASS THE NEW FUNCTION
            )}

            {selectedRecipe && ( // Only render RecipeChoice if a recipe is selected
                <RecipeChoice recipe={selectedRecipe} />
            )}

            {!recipes.length && !selectedRecipe && ( // Message if no recipes and none selected
                <p>No recipes found based on your ingredients, or no recipe selected yet.</p>
            )}

            {/* {recipes.length > 0 && <WhyRecipe />} */}
        </div>
    )
}