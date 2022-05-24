import { Canvas } from '@react-three/fiber';
// import BoxAnimatedMesh from '@/components/canvas/objects/box-animated/box-animated.mesh';
import styles from '@/styles/app-canvas.styles.module.css';
import HandMesh from './objects/hand/hand.mesh';
// import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
// import HandSkeletonLines from './objects/hand/hand-skeleton-lines.mesh';
// import HandSkeletonJoints from './objects/hand/hand-skeleton-joints.mesh';
export default function AppCanvas({ handRefs, ...props }) {
  const [
    handLabelRefs,
    basePosRightRef,
    keypointsRightRef,
    basePosLeftRef,
    keypointsLeftRef,
  ] = handRefs;
  // console.log(handLabelRefs);
  // This reference gives us direct access to the THREE.Mesh object
  return (
    <Canvas className={styles.appCanvas}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-5, 5, 4]} />

      {/* <BoxAnimatedMesh position={[0, 0, -3]} /> */}
      {/* <HandSkeletonLines keypoints3dRef={keypointsRightRef} />
      <HandSkeletonJoints keypoints3dRef={keypointsRightRef} />
      <HandSkeletonLines keypoints3dRef={keypointsLeftRef} />
      <HandSkeletonJoints keypoints3dRef={keypointsLeftRef} /> */}
      <Suspense fallback={null}>
        <HandMesh
          handLabelRefs={handLabelRefs}
          handLabel="Right"
          basePosRef={basePosRightRef}
          keypoints3dRef={keypointsRightRef}
          position={[2, 0, 0]}
        />
        <HandMesh
          handLabelRefs={handLabelRefs}
          handLabel="Left"
          basePosRef={basePosLeftRef}
          keypoints3dRef={keypointsLeftRef}
          position={[-2, 0, 0]}
          scale={[-1, 1, 1]}
        />
      </Suspense>

      {/* <Suspense fallback={null}>
        <Environment preset="warehouse" />
      </Suspense> */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
