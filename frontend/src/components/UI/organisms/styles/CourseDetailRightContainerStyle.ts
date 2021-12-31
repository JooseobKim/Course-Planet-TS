import styled from 'styled-components';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { StyledCourseDetailRightContainerProps } from '../interfaces';

export const StyledCourseDetailRightContainer = styled.div<StyledCourseDetailRightContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  [aria-hidden='true'] {
    display: none;
  }

  .review_fence_toggler:checked + .fence_wrapper {
    opacity: 0;
    visibility: hidden;
    display: none;
  }

  ${defaultCssStyle};
`;

export const StyledViewReview = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 11;
`;
