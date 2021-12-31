import { CourseData, UserData } from '.';

export interface ReviewData {
  _id: string;
  likes: UserData[];
  owner: UserData;
  courseId: CourseData;
  merit: string;
  demerit: string;
  rating: number;
  difficulty: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewReduxData {
  detail_course_reviews: ReviewData[];
  user_reviews: ReviewData[];
}
