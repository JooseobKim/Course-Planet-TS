import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
import { ButtonAtom, TextAtom, ListAtom } from '../atoms';
// eslint-disable-next-line prettier/prettier
import { defaultMenuStyle, StyledHeaderMenu, StyledHeaderMenubar } from './styles';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const HeaderMenu = () => {
  const { token, user } = useSelector(
    (state: RootState) => ({
      token: state.auth.token,
      user: state.auth.user,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { logout } = bindActionCreators(actionCreators, dispatch);

  const [openMenu, setOpenMenu] = useState(false);

  const btnOnClick = () => {
    setOpenMenu(!openMenu);
    window.scrollTo({ top: 0 });
  };

  const defaultMenuLink = [
    <Link to="/" onClick={btnOnClick}>
      <ButtonAtom cssStyle={defaultMenuStyle}>
        <TextAtom tag="span" text="홈페이지" />
      </ButtonAtom>
    </Link>,
    <Link to="/courses" onClick={btnOnClick}>
      <ButtonAtom cssStyle={defaultMenuStyle}>
        <TextAtom tag="span" text="강의" />
      </ButtonAtom>
    </Link>,
    <Link to="/about" onClick={btnOnClick}>
      <ButtonAtom cssStyle={defaultMenuStyle}>
        <TextAtom tag="span" text="소개" />
      </ButtonAtom>
    </Link>,
  ];

  const loggedMenuLink = [
    <Link to={`/user/${user?.username}/edit`}>
      <ButtonAtom cssStyle={defaultMenuStyle} onClick={btnOnClick}>
        <TextAtom tag="span" text="내 프로필" />
      </ButtonAtom>
    </Link>,
    <Link to={`/user/${user?.username}`}>
      <ButtonAtom cssStyle={defaultMenuStyle} onClick={btnOnClick}>
        <TextAtom tag="span" text="내 활동" />
      </ButtonAtom>
    </Link>,
    <Link to={`/user/${user?.username}`}>
      <ButtonAtom onClick={() => logout()} cssStyle={defaultMenuStyle}>
        <TextAtom tag="span" text="로그아웃" />
      </ButtonAtom>
    </Link>,
  ];

  const unloggedMenuLink = [
    <Link to="/login">
      <ButtonAtom cssStyle={defaultMenuStyle} onClick={btnOnClick}>
        <TextAtom tag="span" text="로그인" />
      </ButtonAtom>
    </Link>,
    <Link to="/register">
      <ButtonAtom cssStyle={defaultMenuStyle} onClick={btnOnClick}>
        <TextAtom tag="span" text="회원가입" />
      </ButtonAtom>
    </Link>,
  ];

  return (
    <StyledHeaderMenu>
      {openMenu ? (
        <AiOutlineClose
          fontSize="20px"
          style={{ margin: '10px', cursor: 'pointer' }}
          onClick={() => setOpenMenu(!openMenu)}
        />
      ) : (
        <AiOutlineMenu
          fontSize="20px"
          style={{ margin: '10px', cursor: 'pointer' }}
          onClick={() => setOpenMenu(!openMenu)}
        />
      )}
      {openMenu && (
        <StyledHeaderMenubar>
          {defaultMenuLink.map((component, idx) => (
            <ListAtom key={idx}>{component}</ListAtom>
          ))}
          {token ? (
            <>
              {loggedMenuLink.map((component, idx) => (
                <ListAtom key={idx}>{component}</ListAtom>
              ))}
            </>
          ) : (
            <>
              {unloggedMenuLink.map((component, idx) => (
                <ListAtom key={idx}>{component}</ListAtom>
              ))}
            </>
          )}
        </StyledHeaderMenubar>
      )}
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
