import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/utils';

const logged = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token)
      return res.status(403).json({ msg: '유효하지 않은 접근입니다.' });

    const user = verifyJwt(token, process.env.ACCESS_TOKEN_SECRET as string);
    if (typeof user === 'string')
      return res.status(500).json({ msg: '유효하지 않은 토큰입니다.' });

    if (!user.id) return res.status(500).json({ msg: '잘못된 정보입니다.' });

    req.body.id = user.id;

    next();
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export default logged;
