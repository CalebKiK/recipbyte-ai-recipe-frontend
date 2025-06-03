"use client";

import '../styles/ImageDetector.css';
import Navbar from './Navbar';

export default function ImageDetector() {
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