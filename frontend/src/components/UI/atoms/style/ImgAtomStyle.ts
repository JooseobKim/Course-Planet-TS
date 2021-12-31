import styled from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledImgProps } from '../interfaces';

export const StyledImg = styled.img<StyledImgProps>`
  ${defaultCssStyle};
`;
