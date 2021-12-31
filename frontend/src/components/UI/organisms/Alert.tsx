import { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
import { TextAtom } from '../atoms';
// eslint-disable-next-line prettier/prettier
import { StyledLoading, StyledMessage, defaultAlertTxtStyle, StyledCloseIcon, StyledSuccessMessage, StyledErrMessage } from './styles';
import { MdClose } from 'react-icons/md';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Alert = () => {
  const { token, user, loading, msg, successMsg, errMsg } = useSelector(
    (state: RootState) => ({
      token: state.auth.token,
      user: state.auth.user,
      loading: state.alert.loading,
      msg: state.alert.msg,
      successMsg: state.alert.successMsg,
      errMsg: state.alert.errMsg,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { alertReset } = bindActionCreators(actionCreators, dispatch);

  // eslint-disable-next-line prettier/prettier
  const [resetTimeoutId, setResetTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (msg || successMsg || errMsg) {
      if (resetTimeoutId) clearTimeout(resetTimeoutId);
      timeoutId = setTimeout(() => {
        alertReset();
      }, 10000);
      setResetTimeoutId(timeoutId);
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, successMsg, errMsg]);

  const handleResetMsg = () => {
    alertReset();
  };

  return (
    <>
      {loading && (
        <StyledLoading>
          <PropagateLoader color="#ffffff" loading={loading} size={20} />
        </StyledLoading>
      )}
      {token && user?.role === 1 && msg && (
        <StyledMessage>
          <TextAtom
            tag="span"
            text={msg}
            cssStyle={{ ...defaultAlertTxtStyle }}
          />
          <StyledCloseIcon>
            <MdClose onClick={handleResetMsg} />
          </StyledCloseIcon>
        </StyledMessage>
      )}
      {successMsg && (
        <StyledSuccessMessage>
          <TextAtom
            tag="span"
            text={successMsg}
            cssStyle={{ ...defaultAlertTxtStyle }}
          />
          <StyledCloseIcon>
            <MdClose onClick={handleResetMsg} />
          </StyledCloseIcon>
        </StyledSuccessMessage>
      )}
      {errMsg && (
        <StyledErrMessage>
          <TextAtom
            tag="span"
            text={errMsg}
            cssStyle={{ ...defaultAlertTxtStyle }}
          />
          <StyledCloseIcon>
            <MdClose onClick={handleResetMsg} />
          </StyledCloseIcon>
        </StyledErrMessage>
      )}
    </>
  );
};

export default Alert;
