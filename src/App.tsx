import { useState } from 'react';
import DrumMachine from 'screens/drum-machine';

const App = () => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | undefined>(undefined);

  const Splash = () => (
    <button onClick={() => setAudioCtx(new AudioContext())}>start</button>
  );

  return (
    <div>{audioCtx ? <DrumMachine audioCtx={audioCtx} /> : <Splash />}</div>
  );
};

export default App;
