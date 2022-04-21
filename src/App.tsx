import { Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// import ButtonAppBar from './components/app-bar';
import { ThemeProvider } from '@mui/material/styles';
// import { StyledEngineProvider } from '@mui/material/styles';
// import TaskTitle from './components/task-title/task-title';
import themeColors from '@/utils/theme-colors';
import WaitSpinner from '@/components/dom/wait-spinner/wait-spinner';
import AppCanvas from '@/components/canvas/app-canvas';
import HandTask from '@/components/dom/hand/hand';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  return (
    <ThemeProvider theme={themeColors}>
      <div className="App">
        <AppCanvas />
        {/* <ButtonAppBar taskCallback={setSelectedIndex} /> */}
        <h2>
          Please watch{' '}
          <a
            href="https://www.youtube.com/watch?v=bxe2T-V8XRs&list=PLiaHhY2iBX9hdHaRr6b7XevZtgZRa1PoU&index=1&ab_channel=WelchLabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            this
          </a>{' '}
          series on neural networks
        </h2>
        <h2>
          Please read the first four chapters of{' '}
          <a
            href="https://automatetheboringstuff.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            this
          </a>{' '}
          introduction to python
        </h2>
        {/* <TaskTitle titleIndex={selectedIndex} /> */}
        <Suspense fallback={<WaitSpinner />}>
          <HandTask />
        </Suspense>
        <h3>Display your hands to your webcam!</h3>
        <h3>Gamification Coming Soon!</h3>
      </div>
    </ThemeProvider>
  );
};

export default App;
