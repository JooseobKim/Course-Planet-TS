/* eslint-disable prettier/prettier */
import { AuthReduxData, CourseData, DefaultProps, ReviewData } from '../../../../utils/interfaces';
import { CSSObject } from 'styled-components';

// CourseCard.tsx Interface
export interface CourseCardProps extends DefaultProps {
  removeHoverLink?: boolean;
  cancelSlice?: boolean;
  course: CourseData;
  imgHeight?: string;
  titleHeight?: string;
  descriptionHeight?: string;
  gridResponsive?: boolean;
}
export type StyledCourseCardProps = Pick<CourseCardProps, 'cssStyle' | 'gridResponsive'>;


// CourseNavbar.tsx Interface
interface checkState {
  inflearn: boolean;
  fastcampus: boolean;
}
export interface CoursesNavbarProps extends DefaultProps {
  page: number;
  pageNum: number[];
  search_keyword: string;
  checkState: {
    checkedState: checkState;
    setCheckedState: React.Dispatch<React.SetStateAction<checkState>>;
  };
}
export type StyledCoursesNavbarProps = Pick<CoursesNavbarProps, 'cssStyle'>;

// ReviewContent.tsx Interface
export interface ReviewContentProps extends DefaultProps {
  contentInfo: { merit: string; demerit: string };
  review?: ReviewData;
}
export type StyledReviewContentProps = Pick<ReviewContentProps, 'cssStyle'>;

// ReviewCourseInfo.tsx Interface
export interface ReviewCourseInfoProps extends DefaultProps {
  courseId: CourseData;
}
export type StyledReviewCourseInfoProps = Pick<ReviewCourseInfoProps, 'cssStyle'>;

// ReviewUserInfo.tsx Interface
export interface ReviewUserInfoProps extends DefaultProps {
  id: string;
  info: ReviewData;
}
export type StyledReviewUserInfoProps = Pick<ReviewUserInfoProps, 'cssStyle'>;

// CourseView.tsx Interface
export interface CourseViewType extends DefaultProps {
  text: string;
  courseList: CourseData[];
  index: number;
}
export type CourseViewProps = Omit<CourseViewType, 'index' | 'children'>;
export type StyledCourseViewProps = Pick<CourseViewType, 'cssStyle'>;

// ReviewRightContainer.tsx Interface
export interface ReviewRightContainerProps extends DefaultProps {
  review: ReviewData;
}
export type StyledReviewRightContainerProps = Pick<ReviewRightContainerProps, 'cssStyle'>;

// CourseSwiper.tsx Interface
export interface CourseSwiperProps extends DefaultProps {
  courses: CourseData[];
  dataCheckbox?: boolean;
  checkState?: boolean[];
  setCheckState?: React.Dispatch<React.SetStateAction<boolean[]>>;
}
export type StyledCourseSwiperProps = Pick<CourseSwiperProps, 'cssStyle'>;

// CourseSkeleton.tsx Interface
export interface CourseSkeletonProps extends DefaultProps {
  skeletonNumber?: number;
  loading?: boolean;
  gridResponsive?: boolean;
}

// CoursesPagination.tsx Interface
export interface CoursesPaginationProps extends DefaultProps {
  page: number;
  pageNum: number[];
}
export type StyledCoursesPaginationProps = Pick<CoursesPaginationProps, 'cssStyle'>;

// Dropdown.tsx Interface
export interface DropdownProps extends DefaultProps {
  dropdownIcon: JSX.Element;
  submenuList: JSX.Element[];
}

// ModalForm.tsx Interface
export interface ModalFormProps extends DefaultProps {
  togglerId: string;
  btnStyle?: CSSObject;
  btnLabelStyle?: CSSObject;
  btnText: string | JSX.Element;
  modalWidth?: string;
  modalHeight?: string;
  disabledBtn?: boolean;
}

// Rating.tsx Interface
export interface RatingProps extends DefaultProps {
  myRating?: number;
  readOnly?: boolean;
  data?: {
    difficulty: string;
    merit: string;
    demerit: string;
    rating: number;
  };
  setData?: React.Dispatch<
    React.SetStateAction<{
      difficulty: string;
      merit: string;
      demerit: string;
      rating: number;
    }>
  >;
}

// ReviewFence.tsx Interface
export interface ReviewFenceProps extends DefaultProps {
  disableCreateReview: boolean;
  btnId: string;
}

// ReviewLike.tsx Interface
export interface ReviewLikeProps {
  id: string;
  info: ReviewData;
  userLikeState: boolean;
}

// ScrapingData.tsx Interface
export interface ScrapingDataProps extends DefaultProps {
  platform: 'inflearn' | 'fastcampus';
}
export interface InflearnCondition {
  order: 'recent' | 'seq' | 'popular' | 'rating' | 'famous';
  pageFrom: number;
  pageTo: number;
  search: string;
}

// ScrapingDataButtons.tsx Interface
export interface ScrapingDataButtonsProps extends DefaultProps {
  platform: 'inflearn' | 'fastcampus';
  courses: CourseData[];
  auth: AuthReduxData;
  checkState: boolean[];
  setCheckState: React.Dispatch<React.SetStateAction<boolean[]>>;
}
