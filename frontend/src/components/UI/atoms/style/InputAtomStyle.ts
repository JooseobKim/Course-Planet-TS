import styled, { css } from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledInputProps, StyledLabelProps } from '../interfaces';

export const directionColumn = css`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

export const StyledInput = styled.input<StyledInputProps>`
  ${({ column }) => column && directionColumn};
  padding: 8px 5px;
  background-color: #ecebf6;
  font-size: ${({ theme }) => theme.fontSize};
  border-radius: 5px;
  border: none;
  border-bottom: 2px solid #8a8ba1;
  opacity: 0.7;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;

  &:hover,
  &:focus {
    opacity: ${({ hoverOpacity }) => hoverOpacity || 1};
  }

  &:disabled {
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
  }

  &::-webkit-file-upload-button {
    cursor: pointer;
  }

  ${defaultCssStyle}
`;

export const StyledLabel = styled.label<StyledLabelProps>`
  font-size: ${({ theme }) => theme.fontSize};
`;
