import { useState } from 'react';
// eslint-disable-next-line prettier/prettier
import { ButtonAtom, FormAtom, InputAtom, LabelAtom, TextareaAtom, TextAtom } from '../atoms';
import { ModalForm } from '../molecules';
import { defaultLabelStyle, defaultInputStyle } from './styles';
import configStyle from '../../../utils/config/config.style';

const ContactMeModal = () => {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    message: '',
  });
  const { fullname, email, message } = data;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  return (
    <ModalForm
      togglerId="contactMeToggler"
      modalWidth="380px"
      modalHeight="430px"
      btnText="CONTACT ME"
      btnStyle={{
        boxShadow: configStyle.boxShadow,
        '@media (max-width: 768px)': {
          boxShadow: 'none',
          backgroundColor: configStyle.hoverGray,
        },
      }}
    >
      <FormAtom
        displayColumn={true}
        cssStyle={{ width: '75%', justifyContent: 'center' }}
      >
        <LabelAtom htmlFor="fullname" cssStyle={{ ...defaultLabelStyle }}>
          <TextAtom tag="span" text="Fullname" />
        </LabelAtom>
        <InputAtom
          id="fullname"
          name="fullname"
          value={fullname}
          onChange={handleOnChange}
          placeholder="Your Name"
          cssStyle={{ ...defaultInputStyle }}
        />
        <LabelAtom htmlFor="email" cssStyle={{ ...defaultLabelStyle }}>
          <TextAtom tag="span" text="Email" />
        </LabelAtom>
        <InputAtom
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Your Email"
          cssStyle={{ ...defaultInputStyle }}
        />
        <LabelAtom htmlFor="message" cssStyle={{ ...defaultLabelStyle }}>
          <TextAtom tag="span" text="Message" />
        </LabelAtom>
        <TextareaAtom
          id="message"
          name="message"
          value={message}
          onChange={handleOnChange}
          placeholder="Your Message"
          cols={30}
          rows={6}
          cssStyle={{ ...defaultInputStyle, resize: 'none' }}
        />
        <ButtonAtom
          type="submit"
          disabled={!fullname || !email || !message}
          cssStyle={{
            backgroundColor: configStyle.mainDarkColor,
            color: configStyle.white,
            borderRadius: '3px',
            marginTop: '5px',
          }}
        >
          <TextAtom tag="span" text="제출" />
        </ButtonAtom>
      </FormAtom>
    </ModalForm>
  );
};

export default ContactMeModal;
