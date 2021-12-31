import styled, { css } from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledDisplayFlexAtomProps } from '../interfaces';

const column = css`
  flex-direction: column;
`;

const center = css`
  justify-content: center;
  align-items: center;
`;

export const StyledDisplayFlexAtom = styled.div<StyledDisplayFlexAtomProps>`
  display: ${({ displayGridOn }) => (displayGridOn ? 'grid' : 'flex')};
  ${({ displayColumn }) => displayColumn && column}
  ${({ displayCenter }) => displayCenter && center}
  ${defaultCssStyle};
`;
