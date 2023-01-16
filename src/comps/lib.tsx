/** @jsxImportSource @emotion/react */
import * as colors from 'styles/colors';
import * as mq from 'styles/media-queries';
import styled from '@emotion/styled';
import { keyframes, CSSObject } from '@emotion/react';

const StepListUL = styled.ul({
  padding: '1em',
  width: '100%',
  margin: '0 auto',
  listStyle: 'none',
  display: 'grid',
  gridTemplateColumns: `repeat(16, 1fr)`,
  gridGap: '1em',

  [mq.small]: {
    gridTemplateColumns: `repeat(8, 1fr)`,
  },

  [mq.mobile]: {
    gridTemplateColumns: `repeat(4, 1fr)`,
  },
});

type StepVariant = { on: CSSObject; off: CSSObject };

const stepVariants: StepVariant = {
  on: {
    border: `1px solid ${colors.white}`,
  },
  off: {
    border: `1px solid ${colors.gray600}`,
  },
};

const Step = styled.div<{ variant: keyof StepVariant }>(
  {
    border: `1px solid ${colors.gray600}`,
    borderRadius: '4px',
    width: '100%',
    height: '60px',
  },
  ({ variant = 'off' }) => stepVariants[variant]
);

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.gray900,
  color: colors.gray600,
  border: `1px solid ${colors.gray600}`,
  cursor: 'pointer',
  margin: '1em',
});

export { StepListUL, Step, CircleButton };
