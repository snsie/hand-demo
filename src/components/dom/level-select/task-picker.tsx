import { lazy } from 'react';
import WaitSpinner from '@/components/dom/wait-spinner/wait-spinner';
// const FaceTask = lazy(() => import('./face/face'));
// const PoseTask = lazy(() => import('./pose/pose'));
import HandTask from '@/components/dom/hand/hand';
// const HandTask = lazy(() => import('./hand/hand'));
export default function LevelSelect({ selectedIndex, ...props }) {
  // if (selectedIndex == 0) return <FaceTask />;
  // if (selectedIndex == 1) return <PoseTask />;
  return <HandTask />;
}
