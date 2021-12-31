import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
// eslint-disable-next-line prettier/prettier
import { FormAtom, LabelAtom, TextAtom, InputAtom, ButtonAtom, DisplayFlexAtom } from '../UI/atoms';
import { DefaultProps } from '../../utils/interfaces';
import { StyledSendMailResetPassword } from './style';
import configStyle from '../../utils/config/config.style';
import { blackBtn } from '../../utils/style/styling';

const SendMailResetPasswordTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const dispatch = useDispatch();

  // eslint-disable-next-line prettier/prettier
  const { sendMailResetPassword } = bindActionCreators(actionCreators, dispatch);

  const [email, setEmail] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMailResetPassword({ email });
  };

  return (
    <StyledSendMailResetPassword cssStyle={cssStyle}>
      <DisplayFlexAtom
        displayCenter={true}
        cssStyle={{
          width: '400px',
          height: '250px',
          boxShadow: configStyle.boxShadow,
          '@media (max-width: 512px)': {
            boxShadow: 'none',
          },
        }}
      >
        <FormAtom
          displayColumn={true}
          onSubmit={handleOnSubmit}
          cssStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <LabelAtom htmlFor="fg-pw">
            <TextAtom tag="span" text="이메일을 입력해주세요." />
          </LabelAtom>
          <InputAtom
            type="email"
            id="fg-pw"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            cssStyle={{ width: '250px', margin: '25px 0 20px' }}
          />
          <ButtonAtom
            type="submit"
            disabled={email ? false : true}
            cssStyle={{ padding: '5px 10px', ...blackBtn }}
          >
            <TextAtom tag="span" text="인증 메일 전송" />
          </ButtonAtom>
        </FormAtom>
      </DisplayFlexAtom>
    </StyledSendMailResetPassword>
  );
};

export default SendMailResetPasswordTemplate;
