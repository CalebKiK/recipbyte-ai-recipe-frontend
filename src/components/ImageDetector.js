"use client";

import { useEffect, useRef } from 'react';
import '../styles/ImageDetector.css';

export default function ImageDetector({ model }) {
    const videoRef = useRef(null);
    const webcamButtonRef = useRef(null);

    useEffect(() => {
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
                    videoRef.current.addEventListener('loadeddata', () => {
                        predictWebcam();
                    });
                }
                if (webcamButtonRef.current) {
                    webcamButtonRef.current.classList.add('removed'); // Optional: hide button after enabling
                    }
                } catch (err) {
                    console.error('Error accessing webcam:', err);
                }
            };

        const getUserMediaSupported = () =>
        !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

        if (getUserMediaSupported() && webcamButtonRef.current) {
        webcamButtonRef.current.addEventListener('click', enableCam);
        }

        // Clean up
        return () => {
            if (webcamButtonRef.current) {
                webcamButtonRef.current.removeEventListener('click', enableCam);
            }
        };  
    }, [model]);

     // Placeholder function
    const predictWebcam = () => {
        console.log('Ready to predict with webcam and model!');
        // Add model.detect(video) etc. here if desired
    };

    
    return (
        <div className='image-detector-component'>
            <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "enable webcam" below and accept access to the webcam when the browser asks (check the top left of your window)</p>
            <div id="liveView" className="camView">
                <button id="webcamButton">Enable Webcam</button>
                <video id="webcam" autoplay muted width="640" height="480"></video>
            </div>
        </div>
    );
}