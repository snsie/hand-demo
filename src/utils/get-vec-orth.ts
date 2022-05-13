import * as THREE from 'three';

const vectorAxis1 = new THREE.Vector3();
const vectorAxis2 = new THREE.Vector3();
const vectorOrth = new THREE.Vector3();
export default function getVecOrth(vectorPos0, vectorPos1, vectorPos2) {
  vectorAxis1.subVectors(vectorPos1, vectorPos0);
  vectorAxis2.subVectors(vectorPos2, vectorPos0);
  return vectorOrth.crossVectors(vectorAxis1, vectorAxis2).normalize();
}
