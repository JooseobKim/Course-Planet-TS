/* eslint-disable prettier/prettier */
import { defaultCssStyle } from '../../../utils/interfaces';
import { SendMailResetPwTemplateProps, StyledAboutProps, StyledActivateEmailTemplateProps, StyledAdminTemplateProps, StyledCourseDetailTemplateProps, StyledCoursesTemplateProps, StyledEditProfileTemplateProps, StyledHomeTemplateProps, StyledNotFoundTemplateProps, StyledProfileUserTemplateProps, StyledRegisterTemplateProps, StyledResetPasswordTemplateProps, StyledResignedUserTemplateProps } from '../interfaces';
import { displayCenter } from '../../../utils/style/styling';
import configStyle from '../../../utils/config/config.style';
import styled, { CSSObject } from 'styled-components';

// CourseDetailTemplate.tsx Style
export const StyledCourseDetailTemplate = styled.main<StyledCourseDetailTemplateProps>`
  max-width: 1500px;
  margin: auto;
  padding: 0 10px;
  display: flex;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  ${defaultCssStyle}
`;

// CoursesTemplate.tsx Style
export const StyledCoursesTemplate = styled.main<StyledCoursesTemplateProps>`
  display: flex;
  margin: 10px auto;
  padding: 0 10px;
  max-width: 1500px;

  @media (max-width: 640px) {
    flex-direction: column;
  }

  ${defaultCssStyle}
`;

// EditProfileTemplate.tsx Style
export const StyledEditProfileTemplate = styled.main<StyledEditProfileTemplateProps>`
  max-width: 1500px;
  margin: auto;
  flex-direction: column;
  ${displayCenter}

  @media(max-width: 512px) {
    margin: 10px auto;
    justify-content: flex-start;
  }

  ${defaultCssStyle}
`;
export const defaultEditProfileInputStyle: CSSObject = {
  height: '40px',
  marginTop: '5px',
  padding: '8px 10px',
}

// HomeTemplate.tsx Style
export const StyledHomeTemplate = styled.main<StyledHomeTemplateProps>`
  ${defaultCssStyle}
`;

// LoginTemplate.tsx Style
export { StyledLoginTemplate, StyledGoogleLoginBtn } from './LoginTemplateStyle';

// ProfileUserTemplate.tsx Style
export const StyledProfileUserTemplate = styled.main<StyledProfileUserTemplateProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1500px;
  margin: auto;
  ${defaultCssStyle}
`;

// RegisterTemplate.tsx Style
export const StyledRegisterTemplate = styled.main<StyledRegisterTemplateProps>`
  padding: 30px 0;
  ${displayCenter}
  ${defaultCssStyle}
`;

// AboutTemplate.tsx Style
export const StyledAboutTemplate = styled.main<StyledAboutProps>`
  max-width: 1000px;
  margin: auto;
  flex-direction: column;
  ${displayCenter}

  @media (max-width: 1024px) {
    padding: 0 20px;
  }

  ${defaultCssStyle}
`;
export const defaultLayoutStyle: CSSObject = {
  margin: '10px 0',
  padding: '15px',
  boxShadow: configStyle.boxShadow,
};
export const defaultHeadingStyle: CSSObject = {
  textAlign: 'center',
  fontWeight: 500,
  margin: '10px 0',
};
export const defaultParagraphStyle: CSSObject = {
  lineHeight: 1.2,
};

// ActivateEmailTemplate.tsx Style
export const StyledActivateEmailTemplate = styled.main<StyledActivateEmailTemplateProps>`
  ${displayCenter}
  ${defaultCssStyle}
`;

// AdminTemplate.tsx Style
export const StyledAdminTemplate = styled.main<StyledAdminTemplateProps>`
  padding: 15px 0;
  max-width: 1500px;
  margin: auto;
  ${defaultCssStyle}
`;
export const defaultScrapingDataStyle: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',}

// NotFoundTemplate.tsx Style
export const StyledNotFoundTemplate = styled.main<StyledNotFoundTemplateProps>`
  ${displayCenter}
  ${defaultCssStyle}
`;

// ResetPasswordTemplate.tsx Style
export const StyledResetPasswordTemplate = styled.main<StyledResetPasswordTemplateProps>`
  ${displayCenter}
  ${defaultCssStyle}
`;

// ResignedUserTemplate.tsx Style
export const StyledResignedUserTemplate = styled.main<StyledResignedUserTemplateProps>`
  ${displayCenter}
  ${defaultCssStyle}
`;

// SendMailResetPwTemplate.tsx Style
export const StyledSendMailResetPassword = styled.main<SendMailResetPwTemplateProps>`
  padding: 30px 0;
  ${displayCenter}
  ${defaultCssStyle}
`;
