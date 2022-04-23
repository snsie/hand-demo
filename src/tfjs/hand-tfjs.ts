//from: https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection/demos/live_video

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
// import * as mpHands from '@mediapipe/hands';
// import * as mpHands from '../../../utils/hands';
// tf.setBackend('cpu');
// import * as scatter from 'scatter-gl';

// import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
// // import workletURL from "`https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`?url"
// console.log(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`)
// tfjsWasm.setWasmPaths(
//   `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
// );

import * as handdetection from '@tensorflow-models/hand-pose-detection';

import { HandCamera } from './hand-camera';

import { STATE } from './hand-params';
//  import {setupStats} from './shared/stats_panel';
// import { setBackendAndEnvFlags } from './hand-util';

let detector, camera, stats, scatterGLCtxtLeftHand, scatterGLCtxtRightHand;
let startInferenceTime,
  numInferences = 0;
let inferenceTimeSum = 0,
  lastPanelUpdate = 0;
let rafId;

async function createDetector() {
  const runtime = STATE.runtime;

  return handdetection.createDetector(STATE.model, {
    runtime,
    modelType: STATE.modelConfig.type,
    maxHands: STATE.modelConfig.maxNumHands,
  });
}

function beginEstimateHandsStats() {
  startInferenceTime = (performance || Date).now();
}

// function endEstimateHandsStats() {
//   const endInferenceTime = (performance || Date).now();
//   inferenceTimeSum += endInferenceTime - startInferenceTime;
//   ++numInferences;

//   const panelUpdateMilliseconds = 1000;
//    if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {
//      const averageInferenceTime = inferenceTimeSum / numInferences;
//      inferenceTimeSum = 0;
//      numInferences = 0;
//      stats.customFpsPanel.update(
//          1000.0 / averageInferenceTime, 120 /* maxValue */);
//      lastPanelUpdate = endInferenceTime;
//    }
// }
// function toImageTensor(input) {
//   return input instanceof tf.Tensor ? input : tf.browser.fromPixels(input);
// }
async function renderResult() {
  if (camera.video.readyState < 2) {
    await new Promise((resolve) => {
      camera.video.onloadeddata = (video) => {
        resolve(video);
      };
    });
  }

  let hands: any = null;
  //    const ctxt = [this.scatterGLCtxtLeftHand, this.scatterGLCtxtRightHand][i];
  // Detector can be null if initialization failed (for example when loading
  // from a URL that does not exist).
  if (detector != null) {
    // FPS only counts the time it takes to finish estimateHands.
    beginEstimateHandsStats();

    // Detectors can throw errors, for example when using custom URLs that
    // contain a model that doesn't provide the expected output.
    // console.log(camera)
    // let imageTensor = tf.cast(toImageTensor(camera.video), 'float32');

    // const buffer = tf.buffer(imageTensor);
    // console.log(imageTensor)
    // try {
    //   // const track = camera.video.srcObject.getVideoTracks()[0];
    //   // const imageCapture = new ImageCapture(track);
    //   // console.log(imageCapture);
    //   //  imageCapture.grabFrame().then(processFrame,camera.ctx);

    //   hands = await detector.estimateHands(camera.video, {
    //     flipHorizontal: false,
    //   });
    // } catch (error) {
    //   detector.dispose();
    //   detector = null;
    //   alert(error);
    // }

    // endEstimateHandsStats();
  }

  camera.drawCtx();

  // console.log(pixels);
  if (hands && hands.length > 0) {
    camera.drawResults(hands, scatterGLCtxtLeftHand, scatterGLCtxtRightHand);
  }
}

async function handTask(worker: Worker) {
  camera = await HandCamera.setupCamera(STATE.camera);
  // detector = await createDetector();
  async function renderPrediction() {
    await renderResult();
    rafId = requestAnimationFrame(renderPrediction);
  }

  await renderPrediction();
  const pixels = camera.ctx.getImageData(
    0,
    0,
    camera.canvas.width,
    camera.canvas.height
  );
  worker.postMessage(
    {
      pixels: pixels.data.buffer,
      width: camera.canvas.width,
      height: camera.canvas.height,
      channels: 4,
    },
    [pixels.data.buffer]
  );
}
export default handTask;
