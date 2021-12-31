import styled, { css } from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledFormAtomProps } from '../interfaces';

const column = css`
  display: flex;
  flex-direction: column;
`;

export const StyledFormAtom = styled.form<StyledFormAtomProps>`
  ${({ displayColumn }) => displayColumn && column};
  ${defaultCssStyle};
`;
