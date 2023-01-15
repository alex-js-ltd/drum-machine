import { useState } from 'react';

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
    <div>
      {state.steps.map(({ id, on }) => (
        <div
          key={id}
          style={{ width: 10, height: 10, border: '1px solid blue' }}
        >
          {id}
        </div>
      ))}
    </div>
  );
};

export default App;
