/* eslint-disable prettier/prettier */
import { ScrapingDataButtonsProps, ScrapingDataProps, StyledCoursesNavbarProps, StyledCoursesPaginationProps, StyledCourseViewProps, StyledReviewContentProps, StyledReviewCourseInfoProps, StyledReviewRightContainerProps, StyledReviewUserInfoProps } from '../interfaces';
import { defaultCssStyle } from '../../../../utils/interfaces';
import styled, { CSSObject } from 'styled-components';
import { displayCenter } from '../../../../utils/style/styling';
import configStyle from '../../../../utils/config/config.style';

// CourseCard.tsx Style
export { StyledCourseCard, hoverLink, StyledHoverLink, gridStyle, defaultFontStyle } from './CourseCardStyle';

// CourseNavbar.tsx Style
export const StyledCoursesNavbar = styled.div<StyledCoursesNavbarProps>`
  @media (max-width: 640px) {
    /* display: flex; */
  };

  ${defaultCssStyle};
`;
export const checkboxDefaultStyle: CSSObject = {
  display: 'inline-block',
  width: '17px',
  height: '17px',
  cursor: 'pointer',
};

// ReviewContent.tsx Style
export const StyledReviewContent = styled.div<StyledReviewContentProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${defaultCssStyle};
`;

// ReviewCourseInfo.tsx Style
export const StyledReviewCourseInfo = styled.div<StyledReviewCourseInfoProps>`
  flex-direction: column;
  ${displayCenter}
  ${defaultCssStyle};
`;

// ReviewUserInfo.tsx Style
export const StyledReviewUserInfo = styled.div<StyledReviewUserInfoProps>`
  display: flex;
  flex-direction: column;
  ${defaultCssStyle};
`;

// CourseView.tsx Style
export const StyledCourseView = styled.div<StyledCourseViewProps>`
  display: flex;
  flex-direction: column;
  ${defaultCssStyle}
`;

// ReviewRightContainer.tsx Style
export const StyledReviewRightContainer = styled.div<StyledReviewRightContainerProps>`
  ${defaultCssStyle}
`;

// CourseSwiper.tsx Style
export { StyledCourseViewSwiper } from './CourseSwiperStyle';

// CourseSkeleton.tsx Style
export { StyledCourseSkeleton } from './CourseSkeletonStyle';

// HeaderRight.tsx Style
export { StyledHeaderRight, dropdownBtnStyle, dropdownTxtStyle } from './HeaderRightStyle';

// CoursesPagination.tsx Style
export const StyledCoursesPagination = styled.div<StyledCoursesPaginationProps>`
  ${defaultCssStyle}
`;

// Dropdown.tsx Style
export { StyledDropdown } from './DropdownStyle';

// ModalForm.tsx Style
export { StyledModalForm } from './ModalFormStyle';

// Rating.tsx Style
export const StyledRating = styled.div`
  display: flex;
  flex-direction: column;
`;

// ReviewContent.tsx Style
export { dropdownPositioin, dropdownReviewContentTxtStyle } from './ReviewContentStyle';

// ReviewFence.tsx Style
export { StyledFence, StyledReviewFence } from './ReviewFenceStyle';

// ScrapingData.tsx Style
export const StyledScrapingData = styled.div<Pick<ScrapingDataProps, 'cssStyle'>>`
  input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      opacity: 1 !important;
    }
  }
  ${defaultCssStyle}
`;
export const defaultScrapingDataNumberInputStyle: CSSObject = {
  margin: '0 10px',
  padding: '2.5px 0',
  width: '45px',
  border: 'none',
  borderBottom: '1px solid #111',
  backgroundColor: configStyle.white,
  borderRadius: '0px',
  textAlign: 'center',
}

// ScrapingDataButtons.tsx Style
export const StyledScrapingDataButtons = styled.div<Pick<ScrapingDataButtonsProps, 'cssStyle'>>`
  ${defaultCssStyle}
`;
export const defaultScrapingDataButtonsStyle: CSSObject = {
  margin: '0 5px',
  ":hover": {
    backgroundColor: configStyle.hoverGray,
  },
};
