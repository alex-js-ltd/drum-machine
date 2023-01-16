/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { StepListUL, Step, CircleButton } from 'comps/lib';
import WAAClock from 'waaclock';

type Step = { id: number; on: 1 | 0 };

type State = { steps: Step[]; currentStep: number; isPlaying: boolean };

const App = () => {
  const [state, setState] = useState<State>({
    steps: [
      { id: 0, on: 0 },
      { id: 1, on: 0 },
      { id: 2, on: 0 },
      { id: 3, on: 0 },
      { id: 4, on: 0 },
      { id: 5, on: 0 },
      { id: 6, on: 0 },
      { id: 7, on: 0 },
      { id: 8, on: 0 },
      { id: 9, on: 0 },
      { id: 10, on: 0 },
      { id: 11, on: 0 },
      { id: 12, on: 0 },
      { id: 13, on: 0 },
      { id: 14, on: 0 },
      { id: 15, on: 0 },
    ],
    currentStep: 0,
    isPlaying: false,
  });

  const setStep = (id: number) => {
    const copySteps = [...state.steps];

    const copyObj = { ...copySteps[id] };

    if (copyObj.on === 0) {
      copyObj.on = 1;
    } else {
      copyObj.on = 0;
    }

    copySteps[id] = copyObj;

    setState((prev) => ({ ...prev, steps: copySteps }));
  };

  let audioCtx: AudioContext;
  let clock: WAAClock;
  let tickEvent: WAAClock.Event | null;

  useEffect(() => {
    audioCtx = new AudioContext();
    clock = new WAAClock(audioCtx);
  }, []);

  const handlePlay = () => {
    if (!state.isPlaying) {
      setState((prev) => ({ ...prev, currentStep: -1, isPlaying: true }));
    }
  };

  useEffect(() => {
    if (!audioCtx) return;
    if (state.isPlaying) {
      clock.start();
      tickEvent = clock
        .callbackAtTime(handleTick, audioCtx.currentTime)
        .repeat(0.47);
    } else {
      clock.stop();
      tickEvent?.clear();
      tickEvent = null;
    }
  }, [state.isPlaying]);

  const handleTick = ({ deadline }: { deadline: number }) => {
    const { currentStep, steps } = state;
    const newCurrentStep = currentStep + 1;

    if (steps[newCurrentStep % steps.length].on === 1) {
      triggerSound(audioCtx, deadline);
    }

    setState((prev) => ({ ...prev, currentStep: newCurrentStep }));
  };

  const triggerSound = (audioCtx: AudioContext, deadline: number) => {
    const oscillator = audioCtx.createOscillator();
    const amplifier = audioCtx.createGain();

    oscillator.frequency.setValueAtTime(200, deadline);
    oscillator.frequency.linearRampToValueAtTime(50, deadline + 0.15);
    oscillator.start(deadline);

    oscillator.connect(amplifier);
    amplifier.gain.setValueAtTime(0, deadline);

    amplifier.gain.linearRampToValueAtTime(1.0, deadline + 0.02);
    amplifier.gain.linearRampToValueAtTime(0.0, deadline + 0.2);

    amplifier.connect(audioCtx.destination);
  };

  return (
    <div
      css={{
        margin: '0 auto',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '840px',
      }}
    >
      <CircleButton onClick={() => handlePlay()} />
      <StepListUL>
        {state.steps.map(({ id, on }) => (
          <li key={id}>
            <Step variant={on ? 'on' : 'off'} onClick={() => setStep(id)} />
          </li>
        ))}
      </StepListUL>
    </div>
  );
};

export default App;
