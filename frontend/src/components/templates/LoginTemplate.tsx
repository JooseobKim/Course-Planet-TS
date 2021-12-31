import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import config from '../../utils/config/config';
import { DefaultProps } from '../../utils/interfaces';
// eslint-disable-next-line prettier/prettier
import { ButtonAtom, DisplayFlexAtom, FormAtom, InputAtom, LabelAtom, TextAtom } from '../UI/atoms';
// eslint-disable-next-line prettier/prettier
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { StyledGoogleLoginBtn, StyledLoginTemplate } from './style';
import { FaFacebook, FaGooglePlus } from 'react-icons/fa';
import configStyle from '../../utils/config/config.style';
import { mainDarkkBtn } from '../../utils/style/styling';

const LoginTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state: RootState) => ({
    token: state.auth.token,
  }));

  // eslint-disable-next-line prettier/prettier
  const { login, googleLogin, facebookLogin } = bindActionCreators(actionCreators, dispatch);

  const initialState = { userId: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { userId, password } = userData;

  useEffect(() => {
    if (token) history.push('/');
  }, [token, history]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const hadnleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ userId, password });
  };

  return (
    <StyledLoginTemplate cssStyle={cssStyle}>
      <DisplayFlexAtom
        displayColumn={true}
        displayCenter={true}
        cssStyle={{
          padding: '0 20px',
          width: '500px',
          height: '500px',
          boxShadow: configStyle.boxShadow,
          '@media (max-width: 640px)': {
            width: '100%',
            boxShadow: 'none',
          },
        }}
      >
        <DisplayFlexAtom displayColumn={true} cssStyle={{ width: '350px' }}>
          <TextAtom
            tag="span"
            text="로그인하기"
            cssStyle={{
              marginBottom: '20px',
              fontSize: '20px',
              textAlign: 'center',
            }}
          />
          <FormAtom displayColumn={true} onSubmit={hadnleSubmit}>
            <LabelAtom htmlFor="login_id">
              <TextAtom tag="span" text="아이디" />
            </LabelAtom>
            <InputAtom
              id="login_id"
              placeholder="아이디를 입력해주세요."
              name="userId"
              value={userId}
              onChange={handleChangeInput}
              cssStyle={{ borderRadius: '3px', margin: '7px 0' }}
            />
            <LabelAtom htmlFor="login_pw">
              <TextAtom tag="span" text="비밀번호" />
            </LabelAtom>
            <InputAtom
              type="password"
              id="login_pw"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              value={password}
              onChange={handleChangeInput}
              cssStyle={{ borderRadius: '3px', margin: '7px 0' }}
            />
            <ButtonAtom
              type="submit"
              disabled={!userId || !password}
              cssStyle={{ margin: '5px 0', ...mainDarkkBtn }}
            >
              <TextAtom tag="span" text="로그인" />
            </ButtonAtom>
          </FormAtom>
        </DisplayFlexAtom>
        <div className="hr">
          <span>or</span>
        </div>
        <DisplayFlexAtom
          displayColumn={true}
          cssStyle={{ margin: '5px 0 15px' }}
        >
          <StyledGoogleLoginBtn
            clientId={config.GOOGLE_LOGIN_CLIENT_ID}
            icon={false}
            onSuccess={(
              res: GoogleLoginResponse | GoogleLoginResponseOffline
            ) => {
              if ('profileObj' in res)
                googleLogin({ userInfo: res.profileObj });
            }}
            cookiePolicy={'single_host_origin'}
          >
            <FaGooglePlus style={{ fontSize: '22px', marginRight: '5px' }} />
            <TextAtom tag="span" text="구글 계정으로 로그인" />
          </StyledGoogleLoginBtn>
          <FacebookLogin
            appId={config.FACEBOOK_LOGIN_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={response => facebookLogin({ response })}
            icon={
              <FaFacebook style={{ fontSize: '20px', marginRight: '5px' }} />
            }
            textButton="페이스북 계정으로 로그인"
            size="medium"
            buttonStyle={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </DisplayFlexAtom>
        <DisplayFlexAtom>
          <Link to="/forgot_pw">
            <ButtonAtom cssStyle={{ padding: 0, marginRight: '9px' }}>
              <TextAtom tag="span" text="비밀번호를 잊으셨나요?" />
            </ButtonAtom>
          </Link>
          <Link to="/register">
            <ButtonAtom cssStyle={{ padding: 0, marginLeft: '9px' }}>
              <TextAtom tag="span" text="계정이 없으신가요?" />
            </ButtonAtom>
          </Link>
        </DisplayFlexAtom>
      </DisplayFlexAtom>
    </StyledLoginTemplate>
  );
};

export default LoginTemplate;
