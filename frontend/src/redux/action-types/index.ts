export enum AlertType {
  ALERT = 'alert',
  RESET = 'reset',
  SEND_MSG = 'send_msg',
  SEND_ERR_MSG = 'send_err_msg',
}

export enum AuthType {
  AUTH = 'auth',
}

export enum CourseType {
  SCRAPING_INFLERN = 'scraping_inflearn',
  SCRAPING_FASTCAMPUS = 'scraping_fastcampus',
  CLEAR_SCRAPING_DATA = 'clear_scraping_data',
  GET_COURSES = 'get_courses',
  GET_COURSE = 'get_course',
  SEARCH_KEYWORD = 'search_keyword',
  SEARCH_KEYWORD_RESET = 'search_keyword_reset',
  PAGE = 'page',
  PAGE_RESET = 'page_reset',
  UPDATE_COURSE = 'update_course',
  GET_MOST_REVIEW_COURSES = 'get_most_review_courses',
  GET_RECENT_REVIEW_COURSES = 'get_recent_review_courses',
  GET_RECENT_ADD_COURSES = 'get_recent_add_courses',
  GET_HOME_COURSES = 'get_home_courses',
  GET_COURSES_PER_PAGE = 'get_courses_per_page',
}

export enum ReviewType {
  GET_DETAIL_COURSE_REVIEWS = 'get_detail_course_reviews',
  CREATE_REVIEWS = 'create_reviews',
  DELETE_REVIEWS = 'delete_reviews',
  UPDATE_REVIEWS = 'update_reivews',
  LIKE_REVIEW = 'like_reivew',
  UNLIKE_REVIEW = 'unlike_reivew',
  GET_USER_REVIEWS = 'get_user_reviews',
}

export enum UserType {
  GET_USER_AVATAR = 'get_user_avatar',
}
