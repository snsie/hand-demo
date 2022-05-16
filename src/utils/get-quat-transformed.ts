import * as THREE from 'three';
import getVecOrth from './get-vec-orth';
const vecBonePos0 = new THREE.Vector3();
const vecBonePos1 = new THREE.Vector3();
const vecBonePos2 = new THREE.Vector3();
const vecTrackPos0 = new THREE.Vector3();
const vecTrackPos1 = new THREE.Vector3();
const vecTrackPos2 = new THREE.Vector3();
const vecFrom = new THREE.Vector3();
const vecTo = new THREE.Vector3();

const quatBase = new THREE.Quaternion();
const quatInit = new THREE.Quaternion();
// const quatComp = new THREE.Quaternion();
// const quatFinal = new THREE.Quaternion();
function addZeros(num, totalLength) {
  return `bone${String(num).padStart(totalLength, '0')}`;
}

// const point0 = 0;
// const point1 = 1;
// const point2 = 13;
export default function getQuatTransformed(
  quatFinal,
  skeleton,
  keypointsArray,
  point0,
  point1,
  quatWrist,
  quatIndexMcpBase
) {
  skeleton.getBoneByName(addZeros(point0, 3)).getWorldPosition(vecBonePos0);
  skeleton.getBoneByName(addZeros(point1, 3)).getWorldPosition(vecBonePos1);

  //   vecTrackPos0.set(
  //     keypointsArray[point0 * 3 + 0],
  //     keypointsArray[point0 * 3 + 1],
  //     keypointsArray[point0 * 3 + 2]
  //   );
  //   vecTrackPos1.set(
  //     keypointsArray[point1 * 3 + 0],
  //     keypointsArray[point1 * 3 + 1],
  //     keypointsArray[point1 * 3 + 2]
  //   );

  // midMcp.getWorldPosition(vecBonePos2);
  // // pointMidMcp
  vecFrom.subVectors(vecBonePos1, vecBonePos0).normalize();
  vecTo
    .set(
      keypointsArray[point1 * 3 + 0] - keypointsArray[point0 * 3 + 0],
      keypointsArray[point1 * 3 + 1] - keypointsArray[point0 * 3 + 1],
      keypointsArray[point1 * 3 + 2] - keypointsArray[point0 * 3 + 2]
    )
    .normalize();

  quatBase.copy(quatWrist).invert();
  quatInit.copy(quatIndexMcpBase);
  quatBase.premultiply(quatInit);
  vecFrom.applyQuaternion(quatBase);
  vecTo.applyQuaternion(quatBase);
  quatFinal.setFromUnitVectors(vecFrom, vecTo).multiply(quatInit);

  //   vecFrom.copy(getVecOrth(vecBonePos0, vecBonePos1, vecBonePos2));
  //   vecTo.copy(getVecOrth(vecTrackPos0, vecTrackPos1, vecTrackPos2));
  //   // vecFrom.subVectors(vecBonePos1, vecBonePos0).normalize();
  //   // vecTo.subVectors(vecTrackPos1, vecTrackPos0).normalize();
  //   quatOrth.setFromUnitVectors(vecFrom, vecTo);
  //   vecFrom.subVectors(vecBonePos2, vecBonePos0).normalize();
  //   vecTo.subVectors(vecTrackPos2, vecTrackPos0).normalize();
  //   // vecFrom.applyQuaternion(quatOrth);
  //   // vecTo.applyQuaternion(quatOrth);

  //   quatLat.setFromUnitVectors(vecFrom, vecTo).premultiply(quatOrth);
  //   quatFinal.premultiply(quatLat);
  //   // .premultiply(quatLat);
  //   // vecFrom.copy(getVecOrth(vecBonePos0, vecBonePos1, vecBonePos2));
  //   // vecTo.copy(getVecOrth(vecTrackPos0, vecTrackPos1, vecTrackPos2));
}
