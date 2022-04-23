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
// import * as scatter from 'scatter-gl';

import * as params from './hand-params';
import isMobile from '../utils/is-mobile';

// These anchor points allow the hand pointcloud to resize according to its
// position in the input.
const ANCHOR_POINTS = [
  [0, 0, 0],
  [0, 0.1, 0],
  [-0.1, 0, 0],
  [-0.1, -0.1, 0],
];

const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
}; // for rendering each finger as a polyline

function processFrame(imageBitmap, canvas) {
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
}
export class HandCamera {
  video;
  canvas;
  ctx;
  constructor() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('output');
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   * @param cameraParam From app `STATE.camera`.
   */

  static async setupCamera(cameraParam) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      );
    }

    const { targetFPS, sizeOption } = cameraParam;
    const $size = params.VIDEO_SIZE[sizeOption];
    const videoConfig = {
      audio: false,
      video: {
        facingMode: 'user',
        // Only setting the video to a specified size for large screen, on
        // mobile devices accept the default size.
        width: isMobile() ? params.VIDEO_SIZE['360 X 270'].width : $size.width,
        height: isMobile()
          ? params.VIDEO_SIZE['360 X 270'].height
          : $size.height,
        frameRate: {
          ideal: targetFPS,
        },
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    const camera = new HandCamera();
    camera.video.srcObject = stream;

    await new Promise((resolve) => {
      camera.video.onloadedmetadata = (video) => {
        resolve(video);
      };
    });

    camera.video.play();

    //  const track =  camera.video.srcObject.getVideoTracks()[0];
    //  const imageCapture = new ImageCapture(track)
    // //  console.log(imageCapture)
    //  imageCapture.grabFrame().then(processFrame,camera.ctx);

    const videoWidth = camera.video.videoWidth;
    const videoHeight = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;

    camera.canvas.width = videoWidth;
    camera.canvas.height = videoHeight;
    const canvasContainer = document.querySelector(
      '.canvas-wrapper'
    ) as HTMLElement;
    canvasContainer.setAttribute(
      'style',
      `width: ${videoWidth}px; height: ${videoHeight}px`
    );

    // Because the image from camera is mirrored, need to flip horizontally.
    camera.ctx.translate(camera.video.videoWidth, 0);
    camera.ctx.scale(-1, 1);

    //  for (const ctxt of [scatterGLCtxtLeftHand,scatterGLCtxtRightHand]) {
    //    ctxt.scatterGLEl.style =
    //        `width: ${videoWidth / 2}px; height: ${videoHeight / 2}px;`;
    //    ctxt.scatterGL.resize();

    //    ctxt.scatterGLEl.style.display =
    //        params.STATE.modelConfig.render3D ? 'inline-block' : 'none';
    //  }

    return camera;
  }

  drawCtx() {
    this.ctx.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  /**
   * Draw the keypoints on the video.
   * @param hands A list of hands to render.
   */
  drawResults(hands, scatterGLCtxtLeftHand, scatterGLCtxtRightHand) {
    // Sort by right to left hands.
    hands.sort((hand1, hand2) => {
      if (hand1.handedness < hand2.handedness) return 1;
      if (hand1.handedness > hand2.handedness) return -1;
      return 0;
    });

    // Pad hands to clear empty scatter GL plots.
    while (hands.length < 2) hands.push({});

    for (let i = 0; i < hands.length; ++i) {
      // Third hand and onwards scatterGL context is set to null since we
      // don't render them.
      //    const ctxt = [scatterGLCtxtLeftHand,scatterGLCtxtRightHand][i];
      this.drawResult(hands[i]);
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param hand A hand with keypoints to render.
   * @param ctxt Scatter GL context to render 3D keypoints to.
   */
  drawResult(hand) {
    if (hand.keypoints != null) {
      const wristCoords = [
        hand.keypoints3D[0].x.toFixed(3),
        hand.keypoints3D[0].y.toFixed(3),
        hand.keypoints3D[0].z.toFixed(3),
      ];
      //  this.drawKeypoints(hand.keypoints, hand.handedness);
    }
    // Don't render 3D hands after first two.
    //  if (ctxt == null) {
    //    return;
    //  }
    //  if (hand.keypoints3D != null && params.STATE.modelConfig.render3D) {
    //    this.drawKeypoints3D(hand.keypoints3D, hand.handedness, ctxt);
    //  } else {
    //    // Clear scatter plot.
    //    this.drawKeypoints3D([], '', ctxt);
    //  }
  }
}