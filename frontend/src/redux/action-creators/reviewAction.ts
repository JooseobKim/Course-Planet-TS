import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { AlertType, CourseType, ReviewType } from '../action-types';
// eslint-disable-next-line prettier/prettier
import { AlertTypeAction, CourseTypeAction, ReviewTypeAction } from '../actions';
import { editData, removeReviewLike } from '../../utils/utils';
import { CourseData, AuthReduxData, ReviewData } from '../../utils/interfaces';
import config from '../../utils/config/config';

export const createReview = (review: {
  difficulty: string;
  merit: string;
  demerit: string;
  rating: number;
  userId: string;
  courseId: string;
  detailCourse: CourseData;
  auth: AuthReduxData;
}) => {
  // eslint-disable-next-line prettier/prettier
  const { difficulty, merit, demerit, rating, userId, courseId, detailCourse, auth } = review;

  return async (
    dispatch: Dispatch<AlertTypeAction | CourseTypeAction | ReviewTypeAction>
  ) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token)
        return dispatch({
          type: AlertType.ALERT,
          payload: {
            errMsg: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
            loading: false,
          },
        });

      const res = await axios.post(
        `${config.client_url}/api/review`,
        { difficulty, merit, demerit, rating, userId, courseId },
        { headers: { Authorization: auth.token } }
      );

      const newData: ReviewData = {
        ...res.data.newReview,
        course: res.data.course,
        owner: auth.user,
      };
      const updateCourse = {
        ...detailCourse,
        review: [...detailCourse.review, newData],
      };

      dispatch({
        type: ReviewType.CREATE_REVIEWS,
        payload: newData,
      });

      dispatch({
        type: CourseType.UPDATE_COURSE,
        payload: updateCourse,
      });

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
          loading: false,
        },
      });
    }
  };
};

export const updateReview = (review: {
  merit: string;
  demerit: string;
  detailCourse: CourseData;
  auth: AuthReduxData;
  reviewId: string;
}) => {
  const { merit, demerit, detailCourse, auth, reviewId } = review;

  return async (
    dispatch: Dispatch<AlertTypeAction | CourseTypeAction | ReviewTypeAction>
  ) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token || !auth.user)
        return dispatch({
          type: AlertType.ALERT,
          payload: {
            errMsg: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
            loading: false,
          },
        });

      const res = await axios.patch(
        `${config.client_url}/api/review`,
        { merit, demerit, userId: auth.user._id },
        { headers: { Authorization: auth.token } }
      );

      dispatch({
        type: ReviewType.UPDATE_REVIEWS,
        payload: { merit, demerit, reviewId },
      });

      const tempUpdateReview = editData(detailCourse.review, reviewId, {
        merit,
        demerit,
      });

      const newCourse = { ...detailCourse, review: tempUpdateReview };

      dispatch({ type: CourseType.UPDATE_COURSE, payload: newCourse });

      dispatch({
        type: AlertType.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
          loading: false,
        },
      });
    }
  };
};

export const deleteReview = (review: {
  detailCourse: CourseData | string;
  auth: AuthReduxData;
  reviewId: string;
}) => {
  const { detailCourse, auth, reviewId } = review;
  return async (
    dispatch: Dispatch<AlertTypeAction | CourseTypeAction | ReviewTypeAction>
  ) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token)
        return dispatch({
          type: AlertType.ALERT,
          payload: {
            errMsg: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
            loading: false,
          },
        });

      const res = await axios.delete(`${config.client_url}/api/review`, {
        headers: { Authorization: auth.token },
      });

      dispatch({ type: ReviewType.DELETE_REVIEWS, payload: reviewId });

      let deleteData;
      let newCourse;

      if (typeof detailCourse === 'string') {
        const courseRes = await axios.get(
          `${config.client_url}/api/courses/${detailCourse}`
        );
        deleteData = courseRes.data.course.review.filter(
          (item: ReviewData) => item._id !== reviewId
        );
        newCourse = { ...courseRes.data.course, review: deleteData };
      } else {
        deleteData = detailCourse.review.filter(
          (item: ReviewData) => item._id !== reviewId
        );
        newCourse = { ...detailCourse, review: deleteData };
      }

      dispatch({ type: CourseType.UPDATE_COURSE, payload: newCourse });

      dispatch({
        type: AlertType.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
        },
      });
    }
  };
};

export const likeReview = (info: {
  review: ReviewData;
  auth: AuthReduxData;
  detailCourse: CourseData;
}) => {
  const { review, auth, detailCourse } = info;

  return async (
    dispatch: Dispatch<AlertTypeAction | CourseTypeAction | ReviewTypeAction>
  ) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token || !auth.user)
        return dispatch({
          type: AlertType.ALERT,
          payload: {
            errMsg: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
            loading: false,
          },
        });

      const res = await axios.patch(
        `${config.client_url}/api/review/${review._id}/like`,
        null,
        {
          headers: { Authorization: auth.token },
        }
      );

      dispatch({
        type: ReviewType.LIKE_REVIEW,
        payload: { reviewId: review._id, authId: auth.user },
      });

      const newReviewArr = editData(detailCourse.review, review._id, {
        likes: [...review.likes, auth.user],
      });
      const updateCourse = { ...detailCourse, review: newReviewArr };

      dispatch({ type: CourseType.UPDATE_COURSE, payload: updateCourse });

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
          loading: false,
        },
      });
    }
  };
};

export const unlikeReview = (info: {
  review: ReviewData;
  auth: AuthReduxData;
  detailCourse: CourseData;
}) => {
  const { review, auth, detailCourse } = info;

  return async (
    dispatch: Dispatch<AlertTypeAction | CourseTypeAction | ReviewTypeAction>
  ) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token || !auth.user)
        return dispatch({
          type: AlertType.ALERT,
          payload: {
            errMsg: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
            loading: false,
          },
        });

      const res = await axios.patch(
        `${config.client_url}/api/review/${review._id}/unlike`,
        null,
        {
          headers: { Authorization: auth.token },
        }
      );

      const newReviewArr = editData(detailCourse.review, review._id, {
        likes: removeReviewLike(review.likes, auth.user._id),
      });
      const updateCourse = { ...detailCourse, review: newReviewArr };

      dispatch({
        type: ReviewType.UNLIKE_REVIEW,
        payload: {
          reviewId: review._id,
          reviewArr: review.likes,
          authId: auth.user,
        },
      });

      dispatch({ type: CourseType.UPDATE_COURSE, payload: updateCourse });

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
          loading: false,
        },
      });
    }
  };
};

export const getReviews = (review: { courseId: string; sort?: string }) => {
  const { courseId, sort } = review;

  return async (
    dispatch: Dispatch<AlertTypeAction | CourseTypeAction | ReviewTypeAction>
  ) => {
    try {
      const res = await axios.get(
        `${config.client_url}/api/review/${courseId}?sort=${sort || 'recent'}`
      );

      dispatch({
        type: ReviewType.GET_DETAIL_COURSE_REVIEWS,
        payload: res.data.reviews,
      });

      dispatch({ type: AlertType.ALERT, payload: { msg: res.data.msg } });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
        },
      });
    }
  };
};
