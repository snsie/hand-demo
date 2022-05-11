import { useEffect } from 'react';
import styles from '@/styles/hand.styles.module.css';

export default function HandTask() {
  return (
    <div className={styles.taskDiv}>
      <div className="Spacing-div" />
      <div className="container">
        <div className={styles.canvasWrapper} id="canvasWrapper">
          <canvas className={styles.output} id="output" hidden></canvas>
          <video className={styles.handVideo} id="video" hidden></video>
        </div>
        {/* <div id="scatter-gl-container-left"></div> */}
      </div>

      {/* <div id="scatter-gl-container-right"></div> */}
      {/* <video id="video" className="Hidden-video" playsInline></video> */}

      <div className="Spacing-div" />
    </div>
  );
}
