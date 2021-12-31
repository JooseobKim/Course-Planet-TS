import axios from 'axios';
import { Dispatch } from 'redux';
import { AlertType, AuthType, ReviewType, UserType } from '../action-types';
// eslint-disable-next-line prettier/prettier
import { AlertTypeAction, AuthTypeAction, ReviewTypeAction, UserTypeAction } from '../actions';
import { AuthReduxData } from '../../utils/interfaces';
import config from '../../utils/config/config';

export const updateProfile = (profile: {
  updateUserData: {
    username: string;
    email: string;
    address: string;
    mobile: string;
  };
  profileAvatar: string | File | null;
  auth: AuthReduxData;
}) => {
  const { updateUserData, auth, profileAvatar } = profile;

  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    if (!updateUserData.username)
      return dispatch({
        type: AlertType.ALERT,
        payload: { errMsg: '필수 항목을 입력해주세요.' },
      });

    if (updateUserData.username.length > 20)
      return dispatch({
        type: AlertType.ALERT,
        payload: { errMsg: '유저 이름은 20 글자 이하로 입력해주세요.' },
      });

    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      if (!auth.token || !auth.user)
        return dispatch({
          type: AlertType.ALERT,
          payload: {
            errMsg: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
            loading: false,
          },
        });

      let media;

      if (profileAvatar) {
        const formData = new FormData();

        formData.append('file', profileAvatar);
        formData.append('upload_preset', 'u9rr2gys');
        formData.append('cloud_name', 'duw5jvlb4');

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/duw5jvlb4/image/upload',
          { method: 'POST', body: formData }
        );

        const data = await res.json();
        media = { public_id: data.public_id, url: data.secure_url };
      }

      const res = await axios.patch(
        `${config.client_url}/api/user/${auth.user.username}`,
        {
          ...updateUserData,
          avatar: media ? media.url : auth.user.avatar,
          auth,
        },
        { headers: { Authorization: auth.token } }
      );

      dispatch({
        type: AuthType.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...updateUserData,
            avatar: media ? media.url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: AlertType.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { errMsg: (err as Error).message, loading: false },
      });
    }
  };
};

export const deleteUser = (profile: {
  username: string;
  auth: AuthReduxData;
}) => {
  const { username, auth } = profile;

  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    if (!auth.token || !auth.user)
      return dispatch({
        type: AlertType.ALERT,
        payload: {
          errMsg: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
          loading: false,
        },
      });

    if (username === auth.user.username) {
      try {
        dispatch({ type: AlertType.ALERT, payload: { loading: true } });

        localStorage.removeItem('LoggedIn');

        const res = await axios.delete(
          `${config.client_url}/api/user/${username}`,
          {
            headers: { Authorization: auth.token },
          }
        );

        dispatch({
          type: AlertType.ALERT,
          payload: { successMsg: res.data.msg, loading: false },
        });
      } catch (err) {
        dispatch({
          type: AlertType.ALERT,
          payload: { errMsg: (err as Error).message, loading: false },
        });
      }
    }
  };
};

export const contactMeSendMail = (info: {
  fullname: string;
  email: string;
  message: string;
}) => {
  const { fullname, email, message } = info;

  return async (dispatch: Dispatch<AlertTypeAction | AuthTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.post(
        `${config.client_url}/api/user/contact_send_mail`,
        {
          fullname,
          email,
          message,
        }
      );

      dispatch({
        type: AlertType.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { errMsg: (err as Error).message, loading: false },
      });
    }
  };
};

export const getReviewsByUsername = (info: { username: string }) => {
  const { username } = info;

  return async (dispatch: Dispatch<AlertTypeAction | ReviewTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.get(
        `${config.client_url}/api/user/${username}/review`
      );

      if (res.data.reviews.length !== 0)
        dispatch({
          type: ReviewType.GET_USER_REVIEWS,
          payload: res.data.reviews,
        });

      dispatch({
        type: AlertType.ALERT,
        payload: { msg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { errMsg: (err as Error).message, loading: false },
      });
    }
  };
};

export const getAvatarByUsername = (info: { username: string }) => {
  const { username } = info;

  return async (dispatch: Dispatch<AlertTypeAction | UserTypeAction>) => {
    try {
      dispatch({ type: AlertType.ALERT, payload: { loading: true } });

      const res = await axios.get(`${config.client_url}/api/user/${username}`);

      dispatch({
        type: UserType.GET_USER_AVATAR,
        payload: res.data.user.avatar,
      });

      dispatch({
        type: AlertType.ALERT,
        payload: { msg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: AlertType.ALERT,
        payload: { errMsg: (err as Error).message, loading: false },
      });
    }
  };
};
