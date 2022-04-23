import TfjsWorker from '../workers/tfjs.worker?worker';

export default function createTfjsWorker() {
  const worker = new TfjsWorker();
  return worker;
}
