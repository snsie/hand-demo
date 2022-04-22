import { Canvas } from '@react-three/fiber';
import BoxAnimatedMesh from '@/components/canvas/objects/box-animated/box-animated.mesh';
import styles from '@/styles/app-canvas.styles.module.css';

export default function AppCanvas(props) {
  // This reference gives us direct access to the THREE.Mesh object
  return (
    <Canvas className={styles.appCanvas}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <BoxAnimatedMesh />
    </Canvas>
  );
}
