"use client";

import Navbar from "@/components/Navbar";
import IngredientDetector from "@/components/IngredientDetector";
import '../../styles/IngredientDetector.css';
import { useEffect, useState } from 'react';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import toast from "react-hot-toast";

export default function ImageDetectorPage() {
    const [model, setModel] = useState(null);
     const [loadingModel, setLoadingModel] = useState(true); // New state to manage model loading status

    useEffect(() => {
        const loadModel = async () => {
            try{
                await tf.ready();
                const loadedModel = await cocoSsd.load();
                console.log("COCO-SSD model loaded");
                setModel(loadedModel);
                setLoadingModel(false);
            
            } catch (error) {
                console.error("Failed to load COCO-SSD model:", error);
                setLoadingModel(false);
                toast.error("Error loading ingredient detector. Please try again later")
            }
        };

        loadModel();
    }, []);

    const handleIngredientsDetected = (ingredients) => {
        console.log("Ingredients detected from ImageDetector AI model:", ingredients);
        // Here, you would typically send these ingredients to your Django backend
        // Example:
        // sendIngredientsToBackend(ingredients); 
        // Or update a state in this page component to display them,
        // then have a "Proceed to Recipes" button.
    }

    return(
        <div className="image-detector-page">
            <Navbar />
            <h2>Ingredient Detector Page</h2>
            {/* {loadingModel ? (
                <div className='image-detector-model-loading'>
                    <h3>Preparing our AI Chef! 🍳</h3>
                    <p>  
                        We're loading the intelligent model that identifies your ingredients. This may take a few moments depending on your connection. Thanks for your patience!
                    </p>
                </div>
            ) : (
                <IngredientDetector model={model} onIngredientsDetected={handleIngredientsDetected} />
            )} */}

            <div className={`image-detector-model-loading ${model ? 'removed' : ''}`}>
                <h3>Preparing our AI Chef! 🍳</h3>
                <p>  
                    We&apos;re loading the intelligent model that identifies your ingredients. This may take a few moments depending on your connection. Thanks for your patience!
                </p>
            </div>
            <IngredientDetector model={model} onIngredientsDetected={handleIngredientsDetected} />
        </div>
    );
}