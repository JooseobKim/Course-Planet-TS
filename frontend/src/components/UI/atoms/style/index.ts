/* eslint-disable prettier/prettier */
import { StyledLinkProps, StyledListProps, StyledSelectAtomProps } from '../interfaces';
import { defaultCssStyle } from '../../../../utils/interfaces';
import styled from 'styled-components';

// ButtonAtom.tsx Style
export { StyledButton } from './ButtonAtomStyle';

// InputAtom.tsx Style
export { StyledInput, StyledLabel } from './InputAtomStyle';

// LabelAtom.tsx Style
export { StyledLabel as StyledLabelAtom } from './LabelAtomStyle';

// ListAtom.tsx Style
export const StyledList = styled.li<StyledListProps>`
  list-style: none;
  ${defaultCssStyle};
`;

// LinkAtom.tsx Style
export const StyledLink = styled.a<StyledLinkProps>`
  color: #111;
  ${defaultCssStyle};
`;

// DisplayFlexAtom.tsx Style
export { StyledDisplayFlexAtom } from './DisplayFlexAtomStyle';

// FormAtom.tsx Style
export { StyledFormAtom } from './FormAtomStyle';

// SelectAtom.tsx Style
export const StyledSelectAtom = styled.select<StyledSelectAtomProps>`
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  ${defaultCssStyle};
`;

// TextAtom.tsx Style
export { StyledHeading1Text, StyledHeading2Text, StyledHeading4Text, StyledParagraphText, StyledSpanText } from './TextAtomStyle';

// Textarea.tsx Style
export { StyledTextareaAtom } from './TextareaAtomStyle';
