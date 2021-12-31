import styled, { CSSObject } from 'styled-components';
import { defaultCssStyle, DefaultProps } from '../../../../utils/interfaces';
import configStyle from '../../../../utils/config/config.style';

export const StyledHeaderRight = styled.div<Pick<DefaultProps, 'cssStyle'>>`
  position: relative;
  display: flex;
  align-items: center;
  ${defaultCssStyle}
`;

export const dropdownBtnStyle: CSSObject = {
  margin: '1px 0',
  padding: 0,
  color: configStyle.black,
  width: '100px',
  height: '35px',
  borderRadius: '3px',
  opacity: 1,
  boxShadow: configStyle.boxShadow2,
};

export const dropdownTxtStyle: CSSObject = {
  display: 'inline-block',
  width: '100%',
  opacity: 0.8,
  ':hover': {
    opacity: 1,
  },
};
