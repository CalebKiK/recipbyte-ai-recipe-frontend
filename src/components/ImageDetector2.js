// "use client";

// import { useEffect, useRef, useState, useCallback } from 'react';
// import '../styles/ImageDetector.css';

// export default function ImageDetector({ model }) {
//     const videoRef = useRef(null);
//     const webcamButtonRef = useRef(null);
//     const liveViewRef = useRef(null);
//     // Use state to store the predictions that will be rendered
//     const [predictionsToRender, setPredictionsToRender] = useState([]);
//     const animationFrameId = useRef(null); // To store the ID of requestAnimationFrame
//     const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

//     useEffect(() => {
//         if (!model) return;
//         console.log("Model is ready. Webcam can be enabled.");
//     }, [model]);

//      // Use useCallback to memoize predictWebcam to prevent unnecessary re-creations
//     // This is crucial because it's called repeatedly by requestAnimationFrame
//     const predictWebcam = useCallback(async () => {
//         if (!model || !videoRef.current || !liveViewRef.current) {
//             // Cancel any ongoing frame requests if prerequisites are not met
//             if (animationFrameId.current) {
//                 window.cancelAnimationFrame(animationFrameId.current);
//                 animationFrameId.current = null;
//             }
//             return;
//         }

//         try {
//             const predictions = await model.detect(videoRef.current);

//             // Get the current rendered dimensions of the video element
//             const videoWidth = videoRef.current.offsetWidth;
//             const videoHeight = videoRef.current.offsetHeight;

//             // Update videoDimensions state only if they've changed
//             if (videoWidth !== videoDimensions.width || videoHeight !== videoDimensions.height) {
//                  setVideoDimensions({ width: videoWidth, height: videoHeight });
//             }

//             // The intrinsic size of the video frame that the model saw might be different
//             // from the rendered size. We need to calculate scaling factors.
//             // videoRef.current.videoWidth and videoRef.current.videoHeight give the intrinsic size.
//             const intrinsicWidth = videoRef.current.videoWidth;
//             const intrinsicHeight = videoRef.current.videoHeight;

//             // Calculate scaling factors
//             const scaleX = videoWidth / intrinsicWidth;
//             const scaleY = videoHeight / intrinsicHeight;

//             setPredictionsToRender(
//                 predictions.filter(p => p.score > 0.66).map(p => {
//                     // Apply scaling to bbox coordinates
//                     const scaledX = p.bbox[0] * scaleX;
//                     const scaledY = p.bbox[1] * scaleY;
//                     const scaledWidth = p.bbox[2] * scaleX;
//                     const scaledHeight = p.bbox[3] * scaleY;

//                     return {
//                         ...p,
//                         bbox: [scaledX, scaledY, scaledWidth, scaledHeight]
//                     };
//                 })
//             );

//         } catch (error) {
//             console.error("Error during prediction:", error);

//             // Optionally, handle error state or stop prediction loop
//             if (animationFrameId.current) {
//                 window.cancelAnimationFrame(animationFrameId.current);
//                 animationFrameId.current = null;
//             }
//             return;
//         }

//         // Continue predictions
//         animationFrameId.current = window.requestAnimationFrame(predictWebcam);
            
//     }, [model, videoDimensions]);

//     const enableCam = async () => {
//         if (!model) return;

//         const constraints = {
//             video: true,
//             audio: false,
//         };

//         try {
//             const stream = await navigator.mediaDevices.getUserMedia(constraints);
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.onloadeddata = () => {
//                     // Set initial video dimensions from the video element's actual rendered size
//                     setVideoDimensions({
//                         width: videoRef.current.offsetWidth,
//                         height: videoRef.current.offsetHeight,
//                     });

//                     // Start the prediction loop
//                     animationFrameId.current = window.requestAnimationFrame(predictWebcam);
//                 };
//             }
//             if (webcamButtonRef.current) {
//                 webcamButtonRef.current.classList.add('removed');
//                 }
//             } catch (err) {
//                 console.error('Error accessing webcam:', err);
//                 alert('Error accessing webcam. Please check permissions and try again.');
//             }
//         };

//     // Cleanup effect: Stop webcam stream and cancel animation frame when component unmounts
//     useEffect(() => {
//         return () => {
//             if (animationFrameId.current) {
//                 window.cancelAnimationFrame(animationFrameId.current);
//                 animationFrameId.current = null;
//             }
//             if (videoRef.current && videoRef.current.srcObject) {
//                 const stream = videoRef.current.srcObject;
//                 const tracks = stream.getTracks();
//                 tracks.forEach(track => track.stop()); // Stop each track
//                 videoRef.current.srcObject = null; // Clear the source
//             }
//         };
//     }, []); // Run cleanup only once on unmount

//     return (
//         <div 
//             className={`image-detector-component ${!model ? 'loading' : ''}`} 
//             ref={liveViewRef} 
//             style={{ position: 'relative' }}    
//         >
//             <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "Enable Webcam" below and accept access to the webcam when the browser asks (check the top left of your window).</p>
//             <div className="cam-view">
//                 <button 
//                     ref={webcamButtonRef}
//                     className="webcam-button" 
//                     onClick={enableCam}
//                     disabled={!model}    
//                 >
//                     Enable Webcam
//                 </button>

//                 <video 
//                     ref={videoRef}
//                     className="webcam-video" 
//                     autoPlay 
//                     muted 
//                 ></video>

//                 {/* React renders these elements based on predictionsToRender state */}
//                 {predictionsToRender.map((prediction, index) => {
//                     const [x, y, width, height] = prediction.bbox;
//                     const score = Math.round(prediction.score * 100);

//                     return (
//                         <div key={index} style={{
//                                 position: 'absolute',
//                                 border: '2px solid #00FFFF',
//                                 left: `${x}px`,
//                                 top: `${y-10}px`,
//                                 width: `${width}px`,
//                                 height: `${height}px`,
//                                 zIndex: 10, // Ensure highlighter is above video
//                             }}
//                         >
//                             <div
//                                 className="highlighter"
//                                 style={{
//                                     width: '100%',
//                                     height: '100%',
//                                     // border is already defined in CSS for .highlighter
//                                 }}
//                             ></div>
//                             <p
//                                 className="prediction-label"
//                                 style={{
//                                     position: 'absolute', // Position relative to the overlay div
//                                     // Adjust label position slightly if needed
//                                     left: '0px',
//                                     top: '-18px', // Move label slightly above the box
//                                     whiteSpace: 'nowrap',
//                                     // Other label styles are in CSS
//                                 }}
//                             >
//                                 {prediction.class} - {score}% confidence.
//                             </p>
//                         </div>
//                     );
//                 })}
//             </div>
//             {/* Add placeholder for ingredients list below webcam */}
//             <p className="instruction-text">
//                 Click on the detected object's label (the text like "apple - 95% confidence.") to add it to your selected ingredients list below.
//             </p>
//             <div className="selected-ingredients-section">
//                 <h3>Selected Ingredients</h3>
//                 <ul className="selected-ingredients-list">
//                     {/* Render selected ingredients here */}
//                     {/* Example: {selectedIngredients.map((ing, idx) => <li key={idx}>{ing}</li>)} */}
//                 </ul>
//             </div>
//         </div>
//     );
// }