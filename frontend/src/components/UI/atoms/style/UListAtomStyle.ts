import styled from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledUListProps } from '../interfaces';

export const StyledUList = styled.ul<StyledUListProps>`
  display: flex;
  ${defaultCssStyle};
`;
