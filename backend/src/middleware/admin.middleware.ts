import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../utils/mongoose.utils';

const admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(req.body.id as string);
    if (!user)
      return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });

    if (user.role !== 1)
      return res.status(403).json({ msg: '권한이 거부되었습니다.' });

    next();
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export default admin;
