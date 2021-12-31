import config from '../../utils/config/config';
import { UserType } from '../action-types';
import { UserTypeAction } from '../actions';

const initialState = {
  get_user_avatar: config.defaultAvatar,
};

const userReducer = (state = initialState, action: UserTypeAction) => {
  switch (action.type) {
    case UserType.GET_USER_AVATAR:
      return {
        ...state,
        get_user_avatar: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
