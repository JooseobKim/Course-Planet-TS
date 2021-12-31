import User, { UserDocument } from '../models/user.model';
import Courses, { CourseDocument } from '../models/course.model';
import Review, { ReviewDocument } from '../models/review.model';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export const findOneUser = async (query: FilterQuery<UserDocument>) =>
  await User.findOne(query).lean();

export const findOneReview = async (query: FilterQuery<ReviewDocument>) =>
  await Review.findOne(query).lean();

export const findUserById = async (id: string) =>
  await User.findById(id).lean();

export const findCourseById = async (id: string) => await Courses.findById(id);

export const updateFindOneUser = async (
  query: FilterQuery<UserDocument>,
  data: UpdateQuery<UserDocument>
) => await User.findOneAndUpdate(query, data);

export const updateFindOneCourse = async (
  query: FilterQuery<CourseDocument>,
  data: UpdateQuery<CourseDocument>,
  options?: QueryOptions
) => await Courses.findOneAndUpdate(query, data, options);

export const updateFindOneReview = async (
  query: FilterQuery<ReviewDocument>,
  data: UpdateQuery<ReviewDocument>,
  options?: QueryOptions
) => await Review.findOneAndUpdate(query, data, options);

export const deleteUserById = async (id: string) =>
  await User.findByIdAndDelete(id);

export const deleteFindOneReview = async (query: FilterQuery<ReviewDocument>) =>
  await Review.findOneAndDelete(query);

export const findReview = async (
  query?: FilterQuery<ReviewDocument> | undefined
) => {
  if (!query) return await Review.find().lean();
  return await Review.find(query).lean();
};
