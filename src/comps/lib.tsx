/** @jsxImportSource @emotion/react */
import * as colors from 'styles/colors';

import styled from '@emotion/styled';
import { keyframes, CSSObject } from '@emotion/react';

const StepListUL = styled.ul({
  maxWidth: '840px',
  width: '100%',
  margin: 'auto',
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: `repeat(16, 1fr)`,
  gridGap: '1em',
});

const Step = styled.div({
  border: `1px solid ${colors.gray600}`,
  borderRadius: '4px',
  width: '100%',
  height: '60px',
});

export { StepListUL, Step };
