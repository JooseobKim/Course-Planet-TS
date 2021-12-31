import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
// eslint-disable-next-line prettier/prettier
import { ButtonAtom, DisplayFlexAtom, FormAtom, InputAtom, LabelAtom, TextAtom } from '../UI/atoms';
import { StyledRegisterTemplate } from './style';
import { DefaultProps } from '../../utils/interfaces';
import configStyle from '../../utils/config/config.style';
import { CSSObject } from 'styled-components';
import { mainDarkkBtn } from '../../utils/style/styling';

const inputDefaultStyle: CSSObject = {
  borderRadius: '3px',
  margin: '7px 0',
};

const RegisterTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { token } = useSelector((state: RootState) => ({
    token: state.auth.token,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  // eslint-disable-next-line prettier/prettier
  const initialState = { username: '', userId: '', email: '', password: '', cf_password: '' };

  const [userData, setUserData] = useState(initialState);
  const { username, userId, email, password, cf_password } = userData;

  const { register } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (token) history.push('/');
  }, [token, history]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'username')
      return setUserData({
        ...userData,
        username: value.toLowerCase().replace(/ /g, ''),
      });

    if (name === 'userId')
      return setUserData({
        ...userData,
        userId: value.replace(/ /g, ''),
      });

    setUserData({ ...userData, [name]: value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({ username, userId, email, password, cf_password });
  };

  return (
    <StyledRegisterTemplate cssStyle={cssStyle}>
      <DisplayFlexAtom
        displayColumn={true}
        cssStyle={{
          padding: '0 20px',
          width: '500px',
          height: '550px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: configStyle.boxShadow,
          '@media (max-width: 640px)': {
            width: '100%',
            boxShadow: 'none',
          },
        }}
      >
        <TextAtom
          tag="span"
          text="계정 등록하기"
          cssStyle={{
            marginBottom: '20px',
            fontSize: '20px',
            textAlign: 'center',
          }}
        />
        <FormAtom
          displayColumn={true}
          onSubmit={handleOnSubmit}
          cssStyle={{ width: '350px' }}
        >
          <LabelAtom htmlFor="register_username">
            <TextAtom tag="span" text="유저이름 *" />
          </LabelAtom>
          <InputAtom
            id="register_username"
            placeholder="유저이름을 입력해주세요."
            name="username"
            value={username}
            onChange={handleOnChange}
            maxLength={25}
            cssStyle={{ ...inputDefaultStyle, opacity: username && 1 }}
          />
          <LabelAtom htmlFor="register_id">
            <TextAtom tag="span" text="아이디 *" />
          </LabelAtom>
          <InputAtom
            id="register_id"
            placeholder="아이디를 입력해주세요."
            name="userId"
            value={userId}
            onChange={handleOnChange}
            cssStyle={{ ...inputDefaultStyle, opacity: userId && 1 }}
          />
          <LabelAtom htmlFor="register_email">
            <TextAtom tag="span" text="이메일 *" />
          </LabelAtom>
          <InputAtom
            id="register_email"
            type="email"
            placeholder="이메일를 입력해주세요."
            name="email"
            value={email}
            onChange={handleOnChange}
            cssStyle={{ ...inputDefaultStyle, opacity: email && 1 }}
          />
          <LabelAtom htmlFor="register_pw">
            <TextAtom tag="span" text="비밀번호 *" />
          </LabelAtom>
          <InputAtom
            id="register_pw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            value={password}
            onChange={handleOnChange}
            minLength={6}
            cssStyle={{ ...inputDefaultStyle, opacity: password && 1 }}
          />
          <LabelAtom htmlFor="register_pw_confirm">
            <TextAtom tag="span" text="비밀번호 확인 *" />
          </LabelAtom>
          <InputAtom
            id="register_pw_confirm"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            name="cf_password"
            value={cf_password}
            onChange={handleOnChange}
            minLength={6}
            cssStyle={{ ...inputDefaultStyle, opacity: cf_password && 1 }}
          />
          <ButtonAtom
            type="submit"
            disabled={
              !username || !userId || !email || !password || !cf_password
            }
            cssStyle={{ margin: '5px 0 10px', ...mainDarkkBtn }}
          >
            <TextAtom tag="span" text="회원가입" />
          </ButtonAtom>
        </FormAtom>
        <DisplayFlexAtom
          cssStyle={{ width: '350px', justifyContent: 'space-between' }}
        >
          <Link to="/forgot_pw">
            <ButtonAtom cssStyle={{ padding: 0 }}>
              <TextAtom tag="span" text="비밀번호를 잊으셨나요?" />
            </ButtonAtom>
          </Link>
          <Link to="/login">
            <ButtonAtom cssStyle={{ padding: 0 }}>
              <TextAtom tag="span" text="계정이 있으신가요?" />
            </ButtonAtom>
          </Link>
        </DisplayFlexAtom>
      </DisplayFlexAtom>
    </StyledRegisterTemplate>
  );
};

export default RegisterTemplate;
