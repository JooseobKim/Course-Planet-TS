import styled from 'styled-components';
import { gridStyle } from '.';
import { CourseSkeletonProps } from '../interfaces';
import { defaultCssStyle } from '../../../../utils/interfaces';
import configStyle from '../../../../utils/config/config.style';

// eslint-disable-next-line prettier/prettier
export const StyledCourseSkeleton = styled.div<Omit<CourseSkeletonProps, 'children'>>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${({ loading }) =>
    loading && 'skeleton 1s ease infinite alternate'};

  @keyframes skeleton {
    to {
      opacity: 0.3;
    }
  }

  .image {
    width: ${({ gridResponsive }) => (gridResponsive ? '94%' : '300px')};
    height: 179px;
    background-color: ${configStyle.gray};
  }

  .title {
    width: ${({ gridResponsive }) => (gridResponsive ? '100%' : '325px')};
    height: 35px;
    margin: 7px 0;
    background-color: ${configStyle.gray};
  }

  .description {
    width: ${({ gridResponsive }) => (gridResponsive ? '100%' : '325px')};
    height: 90px;
    margin-bottom: 3px;
    background-color: ${configStyle.gray};
  }

  .content {
    width: ${({ gridResponsive }) => (gridResponsive ? '100%' : '325px')};
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__instructor {
      width: 75px;
      height: 15px;
      background-color: ${configStyle.gray};
    }

    &__price-review {
      &__price {
        width: 100px;
        height: 15px;
        background-color: ${configStyle.gray};
        margin-bottom: 5px;
      }

      &__review {
        width: 100px;
        height: 15px;
        background-color: ${configStyle.gray};
      }
    }
  }

  ${({ gridResponsive }) => gridResponsive && gridStyle}
  ${defaultCssStyle}
`;
