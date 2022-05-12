/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import {
  // Text,
  useGLTF,
} from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame, useThree } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    hand: THREE.SkinnedMesh;
    bone000: THREE.Bone;
  };
  materials: {
    ['Material #46']: THREE.MeshStandardMaterial;
  };
};
const scaleMag = 7;
const quaternionWrist = new THREE.Quaternion(0, 0, 0, 1);
const quaternionWristConj = new THREE.Quaternion(0, 0, 0, 1);
const baseQuaternionWrist = new THREE.Quaternion(0, 0, 0, 1);
const wristPosition = new THREE.Vector3();

const quaternion1 = new THREE.Quaternion();
const quaternion2 = new THREE.Quaternion();
// const quaternionWrist = new THREE.Quaternion();
// const quaternion2 = new ThreejsQuaternion();
const vector1 = new THREE.Vector3();
const vector2 = new THREE.Vector3();
const vector3 = new THREE.Vector3();
const vectorFrom1 = new THREE.Vector3();
const vectorFrom2 = new THREE.Vector3();
const vectorFrom3 = new THREE.Vector3();
const vectorBone0Pos = new THREE.Vector3();
const vectorBone1Pos = new THREE.Vector3();
const vectorBone2Pos = new THREE.Vector3();

// const vectorUp1 = new THREE.Vector3();
// const vectorUp2 = new THREE.Vector3();
// const vectorUp3 = new THREE.Vector3();
// const vectorUpFrom1 = new THREE.Vector3();
// const vectorUpFrom2 = new THREE.Vector3();
// const vectorUpFrom3 = new THREE.Vector3();
// const vectorUpBone0Pos = new THREE.Vector3();
// const vectorUpBone1Pos = new THREE.Vector3();
// const vectorUpBone2Pos = new THREE.Vector3();

const euler1 = new THREE.Euler();
const vectorOrigin = new THREE.Vector3(0, 0, 1);

