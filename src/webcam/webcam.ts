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

// These anchor points allow the hand pointcloud to resize according to its
// position in the input.

const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
}; // for rendering each finger as a polyline

// function processFrame(imageBitmap, canvas) {
//   canvas.width = imageBitmap.width;
//   canvas.height = imageBitmap.height;
//   canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
// }

export default class Webcam {
  video;
  canvas;
  ctx;
  constructor() {
    this.video = document.getElementById('video');
    // this.canvas = document.getElementById('output');
    // this.ctx = this.canvas.getContext('2d');
  }

  // drawCtx() {
  //   this.ctx.drawImage(
  //     this.video,
  //     0,
  //     0,
  //     this.video.videoWidth,
  //     this.video.videoHeight
  //   );

  //   // this.clearCtx();
  //   // this.ctx.save();
  //   // const pixels = this.ctx.getImageData(
  //   //   0,
  //   //   0,
  //   //   this.canvas.width,
  //   //   this.canvas.height
  //   // );
  //   // this.ctx.scale(-1, 1);
  //   // return pixels;
  // }

  // clearCtx() {
  //   this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  // }
}

function doSomethingWithTheFrame() {
  console.log('logging');
}
