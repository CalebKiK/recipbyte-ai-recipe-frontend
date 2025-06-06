"use client";

import { useEffect, useRef } from 'react';
import '../styles/ImageDetector.css';

export default function ImageDetector({ model }) {
    const videoRef = useRef(null);
    const webcamButtonRef = useRef(null);

    useEffect(() => {
        if (!model) return;
        console.log("Model is ready. Webcam can be enabled.");
    }, [model]);

    const enableCam = async () => {
        if (!model) return;

        const constraints = {
            video: true,
            audio: false,
        };

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadeddata = () => {
                    predictWebcam();
                };
            }
            if (webcamButtonRef.current) {
                webcamButtonRef.current.classList.add('removed');
                }
            } catch (err) {
                console.error('Error accessing webcam:', err);
            }
        };

        const getUserMediaSupported = () =>
        !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

     // Placeholder function
    const predictWebcam = () => {
        console.log('Ready to predict with webcam and model!');
        // Add model.detect(video) etc. here if desired
    };

    
    return (
        <div className={`image-detector-component ${!model ? 'loading' : ''}`} >
            <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "Enable Webcam" below and accept access to the webcam when the browser asks (check the top left of your window).</p>
            <div className="cam-view">
                <button 
                    ref={webcamButtonRef}
                    className="webcam-button" 
                    onClick={enableCam}
                    disabled={!model}    
                >
                    Enable Webcam
                </button>
                <video 
                    ref={videoRef}
                    className="webcam-video" 
                    autoPlay 
                    muted 
                ></video>
            </div>
        </div>
    );
}