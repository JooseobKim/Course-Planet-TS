import { AlertReduxData } from '../../utils/interfaces';
import { AlertType } from '../action-types';
import { AlertTypeAction } from '../actions';

const initialState: AlertReduxData = {
  msg: '',
  successMsg: '',
  errMsg: '',
  loading: false,
};

const alertReducer = (
  state = initialState,
  action: AlertTypeAction
): AlertReduxData => {
  switch (action.type) {
    case AlertType.ALERT:
      return {
        ...initialState,
        ...action.payload,
      };
    case AlertType.SEND_MSG:
      return {
        ...initialState,
        msg: action.payload,
      };
    case AlertType.SEND_ERR_MSG:
      return {
        ...initialState,
        errMsg: action.payload,
      };
    case AlertType.RESET:
      return initialState;
    default:
      return state;
  }
};

export default alertReducer;