const point0 = 0;
const point1 = 1;
const point2 = 13;
function addZeros(num, totalLength) {
  return `bone${String(num).padStart(totalLength, '0')}`;
}
export default function HandMesh({ basePosRef, keypoints3dRef, ...props }) {
  const group = useRef<THREE.Group>(null!);
  const textRef = useRef<THREE.Mesh>(null!);
  const { nodes, materials } = useGLTF(
    '/gltf/hand_model_parented_sub.glb'
  ) as GLTFResult;
  const array1Ref = useRef('');
  const array2Ref = useRef([0, 0, 0]);
  const wrist = nodes.hand.skeleton.bones[0];
  const [text1State, setText1State] = useState('[0, 0, 0]');

  const bone0 = nodes.hand.skeleton.getBoneByName(
    addZeros(point0, 3)
  ) as THREE.Bone;
  const bone1 = nodes.hand.skeleton.getBoneByName(
    addZeros(point1, 3)
  ) as THREE.Bone;
  const bone2 = nodes.hand.skeleton.getBoneByName(
    `${addZeros(point2, 3)}`
  ) as THREE.Bone;
  useEffect(() => {
    baseQuaternionWrist.copy(wrist.quaternion);
  }, []);

  const { clock, viewport } = useThree();
  const prevVectorRef = useRef([0, 0, 1]);

  useFrame(() => {
    bone0.getWorldPosition(vectorBone0Pos);
    bone1.getWorldPosition(vectorBone1Pos);
    bone2.getWorldPosition(vectorBone2Pos);

    vectorFrom1
      .set(
        vectorBone1Pos.x - vectorBone0Pos.x,
        vectorBone1Pos.y - vectorBone0Pos.y,
        vectorBone1Pos.z - vectorBone0Pos.z
      )
      .normalize();
    vectorFrom2
      .set(
        vectorBone2Pos.x - vectorBone0Pos.x,
        vectorBone2Pos.y - vectorBone0Pos.y,
        vectorBone2Pos.z - vectorBone0Pos.z
      )
      .normalize();
    vectorFrom3.crossVectors(vectorFrom1, vectorFrom2).normalize();

    vector1
      .set(
        keypoints3dRef.current[point1 * 3 + 0] -
          keypoints3dRef.current[point0 * 3 + 0],
        keypoints3dRef.current[point1 * 3 + 1] -
          keypoints3dRef.current[point0 * 3 + 1],
        keypoints3dRef.current[point1 * 3 + 2] -
          keypoints3dRef.current[point0 * 3 + 2]
      )
      .normalize();

    vector2
      .set(
        keypoints3dRef.current[point2 * 3 + 0] -
          keypoints3dRef.current[point0 * 3 + 0],
        keypoints3dRef.current[point2 * 3 + 1] -
          keypoints3dRef.current[point0 * 3 + 1],
        keypoints3dRef.current[point2 * 3 + 2] -
          keypoints3dRef.current[point0 * 3 + 2]
      )
      .normalize();

    vector3.crossVectors(vector1, vector2).normalize();

    quaternion1.setFromUnitVectors(vectorFrom3, vector3);
    // ///////////////////////////////////////////////////////////////
    vectorFrom1
      .set(
        vectorBone2Pos.x - vectorBone1Pos.x,
        vectorBone2Pos.y - vectorBone1Pos.y,
        vectorBone2Pos.z - vectorBone1Pos.z
      )
      .normalize();
    vectorFrom2.copy(vectorFrom3);
    vectorFrom3.crossVectors(vectorFrom1, vectorFrom2).normalize;

    vector1
      .set(
        keypoints3dRef.current[point2 * 3 + 0] -
          keypoints3dRef.current[point1 * 3 + 0],
        keypoints3dRef.current[point2 * 3 + 1] -
          keypoints3dRef.current[point1 * 3 + 1],
        keypoints3dRef.current[point2 * 3 + 2] -
          keypoints3dRef.current[point1 * 3 + 2]
      )
      .normalize();

    vector2.copy(vector3);
    vector3.crossVectors(vector1, vector2).normalize();
    quaternion2.setFromUnitVectors(vectorFrom3, vector3).normalize();
    // /////////////////////////////////////////////////////////
    // vectorOrigin.copy(vector3);
    // console.log(
    //   'quat',
    //   quaternion1
    //     .toArray()
    //     .map((val) => val.toFixed(4))
    //     .join()
    // );
    // prevVectorRef
    // quaternion2.premultiply(quaternion1);
    quaternionWrist.premultiply(quaternion1).premultiply(quaternion2);
    // wrist.quaternion.premultiply(quaternion2).premultiply(quaternion1);
    // wrist.position.copy(wristPosition);
    wrist.position.lerp(wristPosition, 0.4);
    wrist.quaternion.slerp(quaternionWrist, 0.75);

    // wrist.quaternion.slerp(quaternion1, 0.3);
    // console.log(
    //   'wristq',
    //   wrist.quaternion
    //     .toArray()
    //     .map((val) => val.toFixed(4))
    //     .join()
    // );
    // setText1State(
    //   wrist.position
    //     .copy(wristPosition)
    //     .toArray()
    //     .map((val) => val.toFixed(4))
    //     .join()
    // );

    // quaternion1.setFromUnitVectors(vectorOrigin, vector3).normalize();
    // euler1.setFromQuaternion(quaternion1);
    // console.log(quaternionWrist.conjugate());

    // quaternionWrist.fromArray(quaternionRef.current);

    // quaternionWristConj.copy(quaternionWrist.conjugate());

    // baseQuaternionWrist.copy(wrist.quaternion).multiply(quaternionWrist);
    // .multiply(quaternionWrist.conjugate());
    // console.log(quaternionWrist);
    // console.log(wrist.quaternion);
    // wrist.applyQuaternion(quaternionWrist);
    // wrist.quaternion.rotateTowards(baseQuaternionWrist, 0.05);

    // console.log(wrist.quaternion.conjugate());
    // wrist.quaternion.multiply(quaternionWrist);

    // .multiply(quaternionWrist.conjugate());
    // console.log(wrist.position);

    // console.log(baseQuaternionWrist.toArray());
    // const time = clock.getElapsedTime();
    // console.log(keypoints3dRef.current[1] + 0.7);

    wristPosition.set(
      viewport.width * basePosRef.current[0],
      viewport.height * basePosRef.current[1],
      0
    );
    // console.log(viewport.width, viewport.height);
    // wristPosition.set(-viewport.width / 2, -viewport.height / 2, 0);
    // console.log(wrist.quaternion.toArray());
    // wrist.position.lerp(wristPosition, 0.4);

    // wrist.rotation.setFromQuaternion(quaternionWrist);
    // wrist.rotation.set(0, -Math.PI / 2, 0);
    // wrist.rotation.fromArray(quaternionRef.current);
    // wrist.rotation.y = (Math.PI / 2) * (-1.01 + basePosRef.current[2]);

    // wrist.rotation.setFromQuaternion(baseQuaternionWrist);
    // thumb_mcp.rotation.y = Math.sin(performance.now() / 1000) / 2 + 0.5;
    // console.log(wrist.rotation.toArray());
    // thumb_ip.rotation.x = Math.sin(performance.now() / 1000) / 2 + 1;
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.bone000} />
      <skinnedMesh
        geometry={nodes.hand.geometry}
        material={materials['Material #46']}
        skeleton={nodes.hand.skeleton}
      />
      {/* <Text
        ref={textRef}
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, -1.5, 0]}
        scale={2.5}
      >
        {array1Ref.current}
      </Text>
      <Text
        // ref={textRef}
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, -2, 0]}
        scale={2.5}
      >
        {text1State}
      </Text> */}
    </group>
  );
}

useGLTF.preload('/gltf/hand_model_parented_sub.glb');
