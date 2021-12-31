import { Request, Response } from 'express';
import {
  updateFindOneUser,
  findOneUser,
  deleteUserById,
} from '../utils/mongoose.utils';
import { passwordHash } from '../utils/utils';
import Review from '../models/review.model';

export const updateUser = async (req: Request, res: Response) => {
  const { username, avatar, mobile, address, auth, id } = req.body;
  if (!username)
    return res.status(400).json({ msg: '필수 사항들을 입력해주세요.' });

  if (!id)
    return res.status(500).json({ msg: '다시 한 번 시도해 주시기 바랍니다.' });

  try {
    if (auth.user.username !== username) {
      const findUsername = await findOneUser({ username });

      if (findUsername)
        return res.status(400).json({ msg: '이미 존재하는 유저 이름입니다.' });
    }

    await updateFindOneUser({ _id: id }, { username, avatar, mobile, address });

    res.json({ msg: '유저 정보가 업데이트가 되었습니다.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, cf_password } = req.body;
  const { id } = req.body;
  if (!id)
    return res.status(500).json({ msg: '다시 한 번 시도해 주시기 바랍니다.' });

  if (password.length < 6)
    return res
      .status(400)
      .json({ msg: '비밀번호는 최소 6 글자 이상이어야 합니다.' });

  if (cf_password !== password)
    return res
      .status(400)
      .json({ msg: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });

  try {
    const hashedPassword = await passwordHash(password);

    await updateFindOneUser({ _id: id }, { password: hashedPassword });

    res.json({ msg: '비밀번호가 변경되었습니다.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id)
    return res.status(500).json({ msg: '다시 한 번 시도해 주시기 바랍니다.' });

  try {
    await deleteUserById(id);

    res.clearCookie('refreshToken', { path: '/auth/refresh_token' });

    res.json({ msg: '삭제 성공.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const getDetailUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await findOneUser({ username });
    if (!user) {
      return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });
    }

    res.json({ user });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const getReviewByUserId = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await findOneUser({ username });
    if (!user)
      return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });

    const reviews = await Review.find({ owner: user._id })
      .lean()
      .sort('-createdAt')
      .populate({
        path: 'owner likes courseId',
        select: '-password',
      });
    if (!reviews) return res.json({ msg: '리뷰가 존재하지 않습니다.' });

    res.json({
      reviews,
      msg: '리뷰를 불러왔습니다.',
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};
