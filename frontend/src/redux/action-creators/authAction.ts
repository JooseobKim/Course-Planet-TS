import axios, { AxiosError } from 'axios';
import { GoogleLoginResponse } from 'react-google-login';
// eslint-disable-next-line prettier/prettier
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Dispatch } from 'redux';
import { AlertType, AuthType } from '../action-types';
import { AlertTypeAction, AuthTypeAction } from '../actions';
import config from '../../utils/config/config';

export const register = (userInput: {
  username: string;
  userId: string;
  email: string;
  password: string;
  cf_password: string;
}) => {
  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    const { username, userId, email, password, cf_password } = userInput;

    const validateEmail = (email: string) => {
      const re =
        // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    const validData = [
      {
        condition: username.length > 20,
        msg: '닉네임을 20 글자 이하로 입력해주세요.',
      },
      {
        condition: userId.length > 20,
        msg: '아이디를 20 글자 이하로 입력해주세요.',
      },
      {
        condition: !validateEmail(email),
        msg: '올바른 이메일 양식을 입력해주세요.',
      },
      {
        condition: password.length < 6,
        msg: '비밀번호는 최소 6 글자 이상이어야 합니다.',
      },
      {
        condition: password !== cf_password,
        msg: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      },
    ];

    const valid = (condition: boolean, msg: string) => {
      if (condition)
        return dispatch({
          type: AlertType.ALERT,
          payload: { errMsg: msg },
        });
    };

    validData.forEach(item => valid(item.condition, item.msg));

    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });
      const res = await axios.post(`${config.client_url}/api/auth/register`, {
        username,
        userId,
        email,
        password,
        cf_password,
      });

      dispatch({
        type: AuthType.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });

      dispatch({
        type: AlertType.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
        },
      });
    }
  };
};

export const login = (userInput: { userId: string; password: string }) => {
  const { userId, password } = userInput;

  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.post(
        `${config.client_url}/api/auth/login`,
        {
          userId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: AuthType.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });

      localStorage.setItem('LoggedIn', 'logged');

      dispatch({
        type: AlertType.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
        },
      });
    }
  };
};

export const refreshToken = () => {
  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    const LoggedIn = localStorage.getItem('LoggedIn');

    if (LoggedIn) {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      try {
        const res = await axios.post(
          `${config.client_url}/api/auth/refresh_token`
        );

        dispatch({
          type: AuthType.AUTH,
          payload: {
            token: res.data.accessToken,
            user: res.data.user,
          },
        });

        dispatch({ type: AlertType.ALERT, payload: { loading: false } });
      } catch (err) {
        window.localStorage.removeItem('LoggedIn');
        dispatch({
          type: AlertType.ALERT,
          payload: {
            loading: false,
            errMsg:
              (err as AxiosError).response?.data.msg || (err as Error).message,
          },
        });
      }
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<AlertTypeAction>) => {
    try {
      localStorage.removeItem('LoggedIn');

      const res = await axios.post(`${config.client_url}/api/auth/logout`);

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

      dispatch({
        type: AlertType.ALERT,
        payload: {
          successMsg: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
        },
      });
    }
  };
};

export const activateEmail = (userToken: { activation_token: string }) => {
  const { activation_token } = userToken;

  return async (dispatch: Dispatch<AlertTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.post(
        `${config.client_url}/api/auth/activate_email`,
        {
          activationToken: activation_token,
        }
      );

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
        },
      });
    }
  };
};

export const sendMailResetPassword = (userEmail: { email: string }) => {
  const { email } = userEmail;

  return async (dispatch: Dispatch<AlertTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.post(
        `${config.client_url}/api/auth/send_mail_reset_pw`,
        { email }
      );

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
          loading: false,
        },
      });
    }
  };
};

export const resetPassword = (userInput: {
  password: string;
  cf_password: string;
  token: string;
}) => {
  const { password, cf_password, token } = userInput;

  return async (dispatch: Dispatch<AlertTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.post(
        `${config.client_url}/api/user/reset_password`,
        { password, cf_password },
        {
          headers: { Authorization: token },
        }
      );

      dispatch({
        type: AlertType.ALERT,
        payload: { loading: false, successMsg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
          loading: false,
        },
      });
    }
  };
};

export const googleLogin = (user: {
  userInfo: GoogleLoginResponse['profileObj'];
}) => {
  const { userInfo } = user;

  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    if (userInfo)
      try {
        dispatch({ type: AlertType.ALERT, payload: { loading: true } });

        const res = await axios.post(
          `${config.client_url}/api/auth/google_login`,
          { userInfo }
        );

        dispatch({
          type: AuthType.AUTH,
          payload: { token: res.data.accessToken, user: res.data.user._doc },
        });

        localStorage.setItem('LoggedIn', 'logged');

        dispatch({
          type: AlertType.ALERT,
          payload: { successMsg: res.data.msg, loading: false },
        });
      } catch (err) {
        dispatch({
          type: AlertType.ALERT,
          payload: {
            loading: false,
            errMsg:
              (err as AxiosError).response?.data.msg || (err as Error).message,
          },
        });
      }
  };
};

export const facebookLogin = (user: {
  response: ReactFacebookLoginInfo | ReactFacebookFailureResponse;
}) => {
  const { response } = user;

  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    if ('status' in response)
      return dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          errMsg: '로그인 에러 발생. 다시 시도해주세요.',
        },
      });

    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.post(
        `${config.client_url}/api/auth/facebook_login`,
        {
          userInfo: response as ReactFacebookLoginInfo,
        }
      );

      dispatch({
        type: AuthType.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user._doc },
      });

      localStorage.setItem('LoggedIn', 'logged');

      dispatch({
        type: AlertType.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: {
          loading: false,
          errMsg:
            (err as AxiosError).response?.data.msg || (err as Error).message,
        },
      });
    }
  };
};
