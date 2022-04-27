import { Suspense, useRef, useState } from 'react';
import '@/styles/app.css';

// import ButtonAppBar from './components/app-bar';
import { ThemeProvider } from '@mui/material/styles';
// import { StyledEngineProvider } from '@mui/material/styles';
// import TaskTitle from './components/task-title/task-title';
import themeColors from '@/utils/theme-colors';
import AppCanvas from '@/components/canvas/app-canvas';
import AppDom from './dom/app-dom';
import useTfjsWorkerHook from '@/hooks/use-tfjs-worker.hook';

const App = () => {
  // const quaternionRef = useRef([1, 0, 0, 0]);
  const quaternionRef = useTfjsWorkerHook();
  return (
    <ThemeProvider theme={themeColors}>
      <div className="App">
        {Math.random()}
        {/* <ButtonAppBar taskCallback={setSelectedIndex} /> */}
        <AppDom />
        <AppCanvas wristQuaternionRef={quaternionRef} />
      </div>
    </ThemeProvider>
  );
};

export default App;
