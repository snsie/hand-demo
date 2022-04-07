import { lazy } from 'react';
import WaitSpinner from './wait-spinner';
// const FaceTask = lazy(() => import('./face/face'));
// const PoseTask = lazy(() => import('./pose/pose'));
import HandTask from './hand/hand';
// const HandTask = lazy(() => import('./hand/hand'));
export default function TaskPicker({ selectedIndex, ...props }) {
  // if (selectedIndex == 0) return <FaceTask />;
  // if (selectedIndex == 1) return <PoseTask />;
  return <HandTask />;
}
