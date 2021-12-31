import styled, { css } from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledLabelAtomProps } from '../interfaces';

export const displayCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const displayColum = css`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label<StyledLabelAtomProps>`
  ${({ center }) => center && displayCenter};
  ${({ column }) => column && displayColum};
  font-size: ${({ theme }) => theme.fontSize};
  ${defaultCssStyle};
`;
