import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import createTfjsWorker from '@/utils/create-tfjs-worker';
import webcamSetup from '@/webcam/webcam-setup';
import WebcamStream from '@/webcam/webcam';
// import webcamDraw from '@/webcam/webcam-draw';
import { drawWaitTime } from '@/webcam/webcam-params';
import { numKeypoints3d } from '@/tfjs/tfjs-params';

// import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
// import postHandCoords from '../tfjs/post-hand-coords';
import * as mpHands from '@mediapipe/hands';
// import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import onResults from '@/webcam/on-results';
// const test = new Float32Array(numKeypoints3d);
const config = {
  locateFile: (file: string) => {
    // console.log(
    //   `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`
    // );
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`;
  },
};
export default function useMediapipeHook() {
  // const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: 'mediapipe' as 'mediapipe',
    type: 'full' as 'full',
    maxHands: 1,
    // STATIC_IMAGE_MODE: true,
  };
  const hands = useMemo(() => {
    const hands = new mpHands.Hands(config);
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onResults);
    return hands;
  }, []);

  // handPoseDetection.createDetector(model, {
  //   runtime: detectorConfig.runtime,
  //   modelType: detectorConfig.type,
  //   maxHands: detectorConfig.maxHands,
  //   solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
  // }); // handPoseDetection.createDetector(model, {
  //   runtime: detectorConfig.runtime,
  //   modelType: detectorConfig.type,
  //   maxHands: detectorConfig.maxHands,
  //   solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`,
  // });
  const quaternionRef = useRef([0, 0, 0, 1]);
  const keypointsRef = useRef(new Float32Array(numKeypoints3d));
  // const tfjsWorker = useMemo(createTfjsWorker, []);
  // const tfjsWorkerRef = useRef<Worker>(tfjsWorker);
  const webcamRef = useRef<WebcamStream>();
  useEffect(() => {
    let rafId;
    webcamSetup().then((val) => (webcamRef.current = val));
    async function renderVideo() {
      if (webcamRef.current) {
        webcamRef.current.drawCtx();
        await hands.send({ image: webcamRef.current.video });
      }
      rafId = requestAnimationFrame(renderVideo);
    }
    rafId = requestAnimationFrame(renderVideo);
    const cleanupWebCam = () => {
      cancelAnimationFrame(rafId);
    };

    // console.log(hands);

    return () => {
      cleanupWebCam();
    };
  }, []);
  return [quaternionRef, keypointsRef];
}
// worker.postMessage(
//   {
//     pixels: pixels.data.buffer,
//     width: camera.canvas.width,
//     height: camera.canvas.height,
//     channels: 4,
//   },
//   [pixels.data.buffer]
// );
