import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import {
  findCourseById,
  updateFindOneCourse,
  updateFindOneReview,
  deleteFindOneReview,
  findReview,
} from '../utils/mongoose.utils';
import Review from '../models/review.model';
import { findReviewsByQuery, ReviewQuery } from '../service/review.service';
import { validateReviewInput } from '../service/review.service';

export const createReview = async (req: Request, res: Response) => {
  try {
    const inputValid = await validateReviewInput({ ...req.body });
    if (!inputValid.valid) return res.status(400).json({ msg: inputValid.msg });

    const { difficulty, merit, demerit, rating, userId, courseId } = req.body;
    const newReview = new Review({
      owner: userId,
      courseId,
      merit,
      demerit,
      rating,
      difficulty,
    });

    await updateFindOneCourse(
      { _id: courseId },
      {
        $push: { review: newReview._id },
      },
      { new: true }
    );

    await newReview.save();

    const course = await findCourseById(courseId);

    res.json({ newReview, course, msg: '리뷰 저장 완료.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { userId, merit, demerit } = req.body;

  try {
    if (merit.length < 30 || demerit.length < 30)
      return res
        .status(400)
        .json({ msg: '장점 혹은 단점을 최소 30 글자 이상 입력해주세요.' });

    await updateFindOneReview({ owner: userId }, { merit, demerit });

    res.json({ msg: '리뷰 업데이트 성공.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id)
    return res.status(500).json({ msg: '다시 한 번 시도해 주시기 바랍니다.' });

  try {
    const deleteReview = await deleteFindOneReview({ owner: id });
    if (!deleteReview)
      return res.status(400).json({ msg: '리뷰 삭제에 실패하였습니다.' });

    await updateFindOneCourse(
      { _id: deleteReview.courseId },
      {
        $pull: { review: deleteReview._id },
      }
    );

    res.json({ msg: '리뷰 삭제 완료.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const likeReview = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id)
    return res.status(500).json({ msg: '다시 한 번 시도해 주시기 바랍니다.' });

  try {
    const existLike = await findReview({
      _id: req.params.id,
      likes: id,
    });
    if (existLike.length > 0)
      return res.status(400).json({ msg: '이미 리뷰에 좋아요를 눌렀습니다.' });

    await updateFindOneReview(
      { _id: req.params.id },
      {
        $push: { likes: id },
      },
      { new: true }
    );

    res.json({ msg: '좋아요를 눌렀습니다!' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const unlikeReview = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id)
    return res.status(500).json({ msg: '다시 한 번 시도해 주시기 바랍니다.' });

  try {
    await updateFindOneReview(
      { _id: req.params.id },
      {
        $pull: { likes: id },
      },
      { new: true }
    );

    res.json({ msg: '좋아요를 취소했습니다.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const getReviews = async (
  req: Request<core.ParamsDictionary, unknown, unknown, ReviewQuery>,
  res: Response
) => {
  const { courseId } = req.params;
  const { sort } = req.query;

  try {
    const reviews = await findReviewsByQuery(courseId, sort);

    res.json({
      msg: '데이터 찾기 성공.',
      reviews,
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};
