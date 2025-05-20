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

    useEffect(() => {
        if (recipesData) {
            try {
                const parsedRecipes = JSON.parse(decodeURIComponent(recipesData));
                setRecipes(parsedRecipes);
            } catch (error) {
                console.error("Error parsing recipes data:", error);
                setRecipes([]);
            }
        }
    }, [recipesData]);

    return(
        <div className="recipe-page">
            <Navbar />
            {recipes.length > 1 ? (
                <RecipeSuggestions recipes={recipes} />
            ) : recipes.length === 1 ? (
                <RecipeChoice recipe={recipes[0]} />
            ) : (
                <p>No recipes found based on your ingredients.</p>
            )} 
            {recipes.length > 0 && <WhyRecipe />}
        </div>
    )
}