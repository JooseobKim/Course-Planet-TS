/* eslint-disable prettier/prettier */
import { ScrapingDataSaveContainerProps, StyledCourseDetailMenuProps, StyledReviewContainerProps } from '../interfaces';
import { defaultCssStyle } from '../../../../utils/interfaces';
import configStyle from '../../../../utils/config/config.style';
import styled, { CSSObject, CSSProperties } from 'styled-components';

// FooterContainer.tsx Style
export const StyledFooterContainer = styled.footer`
  max-width: 1500px;
  min-width: 380px;
  margin: auto;
  padding: 15px 10px;
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const defaultTextStyle: CSSProperties = {
  fontSize: '15px',
  fontWeight: 300,
  letterSpacing: '0.5px',
};

// HeaderContainer.tsx Style
export const StyledHeaderContainer = styled.header`
  position: sticky;
  top: 0;
  min-width: 380px;
  height: 71px;
  margin: auto;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${configStyle.white};
  border-bottom: 1px solid ${configStyle.mainLightColor};
  z-index: 11;

  @media (max-width: 512px) {
    justify-content: center;
  }
`;

// SearchContainer.tsx Style
export const StyledSearchContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 325px;
  background-color: ${configStyle.mainLightColor};
`;
export const StyledSearchContainerForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

// ReviewContainer.tsx Style
export const StyledReviewContainer = styled.div<StyledReviewContainerProps>`
  display: flex;
  ${defaultCssStyle};
`;

// CourseDetailRightContainer.tsx Style
export { StyledCourseDetailRightContainer, StyledViewReview } from './CourseDetailRightContainerStyle';

// CourseDetailMenu.tsx Style
export const StyledCourseDetailMenu = styled.div<StyledCourseDetailMenuProps>`
  display: flex;
  ${defaultCssStyle}
`;

// ContactMe.tsx Style
export { defaultInputStyle, defaultLabelStyle } from './ContactMeStyle';

// ReviewModal.tsx Style
export const defaultModalTextareaStyle: CSSObject = {
  marginBottom: '10px',
  resize: 'none',
};

// ScrapingDataSaveContainer.tsx Style
export const StyledScrapingDataSaveContainer = styled.div<Pick<ScrapingDataSaveContainerProps, 'cssStyle'>>`
  ${defaultCssStyle};
`;

// Alert.tsx Style
export { StyledCloseIcon, StyledErrMessage, StyledLoading, StyledMessage, StyledSuccessMessage, defaultAlertTxtStyle } from './AlertStyle';

// HeaderMenu.tsx Style
export const StyledHeaderMenu = styled.nav`
  display: none;
  position: absolute;
  left: 0;

  @media (max-width: 512px) {
    display: block;
  }
`;
export const StyledHeaderMenubar = styled.ul`
  position: fixed;
  top: 71px;
  width: 100vw;
  min-width: 380px;
  background-color: ${configStyle.hoverGray};
`;
export const defaultMenuStyle: CSSObject = {
  width: '100%',
  height: '50px',
  borderRadius: 0,
  borderBottom: `1px solid ${configStyle.mainLightColor}`,
};
