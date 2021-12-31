import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
// eslint-disable-next-line prettier/prettier
import { FormAtom, LabelAtom, InputAtom, ButtonAtom, TextAtom } from '../UI/atoms';
import { StyledResetPasswordTemplate } from './style';
import { DefaultProps } from '../../utils/interfaces';
import configStyle from '../../utils/config/config.style';

const ResetPasswordTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { token }: { token: string } = useParams();
  const { authToken } = useSelector(
    (state: RootState) => ({
      authToken: state.auth.token,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { resetPassword } = bindActionCreators(actionCreators, dispatch);

  const [data, setData] = useState({ password: '', cf_password: '' });
  const { password, cf_password } = data;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({ password, cf_password, token });
  };

  return (
    <StyledResetPasswordTemplate cssStyle={cssStyle}>
      <FormAtom
        displayColumn={true}
        onSubmit={handleOnSubmit}
        cssStyle={{
          width: '350px',
          height: '225px',
          justifyContent: 'center',
          padding: '0 20px',
          boxShadow: configStyle.boxShadow,
        }}
      >
        <LabelAtom htmlFor="reset-pw">
          <InputAtom
            type="password"
            id="reset-pw"
            value={password}
            onChange={e => setData({ ...data, password: e.target.value })}
            placeholder="패스워드를 입력해주세요."
            minLength={6}
            cssStyle={{ width: '100%' }}
          />
        </LabelAtom>
        <LabelAtom htmlFor="reset-cf_pw">
          <InputAtom
            type="password"
            id="reset-cf_pw"
            value={cf_password}
            onChange={e => setData({ ...data, cf_password: e.target.value })}
            placeholder="다시 한 번 패스워드를 입력해주세요."
            minLength={6}
            cssStyle={{ width: '100%', margin: '10px 0 15px' }}
          />
        </LabelAtom>
        <ButtonAtom
          type="submit"
          disabled={password && cf_password ? false : true}
          cssStyle={{ ':hover': { backgroundColor: configStyle.hoverGray } }}
        >
          <TextAtom tag="span" text="비밀번호 변경" />
        </ButtonAtom>
        {!authToken && (
          <Link to="/login">
            <TextAtom tag="span" text="로그인 페이지로 이동" />
          </Link>
        )}
      </FormAtom>
    </StyledResetPasswordTemplate>
  );
};

export default ResetPasswordTemplate;
