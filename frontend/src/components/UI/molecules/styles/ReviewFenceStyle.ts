import { ReviewFenceProps } from '../interfaces';
import { defaultCssStyle } from '../../../../utils/interfaces';
import styled from 'styled-components';

export const StyledReviewFence = styled.div<Pick<ReviewFenceProps, 'cssStyle'>>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: visible;
  width: 100%;
  height: 100%;

  ${defaultCssStyle}
`;

export const StyledFence = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0.9;
  visibility: visible;
  width: 100%;
  height: 100%;
  z-index: 9;
`;
