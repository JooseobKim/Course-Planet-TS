import express from 'express';
import {
  facebookLogin,
  googleLogin,
  login,
  logout,
  refreshToken,
  registerActivateEmail,
  registerSendMail,
  sendMailResetPassword,
} from '../controller/auth.controller';

const authRouter = express.Router();

authRouter.post('/register', registerSendMail);

authRouter.post('/activate_email', registerActivateEmail);

authRouter.post('/send_mail_reset_pw', sendMailResetPassword);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/refresh_token', refreshToken);

authRouter.post('/google_login', googleLogin);

authRouter.post('/facebook_login', facebookLogin);

export default authRouter;
