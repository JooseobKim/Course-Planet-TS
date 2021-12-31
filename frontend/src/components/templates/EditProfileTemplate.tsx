import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
// eslint-disable-next-line prettier/prettier
import { ButtonAtom, DisplayFlexAtom, FormAtom, ImgAtom, InputAtom, LabelAtom, TextAtom } from '../UI/atoms';
import { initState } from './interfaces';
import { DefaultProps } from '../../utils/interfaces';
// eslint-disable-next-line prettier/prettier
import { defaultEditProfileInputStyle, StyledEditProfileTemplate } from './style';
import config from '../../utils/config/config';
import configStyle from '../../utils/config/config.style';

const EditProfileTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { token, user } = useSelector(
    (state: RootState) => ({
      token: state.auth.token,
      user: state.auth.user,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { username: paramsUsername }: { username: string } = useParams();

  const initialState: initState = {
    username: user?.username || '',
    email: user?.email || '',
    address: user?.address || '',
    mobile: user?.mobile || '',
  };
  const [updateUser, setUpdateUser] = useState(initialState);
  const [profileImage, setProfileImage] = useState<File | string | null>(null);
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { username, email, address, mobile } = updateUser;

  // eslint-disable-next-line prettier/prettier
  const { deleteUser, sendErrMsg, updateProfile, sendMailResetPassword } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (!token) return history.push('/');
    if (user?.username !== paramsUsername)
      history.push(`/user/${user?.username}/edit`);
  }, [history, paramsUsername, token, user?.username]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'mobile') {
      value = value.replace(/[^0-9]/gi, '');

      if (value.length > 11) return;
    }

    if (name === 'username') {
      value = value.toLowerCase().replace(/ /g, '');

      if (value.length > 25) return;
    }

    setUpdateUser({ ...updateUser, [name]: value });
  };

  const handleDeleteUser = () => {
    const confirm = window.confirm(
      '유저를 삭제하면 복구가 불가능합니다. 계속 진행하시겠습니까?'
    );

    if (confirm) {
      deleteUser({ username: paramsUsername, auth: { token, user } });
      window.alert('유저가 삭제되었습니다.');
      window.location.replace('/');
    }
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return sendErrMsg('파일이 존재하지 않습니다.');

    // 10mb
    if (file.size > 1024 * 1024 * 10)
      return sendErrMsg('파일의 용량은 10MB 이하만 업로드가 가능합니다.');

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      return sendErrMsg('사진 파일만 업로드가 가능합니다.');

    setProfileImage(file);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let notChanged = true;

    for (const [key, value] of Object.entries(updateUser)) {
      if (initialState[key] !== value) {
        notChanged = false;
        break;
      }
    }

    if (notChanged && !profileImage) return;

    updateProfile({
      updateUserData: updateUser,
      profileAvatar: profileImage,
      auth: { token, user },
    });
  };

  const resetInput = () => {
    fileInput.current.value = '';
  };

  const settingDefaultImage = () => {
    setProfileImage(config.defaultAvatar);
    resetInput();
  };

  const settingMyPrevImage = () => {
    if (!user) return;

    setProfileImage(user.avatar);
    resetInput();
  };

  const sendPwResetEmail = () => {
    if (window.confirm('비밀번호 변경 인증 메일을 발송하시겠습니까?'))
      sendMailResetPassword({ email });
  };

  const profileeImgSrc = profileImage
    ? typeof profileImage === 'string'
      ? profileImage
      : URL.createObjectURL(profileImage)
    : user
    ? user.avatar
    : config.defaultAvatar;

  return (
    <StyledEditProfileTemplate cssStyle={cssStyle}>
      {token && (
        <FormAtom
          onSubmit={handleOnSubmit}
          cssStyle={{ width: '95%', maxWidth: '745px', minHeight: '565px' }}
        >
          <ButtonAtom
            onClick={handleDeleteUser}
            cssStyle={{
              position: 'absolute',
              padding: '6px 12px',
              backgroundColor: '#C00',
              color: configStyle.white,
              borderRadius: '2px',
              opacity: 1,
            }}
          >
            <TextAtom tag="span" text="유저 삭제" />
          </ButtonAtom>
          <TextAtom
            tag="h2"
            text="프로필 설정"
            cssStyle={{
              fontSize: '20px',
              fontWeight: 700,
              textAlign: 'center',
            }}
          />
          <DisplayFlexAtom
            cssStyle={{
              position: 'relative',
              justifyContent: 'center',
              margin: '15px 0',
            }}
          >
            <ImgAtom
              src={profileeImgSrc}
              alt={username}
              cssStyle={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <InputAtom
              type="file"
              name="file"
              accept="image/*"
              hoverOpacity="none"
              onChange={changeImage}
              cssStyle={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                opacity: 0,
                cursor: 'pointer',
              }}
              ref={fileInput}
            />
          </DisplayFlexAtom>
          <DisplayFlexAtom
            displayCenter={true}
            cssStyle={{
              marginBottom: '15px',
              '@media (max-width: 512px)': { flexDirection: 'column' },
            }}
          >
            <ButtonAtom
              type="button"
              onClick={settingDefaultImage}
              cssStyle={{
                flex: 1,
                marginRight: '4px',
                border: `1px solid ${configStyle.gray}`,
                ':hover': { backgroundColor: configStyle.hoverGray },
                '@media (max-width: 512px)': {
                  width: '100%',
                  margin: 0,
                  marginBottom: '5px',
                },
              }}
            >
              <TextAtom tag="span" text="기본 이미지 설정" />
            </ButtonAtom>
            <ButtonAtom
              type="button"
              onClick={settingMyPrevImage}
              cssStyle={{
                flex: 1,
                marginLeft: '4px',
                border: `1px solid ${configStyle.gray}`,
                ':hover': { backgroundColor: configStyle.hoverGray },
                '@media (max-width: 512px)': { width: '100%', margin: 0 },
              }}
            >
              <TextAtom tag="span" text="나의 기존 이미지 설정" />
            </ButtonAtom>
          </DisplayFlexAtom>
          <DisplayFlexAtom
            displayGridOn={true}
            cssStyle={{
              gridTemplateColumns: 'repeat(4, minmax(50px, 175px))',
              gap: '15px',
            }}
          >
            <LabelAtom
              htmlFor="username_input"
              column={true}
              cssStyle={{
                gridColumn: '1 / 3',
                '@media (max-width: 512px)': { gridColumn: '1 / 5' },
              }}
            >
              <TextAtom tag="span" text="* 유저 이름" />
              <InputAtom
                id="username_input"
                name="username"
                value={username}
                onChange={handleChangeInput}
                cssStyle={{
                  ...defaultEditProfileInputStyle,
                  borderRadius: '3px',
                  opacity: username && 1,
                }}
                maxLength={25}
              />
            </LabelAtom>
            <LabelAtom
              htmlFor="mobile_input"
              column={true}
              cssStyle={{
                gridColumn: '3 / 5',
                '@media (max-width: 512px)': { gridColumn: '1 / 5' },
              }}
            >
              <TextAtom tag="span" text="전화번호" />
              <InputAtom
                id="mobile_input"
                name="mobile"
                value={mobile}
                onChange={handleChangeInput}
                cssStyle={{
                  ...defaultEditProfileInputStyle,
                  borderRadius: '3px',
                  opacity: mobile && 1,
                }}
                maxLength={11}
              />
            </LabelAtom>
            <LabelAtom
              htmlFor="address_input"
              column={true}
              cssStyle={{ gridColumn: '1 / 5' }}
            >
              <TextAtom tag="span" text="주소" />
              <InputAtom
                id="address_input"
                name="address"
                value={address}
                onChange={handleChangeInput}
                cssStyle={{
                  ...defaultEditProfileInputStyle,
                  borderRadius: '3px',
                  opacity: address && 1,
                }}
              />
            </LabelAtom>
            <LabelAtom
              htmlFor="email_input"
              column={true}
              cssStyle={{
                gridColumn: '1 / 4',
                '@media (max-width: 512px)': { gridColumn: '1 / 5' },
              }}
            >
              <TextAtom
                tag="span"
                text="이메일 ( 비밀번호 변경 인증 이메일 )"
              />
              <InputAtom
                id="email_input"
                value={email}
                readOnly={true}
                disabled={true}
                cssStyle={{
                  ...defaultEditProfileInputStyle,
                  borderRadius: '3px',
                  opacity: 1,
                }}
              />
            </LabelAtom>
            <DisplayFlexAtom
              displayColumn={true}
              cssStyle={{
                gridColumn: '4 / 5',
                '@media (max-width: 512px)': { gridColumn: '1 / 5' },
              }}
            >
              <TextAtom tag="span" text="비밀번호 변경하기" />
              <ButtonAtom
                onClick={sendPwResetEmail}
                cssStyle={{
                  marginTop: '5px',
                  padding: '5px 0',
                  ':hover': { backgroundColor: configStyle.hoverGray },
                }}
              >
                <TextAtom
                  tag="span"
                  innerHtml={true}
                  text="비밀번호 변경<br />인증 메일 발송"
                  cssStyle={{ fontSize: '14px' }}
                />
              </ButtonAtom>
            </DisplayFlexAtom>
            <ButtonAtom
              type="submit"
              disabled={
                !username || user?.username !== paramsUsername ? true : false
              }
              cssStyle={{
                gridColumn: '1 / 5',
                color: configStyle.white,
                backgroundColor: configStyle.mainDarkColor,
              }}
            >
              <TextAtom tag="span" text="업데이트" />
            </ButtonAtom>
          </DisplayFlexAtom>
        </FormAtom>
      )}
    </StyledEditProfileTemplate>
  );
};

export default EditProfileTemplate;
