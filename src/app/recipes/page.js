import Navbar from "@/components/Navbar";
import RecipeChoice from "@/components/RecipeChoice";
import RecipeSuggestions from "@/components/RecipeSuggestions";
import WhyRecipe from "@/components/WhyRecipe";

export default function RecipePage() {
    return(
        <div className="recipe-page">
            <Navbar />
            <RecipeSuggestions />
            <RecipeChoice />
            <WhyRecipe />
        </div>
    )
}