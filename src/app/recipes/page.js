"use client";

import Navbar from "@/components/Navbar";
import RecipeChoice from "@/components/RecipeChoice";
import RecipeSuggestions from "@/components/RecipeSuggestions";
import WhyRecipe from "@/components/WhyRecipe";
import { useEffect, useState, Suspense } from "react"; // Import Suspense
import { useSearchParams } from "next/navigation";

// A wrapper component to hold the main logic that uses searchParams
// This ensures that the useSearchParams hook is only executed once the client-side
// code is ready, and it is rendered within a Suspense boundary when called from a Server Component context.
function RecipePageContent() {
    const searchParams = useSearchParams();
    const recipesData = searchParams.get('recipes'); // This line was problematic during prerendering
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);

            const ingredients = searchParams.get('ingredients');
            const dietaryRestrictions = searchParams.get('dietaryRestrictions');
            const isRandom = searchParams.get('random');

            let apiUrl = '';

            if (isRandom === 'true') {
                apiUrl = 'http://127.0.0.1:8000/api/recipes/random/';
            } else if (ingredients) {
                apiUrl = `http://127.0.0.1:8000/api/recipes/filter_by_ingredients/?ingredients=${ingredients}`;
                if (dietaryRestrictions) {
                    apiUrl += `&dietaryRestrictions=${dietaryRestrictions}`;
                }
            } else {
                setError('No search criteria provided to fetch recipes.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(apiUrl);

                if (response.ok) {
                    const data = await response.json();
                    const fetchedRecipes = isRandom === 'true' ? [data] : data;
                    setRecipes(fetchedRecipes);
                    if (fetchedRecipes.length === 1) {
                        setSelectedRecipe(fetchedRecipes[0]);
                    } else {
                        setSelectedRecipe(null);
                    }
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || `Failed to fetch recipes: ${response.status}`);
                    setRecipes([]);
                    setSelectedRecipe(null);
                }
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError("An error occurred while fetching recipes. Please check your network connection or the backend server.");
                setRecipes([]);
                setSelectedRecipe(null);
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
        <>
            {loading && <p>Loading recipes...</p>}
            {error && <p className="error-message">Error: {error}</p>}

            {!loading && !error && recipes.length > 0 && (
                <>
                    {recipes.length > 1 && (
                            <RecipeSuggestions recipes={recipes} onSelectRecipe={handleSelectRecipe} />
                    )}

                    {selectedRecipe && (
                        <RecipeChoice recipe={selectedRecipe} />
                    )}

                    {recipes.length === 1 && !selectedRecipe && (
                        <p>No recipe selected from the single result.</p>
                    )}
                </>
            )}

            {!loading && !error && recipes.length === 0 && !selectedRecipe && (
                <p>No recipes found based on your criteria.</p>
            )}
            {/* {recipes.length > 0 && <WhyRecipe />} */}
        </>
    );
}

// The main export for the page, now wrapping the client-side content in Suspense
export default function RecipePage() {
    return (
        <div className="recipe-page">
            <Navbar /> {/* Navbar can be a Server Component or Client Component, but it's separate from the searchParams logic */}
            <Suspense fallback={<div>Loading page content...</div>}>
                <RecipePageContent />
            </Suspense>
        </div>
    );
}

// "use client";

// import Navbar from "@/components/Navbar";
// import RecipeChoice from "@/components/RecipeChoice";
// import RecipeSuggestions from "@/components/RecipeSuggestions";
// import WhyRecipe from "@/components/WhyRecipe";
// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";

// export default function RecipePage() {
//     const searchParams = useSearchParams();
//     const recipesData = searchParams.get('recipes');
//     const [recipes, setRecipes] = useState([]);
//     const [selectedRecipe, setSelectedRecipe] = useState(null);
//     const [loading, setLoading] = useState(true); 
//     const [error, setError] = useState(null); 


//     useEffect(() => {
//         const fetchRecipes = async () => {
//             setLoading(true);
//             setError(null); 

//             const ingredients = searchParams.get('ingredients');
//             const dietaryRestrictions = searchParams.get('dietaryRestrictions');
//             const isRandom = searchParams.get('random'); // Check for the random flag

//             let apiUrl = '';

//             if (isRandom === 'true') {
//                 apiUrl = 'http://127.0.0.1:8000/api/recipes/random/';
//             } else if (ingredients) {
//                 // Construct the API URL using the parameters from the current URL
//                 apiUrl = `http://127.0.0.1:8000/api/recipes/filter_by_ingredients/?ingredients=${ingredients}`;
//                 if (dietaryRestrictions) {
//                     apiUrl += `&dietaryRestrictions=${dietaryRestrictions}`;
//                 }
//             } else {
//                 // No ingredients or random flag, so nothing to fetch
//                 setError('No search criteria provided to fetch recipes.');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch(apiUrl);

//                 if (response.ok) {
//                     const data = await response.json();
                    
//                     // If it was a random recipe request, the backend returns a single object.
//                     // We need to wrap it in an array for consistency with RecipeSuggestions.
//                     const fetchedRecipes = isRandom === 'true' ? [data] : data;
                    
//                     setRecipes(fetchedRecipes);
                    
//                     // If only one recipe is fetched (either random or filtered to one result),
//                     // automatically select it for display in RecipeChoice.
//                     if (fetchedRecipes.length === 1) {
//                         setSelectedRecipe(fetchedRecipes[0]);
//                     } else {
//                         setSelectedRecipe(null); // Clear selection if multiple recipes are loaded
//                     }

//                 } else {
//                     const errorData = await response.json();
//                     setError(errorData.error || `Failed to fetch recipes: ${response.status}`);
//                     setRecipes([]); 
//                     setSelectedRecipe(null);
//                 }
//             } catch (err) {
//                 console.error("Error fetching recipes:", err);
//                 setError("An error occurred while fetching recipes. Please check your network connection or the backend server.");
//                 setRecipes([]); 
//                 setSelectedRecipe(null); 
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecipes();
//     }, [searchParams]);

//     const handleSelectRecipe = (recipe) => {
//         setSelectedRecipe(recipe);
//     };

//     return(
//         <div className="recipe-page">
//             <Navbar />
//             {loading && <p>Loading recipes...</p>}
//             {error && <p className="error-message">Error: {error}</p>}

//             {!loading && !error && recipes.length > 0 && (
//                 <>
//                     {recipes.length > 1 && (
//                          <RecipeSuggestions recipes={recipes} onSelectRecipe={handleSelectRecipe} />
//                     )}

//                     {selectedRecipe && (
//                         <RecipeChoice recipe={selectedRecipe} />
//                     )}

//                     {recipes.length === 1 && !selectedRecipe && (
//                         <p>No recipe selected from the single result.</p>
//                     )}
//                 </>
//             )}
            
//             {!loading && !error && recipes.length === 0 && !selectedRecipe && (
//                 <p>No recipes found based on your criteria.</p>
//             )}

//             {/* {recipes.length > 0 && <WhyRecipe />} */}
//         </div>
//     )
// }