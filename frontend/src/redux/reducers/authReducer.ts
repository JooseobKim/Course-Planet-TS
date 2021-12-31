import { AuthReduxData } from '../../utils/interfaces';
import { AuthType } from '../action-types';
import { AuthTypeAction } from '../actions';

const initialState: AuthReduxData = {
  token: '',
  user: undefined,
};

const authReducer = (
  state = initialState,
  action: AuthTypeAction
): AuthReduxData => {
  switch (action.type) {
    case AuthType.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
