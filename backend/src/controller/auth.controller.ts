import { Request, Response } from 'express';
import User from '../models/user.model';
// eslint-disable-next-line prettier/prettier
import { validateLoginUser, getTokenNum, validateRegisterInput, sendRegisterEmail } from '../service/auth.service';
import { findOneUser } from '../utils/mongoose.utils';
// eslint-disable-next-line prettier/prettier
import { createActivationToken, createAccessToken, createRefreshToken, modifyUserValue, verifyJwt, getRandomNum, passwordHash, validateEmail, comparePassword } from '../utils/utils';

export const registerSendMail = async (req: Request, res: Response) => {
  const { username, userId, email, password } = req.body;
  const { modifyUsername, modifyUserId } = modifyUserValue(username, userId);

  try {
    const inputValid = await validateRegisterInput({
      ...req.body,
      username: modifyUsername,
      userId: modifyUserId,
    });
    if (!inputValid.valid) return res.status(400).json({ msg: inputValid.msg });

    const hashedPassword = await passwordHash(password);
    const newUser = {
      username: modifyUsername,
      userId: modifyUserId,
      email,
      password: hashedPassword,
    };

    const activationToken = createActivationToken(newUser);
    const url = `${process.env.CLIENT_URL}/auth/activate/${activationToken}`;

    const sendEmailResult = await sendRegisterEmail(
      email,
      url,
      '이메일 인증 확인'
    );
    if (!sendEmailResult.valid) {
      return res.status(500).json({ msg: sendEmailResult.msg });
    }

    res.json({
      msg: '이메일을 확인하여 인증 절차를 진행해주세요.',
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const registerActivateEmail = async (req: Request, res: Response) => {
  const { activationToken } = req.body;

  const user = verifyJwt(
    activationToken,
    process.env.ACTIVATION_TOKEN_SECRET as string
  );
  if (typeof user === 'string')
    return res.status(400).json({ msg: '유효하지 않은 토큰입니다.' });

  const newUser = new User({
    username: user.username,
    userId: user.userId,
    email: user.email,
    password: user.password,
  });

  const accessToken = createAccessToken({ id: newUser._id });
  const refreshToken = createRefreshToken({ id: newUser._id });
  const tokenAge = getTokenNum(
    process.env.REFRESH_TOKEN_SECRET_EXPIRESIN as string
  );

  if (!tokenAge.valid) return res.status(500).json({ msg: tokenAge.msg });

  try {
    await newUser.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh_token',
      maxAge: 1000 * 60 * 60 * 24 * parseInt(tokenAge.tokenNum),
    });

    res.json({
      msg: '유저 등록이 성공하였습니다.',
      accessToken,
      user: {
        ...newUser,
        password: '',
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { userId, password } = req.body;

  try {
    const existsUser = await validateLoginUser(userId, password);
    if (!existsUser)
      return res.status(400).json({ msg: '아이디 혹은 비밀번호가 틀립니다.' });

    const accessToken = createAccessToken({ id: existsUser._id });
    const refreshToken = createRefreshToken({ id: existsUser._id });
    const tokenAge = getTokenNum(
      process.env.REFRESH_TOKEN_SECRET_EXPIRESIN as string
    );
    if (!tokenAge.valid) return res.status(500).json({ msg: tokenAge.msg });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh_token',
      maxAge: 1000 * 60 * 60 * 24 * parseInt(tokenAge.tokenNum),
    });

    res.json({
      msg: '정상적으로 로그인이 되었습니다.',
      accessToken,
      user: {
        ...existsUser,
        password: '',
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const rf_token = req.cookies.refreshToken;

  if (!rf_token)
    return res.status(400).json({ msg: '유효하지 않은 토큰입니다.' });

  const userId = verifyJwt(
    rf_token,
    process.env.REFRESH_TOKEN_SECRET as string
  );
  if (typeof userId === 'string')
    return res.status(400).json({ msg: '유효하지 않은 토큰입니다.' });

  const accessToken = createAccessToken({ id: userId.id });

  try {
    const user = await User.findById(userId.id).lean().select('-password');
    if (!user)
      return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });

    res.json({ accessToken, user });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', { path: '/api/auth/refresh_token' });
  return res.json({ msg: '정상적으로 로그아웃이 되었습니다.' });
};

export const sendMailResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (!validateEmail(email))
      return res
        .status(400)
        .json({ msg: '올바른 이메일 양식을 입력해주세요.' });

    const user = await findOneUser({ email });
    if (!user)
      return res.status(400).json({ msg: '이메일이 존재하지 않습니다. ' });

    const accessToken = createAccessToken({ id: user._id });
    const url = `${process.env.CLIENT_URL}/reset_pw/${accessToken}`;

    const sendEmailResult = await sendRegisterEmail(
      email,
      url,
      '비밀번호 재설정'
    );
    if (!sendEmailResult.valid)
      return res.status(500).json({ msg: sendEmailResult.msg });

    res.json({ msg: '메일이 전송되었습니다. 이메일을 확인해주세요.' });
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const {
    userInfo: { email, imageUrl, name },
  } = req.body;

  try {
    const user = await findOneUser({ email });

    if (user) {
      const password = email + process.env.PASSWORD_SECRET;

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch)
        return res.status(401).json({ msg: '패스워드가 일치하지 않습니다.' });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.json({
        msg: '정상적으로 로그인이 되었습니다.',
        accessToken,
        user: {
          ...user,
          password: '',
        },
      });
    } else {
      const username = name + getRandomNum();
      const password = email + process.env.PASSWORD_SECRET;
      const hashedPassword = await passwordHash(password);

      const newUser = new User({
        username: username.toLowerCase().replace(/ /g, '').slice(0, 20),
        userId: email,
        email,
        password: hashedPassword,
        avatar: imageUrl,
      });

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      await newUser.save();

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.json({
        msg: '정상적으로 로그인이 되었습니다.',
        accessToken,
        user: {
          ...newUser,
          password: '',
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const facebookLogin = async (req: Request, res: Response) => {
  const {
    userInfo: {
      email,
      name,
      picture: {
        data: { url },
      },
    },
  } = req.body;

  try {
    const user = await findOneUser({ email });

    if (user) {
      const password = email + process.env.PASSWORD_SECRET;

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch)
        return res.status(401).json({ msg: '패스워드가 일치하지 않습니다.' });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.json({
        msg: '정상적으로 로그인이 되었습니다.',
        accessToken,
        user: {
          ...user,
          password: '',
        },
      });
    } else {
      const username = name + getRandomNum();
      const password = email + process.env.PASSWORD_SECRET;
      const hashedPassword = await passwordHash(password);

      const newUser = new User({
        username: username.toLowerCase().replace(/ /g, '').slice(0, 20),
        userId: email,
        email,
        password: hashedPassword,
        avatar: url,
      });

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      await newUser.save();

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh_token',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.json({
        msg: '정상적으로 로그인이 되었습니다.',
        accessToken,
        user: {
          ...newUser,
          password: '',
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};
