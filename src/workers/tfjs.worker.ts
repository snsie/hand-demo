import * as tf from '@tensorflow/tfjs';
import handTask from '@/tfjs/hand-tfjs';
onmessage = function (e) {
  // handTask();
  // console.log(e.data);
  setTimeout(() => {
    this.postMessage({ test: 'hi' });
  }, 300);
};
