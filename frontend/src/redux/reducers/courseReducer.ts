import { CourseReduxData } from '../../utils/interfaces';
import { editData } from '../../utils/utils';
import { CourseType } from '../action-types';
import { CourseTypeAction } from '../actions';

const initialState: CourseReduxData = {
  inflearn_courses: [],
  fastcampus_courses: [],
  search_keyword: '',
  page: 1,
  get_course: [],
  get_courses_temp: [[], [], []],
  get_courses_per_page: [],
};

const courseReducer = (
  state = initialState,
  action: CourseTypeAction
): CourseReduxData => {
  switch (action.type) {
    case CourseType.SCRAPING_INFLERN:
      return {
        ...state,
        inflearn_courses: [...state.inflearn_courses, ...action.payload],
      };
    case CourseType.SCRAPING_FASTCAMPUS:
      return {
        ...state,
        fastcampus_courses: [...state.fastcampus_courses, ...action.payload],
      };
    case CourseType.CLEAR_SCRAPING_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case CourseType.SEARCH_KEYWORD:
      return {
        ...state,
        search_keyword: action.payload,
      };
    case CourseType.SEARCH_KEYWORD_RESET:
      return {
        ...state,
        search_keyword: '',
      };
    case CourseType.PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case CourseType.PAGE_RESET:
      return {
        ...state,
        page: 1,
      };
    case CourseType.GET_COURSE:
      return {
        ...state,
        get_course: [...state.get_course, action.payload],
      };
    case CourseType.UPDATE_COURSE:
      return {
        ...state,
        get_course: editData(
          state.get_course,
          action.payload._id,
          action.payload
        ),
      };
    case CourseType.GET_HOME_COURSES:
      return {
        ...state,
        get_courses_temp: [
          [...action.payload[0]],
          [...action.payload[1]],
          [...action.payload[2]],
        ],
      };
    default:
      return state;
  }
};

export default courseReducer;
