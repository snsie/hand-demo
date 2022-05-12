import { numKeypoints, numKeypoints3d } from '@/tfjs/tfjs-params';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function HandSkeletonJoints({ keypoints3dRef, ...props }) {
  const pointsRef = useRef<THREE.Points>(null!);
  useFrame(() => {
    const positionsArray: any =
      pointsRef.current.geometry.attributes.position.array;
    // let x, y, z, index;
    // x = y = z = index = 0;
    for (let i = 0, l = positionsArray.length; i < l; i++) {
      positionsArray[i] = keypoints3dRef.current[i];
      //   positionsArray[i] = y;
      //   positionsArray[index++] = z;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    // console.log(pointsRef.current.geometry.attributes.position.array);
    // pointsRef.current.geometry.setAttribute(
    //   'position'
    // ).attributes.position.array = keypoints3dRef.current;
  });
  return (
    <group scale={14}>
      <points ref={pointsRef}>
        <pointsMaterial color="blue" size={0.1} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={numKeypoints}
            array={keypoints3dRef.current}
            itemSize={3}
          />
        </bufferGeometry>
      </points>
    </group>
  );
}
function createLinesGeom() {
  const points: any = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
}
function createPointsGeom(vertices) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
}
