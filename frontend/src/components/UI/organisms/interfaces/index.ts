/* eslint-disable prettier/prettier */
import { CourseData, DefaultProps } from '../../../../utils/interfaces';

// ReviewContainer.tsx Interface
export interface ReviewContainerProps extends DefaultProps {
  leftContainer: JSX.Element;
  rightContainer: JSX.Element;
}
export type StyledReviewContainerProps = Pick<ReviewContainerProps, 'cssStyle'>;

// CourseDetailMenu.tsx Interface
export interface CourseDetailMenuProps extends DefaultProps {
  myReview: boolean;
  disableCreateReview: boolean;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export type StyledCourseDetailMenuProps = Pick<CourseDetailMenuProps, 'cssStyle'>;

// CourseDetailRightContainer.tsx Interface
export interface CourseDetailRightContainerProps extends DefaultProps {
  id: string;
}
export type StyledCourseDetailRightContainerProps =
  | Pick<CourseDetailRightContainerProps, 'cssStyle'>
  | {
      viewReview: boolean;
    };

// CourseDetailLeftContainer.tsx Interface
export interface CourseDetailLeftContainerProps extends DefaultProps {
  id: string;
  get_course: CourseData[];
}

// ReviewModal.tsx Interface
export interface ReviewModalTempProps extends DefaultProps {
  disabledBtn?: boolean;
  togglerId?: string;
}

// ScrapingDataSaveContainer.tsx Interface
export interface ScrapingDataSaveContainerProps extends DefaultProps {
  platform: 'inflearn' | 'fastcampus';
}
