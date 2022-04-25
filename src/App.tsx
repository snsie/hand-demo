import { Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// import ButtonAppBar from './components/app-bar';
import { ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
// import { StyledEngineProvider } from '@mui/material/styles';
// import TaskTitle from './components/task-title/task-title';
import themeColors from '@/utils/theme-colors';
import WaitSpinner from '@/components/dom/wait-spinner/wait-spinner';
// import CanvasBackground from './components/canvas/canvas';
import HandTask from '@/components/dom/hand/hand';

let level = "";

export function LevelSelect()
{
  const [value, setValue] = useState("level");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    level = (event.target as HTMLInputElement).value;
    setValue(level);
  };

  let level_image;

  if (level == "level1")
  {
    level_image = "https://imgs.search.brave.com/CURPjqRKnYVEG9mnMhCaesK6Y3nM10hAPvIptO7xURk/rs:fit:675:498:1/g:ce/aHR0cHM6Ly93d3cu/aGFuZHN1cmdlcnly/ZXNvdXJjZS5jb20v/c2l0ZXMvZGVmYXVs/dC9maWxlcy9pbWFn/ZXMvU3luZGFjdHls/eTFfMC5qcGc"
  }
  else
  {
    level_image = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  }

  return (
    <div>
      <FormControl>
        <FormLabel id="levelselect"></FormLabel>
        <RadioGroup
          aria-labelledby="levelselect"
          name="levelselect-radio"
          onChange={handleChange}
        >
          <FormControlLabel value="level1" control={<Radio />} label="Level 1 - Syndactyly Surgey (Splitting conjoined fingers)" />
          <FormControlLabel value="level2" control={<Radio />} label="Level 2" />
          <FormControlLabel value="level3" control={<Radio />} label="Level 3" />
        </RadioGroup>
      </FormControl>

      <img src={level_image} alt="Level Image" />

    </div>
  );
}

export function StartGame()
{
  console.log(level);
}

export function StartGameButton()
{
  return (
    <Button variant="contained" size="large" endIcon={<PlayArrowIcon />} onClick={StartGame}>Start Game</Button>
  );
}

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  return (
    <ThemeProvider theme={themeColors}>
      <div className="App">
        {/* <CanvasBackground /> */}
        {/* <ButtonAppBar taskCallback={setSelectedIndex} /> */}
        <h1>
          AI in Webdev Online Game
        </h1>
        <h3> Complete surgies in this AR game using your camera and AI for hand gestures! </h3>
        <br />
        <h3>Choose your level:</h3>
        {LevelSelect()}
        <br />
        {StartGameButton()}
        <hr />
        <p>
          Please watch{' '}
          <a
            href="https://www.youtube.com/watch?v=bxe2T-V8XRs&list=PLiaHhY2iBX9hdHaRr6b7XevZtgZRa1PoU&index=1&ab_channel=WelchLabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            this
          </a>{' '}
          series on neural networks
          <br />
          Please read the first four chapters of{' '}
          <a
            href="https://automatetheboringstuff.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            this
          </a>{' '}
          introduction to python
        </p>
        {/* <TaskTitle titleIndex={selectedIndex} /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
