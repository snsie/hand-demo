import { Suspense, useState } from 'react';
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
  useTfjsWorkerHook();
  return (
    <ThemeProvider theme={themeColors}>
      <div className="App">
        {/* <ButtonAppBar taskCallback={setSelectedIndex} /> */}
        <AppDom />
        <AppCanvas />
      </div>
    </ThemeProvider>
  );
};

export default App;
