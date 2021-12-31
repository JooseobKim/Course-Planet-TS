import express from 'express';
// eslint-disable-next-line prettier/prettier
import { getCourse, getCourses, getMostReviewCourses, getRecentAddCourses, getRecentReviewCourses, saveCourses, scrapingFastcampusCourses, scrapingInflearnCourses } from '../controller/course.controller';
import admin from '../middleware/admin.middleware';
import logged from '../middleware/logged.middleware';

const courseRouter = express.Router();

courseRouter.post('/admin/inflearn', logged, admin, scrapingInflearnCourses);

courseRouter.post(
  '/admin/fastcampus',
  logged,
  admin,
  scrapingFastcampusCourses
);

courseRouter.post('/admin/save_data', logged, admin, saveCourses);

courseRouter.get('/', getCourses);

courseRouter.get('/most_review', getMostReviewCourses);

courseRouter.get('/recent_review', getRecentReviewCourses);

courseRouter.get('/recent_add', getRecentAddCourses);

courseRouter.get('/:id', getCourse);

export default courseRouter;
