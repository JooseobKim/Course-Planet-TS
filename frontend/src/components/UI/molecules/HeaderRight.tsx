import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
import { Dropdown } from '.';
import { ImgAtom, InputAtom, TextAtom, ButtonAtom, FormAtom } from '../atoms';
// eslint-disable-next-line prettier/prettier
import { dropdownBtnStyle, dropdownTxtStyle, StyledHeaderRight } from './styles';
import { DefaultProps } from '../../../utils/interfaces';
import config from '../../../utils/config/config';
import configStyle from '../../../utils/config/config.style';
import { FaSearch, FaTimes } from 'react-icons/fa';

const HeaderRight = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { user, token } = useSelector(
    (state: RootState) => ({
      user: state.auth.user,
      token: state.auth.token,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  // eslint-disable-next-line prettier/prettier
  const { logout, sendSearchKeyword } = bindActionCreators(actionCreators, dispatch);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;

    sendSearchKeyword(searchValue);

    history.push('/courses');
  };

  const dropdownProfile = [
    <Link to={`/user/${user?.username}/edit`}>
      <ButtonAtom cssStyle={dropdownBtnStyle}>
        <TextAtom tag="span" text="내 프로필" cssStyle={dropdownTxtStyle} />
      </ButtonAtom>
    </Link>,
    <Link to={`/user/${user?.username}`}>
      <ButtonAtom cssStyle={dropdownBtnStyle}>
        <TextAtom tag="span" text="내 활동" cssStyle={dropdownTxtStyle} />
      </ButtonAtom>
    </Link>,
    <ButtonAtom onClick={() => logout()} cssStyle={dropdownBtnStyle}>
      <TextAtom tag="span" text="로그아웃" cssStyle={dropdownTxtStyle} />
    </ButtonAtom>,
  ];

  return (
    <StyledHeaderRight cssStyle={cssStyle}>
      <FormAtom onSubmit={handleOnSubmit}>
        <InputAtom
          name="searchValue"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="검색어를 입력해주세요"
          cssStyle={{
            padding: '9px 7px 9px 28px',
            backgroundColor: configStyle.mainLightColor,
            border: 'none',
            '@media (max-width: 768px)': { display: 'none' },
          }}
        />
        <ButtonAtom
          type="button"
          onClick={() => searchValue && setSearchValue('')}
          aria-label="search icon"
          cssStyle={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            margin: 'auto 0',
            padding: '0 9px',
            backgroundColor: 'transparent',
            transform: 'translateY(2px)',
            '@media (max-width: 768px)': { display: 'none' },
          }}
        >
          {searchValue ? <FaTimes /> : <FaSearch />}
        </ButtonAtom>
      </FormAtom>
      {token ? (
        <Dropdown
          dropdownIcon={
            <ImgAtom
              src={user?.avatar || config.defaultAvatar}
              alt={user?.username}
              cssStyle={{
                width: '35px',
                height: '35px',
                marginLeft: '15px',
                borderRadius: '3px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          }
          submenuList={dropdownProfile}
        />
      ) : (
        <>
          <Link to="/login">
            <ButtonAtom
              cssStyle={{
                '@media (max-width: 768px)': { padding: '8px 12px' },
              }}
            >
              <TextAtom tag="span" text="로그인" />
            </ButtonAtom>
          </Link>
          <Link to="/register">
            <ButtonAtom
              cssStyle={{
                backgroundColor: configStyle.black,
                '@media (max-width: 768px)': { padding: '8px 12px' },
              }}
            >
              <TextAtom
                tag="span"
                text="회원가입"
                cssStyle={{ color: configStyle.white }}
              />
            </ButtonAtom>
          </Link>
        </>
      )}
    </StyledHeaderRight>
  );
};

export default HeaderRight;
