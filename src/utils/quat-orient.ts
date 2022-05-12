import * as THREE from 'three';

export default function quatOrient(
  vectorFrom1,
  vectorFrom2,
  vectorFrom3,
  vectorBone0Pos,
  vectorBone1Pos,
  vectorBone2Pos,
  vector1,
  vector2,
  vector3
) {
  console.log(vectorFrom3);
  //   vector1
  //     .set(
  //       keypoints3dRef.current[point1 * 3 + 0] -
  //         keypoints3dRef.current[point0 * 3 + 0],
  //       keypoints3dRef.current[point1 * 3 + 1] -
  //         keypoints3dRef.current[point0 * 3 + 1],
  //       keypoints3dRef.current[point1 * 3 + 2] -
  //         keypoints3dRef.current[point0 * 3 + 2]
  //     )
  //     .normalize();

  //   vector2
  //     .set(
  //       keypoints3dRef.current[point2 * 3 + 0] -
  //         keypoints3dRef.current[point0 * 3 + 0],
  //       keypoints3dRef.current[point2 * 3 + 1] -
  //         keypoints3dRef.current[point0 * 3 + 1],
  //       keypoints3dRef.current[point2 * 3 + 2] -
  //         keypoints3dRef.current[point0 * 3 + 2]
  //     )
  //     .normalize();

  //   vector3.crossVectors(vector1, vector2).normalize();

  //   vectorFrom1
  //     .set(
  //       vectorBone1Pos.x - vectorBone0Pos.x,
  //       vectorBone1Pos.y - vectorBone0Pos.y,
  //       vectorBone1Pos.z - vectorBone0Pos.z
  //     )
  //     .normalize();
  //   vectorFrom2
  //     .set(
  //       vectorBone2Pos.x - vectorBone0Pos.x,
  //       vectorBone2Pos.y - vectorBone0Pos.y,
  //       vectorBone2Pos.z - vectorBone0Pos.z
  //     )
  //     .normalize();
  //   vectorFrom3.crossVectors(vectorFrom1, vectorFrom2).normalize;
  //   // textRef.current.children = 14;
  //   array1Ref.current = vector3
  //     .toArray()
  //     .map((val) => val.toFixed(4))
  //     .join();

  //   quaternion1.setFromUnitVectors(vectorFrom3, vector3);
}
