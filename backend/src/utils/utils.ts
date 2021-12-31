import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    username?: string;
    userId?: string;
    email?: string;
    password?: string;
    id?: string;
  }
}

export const modifyUserValue = (username: string, userId: string) => {
  const modifyUsername = username.toLowerCase().replace(/ /g, '');
  const modifyUserId = userId.replace(/ /g, '');

  return { modifyUsername, modifyUserId };
};

export const validateEmail = (email: string) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const createActivationToken = (payload: string | object) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET as string, {
    expiresIn: `${process.env.ACTIVATION_TOKEN_SECRET_EXPIRESIN}`,
  });
};

export const createAccessToken = (payload: string | object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: `${process.env.ACCESS_TOKEN_SECRET_EXPIRESIN}`,
  });
};

export const createRefreshToken = (payload: string | object) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: `${process.env.REFRESH_TOKEN_SECRET_EXPIRESIN}`,
  });
};

export const verifyJwt = (token: string, secretKey: jwt.Secret) => {
  const result = jwt.verify(token, secretKey);
  return result;
};

export const getRandomNum = () => Math.random().toString().split('.')[1];

export const passwordHash = async (password: string) =>
  await bcrypt.hash(password, 15);

export const comparePassword = async (data: string, encrypted: string) =>
  await bcrypt.compare(data, encrypted);
