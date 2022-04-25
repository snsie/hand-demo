import { useEffect } from 'react';
import '@/styles/hand.css';

export default function HandTask() {
  return (
    <div className="Task-div">
      <div className="Spacing-div" />
      <div className="Hand-div">
        <div className="container">
          <div className="canvas-wrapper" id="canvas-wrapper" hidden>
            <canvas id="output" hidden></canvas>
            <video className="Hand-video" id="video" playsInline hidden></video>
          </div>
          <div id="scatter-gl-container-left"></div>
        </div>

        <div id="scatter-gl-container-right"></div>
        {/* <video id="video" className="Hidden-video" playsInline></video> */}
      </div>
      <div className="Spacing-div" />
    </div>
  );
}
