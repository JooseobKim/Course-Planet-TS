import styled from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledTextareaAtomProps } from '../interfaces';

export const StyledTextareaAtom = styled.textarea<StyledTextareaAtomProps>`
  font-size: ${({ theme }) => theme.fontSize};
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  padding: 7px;
  border: none;
  border-bottom: 2px solid #8a8ba1;
  border-radius: 5px;
  background-color: #ecebf6;
  opacity: 0.7;
  ${defaultCssStyle};

  &:hover,
  &:focus {
    opacity: 1;
  }

  ${defaultCssStyle}
`;
