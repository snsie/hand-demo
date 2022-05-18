import * as THREE from 'three';

import getBoneName from './get-bone-name';
const vec1 = new THREE.Vector3();
const vec2 = new THREE.Vector3();
const vecOrth = new THREE.Vector3();
const quat1 = new THREE.Quaternion();
export default function getRotThumb(skeleton, keypointsArray, indexBot) {
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
  thumbCmc.rotation.y = thumbCmcAngle;

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
  const thumbIp = skeleton.getBoneByName(
    `${getBoneName(index1)}`
  ) as THREE.Bone;
  const wrist = skeleton.getBoneByName(`${getBoneName(0)}`) as THREE.Bone;
  quat1.copy(thumbIp.quaternion).premultiply(wrist.quaternion);
  // vec1.applyQuaternion(quat1);

  // thumbIp.rotation.x = thumbIpAngle / 2;
  // thumbIp.rotation.z = thumbIpAngle / 10;
  thumbIp.lookAt(0, 1, 0);
  console.log(vec1);
  // thumbIp.rotation.y = thumbAngle / 1;
  // }
}
