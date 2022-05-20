import logArray from '@/utils/log-array';
import * as THREE from 'three';

import getBoneName from './get-bone-name';
const vec1 = new THREE.Vector3();
const vec2 = new THREE.Vector3();
const vecOrth = new THREE.Vector3();
const quat1 = new THREE.Quaternion();
const quat2 = new THREE.Quaternion();
const mat1 = new THREE.Matrix4();
const mat2 = new THREE.Matrix4();
const eul1 = new THREE.Euler();
const eul2 = new THREE.Euler();

const quatRotx = new THREE.Quaternion(-0.70710678118, 0, 0, 0.70710678118);
export default function getRotThumb(
  axesRef,
  skeleton,
  keypointsArray,
  indexBot
) {
  let index0 = indexBot - 1;

  let index1 = indexBot;
  let index2 = indexBot + 1;

  vec1
    .set(
      keypointsArray[index2 * 3 + 0] - keypointsArray[index1 * 3 + 0],
      keypointsArray[index2 * 3 + 1] - keypointsArray[index1 * 3 + 1],
      keypointsArray[index2 * 3 + 2] - keypointsArray[index1 * 3 + 2]
    )
    .normalize();
  vec2
    .set(
      keypointsArray[index1 * 3 + 0] - keypointsArray[index0 * 3 + 0],
      keypointsArray[index1 * 3 + 1] - keypointsArray[index0 * 3 + 1],
      keypointsArray[index1 * 3 + 2] - keypointsArray[index0 * 3 + 2]
    )
    .normalize();
  vecOrth.crossVectors(vec1, vec2);
  const thumbCmcAngle = -Math.PI * 1.45 * Math.max(0, vecOrth.length() - 0.15);
  //   console.log(thumbAngle);
  const thumbCmc = skeleton.getBoneByName(
    `${getBoneName(indexBot)}`
  ) as THREE.Bone;
  // thumbCmc.rotation.y = thumbCmcAngle;

  // for (let i = 0; i < 1; i++) {
  let i = 0;
  index0 = indexBot;

  index1 = indexBot + 1 + i;
  index2 = indexBot + 2 + i;

  vec1
    .set(
      keypointsArray[index2 * 3 + 0] - keypointsArray[index1 * 3 + 0],
      keypointsArray[index2 * 3 + 1] - keypointsArray[index1 * 3 + 1],
      keypointsArray[index2 * 3 + 2] - keypointsArray[index1 * 3 + 2]
    )
    .normalize();
  vec2
    .set(
      keypointsArray[index1 * 3 + 0] - keypointsArray[index0 * 3 + 0],
      keypointsArray[index1 * 3 + 1] - keypointsArray[index0 * 3 + 1],
      keypointsArray[index1 * 3 + 2] - keypointsArray[index0 * 3 + 2]
    )
    .normalize();
  vecOrth.crossVectors(vec1, vec2);
  const thumbMcpAngle = -Math.PI * 3.25 * Math.max(0, vecOrth.length() - 0.25);
  // console.log(vecOrth.length());
  // console.log(thumbAngle);
  const thumbMcp = skeleton.getBoneByName(
    `${getBoneName(index1)}`
  ) as THREE.Bone;
  // thumbMcp.rotation.x = performance.now() / 100;
  // thumbMcp.rotation.z = performance.now() / 100;

  // thumbBone.rotation.z = thumbAngle / 10;
  // thumbBone.rotation.y = thumbAngle / 1;
  // }
  // for (let i = 1; i < 2; i++) {
  // //////////////////////////////////////////////////////////////////////
  // THUMB
  // //////////////////////////////////////////////////////////////////////

  i = 1;
  index0 = indexBot + i;

  index1 = indexBot + 1 + i;
  index2 = indexBot + 2 + i;

  vec1.set(
    keypointsArray[index2 * 3 + 0] - keypointsArray[index1 * 3 + 0],
    keypointsArray[index2 * 3 + 1] - keypointsArray[index1 * 3 + 1],
    keypointsArray[index2 * 3 + 2] - keypointsArray[index1 * 3 + 2]
  );

  vec2
    .set(
      keypointsArray[index1 * 3 + 0] - keypointsArray[index0 * 3 + 0],
      keypointsArray[index1 * 3 + 1] - keypointsArray[index0 * 3 + 1],
      keypointsArray[index1 * 3 + 2] - keypointsArray[index0 * 3 + 2]
    )
    .normalize();
  vecOrth.crossVectors(vec1, vec2);
  const thumbIpAngle = Math.PI * 1.25 * Math.max(0, vecOrth.length() - 0.25);
  const thumbIp = skeleton.getBoneByName(`${getBoneName(1)}`) as THREE.Bone;
  const wrist = skeleton.getBoneByName(`${getBoneName(0)}`) as THREE.Bone;

  // quat1.copy(thumbIp.quaternion).premultiply(wrist.quaternion);
  // console.log('local', wrist.quaternion.toArray());
  // console.log('world', wrist.matrixWorld.toArray());
  vec1.set(0, 0, 1);
  // vec1.applyMatrix4(mat1.extractRotation(wrist.matrixWorld).invert());
  // mat2.extractRotation(thumbIp.matrix).invert();
  // mat2.premultiply(mat1);
  // vec2.applyMatrix4(mat2);
  // thumbIp.getWorldQuaternion(quat1).invert();
  quat2
    .copy(thumbIp.quaternion)
    .invert()
    .premultiply(quat1)
    .premultiply(quatRotx);
  vec2.copy(thumbIp.position);
  vec2.applyQuaternion(quat2);
  // quat1.copy(thumbIp.quaternion).invert();
  // console.log(thumbIp.position.toArray());
  vec1.applyQuaternion(quat1);

  index2 = 2;
  index1 = 1;
  vec1
    .set(
      keypointsArray[index2 * 3 + 0] - keypointsArray[index1 * 3 + 0],
      keypointsArray[index2 * 3 + 1] - keypointsArray[index1 * 3 + 1],
      keypointsArray[index2 * 3 + 2] - keypointsArray[index1 * 3 + 2]
    )
    .normalize();
  vec2.set(
    keypointsArray[index1 * 3 + 0] - keypointsArray[index0 * 3 + 0],
    keypointsArray[index1 * 3 + 1] - keypointsArray[index0 * 3 + 1],
    keypointsArray[index1 * 3 + 2] - keypointsArray[index0 * 3 + 2]
  );
  // quat1.copy(thumbIp.quaternion).;

  vec2.set(0, 1, 0);
  // vec1;
  // vec2.applyQuaternion(quat1);
  wrist.getWorldQuaternion(quat1);
  quat1.multiply(thumbIp.quaternion);
  vec2.applyQuaternion(quat1);
  // vec1.applyQuaternion(quat1);
  logArray(vec1.toArray());
  quat2.setFromUnitVectors(vec1, vec2);

  // thumbIp.quaternion.slerp(quat2, 0.5);
  // const testThumb = skeleton.getBoneByName(`${getBoneName(1)}`) as THREE.Bone;
  // quat1.copy(thumbMcp.quaternion);
  // eul1.set(performance.now() / 1000, 0, 0);
  // quat2.setFromEuler(eul1).premultiply(quat1);
  // axesRef.current.quaternion.copy(quat1);

  // logArray(vec1.toArray());
  // vec1.applyMatrix4;
  // console.log(index1);
  // console.log(thumbIp.up);
  // vec1.applyQuaternion(quat1);

  // thumbIp.rotation.x = thumbIpAngle / 2;
  // thumbIp.rotation.z = thumbIpAngle / 10;
  // thumbIp.lookAt(0, 1, 0);
  // console.log(vec1);
  // thumbIp.rotation.y = thumbAngle / 1;
  // }
}
