import { numKeypoints } from './tfjs-params';

export default function postHandCoords(hands: any) {
  const keypointsArray2d: number[] = [];
  const keypointsArray3d: number[] = [];
  for (let i = 0; i < numKeypoints; i++) {
    keypointsArray2d.push(hands.keypoints[i].x, hands.keypoints[i].y);
    keypointsArray3d.push(
      hands.keypoints3D[i].x,
      hands.keypoints3D[i].y,
      hands.keypoints3D[i].z
    );
  }
  //   console.log(keypointsArray3d);
  const keypointsArray3dArray = new Float32Array(keypointsArray3d);
  const keypointsArray2dArray = new Float32Array(keypointsArray2d);
  //   console.log(keypointsArray3dArray);
  postMessage(
    {
      keypoints2d: keypointsArray2dArray,
      keypoints3d: keypointsArray3dArray,
    },
    [keypointsArray2dArray.buffer, keypointsArray3dArray.buffer]
  );
  //   return keypointsArray3d;
}
