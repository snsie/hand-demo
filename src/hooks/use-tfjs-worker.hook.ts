import { useEffect, useMemo, useRef } from 'react';
import TfjsWorker from '../workers/tfjs.worker?worker';
const createTfjsWorker = () => {
  const worker = new TfjsWorker();

  return worker;
};
export default function useTfjsWorkerHook() {
  const tfjsWorker = useMemo(createTfjsWorker, []);
  const tfjsWorkerRef = useRef<Worker>(tfjsWorker);

  useEffect(() => {
    tfjsWorkerRef.current = tfjsWorker;
    tfjsWorker.onmessage = (e) => {
      // console.log(e.data);
    };
    const cleanup = () => {
      tfjsWorker.terminate();
    };
    return cleanup;
  }, [tfjsWorker]);
  useEffect(() => {
    tfjsWorkerRef.current.postMessage({ test: 'te' });
  }, []);
  return null;
}
