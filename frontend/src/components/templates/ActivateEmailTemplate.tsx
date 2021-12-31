import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { TextAtom } from '../UI/atoms';
import { StyledActivateEmailTemplate } from './style';
import { DefaultProps } from '../../utils/interfaces';

const ActivateEmailTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { activation_token }: { activation_token: string } = useParams();
  const dispatch = useDispatch();

  const { activateEmail } = bindActionCreators(actionCreators, dispatch);

  const [count, setCount] = useState(3);

  useEffect(() => {
    if (activation_token) activateEmail({ activation_token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activation_token) {
      const countDown = setInterval(() => {
        if (count !== 0 && count > 0) setCount(prev => prev - 1);
      }, 1000);

      if (count === 0 || count < 0) {
        clearInterval(countDown);
        localStorage.setItem('LoggedIn', 'logged');
        window.location.replace('/');
      }

      return () => clearInterval(countDown);
    }
  }, [activation_token, count]);

  return (
    <StyledActivateEmailTemplate cssStyle={cssStyle}>
      <TextAtom
        tag="span"
        text={`이메일 인증 완료<br/>유저 등록에 성공하였습니다.<br/>${count}초 후에 홈페이지로 이동합니다.`}
        innerHtml={true}
      />
    </StyledActivateEmailTemplate>
  );
};

export default ActivateEmailTemplate;
