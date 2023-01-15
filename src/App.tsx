/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { StepListUL, Step } from 'comps/lib';

type Step = { id: number; on: 1 | 0 };

type State = { steps: Step[]; currentStep: number; playing: boolean };

const App = () => {
  const [state, setState] = useState<State>({
    steps: [
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
      { id: 16, on: 0 },
    ],
    currentStep: 0,
    playing: false,
  });

  return (
    <div
      css={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <StepListUL>
        {state.steps.map(({ id, on }) => (
          <li key={id}>
            <Step></Step>
          </li>
        ))}
      </StepListUL>
    </div>
  );
};

export default App;
