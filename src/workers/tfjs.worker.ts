import * as tf from '@tensorflow/tfjs';
import handTask from '@/tfjs/hand-tfjs';
import isMobile from '@/utils/is-mobile';
const videoConfig = {
  audio: false,
  video: {
    facingMode: 'user',
    // Only setting the video to a specified size for large screen, on
    // mobile devices accept the default size.
    width: 360,
    height: 270,
    frameRate: {
      ideal: 60,
    },
  },
};
async function getVideoStream() {
  const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
  return stream;
}
onmessage = function (e) {
  // handTask();
  console.log(e.data);

  // console.log('hi ho worker');
  // let pixels = new ImageData(
  //   new Uint8ClampedArray( evt.data.pixels ),
  //   evt.data.width,
  //   evt.data.height
  // );
  // console.log(e.data);
  setTimeout(() => {
    // const stream = getVideoStream();
    postMessage({ test: 'hi' });
  }, 300);
};
