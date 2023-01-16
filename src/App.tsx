/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { StepListUL, Step, CircleButton } from 'comps/lib';

type Step = 1 | 0;

type State = { steps: Step[]; currentStep: number; isPlaying: boolean };

const App = () => {
  const [state, setState] = useState<State>({
    steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentStep: 0,
    isPlaying: false,
  });

  const setStep = (index: number) => {
    const copySteps = [...state.steps];

    copySteps[index] = state.steps[index] === 1 ? 0 : 1;

    setState((prev) => ({ ...prev, steps: copySteps }));
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
      <StepListUL>
        {state.steps.map((step, index) => (
          <li key={index}>
            <Step
              variant={step === 1 ? 'on' : 'off'}
              onClick={() => setStep(index)}
            />
          </li>
        ))}
      </StepListUL>
    </div>
  );
};

export default App;
