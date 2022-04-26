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

export const DEFAULT_LINE_WIDTH = 2;
export const DEFAULT_RADIUS = 4;
export const VIDEO_SIZE = {
  '640 X 480': { width: 640, height: 480 },
  '640 X 360': { width: 640, height: 360 },
  '360 X 270': { width: 360, height: 270 },
};
export const imageWidth = 360;
export const imageLength = 270;

export const pixelBufferLength = 4 * imageWidth * imageLength;

const targetFps = 12;
export const drawWaitTime = 1000 / targetFps;
export const STATE = {
  camera: { targetFPS: targetFps, sizeOption: '360 X 270' },
  backend: 'tfjs-webgl',
  runtime: 'tfjs' as 'tfjs',
  flags: {},
  modelConfig: {} as any,
  model: 'MediaPipeHands',
};
export const MEDIAPIPE_HANDS_CONFIG = {
  type: 'full', // or lite
  render3D: true,
};
/**
 * This map descripes tunable flags and theior corresponding types.
 *
 * The flags (keys) in the map satisfy the following two conditions:
 * - Is tunable. For example, `IS_BROWSER` and `IS_CHROME` is not tunable,
 * because they are fixed when running the scripts.
 * - Does not depend on other flags when registering in `ENV.registerFlag()`.
 * This rule aims to make the list streamlined, and, since there are
 * dependencies between flags, only modifying an independent flag without
 * modifying its dependents may cause inconsistency.
 * (`WEBGL_RENDER_FLOAT32_CAPABLE` is an exception, because only exposing
 * `WEBGL_FORCE_F16_TEXTURES` may confuse users.)
 */
export const TUNABLE_FLAG_VALUE_RANGE_MAP = {
  WEBGL_VERSION: [1, 2],
  WASM_HAS_SIMD_SUPPORT: [true, false],
  WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
  WEBGL_CPU_FORWARD: [true, false],
  WEBGL_PACK: [true, false],
  WEBGL_FORCE_F16_TEXTURES: [true, false],
  WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
  WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  CHECK_COMPUTATION_FOR_ERRORS: [true, false],
};
export const videoConfig = {
  audio: false,
  video: {
    facingMode: 'user',
    // Only setting the video to a specified size for large screen, on
    // mobile devices accept the default size.
    width: VIDEO_SIZE['360 X 270'].width,
    height: VIDEO_SIZE['360 X 270'].height,
    frameRate: {
      ideal: STATE.camera.targetFPS,
    },
  },
};
// export const constraints = { video: { frameRate: { ideal: 10, max: 15 } } };
// export const MODEL_BACKEND_MAP = {
//   [handdetection.SupportedModels.MediaPipeHands]: [
//     'tfjs-webgl',
//     'mediapipe-gpu',
//   ],
// };

export const TUNABLE_FLAG_NAME_MAP = {
  PROD: 'production mode',
  WEBGL_VERSION: 'webgl version',
  WASM_HAS_SIMD_SUPPORT: 'wasm SIMD',
  WASM_HAS_MULTITHREAD_SUPPORT: 'wasm multithread',
  WEBGL_CPU_FORWARD: 'cpu forward',
  WEBGL_PACK: 'webgl pack',
  WEBGL_FORCE_F16_TEXTURES: 'enforce float16',
  WEBGL_RENDER_FLOAT32_CAPABLE: 'enable float32',
  WEBGL_FLUSH_THRESHOLD: 'GL flush wait time(ms)',
};
