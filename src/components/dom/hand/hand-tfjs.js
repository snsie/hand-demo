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

//  import '@tensorflow/tfjs-backend-webgl';
import * as mpHands from '@mediapipe/hands';
import * as scatter from 'scatter-gl';
import * as THREE from 'three';
//  import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

//  tfjsWasm.setWasmPaths(
//      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
//          tfjsWasm.version_wasm}/dist/`);

import * as handdetection from '@tensorflow-models/hand-pose-detection';

import { Camera } from './hand-camera';
import { setupDatGui } from './hand-option-panel';
import { STATE } from './hand-params';
//  import {setupStats} from './shared/stats_panel';
import { setBackendAndEnvFlags } from './hand-util';

let detector, camera, stats, scatterGLCtxtLeftHand, scatterGLCtxtRightHand;
let startInferenceTime,
  numInferences = 0;
let inferenceTimeSum = 0,
  lastPanelUpdate = 0;
let rafId;
let current_gesture = "None";

function createScatterGLContext(selectors) {
  const scatterGLEl = document.querySelector(selectors);
  return {
    scatterGLEl,
    scatterGL: new scatter.ScatterGL(scatterGLEl, {
      rotateOnStart: true,
      selectEnabled: false,
      styles: { polyline: { defaultOpacity: 1, deselectedOpacity: 1 } },
    }),
    scatterGLHasInitialized: false,
  };
}
async function createDetector() {
  switch (STATE.model) {
    case handdetection.SupportedModels.MediaPipeHands:
      const runtime = STATE.backend.split('-')[0];
      if (runtime === 'mediapipe') {
        return handdetection.createDetector(STATE.model, {
          runtime,
          modelType: STATE.modelConfig.type,
          maxHands: STATE.modelConfig.maxNumHands,
          solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`,
        });
      } else if (runtime === 'tfjs') {
        return handdetection.createDetector(STATE.model, {
          runtime,
          modelType: STATE.modelConfig.type,
          maxHands: STATE.modelConfig.maxNumHands,
        });
      }
  }
}

async function checkGuiUpdate() {
  if (STATE.isTargetFPSChanged || STATE.isSizeOptionChanged) {
    camera = await Camera.setupCamera(STATE.camera);
    STATE.isTargetFPSChanged = false;
    STATE.isSizeOptionChanged = false;
  }

  if (STATE.isModelChanged || STATE.isFlagChanged || STATE.isBackendChanged) {
    STATE.isModelChanged = true;

    window.cancelAnimationFrame(rafId);

    if (detector != null) {
      detector.dispose();
    }

    if (STATE.isFlagChanged || STATE.isBackendChanged) {
      await setBackendAndEnvFlags(STATE.flags, STATE.backend);
    }

    try {
      detector = await createDetector(STATE.model);
    } catch (error) {
      detector = null;
      alert(error);
    }

    STATE.isFlagChanged = false;
    STATE.isBackendChanged = false;
    STATE.isModelChanged = false;
  }
}

function beginEstimateHandsStats() {
  startInferenceTime = (performance || Date).now();
}

function endEstimateHandsStats() {
  const endInferenceTime = (performance || Date).now();
  inferenceTimeSum += endInferenceTime - startInferenceTime;
  ++numInferences;

  const panelUpdateMilliseconds = 1000;
  //    if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {
  //      const averageInferenceTime = inferenceTimeSum / numInferences;
  //      inferenceTimeSum = 0;
  //      numInferences = 0;
  //      stats.customFpsPanel.update(
  //          1000.0 / averageInferenceTime, 120 /* maxValue */);
  //      lastPanelUpdate = endInferenceTime;
  //    }
}

function normalizeRadians(angle) {
  return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI));
}

function get_gesture(hand)
{
  const WRIST_JOINT = 0;
  const MIDDLE_FINGER_PIP_JOINT = 6;
  const INDEX_FINGER_PIP_JOINT = 4;
  const RING_FINGER_PIP_JOINT = 8;
  let gesture = "None";

  const x0 = hand.keypoints3D[WRIST_JOINT].x * 640;
  const y0 = hand.keypoints3D[WRIST_JOINT].y * 480;
  const z0 = hand.keypoints3D[WRIST_JOINT].z * 480;

  let x1 = (hand.keypoints3D[INDEX_FINGER_PIP_JOINT].x + hand.keypoints3D[RING_FINGER_PIP_JOINT].x) / 2;
  let y1 = (hand.keypoints3D[INDEX_FINGER_PIP_JOINT].y + hand.keypoints3D[RING_FINGER_PIP_JOINT].y) / 2;
  let z1 = (hand.keypoints3D[INDEX_FINGER_PIP_JOINT].z + hand.keypoints3D[RING_FINGER_PIP_JOINT].z) / 2;

  x1 = (x1 + hand.keypoints3D[MIDDLE_FINGER_PIP_JOINT].x) / 2 * 640;
  y1 = (y1 + hand.keypoints3D[MIDDLE_FINGER_PIP_JOINT].y) / 2 * 480;
  z1 = (z1 + hand.keypoints3D[MIDDLE_FINGER_PIP_JOINT].z) / 2 * 480;

  const rotation_y = normalizeRadians(Math.PI / 2 - Math.atan2(-(y1 - y0), x1 - x0)) * 180 / Math.PI;
  const rotation_z = normalizeRadians(Math.PI / 2 - Math.atan2(-(z1 - z0), x1 - x0)) * 180 / Math.PI;

  let index_top = new THREE.Vector3(hand.keypoints3D[7].x, hand.keypoints3D[7].y, hand.keypoints3D[7].z);
  let middle_top = new THREE.Vector3(hand.keypoints3D[11].x, hand.keypoints3D[11].y, hand.keypoints3D[11].z);
  let thumb_top = new THREE.Vector3(hand.keypoints3D[4].x, hand.keypoints3D[4].y, hand.keypoints3D[4].z);

  const index_dist = index_top.distanceTo(thumb_top);
  const middle_dist = middle_top.distanceTo(thumb_top);

  // scapel gesture
  if (index_dist <= 0.04 && middle_dist <= 0.04 && rotation_z >=  -180 && rotation_z <= 0 && rotation_y >= -50 && rotation_y <= 100)
  {
    gesture = "Scapel";
  }
  else
  {
    gesture = "None";
  }
  console.log(`Thumb to middle: ${middle_dist}\nThumb to index: ${index_dist}\nRot XY: ${rotation_y}\nRot XZ: ${rotation_z}`);

  return gesture;
}

function update_gesture(hand)
{
  current_gesture = get_gesture(hand);
}

async function renderResult() {
  if (camera.video.readyState < 2) {
    await new Promise((resolve) => {
      camera.video.onloadeddata = () => {
        resolve(video);
      };
    });
  }

  let hands = null;
  //    const ctxt = [this.scatterGLCtxtLeftHand, this.scatterGLCtxtRightHand][i];

  // Detector can be null if initialization failed (for example when loading
  // from a URL that does not exist).
  if (detector != null) {
    // FPS only counts the time it takes to finish estimateHands.
    beginEstimateHandsStats();

    // Detectors can throw errors, for example when using custom URLs that
    // contain a model that doesn't provide the expected output.
    try {
      hands = await detector.estimateHands(camera.video, {
        flipHorizontal: false,
      });
    } catch (error) {
      detector.dispose();
      detector = null;
      alert(error);
    }

    endEstimateHandsStats();
  }

  // print orientation using quaternions for first hand detected
  if (hands && hands.length > 0)
  {
    const hand = hands[0];
    update_gesture(hand);
    console.log(current_gesture);
    // calculate orientation of hand to camera
    // TODO: add in gestures for holding scapel, check distances between fingers and hands, and use quaternion for proper hand orientation
    /*const camera_unit = new THREE.Vector3(0, 1, 0);
    let wrist = hand.keypoints3D[0];
    let thumb = hand.keypoints3D[1];
    let middle = hand.keypoints3D[10]

    wrist = new THREE.Vector3(wrist.x, wrist.y, wrist.z);
    thumb = new THREE.Vector3(thumb.x, thumb.y, thumb.z);
    middle = new THREE.Vector3(middle.x, middle.y, middle.z);
    wrist.normalize();
    thumb.normalize();
    middle.normalize();

    thumb.sub(wrist);
    middle.sub(wrist);

    // now thumb should be a vector on the plane of the hand pointing out from the palm
    thumb.cross(middle);

    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(wrist, thumb.angleTo(camera_unit));
    // console.log(quaternion);*/

    // detect scapel gesture
    /*
    let index_top = new THREE.Vector3(hand.keypoints3D[7].x, hand.keypoints3D[7].y, hand.keypoints3D[7].z);
    let index_mid = new THREE.Vector3(hand.keypoints3D[6].x, hand.keypoints3D[6].y, hand.keypoints3D[6].z);
    let index_bot = new THREE.Vector3(hand.keypoints3D[5].x, hand.keypoints3D[5].y, hand.keypoints3D[5].z);
    let thumb_top = new THREE.Vector3(hand.keypoints3D[4].x, hand.keypoints3D[4].y, hand.keypoints3D[4].z);

    const thumb_dist = index_top.distanceTo(thumb_top);

    index_top.sub(index_mid);
    index_bot.sub(index_mid);
    // apply quaternion to these vectors so they match the orientation of the hand before calculating angle
    index_top.applyQuaternion(quaternion);
    index_bot.applyQuaternion(quaternion);
    const index_angle = index_top.angleTo(index_bot);

    let middle_top = new THREE.Vector3(hand.keypoints3D[11].x, hand.keypoints3D[11].y, hand.keypoints3D[11].z);
    let middle_mid = new THREE.Vector3(hand.keypoints3D[10].x, hand.keypoints3D[10].y, hand.keypoints3D[10].z);
    let middle_bot = new THREE.Vector3(hand.keypoints3D[9].x, hand.keypoints3D[9].y, hand.keypoints3D[9].z);

    middle_top.sub(middle_mid);
    middle_bot.sub(middle_mid);
    // apply quaternion to these vectors so they match the orientation of the hand before calculating angle
    middle_top.applyQuaternion(quaternion);console.log("Scapel");
    middle_bot.applyQuaternion(quaternion);
    const middle_angle = middle_top.angleTo(middle_bot);

    if (thumb_dist <= 0.4 && (index_angle * 180) / Math.PI <= 170 && (index_angle * 180) / Math.PI >= 120 && (middle_angle * 180) / Math.PI <= 120 && (middle_angle * 180) / Math.PI >= 80)
    {
      console.log("Scapel");
    }
    else
    {
      console.log(`Index angle: ${(index_angle * 180) / Math.PI}\nMiddle angle: ${(middle_angle * 180) / Math.PI}\nThumb dist: ${thumb_dist}`);
    }*/
    /*
    thumb = new THREE.Vector3(hand.keypoints3D[4].x, hand.keypoints3D[4].y, hand.keypoints3D[4].z);
    middle = new THREE.Vector3(hand.keypoints3D[12].x, hand.keypoints3D[12].y, hand.keypoints3D[12].z);
    let index = new THREE.Vector3(hand.keypoints3D[8].x, hand.keypoints3D[8].y, hand.keypoints3D[8].z);
    if (quaternion.w >= 0.75 && quaternion.w <= 1.05 && thumb.distanceTo(middle) < 0.05 && thumb.distanceTo(index) < 0.05)
    {
      console.log("Scapel");
    }
    else
    {
      console.log(`Thumb to middle: ${thumb.distanceTo(middle)}\nThumb to index: ${thumb.distanceTo(index)}\nW: ${quaternion.w}`);
    }*/

  }

  camera.drawCtx();

  // The null check makes sure the UI is not in the middle of changing to a
  // different model. If during model change, the result is from an old model,
  // which shouldn't be rendered.
  if (hands && hands.length > 0 && !STATE.isModelChanged) {
    camera.drawResults(hands, scatterGLCtxtLeftHand, scatterGLCtxtRightHand);
  }
}

async function renderPrediction(scatterGLCtxtLeftHand, scatterGLCtxtRightHand) {
  await checkGuiUpdate();

  if (!STATE.isModelChanged) {
    await renderResult(scatterGLCtxtLeftHand, scatterGLCtxtRightHand);
  }

  rafId = requestAnimationFrame(renderPrediction);
}

async function handTask() {
  // Gui content will change depending on which model is in the query string.
  //    const urlParams = new URLSearchParams(window.location.search);
  //    if (!urlParams.has('model')) {
  //      alert('Cannot find model in the query string.');
  //      return;
  //    }

  await setupDatGui();
  //    scatterGLCtxtLeftHand = createScatterGLContext('#scatter-gl-container-left');
  //    scatterGLCtxtRightHand = createScatterGLContext('#scatter-gl-container-right');
  camera = await Camera.setupCamera(STATE.camera);
  //    camera = await Camera.setupCamera(STATE.camera,scatterGLCtxtLeftHand,scatterGLCtxtRightHand);

  await setBackendAndEnvFlags(STATE.flags, STATE.backend);

  detector = await createDetector();

  renderPrediction();
}
export default handTask;
