import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import createTfjsWorker from '@/utils/create-tfjs-worker';
import webcamSetup from '@/webcam/webcam-setup';
import WebcamStream from '@/webcam/webcam';
// import webcamDraw from '@/webcam/webcam-draw';
// import { drawWaitTime, imageHeight, imageWidth } from '@/webcam/webcam-params';
import { numKeypoints3d } from '@/tfjs/tfjs-params';
import * as mpHands from '@mediapipe/hands';

const config = {
  locateFile: (file: string) => {
    // console.log(
    //   `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`
    // );
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`;
  },
};
const globalPosJoint = 0;
const point2 = 17;
const point3 = 2;
const updateGamma = 0.2;

export default function useMediapipeHook() {
  // const model = handPoseDetection.SupportedModels.MediaPipeHands;

  const basePosRef = useRef([0, 0, 0]);
  const keypointsRef = useRef(new Float32Array(numKeypoints3d));

  const hands = useMemo(() => {
    // console.log((dpr * widthScale) / heightScale);
    // console.log(dpr);
    const hands = new mpHands.Hands(config);
    hands.setOptions({
      selfieMode: true,
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.75,
    });
    function onResults(results) {
      const keypointsArray3d: number[] = [];

      // multiHandWorldLandmarks
      if (results.multiHandLandmarks[0]) {
        // console.log(results.multiHandedness[0].label);
        for (let i = 0; i < results.multiHandLandmarks[0].length; i++) {
          keypointsArray3d.push(
            results.multiHandWorldLandmarks[0][i].x,
            -results.multiHandWorldLandmarks[0][i].y,
            results.multiHandWorldLandmarks[0][i].z
          );
        }
        // console.log(results.multiHandWorldLandmarks[0][17].y);
        keypointsRef.current.forEach(
          (val, index) =>
            (keypointsRef.current[index] =
              keypointsArray3d[index] * updateGamma + val * (1 - updateGamma))
        );
        // console.log(results);
        const currentBasePos = [
          -0.5 + results.multiHandLandmarks[0][globalPosJoint].x,
          0.6 - results.multiHandLandmarks[0][globalPosJoint].y,
          -results.multiHandLandmarks[0][globalPosJoint].z,
        ];
        basePosRef.current.forEach(
          (val, index) =>
            (basePosRef.current[index] =
              currentBasePos[index] * updateGamma + val * (1 - updateGamma))
        );
      }
    }
    hands.onResults(onResults);
    return hands;
  }, []);

  const webcamRef = useRef<HTMLVideoElement>();
  useEffect(() => {
    let rafId;
    webcamSetup().then((val) => (webcamRef.current = val));
    async function renderVideo() {
      if (webcamRef.current) {
        // webcamRef.current.drawCtx();
        await hands.send({ image: webcamRef.current });
        // webcamRef.current.clearCtx();
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
  return [basePosRef, keypointsRef];
}
