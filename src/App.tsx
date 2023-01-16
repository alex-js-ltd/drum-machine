/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { StepListUL, Step } from 'comps/lib';
import WAAClock from 'waaclock';

type Step = { id: number; on: 1 | 0 };

type State = { steps: Step[]; currentStep: number; playing: boolean };

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
    playing: false,
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

  useEffect(() => {
    audioCtx = new AudioContext();
    clock = new WAAClock(audioCtx);
  }, []);

  return (
    <div
      css={{
        margin: '0 auto',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '840px',
      }}
    >
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
