import * as THREE from 'three';
import getBoneName from './get-bone-name';

const quatWristInverted = new THREE.Quaternion();
const quatMcpInverted = new THREE.Quaternion();

const vec1 = new THREE.Vector3();
const vec2 = new THREE.Vector3();
const vecOrth = new THREE.Vector3();
let a = 0;
export default function getRotMcp(skeleton, keypointsArray, indexBot) {
  // const wrist = skeleton.bones[0];
  quatWristInverted.copy(skeleton.bones[0].quaternion).invert();
  let index0 = 0;
  let index1 = indexBot;
  let index2 = indexBot + 1;
  for (let i = 0; i < 3; i++) {
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
    vecOrth.crossVectors(vec2, vec1);
    const rotMag = 2 * Math.max(0, vecOrth.length() - 0.5);
    const boneMcp = skeleton.getBoneByName(
      `${getBoneName(index1, 3)}`
    ) as THREE.Bone;

    boneMcp.rotation.x = THREE.MathUtils.lerp(
      boneMcp.rotation.x,
      (Math.PI / 2) * rotMag,
      0.8
    );
    index0 = indexBot + i;
    index1 = indexBot + 1 + i;
    index2 = indexBot + 2 + i;
  }
  // if (indexBot == 5) {
  //   index0 = indexBot + 1;
  //   index1 = indexBot + 2;
  //   index2 = indexBot + 3;
  //   vecTrack
  //     .set(
  //       keypointsArray[index2 * 3 + 0] - keypointsArray[index1 * 3 + 0],
  //       keypointsArray[index2 * 3 + 1] - keypointsArray[index1 * 3 + 1],
  //       keypointsArray[index2 * 3 + 2] - keypointsArray[index1 * 3 + 2]
  //     )
  //     .normalize();
  //   vecTrackWrist
  //     .set(
  //       keypointsArray[index0 * 3 + 0] - keypointsArray[index1 * 3 + 0],
  //       keypointsArray[index0 * 3 + 1] - keypointsArray[index1 * 3 + 1],
  //       keypointsArray[index0 * 3 + 2] - keypointsArray[index1 * 3 + 2]
  //     )
  //     .normalize();
  //   vecOrth.crossVectors(vecTrackWrist, vecTrack);
  //   const angle = vecTrackWrist.angleTo(vecTrack);
  //   console.log('cross', vecOrth.length());
  //   console.log('angle', angle);
  // }
  //   index0 = indexBot + 1;
  //   index1 = indexTop + 1;
  //   index2 = indexTop + 2;
  //   vecTrack
  //     .set(
  //       keypointsArray[index2 * 3 + 0] - keypointsArray[index1 * 3 + 0],
  //       keypointsArray[index2 * 3 + 1] - keypointsArray[index1 * 3 + 1],
  //       keypointsArray[index2 * 3 + 2] - keypointsArray[index1 * 3 + 2]
  //     )
  //     .normalize();
  //   vecTrackWrist
  //     .set(
  //       keypointsArray[index0 * 3 + 0] - keypointsArray[index1 * 3 + 0],
  //       keypointsArray[index0 * 3 + 1] - keypointsArray[index1 * 3 + 1],
  //       keypointsArray[index0 * 3 + 2] - keypointsArray[index1 * 3 + 2]
  //     )
  //     .normalize();
  //   vecOrth.crossVectors(vecTrackWrist, vecTrack);
  //   const rotMag = 2 * Math.max(0, vecOrth.length() - 0.5);
  //   // console.log(vecOrth.length());
  // }
  // // /////////////////////////////////////////////
  // //   console.log(quatWristInverted);
  // vecTrack
  //   .set(
  //     keypointsArray[indexTop * 3 + 0] - keypointsArray[indexBot * 3 + 0],
  //     keypointsArray[indexTop * 3 + 1] - keypointsArray[indexBot * 3 + 1],
  //     keypointsArray[indexTop * 3 + 2] - keypointsArray[indexBot * 3 + 2]
  //   )
  //   .normalize();
  // vecTrack.applyQuaternion(quatWristInverted);

  // //   console.log(vecTrack);
  // //   console.log(vecTrack);

  // // const xRot = Math.sin(clock.getElapsedTime());
  // const boneMcp = skeleton.getBoneByName(
  //   `${getBoneName(indexBot, 3)}`
  // ) as THREE.Bone;
  // //   console.log(bone.rotation);
  // //   bone.rotation.x =Math.PI

  // const offsetRotMag = Math.abs(
  //   (1 - Math.abs(quatWristInverted.y)) * vecTrack.x
  // );
  // // if (indexBot == 13) {
  // //   // console.log(quatWristInverted.y);
  // //   console.log(offsetRotMag);
  // // }

  // const movementMag = Math.min(
  //   (Math.PI * 3) / 5,
  //   (Math.PI / 2) * Math.max(0.05, 1.75 * (-0.5 + vecTrack.z + offsetRotMag))
  // );
  // //   const movementMag = (Math.PI * 3) / 5;
  // boneMcp.rotation.x = THREE.MathUtils.lerp(
  //   boneMcp.rotation.x,
  //   movementMag,
  //   0.85
  // );

  // // //////////////////////////////////////////////
  // if (indexBot == 5) {
  //   // console.log(boneMcp.quaternion);
  //   // quatMcpInverted
  //   //   .copy(skeleton.bones[0].quaternion)
  //   //   .invert()
  //   //   .multiply(boneMcp.quaternion);
  //   // quatMcpInverted.premultiply(quatWristInverted);

  //   const index0 = indexBot;
  //   const index1 = indexTop;

  //   vecTrack
  //     .set(
  //       keypointsArray[index1 * 3 + 0] - keypointsArray[index0 * 3 + 0],
  //       keypointsArray[index1 * 3 + 1] - keypointsArray[index0 * 3 + 1],
  //       keypointsArray[index1 * 3 + 2] - keypointsArray[index0 * 3 + 2]
  //     )
  //     .normalize();
  //   vecTrackWrist
  //     .set(
  //       keypointsArray[index0 * 3 + 0] - keypointsArray[0],
  //       keypointsArray[index0 * 3 + 1] - keypointsArray[1],
  //       keypointsArray[index0 * 3 + 2] - keypointsArray[2]
  //     )
  //     .normalize();
  //   vecOrth.crossVectors(vecTrackWrist, vecTrack);
  //   console.log(vecOrth.length());
  //   vecTrack.applyQuaternion(quatWristInverted);
  //   // console.log(vecTrack);
  //   const bonePip = skeleton.getBoneByName(
  //     `${getBoneName(indexBot + 1, 3)}`
  //   ) as THREE.Bone;
  //   // console.log(bonePip.quaternion);
  // }
  // console.log(boneMcp.quaternion);
  //   if (quatWristInverted.y > 0.35) {
  //     const movementMag =
  //       ((Math.PI * 9) / 10) * Math.max(0.05, 1.5 * (-0.5 + vecTrack.z));
  //     bone.rotation.x = movementMag;
  //   } else {
  //     a += 1;
  //     // console.log('hit', a);
  //     const movementMag =
  //       ((Math.PI * 3) / 4) *
  //       Math.max(
  //         0,
  //         1.5 *
  //           (-0.5 + (vecTrack.z + Math.max(0, vecTrack.x * vecTrack.x)))
  //       );
  //     //   THREE.MathUtils.lerp();
  //     bone.rotation.x = movementMag;
  //     // bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, movementMag, 0.2);
  //   }
  //   bone.rotation.x = movementMag;
  //   bone.rotation.x = movementMag;
  //   const movementMag = Math.max(
  //     0.05,
  //     1.75 * (-0.5 + (vecTrack.z - Math.min(0, vecTrack.x)))
  //   );
  //   const movementMag = 1.5 * (-0.5 + vecTrack.z);
}
//   const movementMag =
//     quatWristInverted.y > 0.2
//       ? Math.PI * Math.max(0.05, 1.5 * (-0.5 + vecTrack.z))
//       : (Math.PI / 2) *
//         Math.max(
//           0.05,
//           1.75 * (-0.5 + (vecTrack.z - Math.min(0, vecTrack.x)))
//         );
//   console.log(quatWristInverted.y);
