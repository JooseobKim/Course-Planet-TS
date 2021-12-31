// eslint-disable-next-line prettier/prettier
import { AlertType, AuthType, CourseType, ReviewType, UserType } from '../action-types';
// eslint-disable-next-line prettier/prettier
import { AlertReduxData, AuthReduxData, ReviewData, CourseData, UserData } from '../../utils/interfaces';

interface AlertAction {
  type: AlertType.ALERT;
  payload: AlertReduxData;
}

interface ResetAction {
  type: AlertType.RESET;
}

interface SendMsgAction {
  type: AlertType.SEND_MSG;
  payload: string;
}

interface SendErrMsgAction {
  type: AlertType.SEND_ERR_MSG;
  payload: string;
}

export type AlertTypeAction =
  | AlertAction
  | ResetAction
  | SendMsgAction
  | SendErrMsgAction;

interface AuthAction {
  type: AuthType.AUTH;
  payload: AuthReduxData;
}

export type AuthTypeAction = AuthAction;

interface ScrapingInflearnAction {
  type: CourseType.SCRAPING_INFLERN;
  payload: CourseData[];
}

interface ScrapingFastcampusAction {
  type: CourseType.SCRAPING_FASTCAMPUS;
  payload: CourseData[];
}

interface ClearScrapingDataAction {
  type: CourseType.CLEAR_SCRAPING_DATA;
  payload: { inflearn_courses: [] } | { fastcampus_courses: [] };
}

interface GetCoursesAction {
  type: CourseType.GET_COURSES;
  payload: CourseData[];
}

interface GetCourseAction {
  type: CourseType.GET_COURSE;
  payload: CourseData;
}

interface SearchKeywordAction {
  type: CourseType.SEARCH_KEYWORD;
  payload: string;
}

interface SearchKeywordResetAction {
  type: CourseType.SEARCH_KEYWORD_RESET;
}

interface PageAction {
  type: CourseType.PAGE;
  payload: number;
}

interface PageResetAction {
  type: CourseType.PAGE_RESET;
}

interface UpdateCourseAction {
  type: CourseType.UPDATE_COURSE;
  payload: CourseData;
}

interface GetCoursesTempAction {
  type: CourseType.GET_HOME_COURSES;
  payload: [CourseData[], CourseData[], CourseData[]];
}

export type CourseTypeAction =
  | ScrapingInflearnAction
  | ScrapingFastcampusAction
  | ClearScrapingDataAction
  | GetCoursesAction
  | GetCourseAction
  | SearchKeywordAction
  | PageAction
  | UpdateCourseAction
  | GetCoursesTempAction
  | PageResetAction
  | SearchKeywordResetAction;

interface GetDetailCourseReviewsAction {
  type: ReviewType.GET_DETAIL_COURSE_REVIEWS;
  payload: ReviewData[];
}

interface CreateReviewsAction {
  type: ReviewType.CREATE_REVIEWS;
  payload: ReviewData;
}

interface DeleteReviewsAction {
  type: ReviewType.DELETE_REVIEWS;
  payload: string;
}

interface UpdateReviewsAction {
  type: ReviewType.UPDATE_REVIEWS;
  payload: { merit: string; demerit: string; reviewId: string };
}

interface LikeReviewAction {
  type: ReviewType.LIKE_REVIEW;
  payload: { reviewId: string; authId: UserData };
}

interface UnlikeReviewAction {
  type: ReviewType.UNLIKE_REVIEW;
  payload: {
    reviewId: string;
    reviewArr: UserData[];
    authId: UserData;
  };
}

interface GetUserReviewsAction {
  type: ReviewType.GET_USER_REVIEWS;
  payload: ReviewData[];
}

export type ReviewTypeAction =
  | GetDetailCourseReviewsAction
  | CreateReviewsAction
  | DeleteReviewsAction
  | UpdateReviewsAction
  | LikeReviewAction
  | UnlikeReviewAction
  | GetUserReviewsAction;

interface GetUserAvatar {
  type: UserType.GET_USER_AVATAR;
  payload: string;
}

export type UserTypeAction = GetUserAvatar;
