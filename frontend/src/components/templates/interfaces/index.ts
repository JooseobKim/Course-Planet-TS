/* eslint-disable prettier/prettier */
import { CourseData, DefaultProps } from '../../../utils/interfaces';
import { CourseViewType } from '../../UI/molecules/interfaces';

// CourseDetailTemplate.tsx Interface
export type StyledCourseDetailTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// CoursesTemplate.tsx Interface
export interface CoursePageData {
  totalPage: number;
  coursesPerPage: CourseData[];
}
export type StyledCoursesTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// EditProfileTemplate.tsx Interface
export interface initState {
  username: string;
  email: string;
  address: string;
  mobile: string;
  [propName: string]: string;
}
export type StyledEditProfileTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// HomeTemplate.tsx Interface
export type CourseViewDataItem = Omit<CourseViewType, 'slidesPer'>;
export type StyledHomeTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// LoginTemplate.tsx Interface
export type StyledLoginTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// ProfileUserTemplate.tsx Interface
export type StyledProfileUserTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// RegisterTemplate.tsx Interface
export type StyledRegisterTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// AboutTemplate.tsx Interface
export type StyledAboutProps = Pick<DefaultProps, 'cssStyle'>;

// ActivateEmailTemplate.tsx Interface
export type StyledActivateEmailTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// AdminTemplate.tsx Interface
export type StyledAdminTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// NotFoundTemplate.tsx Interface
export type StyledNotFoundTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// ResetPasswordTemplate.tsx Interface
export type StyledResetPasswordTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// ResignedUserTemplate.tsx Interface
export type StyledResignedUserTemplateProps = Pick<DefaultProps, 'cssStyle'>;

// SendMailResetPwTemplate.tsx Interface
export type SendMailResetPwTemplateProps = Pick<DefaultProps, 'cssStyle'>;
