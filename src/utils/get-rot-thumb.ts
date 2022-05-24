import * as THREE from 'three';

import getBoneName from './get-bone-name';
const vec1 = new THREE.Vector3();
const vec2 = new THREE.Vector3();
const vecOrth = new THREE.Vector3();
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
  const thumbAngle =
    -0.5 - Math.PI * 0.61 * Math.max(0, vecOrth.length() - 0.15);
  //   console.log(thumbAngle);
  const thumbMcp = skeleton.getBoneByName(
    `${getBoneName(indexBot)}`
  ) as THREE.Bone;
  thumbMcp.rotation.y = THREE.MathUtils.lerp(
    thumbMcp.rotation.y,
    thumbAngle,
    0.7
  );
  // console.log(thumbMcp.rotation.x);
  // thumbMcp.rotation.x = -0.5 + thumbAngle / 5;
  // console.log(thumbMcp.rotation.x);
  for (let i = 0; i < 2; i++) {
    index0 = indexBot + i;

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
        keypointsArray[index0 * 3 + 0] - keypointsArray[index1 * 3 + 0],
        keypointsArray[index0 * 3 + 1] - keypointsArray[index1 * 3 + 1],
        keypointsArray[index0 * 3 + 2] - keypointsArray[index1 * 3 + 2]
      )
      .normalize();
    vecOrth.crossVectors(vec1, vec2);
    const thumbAngle = Math.PI * 1.15 * Math.max(0, vecOrth.length() - 0.1);
    // console.log(thumbAngle);
    const thumbBone = skeleton.getBoneByName(
      `${getBoneName(index1)}`
    ) as THREE.Bone;
    thumbBone.rotation.x = THREE.MathUtils.lerp(
      thumbMcp.rotation.x,
      thumbAngle,
      0.75
    );
    // thumbBone.rotation.y = THREE.MathUtils.lerp(
    //   thumbMcp.rotation.y,
    //   -thumbAngle / 10,
    //   0.75
    // );
    // thumbBone.rotation.x = thumbAngle;
  }
}
