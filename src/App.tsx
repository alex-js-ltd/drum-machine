import React, { useState } from 'react';
import Sequencer from 'comps/seq';

type State = { steps: number[]; currentStep: number; playing: boolean };

const App = () => {
  const [state, setState] = useState<State>({
    steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentStep: 0,
    playing: false,
  });

  return (
    <div>
      <Sequencer steps={state.steps} />
    </div>
  );
};

export default App;
