import { ReviewReduxData } from '../../utils/interfaces';
import { ReviewType } from '../action-types';
import { ReviewTypeAction } from '../actions';
// eslint-disable-next-line prettier/prettier
import { deleteData, deleteLikes, editData, updateLikes } from '../../utils/utils';

const initialState: ReviewReduxData = {
  detail_course_reviews: [],
  user_reviews: [],
};

const reviewReducer = (
  state = initialState,
  action: ReviewTypeAction
): ReviewReduxData => {
  switch (action.type) {
    case ReviewType.GET_DETAIL_COURSE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: [...action.payload],
      };
    case ReviewType.CREATE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: [action.payload, ...state.detail_course_reviews],
      };
    case ReviewType.UPDATE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: editData(
          state.detail_course_reviews,
          action.payload.reviewId,
          { merit: action.payload.merit, demerit: action.payload.demerit }
        ),
      };
    case ReviewType.DELETE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: deleteData(
          state.detail_course_reviews,
          action.payload
        ),
      };
    case ReviewType.LIKE_REVIEW:
      return {
        ...state,
        detail_course_reviews: updateLikes(
          state.detail_course_reviews,
          action.payload.reviewId,
          { likes: action.payload.authId }
        ),
      };
    case ReviewType.UNLIKE_REVIEW:
      return {
        ...state,
        detail_course_reviews: deleteLikes(
          state.detail_course_reviews,
          action.payload.reviewId,
          action.payload.reviewArr,
          action.payload.authId
        ),
      };
    case ReviewType.GET_USER_REVIEWS:
      return {
        ...state,
        user_reviews: [...state.user_reviews, ...action.payload],
      };
    default:
      return state;
  }
};

export default reviewReducer;
