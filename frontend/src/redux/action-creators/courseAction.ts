import axios from 'axios';
import { Dispatch } from 'redux';
import { AlertType, CourseType } from '../action-types';
import { AlertTypeAction, CourseTypeAction } from '../actions';
import { CourseData, AuthReduxData } from '../../utils/interfaces';
import config from '../../utils/config/config';

export const scrapingInflearnCourses = (condition: {
  order: string;
  pageFrom: number;
  pageTo: number;
  prev_courses: CourseData[];
  auth: AuthReduxData;
  search: string;
}) => {
  const { order, pageFrom, pageTo, prev_courses, auth, search } = condition;

  return async (dispatch: Dispatch<AlertTypeAction | CourseTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token) return;

      const res = await axios.post(
        `${config.client_url}/api/courses/admin/inflearn`,
        { order, pageFrom, pageTo, search },
        { headers: { Authorization: auth.token } }
      );

      const filteringCourse = (prev_courses: CourseData[]) => {
        if (prev_courses) {
          const filteringCourses = [];

          for (let i = 0; i < res.data.inflearnCourses.length; i++) {
            const filteringData = res.data.inflearnCourses[i];
            const findNotEqual = prev_courses.every(
              (prevCourse: CourseData) =>
                filteringData.title !== prevCourse.title
            );

            if (findNotEqual) filteringCourses.push({ ...filteringData });
          }

          return filteringCourses;
        }

        return [];
      };

      const filteredCourses = filteringCourse(prev_courses);

      dispatch({ type: CourseType.SCRAPING_INFLERN, payload: filteredCourses });

      dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          successMsg: `${res.data.msg} 필터링 된 스크래핑 결과 총 ${filteredCourses.length}개`,
        },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, errMsg: (err as Error).message },
      });
    }
  };
};

export const scrapingFastcampusCourses = (condition: {
  category: string;
  prev_courses: CourseData[];
  auth: AuthReduxData;
}) => {
  const { category, prev_courses, auth } = condition;

  return async (dispatch: Dispatch<AlertTypeAction | CourseTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token) return;

      const res = await axios.post(
        `${config.client_url}/api/courses/admin/fastcampus`,
        { category },
        { headers: { Authorization: auth.token } }
      );

      const filteringCourse = (prev_courses: CourseData[]) => {
        if (prev_courses) {
          const filteringCourses = [];

          for (let i = 0; i < res.data.fastcampusCourses.length; i++) {
            const filteringData = res.data.fastcampusCourses[i];
            const findNotEqual = prev_courses.every(
              (prevCourse: CourseData) =>
                filteringData.title !== prevCourse.title
            );

            if (findNotEqual) filteringCourses.push({ ...filteringData });
          }

          return filteringCourses;
        }

        return [];
      };

      const filteredCourses = filteringCourse(prev_courses);

      dispatch({
        type: CourseType.SCRAPING_FASTCAMPUS,
        payload: filteredCourses,
      });

      dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          successMsg: `${res.data.msg} 필터링 된 스크래핑 결과 총 ${filteredCourses.length}개`,
        },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, errMsg: (err as Error).message },
      });
    }
  };
};

// eslint-disable-next-line prettier/prettier
export const scrapingDataSave = (condition: { data: CourseData[]; auth: AuthReduxData }) => {
  const { data, auth } = condition;

  return async (dispatch: Dispatch<AlertTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token) return;

      const res = await axios.post(
        `${config.client_url}/api/courses/admin/save_data`,
        { data },
        { headers: { Authorization: auth.token } }
      );

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, errMsg: (err as Error).message },
      });
    }
  };
};

export const clearScrapingData = (condition: {
  platform: 'inflearn' | 'fastcampus';
}) => {
  const { platform } = condition;

  return async (dispatch: Dispatch<AlertTypeAction | CourseTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      switch (platform) {
        case 'inflearn':
          dispatch({
            type: CourseType.CLEAR_SCRAPING_DATA,
            payload: { inflearn_courses: [] },
          });
          break;
        case 'fastcampus':
          dispatch({
            type: CourseType.CLEAR_SCRAPING_DATA,
            payload: { fastcampus_courses: [] },
          });
          break;
        default:
          break;
      }

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: '스크래핑 데이터 초기화 완료' },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, errMsg: (err as Error).message },
      });
    }
  };
};

export const getCourses = () => {
  return async (dispatch: Dispatch<AlertTypeAction | CourseTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.get(`${config.client_url}/api/courses`);

      dispatch({
        type: CourseType.GET_COURSES,
        payload: res.data.courses,
      });

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, msg: (err as Error).message },
      });
    }
  };
};

export const getCourse = (course: { id: string }) => {
  const { id } = course;

  return async (dispatch: Dispatch<AlertTypeAction | CourseTypeAction>) => {
    try {
      const res = await axios.get(`${config.client_url}/api/courses/${id}`);

      dispatch({
        type: CourseType.GET_COURSE,
        payload: res.data.course,
      });

      dispatch({
        type: AlertType.ALERT,
        payload: { msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, msg: (err as Error).message },
      });
    }
  };
};

export const getHomeCourses = () => {
  return (dispatch: Dispatch<AlertTypeAction | CourseTypeAction>) => {
    const recentAdd = axios.get(`${config.client_url}/api/courses/recent_add`);
    const mostReview = axios.get(
      `${config.client_url}/api/courses/most_review`
    );
    const recentReview = axios.get(
      `${config.client_url}/api/courses/recent_review`
    );

    Promise.all([recentAdd, recentReview, mostReview])
      .then(courses => {
        dispatch({
          type: CourseType.GET_HOME_COURSES,
          payload: [
            [...courses[0].data.courses],
            [...courses[1].data.courses],
            [...courses[2].data.courses],
          ],
        });

        dispatch({
          type: AlertType.ALERT,
          payload: { msg: courses[0].data.msg },
        });
      })
      .catch(err => {
        dispatch({
          type: AlertType.ALERT,
          payload: { loading: false, msg: (err as Error).message },
        });
      });
  };
};

export const pageReset = () => (dispatch: Dispatch<CourseTypeAction>) => {
  dispatch({ type: CourseType.PAGE_RESET });
};

export const searchKeywordReset =
  () => (dispatch: Dispatch<CourseTypeAction>) => {
    dispatch({ type: CourseType.SEARCH_KEYWORD_RESET });
  };

export const sendSearchKeyword =
  (keyword: string) => (dispatch: Dispatch<CourseTypeAction>) => {
    dispatch({ type: CourseType.SEARCH_KEYWORD, payload: keyword });
  };
