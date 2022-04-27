import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import createTfjsWorker from '@/utils/create-tfjs-worker';
import webcamSetup from '@/webcam/webcam-setup';
import WebcamStream from '@/webcam/webcam';
// import webcamDraw from '@/webcam/webcam-draw';
import { drawWaitTime } from '@/webcam/webcam-params';
import { numKeypoints3d } from '@/tfjs/tfjs-params';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import postHandCoords from '../tfjs/post-hand-coords';
import * as mpHands from '@mediapipe/hands';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

// const test = new Float32Array(numKeypoints3d);
export default function useMediapipeHook() {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: 'mediapipe' as 'mediapipe',
    type: 'full' as 'full',
    maxHands: 1,
    // STATIC_IMAGE_MODE: true,
  };

  tfjsWasm.setWasmPaths(
    `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
  );
  console.log(mpHands.VERSION);
  handPoseDetection.createDetector(model, {
    runtime: detectorConfig.runtime,
    modelType: detectorConfig.type,
    maxHands: detectorConfig.maxHands,
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
  }); // handPoseDetection.createDetector(model, {
  //   runtime: detectorConfig.runtime,
  //   modelType: detectorConfig.type,
  //   maxHands: detectorConfig.maxHands,
  //   solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`,
  // });
  const quaternionRef = useRef([0, 0, 0, 1]);
  const keypointsRef = useRef(new Float32Array(numKeypoints3d));
  const tfjsWorker = useMemo(createTfjsWorker, []);
  const tfjsWorkerRef = useRef<Worker>(tfjsWorker);
  const webcamRef = useRef<WebcamStream>();

  useEffect(() => {
    tfjsWorkerRef.current = tfjsWorker;

    tfjsWorker.onmessage = (e) => {
      if (e.data.wristQuat) {
        keypointsRef.current = e.data.keypoints3d;
        quaternionRef.current = e.data.wristQuat;
        // console.log(keypointsRef.current);
      } // console.log(e.data.wristQuat);
      // console.log(wristQuaternionRef.current);
      // console.log(e.data.wristVec);
    };
    const cleanup = () => {
      tfjsWorker.terminate();
    };
    return cleanup;
  }, [tfjsWorker]);

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
