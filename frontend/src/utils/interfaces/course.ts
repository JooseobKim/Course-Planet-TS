import { ReviewData } from './review';

export interface CourseData {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  price: string | number;
  image: string;
  review: ReviewData[];
  url: string;
  platform: 'inflearn' | 'fastcampus' | '자료 없음';
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseReduxData {
  inflearn_courses: CourseData[];
  fastcampus_courses: CourseData[];
  search_keyword: string;
  page: number;
  get_course: CourseData[];
  get_courses_temp: [CourseData[], CourseData[], CourseData[]];
  get_courses_per_page: CourseData[];
}
