import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import createTfjsWorker from '@/utils/create-tfjs-worker';
import webcamSetup from '@/webcam/webcam-setup';
import WebcamStream from '@/webcam/webcam';
// import webcamDraw from '@/webcam/webcam-draw';
import { drawWaitTime } from '@/webcam/webcam-params';
import { numKeypoints3d } from '@/tfjs/tfjs-params';
// const test = new Float32Array(numKeypoints3d);
export default function useTfjsWorkerHook() {
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

  useLayoutEffect(() => {
    let rafId, timeCurrent, timeDelta;
    // const f = async () => {
    //   const test = await webcamSetup();
    //   console.log(test);
    // };
    // f();
    let timePrevious = performance.now();
    webcamSetup().then((val) => (webcamRef.current = val));
    async function renderFrames() {
      rafId = requestAnimationFrame(renderFrames);

      if (webcamRef.current) {
        timeCurrent = performance.now();

        timeDelta = timeCurrent - timePrevious;
        if (timeDelta > drawWaitTime) {
          const pixels = webcamRef.current.drawCtx();
          // const pixels = await webcamDraw(webcamRef.current);
          // console.log('hit')
          // tfjsWorkerRef.current.postMessage(
          //   {
          //     pixels: pixels.data.buffer,
          //     width: webcamRef.current.canvas.width,
          //     height: webcamRef.current.canvas.height,
          //     channels: 4,
          //   },
          //   [pixels.data.buffer]
          // );

          timePrevious = timeCurrent - (timeDelta % drawWaitTime);
        }
        // else {
        //   cancelAnimationFrame(rafId);
        // }
      }
    }
    rafId = requestAnimationFrame(renderFrames);
    const cleanupWebCam = () => {
      cancelAnimationFrame(rafId);
    };

    return () => {
      cleanupWebCam();
    };
    // handTask(tfjsWorkerRef.current);
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
