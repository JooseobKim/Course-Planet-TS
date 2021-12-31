import styled, { css, CSSObject } from 'styled-components';
import configStyle from '../../../../utils/config/config.style';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledCourseCardProps } from '../interfaces';

export const hoverLink = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${configStyle.black};
  opacity: 0.6;

  &:hover {
    opacity: 0.9;
  }
`;

export const StyledHoverLink = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 189px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 7px;
  overflow: hidden;
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  a:nth-child(1) {
    ${hoverLink}
  }

  a:nth-child(2) {
    ${hoverLink}
  }

  @media (max-width: 640px) {
    opacity: 1;
  }
`;

export const gridStyle = css`
  width: 100%;
  grid-column: span 3 / span 3;

  @media (max-width: 1536px) {
    grid-column: span 4 / span 4;
  }
  @media (max-width: 1024px) {
    grid-column: span 6 / span 6;
  }
  @media (max-width: 768px) {
    grid-column: span 12 / span 12;
  }
`;

export const defaultFontStyle: CSSObject = {
  fontWeight: 300,
  fontSize: '15px',
};

export const StyledCourseCard = styled.div<StyledCourseCardProps>`
  position: relative;
  width: 375px;
  min-height: 375px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${({ gridResponsive }) => gridResponsive && gridStyle}

  ${defaultCssStyle}
`;
