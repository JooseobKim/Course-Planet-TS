import styled from 'styled-components';
import { StyledCourseSwiperProps } from '../interfaces';

export const StyledCourseViewSwiper = styled.div<StyledCourseSwiperProps>`
  display: flex;

  .swiper-pagination {
    bottom: 0;
  }

  .swiper-pagination-bullet-active {
    background-color: #272c48;
    opacity: 0.9;
  }

  .swiper-container > .swiper-button-next,
  .swiper-container > .swiper-button-prev {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3c3836;
    opacity: 0.8;

    &::after {
      content: '';
      border: 4px solid #fff;
    }

    &.swiper-button-next {
      right: 0;

      &::after {
        border-top: none;
        border-left: none;
        width: 10px;
        height: 10px;
        transform: translateX(-2px) rotate(-45deg);
      }
    }

    &.swiper-button-prev {
      left: 0;

      &::after {
        border-bottom: none;
        border-right: none;
        width: 10px;
        height: 10px;
        transform: translateX(2px) rotate(-45deg);
      }
    }

    &.swiper-button-disabled {
      pointer-events: auto;
    }

    &:hover {
      opacity: 1;
    }

    @media (max-width: 1500px) {
      margin: 0 10px;
    }
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;
