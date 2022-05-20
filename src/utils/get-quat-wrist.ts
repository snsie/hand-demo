import * as THREE from 'three';
import getBoneName from './get-bone-name';
import getVecOrth from './get-vec-orth';
const vecBonePos0 = new THREE.Vector3();
const vecBonePos1 = new THREE.Vector3();
const vecBonePos2 = new THREE.Vector3();
const vecTrackPos0 = new THREE.Vector3();
const vecTrackPos1 = new THREE.Vector3();
const vecTrackPos2 = new THREE.Vector3();
const vecFrom = new THREE.Vector3();
const vecTo = new THREE.Vector3();

const quatOrth = new THREE.Quaternion();
const quatLat = new THREE.Quaternion();
const quatLon = new THREE.Quaternion();
const quatFinal = new THREE.Quaternion();
// const quatComp = new THREE.Quaternion();
// const quatFinal = new THREE.Quaternion();
function addZeros(num, totalLength) {
  return `bone${String(num).padStart(totalLength, '0')}`;
}

// const point0 = 0;
// const point1 = 1;
// const point2 = 13;
export default function getQuatWrist(
  handLabel,
  groupRef,
  skeleton,
  keypointsArray,
  point0,
  point1,
  point2
) {
  const pointFinal1 = point2;
  const pointFinal2 = point1;
  // console.log(pointFinal1);
  const wrist = skeleton.getBoneByName(`${getBoneName(0)}`) as THREE.Bone;
  // const wrist = skeleton.getBoneByName[0];
  skeleton.getBoneByName(addZeros(point0, 3)).getWorldPosition(vecBonePos0);
  skeleton
    .getBoneByName(addZeros(pointFinal1, 3))
    .getWorldPosition(vecBonePos1);
  skeleton
    .getBoneByName(addZeros(pointFinal2, 3))
    .getWorldPosition(vecBonePos2);

  vecTrackPos0.set(
    keypointsArray[point0 * 3 + 0],
    keypointsArray[point0 * 3 + 1],
    keypointsArray[point0 * 3 + 2]
  );
  vecTrackPos1.set(
    keypointsArray[pointFinal1 * 3 + 0],
    keypointsArray[pointFinal1 * 3 + 1],
    keypointsArray[pointFinal1 * 3 + 2]
  );
  vecTrackPos2.set(
    keypointsArray[pointFinal2 * 3 + 0],
    keypointsArray[pointFinal2 * 3 + 1],
    keypointsArray[pointFinal2 * 3 + 2]
  );

  vecFrom.copy(getVecOrth(vecBonePos0, vecBonePos1, vecBonePos2));
  vecTo.copy(getVecOrth(vecTrackPos0, vecTrackPos1, vecTrackPos2));
  // vecFrom.subVectors(vecBonePos1, vecBonePos0).normalize();
  // vecTo.subVectors(vecTrackPos1, vecTrackPos0).normalize();
  quatOrth.setFromUnitVectors(vecFrom, vecTo);
  vecFrom.subVectors(vecBonePos2, vecBonePos1).normalize();
  vecTo.subVectors(vecTrackPos2, vecTrackPos1).normalize();

  quatLat.setFromUnitVectors(vecFrom, vecTo);
  // vecFrom.subVectors(vecBonePos1, vecBonePos0).normalize();
  // vecTo.subVectors(vecTrackPos1, vecTrackPos0).normalize();
  // quatLon.setFromUnitVectors(vecFrom, vecTo);
  quatOrth.multiply(quatLat);
  quatFinal.copy(groupRef.quaternion).premultiply(quatOrth);
  groupRef.quaternion.slerp(quatFinal, 0.7);

  // .premultiply(quatLat);
  // vecFrom.copy(getVecOrth(vecBonePos0, vecBonePos1, vecBonePos2));
  // vecTo.copy(getVecOrth(vecTrackPos0, vecTrackPos1, vecTrackPos2));
}
