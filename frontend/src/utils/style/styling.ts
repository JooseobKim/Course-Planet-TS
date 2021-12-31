import { css, CSSObject } from 'styled-components';
import configStyle from '../config/config.style';

export const displayCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const blackBtn: CSSObject = {
  backgroundColor: configStyle.black,
  color: configStyle.white,
};

export const mainDarkkBtn: CSSObject = {
  backgroundColor: configStyle.mainDarkColor,
  color: configStyle.white,
};
