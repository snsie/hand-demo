import { Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// import ButtonAppBar from './components/app-bar';
import { ThemeProvider } from '@mui/material/styles';
// import { StyledEngineProvider } from '@mui/material/styles';
// import TaskTitle from './components/task-title/task-title';
import TaskPicker from './components/task-picker';
import theme from './components/theme';
import WaitSpinner from './components/wait-spinner';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
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
          <TaskPicker selectedIndex={selectedIndex} />
        </Suspense>
        <h3>Display your hands to your webcam!</h3>
        <h3>Gamification Coming Soon!</h3>
      </div>
    </ThemeProvider>
  );
};

export default App;
