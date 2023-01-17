/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { StepListUL, Step, CircleButton } from 'comps/lib';
import WAAClock from 'waaclock';

type Step = 1 | 0;

type State = { steps: Step[]; currentStep: number; isPlaying: boolean };

type Props = { audioCtx: AudioContext };
const DrumMachine = ({ audioCtx }: Props) => {
  const [state, setState] = useState<State>({
    steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentStep: 0,
    isPlaying: false,
  });

  const setStep = (index: number) => {
    const copySteps = [...state.steps];

    copySteps[index] = state.steps[index] === 0 ? 1 : 0;

    setState((prev) => ({ ...prev, steps: copySteps }));
  };

  let clock = new WAAClock(audioCtx);
  let tickEvent: WAAClock.Event | null;

  const handlePlay = () => {
    if (!state.isPlaying) {
      setState((prev) => ({ ...prev, currentStep: -1, isPlaying: true }));
    }
  };

  useEffect(() => {
    if (!clock) return;
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

    if (steps[newCurrentStep % steps.length] && audioCtx) {
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

export default DrumMachine;
