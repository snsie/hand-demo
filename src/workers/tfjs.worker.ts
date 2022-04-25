import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';

// import handTask from '@/tfjs/hand-tfjs';
import isMobile from '@/utils/is-mobile';
import {
  pixelBufferLength,
  imageWidth,
  imageLength,
} from '@/webcam/webcam-params';
import postHandCoords from '@/tfjs/post-hand-coords';
const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  runtime: 'tfjs' as 'tfjs',
};
const detector = await handPoseDetection.createDetector(model, detectorConfig);
// const estimationConfig = { flipHorizontal: false };
// async function getVideoStream() {
//   const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
//   return stream;
// }
// const pixelArray = new Uint8ClampedArray(pixelBufferLength);
// const imageData = new ImageData(pixelArray, imageWidth, imageLength);
// const imageData = new ImageData(
//   new Uint8ClampedArray(e.data.pixels),
//   imageWidth,
//   imageLength
// );
onmessage = async function (e) {
  // handTask();
  // console.log(e.data);
  // pixelArray.set(e.data.pixels);
  // imageData.data.set(pixelArray);
  const imageData = new ImageData(
    new Uint8ClampedArray(e.data.pixels),
    e.data.width,
    e.data.height
  );
  const hands = await detector.estimateHands(imageData);
  if (hands[0]) {
    postHandCoords(hands[0]);
    // postMessage({ wrist: hands[0].keypoints3D[0] });
  }
  // console.log('hi ho worker');
  // let pixels = new ImageData(
  //   new Uint8ClampedArray( evt.data.pixels ),
  //   evt.data.width,
  //   evt.data.height
  // );

  // console.log(e.data);
  // setTimeout(() => {
  //   // const stream = getVideoStream();
  //   postMessage({ test: 'hi' });
  // }, 300);
};
