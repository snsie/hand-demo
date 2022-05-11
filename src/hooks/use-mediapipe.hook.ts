import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import createTfjsWorker from '@/utils/create-tfjs-worker';
import webcamSetup from '@/webcam/webcam-setup';
import WebcamStream from '@/webcam/webcam';
// import webcamDraw from '@/webcam/webcam-draw';
import { drawWaitTime, imageHeight, imageWidth } from '@/webcam/webcam-params';
import { numKeypoints3d } from '@/tfjs/tfjs-params';
import * as THREE from 'three';
import * as mpHands from '@mediapipe/hands';
const quaternion1 = new THREE.Quaternion();
// const quaternion2 = new ThreejsQuaternion();
const vector1 = new THREE.Vector3();
const vector2 = new THREE.Vector3();
const vector3 = new THREE.Vector3();
const euler1 = new THREE.Euler();
const vectorOrigin = new THREE.Vector3(0, 0, 1);
const scaleMag = 5;
const config = {
  locateFile: (file: string) => {
    // console.log(
    //   `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`
    // );
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`;
  },
};
const point1 = 0;
const point2 = 17;
const point3 = 2;
const updateGamma = 0.6;

export default function useMediapipeHook() {
  // const model = handPoseDetection.SupportedModels.MediaPipeHands;

  const quaternionRef = useRef([0, 0, 0]);
  const keypointsRef = useRef(new Float32Array(numKeypoints3d));

  const hands = useMemo(() => {
    // console.log((dpr * widthScale) / heightScale);
    // console.log(dpr);
    const hands = new mpHands.Hands(config);
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.85,
      minTrackingConfidence: 0.85,
    });
    function onResults(results) {
      const keypointsArray3d: number[] = [];
      // console.log(results);
      // const windowWidth = window.innerWidth;
      // const windowHeight = window.innerHeight;

      // const widthScale = windowWidth / imageWidth;
      // const heightScale = windowHeight / imageHeight;
      // const dpr = (window.devicePixelRatio * widthScale) / heightScale;
      // multiHandWorldLandmarks
      if (results.multiHandLandmarks[0]) {
        for (let i = 0; i < results.multiHandLandmarks[0].length; i++) {
          // keypointsArray3d.push(
          //   scaleMag * dpr * (0.5 + -results.multiHandLandmarks[0][i].x),
          //   scaleMag * (0.5 + -results.multiHandLandmarks[0][i].y),
          //   scaleMag * -results.multiHandLandmarks[0][i].z
          // );

          keypointsArray3d.push(
            0.5 - results.multiHandLandmarks[0][i].x,
            0.6 - results.multiHandLandmarks[0][i].y,
            -results.multiHandLandmarks[0][i].z
          );
        }
        keypointsRef.current.forEach(
          (val, index) =>
            (keypointsRef.current[index] =
              val * updateGamma + keypointsArray3d[index] * (1 - updateGamma))
        );
        // keypointsRef.current.set(keypointsArray3d);
        console.log(keypointsRef.current);
        vector1.set(
          results.multiHandWorldLandmarks[0][point2].x -
            results.multiHandWorldLandmarks[0][point1].x,
          results.multiHandWorldLandmarks[0][point2].y -
            results.multiHandWorldLandmarks[0][point1].y,
          results.multiHandWorldLandmarks[0][point2].z -
            results.multiHandWorldLandmarks[0][point1].z
        );

        vector2.set(
          results.multiHandWorldLandmarks[0][point3].x -
            results.multiHandWorldLandmarks[0][point1].x,
          results.multiHandWorldLandmarks[0][point3].y -
            results.multiHandWorldLandmarks[0][point1].y,
          results.multiHandWorldLandmarks[0][point3].z -
            results.multiHandWorldLandmarks[0][point1].z
        );
        vector3.crossVectors(vector2, vector1).normalize();
        // console.log(vector3);
        quaternion1.setFromUnitVectors(vectorOrigin, vector3).normalize();
        euler1.setFromQuaternion(quaternion1);

        // console.log(vector3.toArray());
        // quaternionRef.current = quaternion1.toArray();
        quaternionRef.current = vector3.toArray();
        // console.log(vector3.toArray());
      }
    }
    hands.onResults(onResults);
    return hands;
  }, []);

  // const tfjsWorker = useMemo(createTfjsWorker, []);
  // const tfjsWorkerRef = useRef<Worker>(tfjsWorker);
  const webcamRef = useRef<WebcamStream>();
  useEffect(() => {
    let rafId;
    webcamSetup().then((val) => (webcamRef.current = val));
    async function renderVideo() {
      if (webcamRef.current) {
        // webcamRef.current.drawCtx();
        await hands.send({ image: webcamRef.current.video });
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
  return [quaternionRef, keypointsRef];
}
