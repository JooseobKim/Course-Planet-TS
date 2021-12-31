import { validateEmail, comparePassword } from '../utils/utils';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { findOneUser } from '../utils/mongoose.utils';
import User from '../models/user.model';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const getTokenNum = (tokenExpire: string) => {
  const result = { valid: false, msg: '', tokenNum: '' };
  const tokenNumRegex = /[0-9]*/g;
  const tokenNum = tokenNumRegex.exec(tokenExpire);
  if (!tokenNum) return { ...result, msg: '환경 변수 확인 요망' };

  return {
    ...result,
    valid: true,
    tokenNum: tokenNum[0],
  };
};

interface InputValue {
  username: string;
  userId: string;
  email: string;
  password: string;
  cf_password: string;
}

export const validateRegisterInput = async (inputValue: InputValue) => {
  const result = { valid: false, msg: '' };
  const { username, userId, email, password, cf_password } = inputValue;

  // 1. 유저 입력 검증
  if (!username || !userId || !email || !password || !cf_password)
    return { ...result, msg: '모든 항목을 입력해주세요.' };

  // 2. username 검증
  const findusername = await findOneUser({ username });
  if (findusername) return { ...result, msg: '유저 이름이 이미 존재합니다.' };
  if (username.length > 20)
    return { ...result, msg: '유저 이름은 20 글자 이하로 입력해주세요.' };

  // 3. userId 검증
  const findUserId = await findOneUser({ userId });
  if (findUserId) return { ...result, msg: '이미 사용중인 아이디입니다.' };
  if (userId.length > 50)
    return { ...result, msg: '유저의 아이디는 50 글자 이하로 입력해주세요.' };

  // 4. email 검증
  if (!validateEmail(email))
    return { ...result, msg: '올바른 이메일 양식을 입력해주세요.' };
  const findUserEmail = await findOneUser({ email });
  if (findUserEmail) return { ...result, msg: '이미 등록된 이메일입니다.' };

  // 5. password 검증
  if (password.length < 6)
    return { ...result, msg: '비밀번호는 최소 6 글자 이상이어야 합니다.' };

  // 6. cf_password 검증
  if (cf_password !== password)
    return { ...result, msg: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' };

  return { ...result, valid: true };
};

interface ValidateSendMail {
  valid: boolean;
  msg: string;
  result?: SMTPTransport.SentMessageInfo;
}

export const sendRegisterEmail = async (
  to: string,
  url: string,
  text: string
) => {
  const validResult: ValidateSendMail = { valid: false, msg: '' };

  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
  const oAuth2Client = new google.auth.OAuth2(
    process.env.MAILING_SERVICE_CLIENT_ID,
    process.env.MAILING_SERVICE_CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
  });

  try {
    let accessToken;

    try {
      accessToken = await oAuth2Client.getAccessToken();
      if (!accessToken.token) return { ...validResult, msg: '토큰 발급 실패.' };
    } catch (err) {
      return {
        ...validResult,
        msg: `토큰 발급 실패. ${(err as Error).message}`,
      };
    }

    const auth: SMTPConnection.AuthenticationTypeOAuth2 = {
      type: 'OAUTH2',
      user: process.env.SENDER_EMAIL_ADDRESS,
      clientId: process.env.MAILING_SERVICE_CLIENT_ID,
      clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth,
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: to,
      subject: 'CoursePlanet 이메일 인증 절차',
      html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">
          이메일 인증 절차를 위한 메일입니다.
        </h2>
        <p>
          CoursePlanet 웹 사이트를 이용해주셔서 감사드리며, 아래 버튼을 누르면 이메일 인증이 완료됩니다.
        </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">
          ${text}
        </a>

        <p>
          버튼 클릭을 통해 이메일 인증이 완료되지 않는다면 아래 링크를 클릭해주세요.
        </p>

        <div><a href=${url}>${url}</div>
      </div>
    `,
    };
    const result = await transporter.sendMail(mailOptions);

    return { ...validResult, valid: true, result };
  } catch (err) {
    return { ...validResult, msg: (err as Error).message };
  }
};

export const validateLoginUser = async (userId: string, password: string) => {
  const user = await User.findOne({ userId }).lean();
  if (!user) return false;

  const userPassword = await comparePassword(password, user.password);
  if (!userPassword) return false;

  return user;
};
