import { Dispatch } from 'redux';
import { AlertType } from '../action-types';
import { AlertTypeAction } from '../actions';

export const alertReset = () => (dispatch: Dispatch<AlertTypeAction>) => {
  dispatch({ type: AlertType.RESET });
};

export const sendAlertMsg =
  (msg: string) => (dispatch: Dispatch<AlertTypeAction>) => {
    dispatch({ type: AlertType.SEND_MSG, payload: msg });
  };

export const sendErrMsg =
  (msg: string) => (dispatch: Dispatch<AlertTypeAction>) => {
    dispatch({ type: AlertType.SEND_ERR_MSG, payload: msg });
  };
