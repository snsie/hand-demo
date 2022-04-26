import { Suspense, useState ,useCallback} from 'react';
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

export function LevelSelect({inGame})
{
  const [value, setValue] = useState("level");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    level = (event.target as HTMLInputElement).value;
    setValue(level);
  };

  let level_image, wid, hei;

  if (level == "level1")
  {
    level_image = "https://imgs.search.brave.com/CURPjqRKnYVEG9mnMhCaesK6Y3nM10hAPvIptO7xURk/rs:fit:675:498:1/g:ce/aHR0cHM6Ly93d3cu/aGFuZHN1cmdlcnly/ZXNvdXJjZS5jb20v/c2l0ZXMvZGVmYXVs/dC9maWxlcy9pbWFn/ZXMvU3luZGFjdHls/eTFfMC5qcGc"
    wid = 320;
    hei = 320;
  }
  else if (level == "level2")
  {
    level_image = ""
    wid = 320;
    hei = 320;
  }
  else if (level == "level3")
  {
    level_image = ""
    wid = 320;
    hei = 320;
  }
  else
  {
    level_image = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    wid = 0;
    hei = 0;
  }

  if (!inGame)
  {
      return (
          <div>
          <h1>
            AI in Webdev Online Game
          </h1>
          <h3> Complete surgies in this AR game using your camera and AI for hand gestures! </h3>
          <br />
          <h3>Choose your level:</h3>
          <FormControl>
            <FormLabel id="levelselect"></FormLabel>
            <RadioGroup
              aria-labelledby="levelselect"
              name="levelselect-radio"
              onChange={handleChange}
            >
              <FormControlLabel value="level1" control={<Radio />} label="Level 1 - Syndactyly Surgey (Splitting conjoined fingers)" />
              <FormControlLabel value="level2" control={<Radio />} label="Level 2 - Electrocauterization (Cauterizing blood vessels)" />
              <FormControlLabel value="level3" control={<Radio />} label="Level 3 - Suturing" />
            </RadioGroup>
          </FormControl>
          <br />
          <img src={level_image} alt="Level Image" width={wid} height={hei}/>

        </div>
      );
  }
  else
  {
    return;
  }
}

export function StartGameButton({inGame, onClickCallback})
{
  if (!inGame)
    return (
      <Button variant="contained" size="large" endIcon={<PlayArrowIcon />} onClick={onClickCallback}>Start Game</Button>
    );
  else
    return;
}

export function StartLevel({inGame})
{
  if (!inGame)
    return;

  return (
    <Suspense fallback={<WaitSpinner />}>
      <HandTask />
    </Suspense>
  );
}

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);

  const [inGame, toggleClicked] = useState(false);
  const onClickCallback = useCallback(() => {
    toggleClicked(val => !val)
  },[]);

  return (
    <ThemeProvider theme={themeColors}>
      <div className="App">
        {/* <CanvasBackground /> */}
        {/* <ButtonAppBar taskCallback={setSelectedIndex} /> */}
        <LevelSelect inGame={inGame} />
        <StartLevel inGame={inGame} />
        <br />
        <StartGameButton inGame={inGame} onClickCallback={onClickCallback} />
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
