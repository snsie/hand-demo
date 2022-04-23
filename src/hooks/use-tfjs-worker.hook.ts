import { useEffect, useMemo, useRef } from 'react';
import createTfjsWorker from '@/utils/create-tfjs-worker';
import handTask from '@/tfjs/hand-tfjs';
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
  // useEffect(() => {

  // }, []);
  useEffect(() => {
    handTask(tfjsWorkerRef.current);
  }, []);
  return null;
}
