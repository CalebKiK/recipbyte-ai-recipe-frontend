"use client";

import Navbar from "@/components/Navbar";
import ImageDetector from "@/components/ImageDetector";
import '../../styles/ImageDetector.css';
import { useEffect, useState } from 'react';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

export default function ImageDetectorPage() {
    const [model, setModel] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            await tf.ready();
            const loadedModel = await cocoSsd.load();
            console.log("COCO-SSD model loaded");
            setModel(loadedModel);
        };

        loadModel();
    }, []);

    return(
        <div className="image-detector-page">
            <Navbar />
            <h2>Image Detector Page</h2>
            <div className={`image-detector-model-loading ${model ? 'removed' : ''}`}>
                <p>Wait for the model to load before clicking the button to enable the webcam - at which point it will become visible to use.</p>
            </div>
            <ImageDetector model={model} />
        </div>
    );
}