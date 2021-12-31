import { useEffect } from 'react';
import { useParams } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { ImgAtom, TextAtom } from '../UI/atoms';
import { UserReviewDisplay } from '../UI/organisms';
import { DefaultProps } from '../../utils/interfaces';
import { StyledProfileUserTemplate } from './style';
import config from '../../utils/config/config';

const ProfileUserTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;
  const { username }: { username: string } = useParams();
  const dispatch = useDispatch();

  const { getAvatarByUsername } = bindActionCreators(actionCreators, dispatch);

  const { user, getUserAvatar } = useSelector(
    (state: RootState) => ({
      user: state.auth.user,
      getUserAvatar: state.user.get_user_avatar,
    }),
    shallowEqual
  );

  const avatar = user?.username === username ? user.avatar : getUserAvatar;

  useEffect(() => {
    if (!user || user.username !== username) getAvatarByUsername({ username });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledProfileUserTemplate cssStyle={cssStyle}>
      <TextAtom
        tag="h2"
        innerHtml={true}
        text={`<strong>${username} 님의 리뷰</strong>`}
        cssStyle={{ fontSize: '18px', marginTop: '15px' }}
      />
      <ImgAtom
        src={avatar || config.defaultAvatar}
        alt={`${username} avatar`}
        cssStyle={{
          width: '125px',
          height: '125px',
          margin: '10px 0',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
      <UserReviewDisplay />
    </StyledProfileUserTemplate>
  );
};

export default ProfileUserTemplate;
