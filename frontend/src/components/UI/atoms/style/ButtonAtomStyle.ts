import styled, { css } from 'styled-components';
import configStyle from '../../../../utils/config/config.style';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { ButtonProps } from '../interfaces';

const active = css`
  color: ${configStyle.white};
  background-color: ${configStyle.mainDarkColor};
  opacity: 1;
`;

// eslint-disable-next-line prettier/prettier
export const StyledButton = styled.button<Pick<ButtonProps, 'cssStyle' | 'activeBtn'>>`
  padding: 8px 16px;
  color: #111;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  opacity: 0.8;
  cursor: pointer;
  ${({ activeBtn }) => activeBtn && active};
  ${defaultCssStyle}

  &:hover {
    opacity: 1;
  }

  &:disabled {
    color: #fff;
    background-color: #999;
    cursor: not-allowed;

    &:hover {
      opacity: 0.7;
    }
  }
`;
