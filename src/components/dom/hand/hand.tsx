import { useEffect } from 'react';
import styles from '@/styles/hand.styles.module.css';

export default function HandTask() {
  return (
    <div className={styles.taskDiv}>
      <div className={styles.canvasWrapper} id="canvasWrapper">
        {/* <canvas className={styles.output} id="output" hidden /> */}
        <video className={styles.handVideo} id="video" hidden />
      </div>
    </div>
  );
}
