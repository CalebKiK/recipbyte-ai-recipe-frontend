"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../styles/IngredientDetector.css';
import * as tf from '@tensorflow/tfjs';

// No longer need a direct const for commonIngredientsMap here
// import commonIngredientsMapData from '../../../public/data/commonIngredientsMap.json'; // This direct import won't work for client-side unless it's a static build-time asset

const IngredientDetector = ({ model, onIngredientsDetected }) => {
    const videoRef = useRef(null); // Ref for webcam video stream
    const imagePreviewRef = useRef(null); // Ref for the <img> element to display current image
    const canvasRef = useRef(null); // Ref for drawing bounding boxes

    const [imageSrc, setImageSrc] = useState(null); // State for the image preview (either from upload or photo)
    const [capturedPhoto, setCapturedPhoto] = useState(null); // Base64 or Blob of the actual photo taken/uploaded
    const [detectedIngredients, setDetectedIngredients] = useState([]);
    const [processing, setProcessing] = useState(false); // To show loading state during detection
    const [cameraActive, setCameraActive] = useState(false); // To manage webcam stream state
    const [error, setError] = useState(null);
    // const [commonIngredientsMap, setCommonIngredientsMap] = useState(null); // State to store the loaded map

    // // Load the ingredients map once when the component mounts
    // useEffect(() => {
    //     const loadIngredientsMap = async () => {
    //         try {
    //             // Fetch the JSON file from the public directory
    //             const response = await fetch('/data/commonIngredientsMap.json');
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             const data = await response.json();
                
    //             // Transform the array into a map for quick lookups
    //             const map = data.reduce((acc, item) => {
    //                 acc[item.coco_label.toLowerCase()] = item.canonical_name;
    //                 return acc;
    //             }, {});
    //             setCommonIngredientsMap(map);
    //             console.log("Common ingredients map loaded:", map);
    //         } catch (err) {
    //             console.error("Failed to load common ingredients map:", err);
    //             setError("Failed to load ingredient definitions. Please refresh.");
    //         }
    //     };

    //     loadIngredientsMap();
    // }, []); // Empty dependency array means this runs once on mount

    // Helper function to map detected labels to actual ingredients
    // Now depends on commonIngredientsMap being loaded
    // const getCanonicalIngredients = useCallback((predictions) => {
    //     if (!commonIngredientsMap) {
    //         console.warn("Ingredients map not loaded yet.");
    //         return [];
    //     }

    //     const uniqueIngredients = new Set();
        
    //     predictions.forEach(p => {
    //         if (p.score > 0.6) { 
    //             const canonicalName = commonIngredientsMap[p.class.toLowerCase()];
    //             if (canonicalName) {
    //                 uniqueIngredients.add(canonicalName);
    //             }
    //         }
    //     });
    //     return Array.from(uniqueIngredients);
    // }, [commonIngredientsMap]); // Add commonIngredientsMap as a dependency


     // Helper function to map detected labels to actual ingredients (from previous example)
    const getCanonicalIngredients = (predictions) => {
        const uniqueIngredients = new Set();
        const commonIngredientsMap = {
            'apple': 'apple', 'banana': 'banana', 'orange': 'orange', 'grape': 'grape', 
            'strawberry': 'strawberry', 'lemon': 'lemon', 'lime': 'lime', 'kiwi': 'kiwi',
            'carrot': 'carrot', 'potato': 'potato', 'onion': 'onion', 'garlic': 'garlic', 
            'broccoli': 'broccoli', 'tomato': 'tomato', 'cucumber': 'cucumber', 'zucchini': 'zucchini',
            'bell pepper': 'bell pepper', 'mushroom': 'mushroom', 'spinach': 'spinach', 
            'corn': 'corn', 'lettuce': 'lettuce', 'cabbage': 'cabbage', 'celery': 'celery',
            'chicken': 'chicken', 'beef': 'beef', 'pork': 'pork', 'fish': 'fish', 
            'shrimp': 'shrimp', 'egg': 'egg', 'sausage': 'sausage', 'bacon': 'bacon',
            'bread': 'bread', 'rice': 'rice', 'pasta': 'pasta', 'noodles': 'noodles', 
            'flour': 'flour', 'sugar': 'sugar', 'salt': 'salt', 'pepper': 'pepper', 
            'oil': 'oil', 'butter': 'butter', 'cheese': 'cheese', 'milk': 'milk', 
            'yogurt': 'yogurt', 'cream': 'cream', 'water bottle': 'water', // Example: Map "water bottle" to "water"
            // Add many more as your app grows. Consider a separate JSON file for this mapping for scalability.
        };

        predictions.forEach(p => {
            // Adjust confidence threshold as needed. 0.6 is a good starting point.
            if (p.score > 0.6) { 
                const canonicalName = commonIngredientsMap[p.class.toLowerCase()];
                if (canonicalName) {
                    uniqueIngredients.add(canonicalName);
                }
            }
        });
        return Array.from(uniqueIngredients);
    };

    // Core detection function - reusable for both image and photo
    const performDetection = useCallback(async (imageElement) => {
        if (!model || !imageElement) {
            setError("AI model not loaded or no image to detect.");
            return;
        }

        setProcessing(true);
        setError(null);
        setDetectedIngredients([]); // Clear previous detections

        try {
            const predictions = await model.detect(imageElement);
            console.log('Raw COCO-SSD Predictions:', predictions);

            const canonicalIngredients = getCanonicalIngredients(predictions);
            setDetectedIngredients(canonicalIngredients);
            onIngredientsDetected(canonicalIngredients); // Inform parent component

            // Optional: Draw bounding boxes
            drawBoundingBoxes(imageElement, predictions);

        } catch (err) {
            console.error('Error during object detection:', err);
            setError("Failed to detect ingredients. Please try again.");
        } finally {
            setProcessing(false);
        }
    }, [model, onIngredientsDetected]); // Dependencies for useCallback

    // --- "Upload Image" functionality ---
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result); // Set preview
                setCapturedPhoto(e.target.result); // Store for detection if needed, or directly use imageRef
                // No need to call performDetection here, it will be called once img.onload
            };
            reader.readAsDataURL(file);
        }
    };

    // --- "Take a Photo" functionality ---
    const startWebcam = async () => {
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); // Prefer rear camera
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setCameraActive(true);
            }
        } catch (err) {
            console.error('Error accessing webcam:', err);
            setError("Could not access webcam. Please ensure camera permissions are granted.");
            setCameraActive(false);
        }
    };

    const stopWebcam = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraActive(false);
    };

    const takePhoto = () => {
        if (videoRef.current) {
            const video = videoRef.current;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg'); // Get JPEG data URL

            setImageSrc(dataUrl); // Set photo as preview
            setCapturedPhoto(dataUrl); // Store for detection
            stopWebcam(); // Stop webcam after taking photo
        }
    };

    // Effect to trigger detection when imagePreviewRef (the <img>) loads
    useEffect(() => {
        const imgElement = imagePreviewRef.current;
        if (imgElement && imageSrc) {
            const handleImageLoad = () => {
                performDetection(imgElement);
            };
            imgElement.addEventListener('load', handleImageLoad);
            return () => {
                imgElement.removeEventListener('load', handleImageLoad);
            };
        }
    }, [imageSrc, performDetection]);


    // Cleanup webcam stream when component unmounts
    useEffect(() => {
        return () => {
            stopWebcam();
        };
    }, []);

    // Function to draw bounding boxes on a canvas overlaid on the image
    const drawBoundingBoxes = (imgElement, predictions) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Scale canvas to match image dimensions
        const { naturalWidth, naturalHeight } = imgElement;
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        predictions.forEach(p => {
            const [x, y, width, height] = p.bbox;

            // Draw rectangle
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#00FF00'; // Green color
            ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'; // Semi-transparent green fill
            ctx.stroke();
            ctx.fillRect(x, y, width, height);

            // Draw label
            ctx.fillStyle = '#00FF00';
            ctx.font = '24px Arial';
            // Position text above the box
            const textX = x;
            const textY = y > 20 ? y - 10 : y + 20; // Adjust position if too close to top
            ctx.fillText(`${p.class} (${Math.round(p.score * 100)}%)`, textX, textY);
        });
    };

    return (
        // <div className="ingredient-detector-container">
        <div className={`ingredient-detector-component ${!model ? 'loading' : ''}`}>
            <p className="instruction-message">
                Ready to see what you can cook? Simply <span>upload an existing photo</span> of your ingredients or <span>snap a new one</span> using your device's camera. Our AI will do the rest!
            </p>
            <div className="input-options">
                <label className="button-label">
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                {!cameraActive ? (
                    <button onClick={startWebcam} className="action-button">Take a Photo</button>
                ) : (
                    <button onClick={stopWebcam} className="action-button secondary">Stop Camera</button>
                )}
            </div>

            {error && <p className="error-message">{error}</p>}

            {cameraActive && (
                <div className="webcam-preview-container">
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="webcam-feed"
                        style={{ width: '100%', maxWidth: '600px', height: 'auto', border: '1px solid #ddd' }}
                    ></video>
                    <button onClick={takePhoto} className="action-button capture-button">Capture Photo</button>
                </div>
            )}

            {imageSrc && (
                <div className="image-preview-container">
                    <img 
                        ref={imagePreviewRef} 
                        src={imageSrc} 
                        alt="Ingredient Preview" 
                        className="uploaded-image-preview" 
                        style={{ width: '100%', maxWidth: '600px', height: 'auto', display: processing ? 'none' : 'block' }} // Hide image during processing
                    />
                    {processing && <p className="processing-message">Detecting ingredients...</p>}
                    <canvas 
                        ref={canvasRef} 
                        className="detection-canvas" 
                        style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            // Ensure canvas scales with image. You might need more precise CSS
                            width: '100%', 
                            height: '100%',
                            display: (imageSrc && !processing) ? 'block' : 'none' // Show canvas only when image is present and not processing
                        }} 
                    />
                     <button onClick={() => { setImageSrc(null); setDetectedIngredients([]); stopWebcam(); }} className="action-button clear-button">Clear Image</button>
                </div>
            )}

            {detectedIngredients.length > 0 && (
                <div className="detected-results">
                    <h3>Detected Ingredients:</h3>
                    <ul>
                        {detectedIngredients.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                    <p>Review the detected ingredients. You can manually add or remove any from the list below if needed.</p>
                    {/* Add manual input/edit functionality here */}
                    <button className="action-button proceed-button" onClick={() => onIngredientsDetected(detectedIngredients)}>
                        Confirm & Find Recipes
                    </button>
                </div>
            )}
             {imageSrc && !processing && detectedIngredients.length === 0 && (
                <p className="no-detection-message">No common ingredients detected with high confidence from this image. Please try another or add manually.</p>
            )}
        </div>
    );
};

export default IngredientDetector;