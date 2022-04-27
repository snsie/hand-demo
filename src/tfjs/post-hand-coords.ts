import { numKeypoints } from './tfjs-params';
import ThreejsQuaternion from '../utils/threejs/threejs.quaternion';
import ThreejsVector3 from '../utils/threejs/threejs.vector3';
const quaternion1 = new ThreejsQuaternion();
// const quaternion2 = new ThreejsQuaternion();
const vector1 = new ThreejsVector3();
const vector2 = new ThreejsVector3();
const vector3 = new ThreejsVector3();
const vectorOrigin = new ThreejsVector3(0, 0, -1);
// function vectorMagnitude(x, y, z) {
//   return Math.sqrt(x * x + y * y + z * z);
// }
// function unitVector(x, y, z) {
//   const vecMag = vectorMagnitude(x, y, z);
//   return [x / vecMag, y / vecMag, z / vecMag];
// }
// function rotationVec(x, y, z) {
//   const unitVec = vectorMagnitude(x, y, z);
//   // const rotationVec=unitVec
//   return;
// }
export default function postHandCoords(hands: any) {
  const keypointsArray2d: number[] = [];
  const keypointsArray3d: number[] = [];
  // const thumbVec = [
  //   hands.keypoints3D[4].x - hands.keypoints3D[3].x,
  //   hands.keypoints3D[4].y - hands.keypoints3D[3].y,
  //   hands.keypoints3D[4].z - hands.keypoints3D[3].z,
  // ];

  vector1
    .set(
      hands.keypoints3D[17].x - hands.keypoints3D[0].x,
      -(hands.keypoints3D[17].y - hands.keypoints3D[0].y),
      hands.keypoints3D[17].z - hands.keypoints3D[0].z
    )
    .normalize();
  // vector1.set(
  //   hands.keypoints3D[5].x,
  //   -hands.keypoints3D[5].y,
  //   hands.keypoints3D[5].z
  // );
  // .normalize();

  vector2
    .set(
      hands.keypoints3D[5].x - hands.keypoints3D[0].x,
      -(hands.keypoints3D[5].y - hands.keypoints3D[0].y),
      hands.keypoints3D[5].z - hands.keypoints3D[0].z
    )
    .normalize();
  // console.log(hands);
  // vector2
  //   .set(
  //     hands.keypoints3D[17].x,
  //     -hands.keypoints3D[17].y,
  //     hands.keypoints3D[17].z
  //   )
  //   .normalize();
  vector3.crossVectors(vector2, vector1).normalize();

  quaternion1.setFromUnitVectors(vectorOrigin, vector3);
  // const wristVec = [
  //   hands.keypoints3D[9].x - hands.keypoints3D[0].x,
  //   hands.keypoints3D[9].y - hands.keypoints3D[0].y,
  //   hands.keypoints3D[9].z - hands.keypoints3D[0].z,
  // ];
  // console.log([-wristVec[0], -wristVec[1], -wristVec[2]]);
  // const wristUnitVec = unitVector(-wristVec[0], wristVec[1], wristVec[2]);
  // console.log([-wristUnitVec[0], -wristUnitVec[1], -wristUnitVec[2]]);
  // console.log(quaternion1.toArray());
  // console.log([
  //   wristUnitVec[0].toFixed(4),
  //   wristUnitVec[1].toFixed(4),
  //   wristUnitVec[2].toFixed(4),
  // ]);
  // const keypoints = hands.keypoints3D;
  // keypoints.map((keypoint) => [-keypoint.x, -keypoint.y, -keypoint.z]);
  // console.log(keypoints);
  const scaleMag = 30;
  for (let i = 0; i < numKeypoints; i++) {
    keypointsArray2d.push(hands.keypoints[i].x, hands.keypoints[i].y);
    keypointsArray3d.push(
      scaleMag * -hands.keypoints3D[i].x,
      scaleMag * -hands.keypoints3D[i].y,
      scaleMag * -hands.keypoints3D[i].z
    );
  }

  const keypointsArray3dArray = new Float32Array(keypointsArray3d);
  // const keypointsArray2dArray = new Float32Array(keypointsArray2d);

  postMessage(
    {
      keypoints3d: keypointsArray3dArray,
      wristQuat: quaternion1.toArray(),
    },
    [keypointsArray3dArray.buffer]
  );
  // postMessage(
  //   {
  //     wristVec: wristUnitVec,
  //     keypoints2d: keypointsArray2dArray,
  //     keypoints3d: keypointsArray3dArray,
  //   },
  //   [keypointsArray2dArray.buffer, keypointsArray3dArray.buffer]
  // );
  //   return keypointsArray3d;
}
