import styled, { css } from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledTextProps } from '../interfaces';

const StyledText = css`
  font-size: ${({ theme }) => theme.fontSize};
  font-weight: 400;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
`;

export const StyledSpanText = styled.span<StyledTextProps>`
  ${StyledText}
  ${defaultCssStyle};
`;

export const StyledParagraphText = styled.p<StyledTextProps>`
  ${StyledText}
  ${defaultCssStyle};
`;

export const StyledHeading1Text = styled.h1<StyledTextProps>`
  ${StyledText}
  ${defaultCssStyle};
`;

export const StyledHeading2Text = styled.h2<StyledTextProps>`
  ${StyledText}
  ${defaultCssStyle};
`;

export const StyledHeading4Text = styled.h4<StyledTextProps>`
  ${StyledText}
  ${defaultCssStyle};
`;
