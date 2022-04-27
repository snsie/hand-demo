import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import postHandCoords from '../tfjs/post-hand-coords';
const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  runtime: 'tfjs' as 'tfjs',
  // STATIC_IMAGE_MODE: true,
};
let detector;
handPoseDetection.createDetector(model, detectorConfig).then((val) => {
  return (detector = val);
});
// const estimationConfig = { flipHorizontal: false };
// async function getVideoStream() {
//   const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
//   return stream;
// }

onmessage = async function (e) {
  // handTask();
  // console.log(e.data);
  // pixelArray.set(e.data.pixels);
  // imageData.data.set(pixelArray);
  if (detector) {
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
