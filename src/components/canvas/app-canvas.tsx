import { Canvas } from '@react-three/fiber';
import BoxAnimatedMesh from '@/components/canvas/objects/box-animated/box-animated.mesh';
import styles from '@/styles/app-canvas.styles.module.css';
import HandMesh from './objects/hand/hand.mesh';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import HandSkeletonMesh from './objects/hand/hand-skeleton.mesh';

export default function AppCanvas({
  wristQuaternionRef,
  keypoints3dRef,
  ...props
}) {
  // This reference gives us direct access to the THREE.Mesh object
  return (
    <Canvas className={styles.appCanvas}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <BoxAnimatedMesh position={[0, 0, -3]} />
      <HandSkeletonMesh keypoints3dRef={keypoints3dRef} />

      <Suspense fallback={null}>
        {/* <HandMesh quaternionRef={wristQuaternionRef} /> */}
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
