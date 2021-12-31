import { ReviewDocument } from '../models/review.model';
import { LeanDocument } from 'mongoose';
import {
  findCourseById,
  findReview,
  findUserById,
} from '../utils/mongoose.utils';
import Review from '../models/review.model';

export interface ReviewQuery {
  sort: string;
}

export class QueryFeatures {
  public query;
  public queryString;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(query: any, queryString: ReviewQuery) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    switch (this.queryString.sort) {
      case 'recent':
        this.query = this.query.sort('-createdAt');
        break;
      case 'lastest':
        this.query = this.query.sort('createdAt');
        break;
      case 'likes':
        this.query = this.query.sort('-likes');
        break;
      default:
        break;
    }

    return this;
  }
}

export const reviewQueryResult = (
  query: LeanDocument<ReviewDocument>[],
  queryString: ReviewQuery
): QueryFeatures => {
  return new QueryFeatures(query, queryString).sort();
};

export const findReviewsByQuery = async (
  courseId: string,
  sort: string
): Promise<LeanDocument<ReviewDocument>[]> => {
  const findReviews = async (courseId: string, sort: string) => {
    if (sort === 'oldest')
      return await Review.find({ courseId })
        .populate('owner likes')
        .sort('createdAt')
        .lean();

    if (sort === 'likes')
      return await Review.find({ courseId })
        .populate('owner likes')
        .sort('-likes')
        .lean();

    return await Review.find({ courseId })
      .populate('owner likes')
      .sort('-createdAt')
      .lean();
  };

  return await findReviews(courseId, sort);
};

interface ReviewInputValue {
  difficulty: string;
  merit: string;
  demerit: string;
  rating: number;
  userId: string;
  courseId: string;
}

export const validateReviewInput = async (inputValue: ReviewInputValue) => {
  const result = { valid: false, msg: '' };
  const { difficulty, merit, demerit, rating, userId, courseId } = inputValue;

  const existReview = await findReview({ owner: userId, courseId });
  if (existReview.length >= 1)
    return { ...result, msg: '이미 리뷰를 작성하였습니다.' };

  const owner = await findUserById(userId);
  if (!owner) return { ...result, msg: '유저가 더 이상 존재하지 않습니다.' };

  const course = await findCourseById(courseId);
  if (!course) return { ...result, msg: '강의가 더 이상 존재하지 않습니다.' };

  if (
    difficulty !== 'easy' &&
    difficulty !== 'normal' &&
    difficulty !== 'hard' &&
    difficulty !== 'expert'
  )
    return { ...result, msg: '강의 난이도를 알맞게 설정해주세요.' };

  if (merit.length < 30 || demerit.length < 30)
    return {
      ...result,
      msg: '장점 혹은 단점을 최소 30 글자 이상 입력해주세요.',
    };

  if (rating > 5 || rating <= 0)
    return { ...result, msg: '평점은 1 이상 5 이하의 값을 입력해주세요.' };

  return { ...result, valid: true };
};
