import { css, CSSObject } from 'styled-components';

export type { AlertReduxData } from './alert';
export type { UserData, AuthReduxData } from './auth';
export type { ReviewData, ReviewReduxData } from './review';
export type { CourseData, CourseReduxData } from './course';

export interface DefaultProps {
  cssStyle?: CSSObject;
  children?: React.ReactNode;
}

export const defaultCssStyle = css<Pick<DefaultProps, 'cssStyle'>>`
  ${({ cssStyle }) => cssStyle && { ...cssStyle }};
`;

export const maxWidth = css`
  max-width: 1500px;
  margin: auto;
`;
