import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import "./facialExpression.css"
import axios from 'axios';

export default function FacialExpression({ setSongs }) {
    const videoRef = useRef();
    const [detectedMood, setDetectedMood] = useState(null);

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectMood() {
        try {
            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();
            
            if (!detections || detections.length === 0) {
                setDetectedMood(null);
                return;
            }

            let mostProbableExpression = 0;
            let _expression = '';
            const expressions = detections[0].expressions;

            for (const expression of Object.keys(expressions)) {
                if (expressions[expression] > mostProbableExpression) {
                    mostProbableExpression = expressions[expression];
                    _expression = expression;
                }
            }

            setDetectedMood(_expression);
            const response = await axios.get(`http://localhost:3000/songs?mood=${_expression}`);
            setSongs(response.data.songs);
        } catch (error) {
            console.error("Error detecting mood:", error);
        }
    }

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div className='mood-element'>
            <h1 className="mood-title">Live Mood Detection</h1>
            <p className="mood-description">
                Your current mood is being analyzed in real-time. Enjoy music tailored to your feelings.
            </p>
            
            <video
                ref={videoRef}
                autoPlay
                muted
                className='user-video-feed'
            />
            <button onClick={detectMood}>Start Listening</button>
            {detectedMood && (
                <p className="mood-result">Detected Mood: {detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1)}</p>
            )}
        </div>
    );
}