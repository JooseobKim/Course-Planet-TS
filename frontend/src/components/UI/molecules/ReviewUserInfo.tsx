import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { ReviewLike } from '.';
import { DisplayFlexAtom, ImgAtom, TextAtom } from '../atoms';
import { ReviewUserInfoProps } from './interfaces';
import { StyledReviewUserInfo } from './styles';
import { translateToKorean } from '../../../utils/utils';
import config from '../../../utils/config/config';
import configStyle from '../../../utils/config/config.style';
import Rating from './Rating';

dayjs.extend(relativeTime).locale('ko');

const ReviewUserInfo = (props: ReviewUserInfoProps) => {
  const { info, id, cssStyle } = props;
  const { loginUser } = useSelector(
    (state: RootState) => ({
      loginUser: state.auth.user?._id,
    }),
    shallowEqual
  );
  const { owner, rating, difficulty, createdAt, likes } = info;

  let avatar;
  let username;

  if (owner) {
    avatar = owner.avatar;
    username = owner.username;
  }

  return (
    <StyledReviewUserInfo cssStyle={cssStyle}>
      <Link to={`/user/${username || 'resigned_user'}`}>
        <DisplayFlexAtom
          cssStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5px',
          }}
        >
          <ImgAtom
            src={avatar || config.noImage}
            cssStyle={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '3px',
            }}
          />
          <DisplayFlexAtom displayColumn={true} cssStyle={{ textAlign: 'end' }}>
            <TextAtom
              tag="span"
              text={username || '탈퇴 유저'}
              cssStyle={{
                marginBottom: '3px',
                color: configStyle.black,
                fontSize: '15px',
                wordBreak: 'break-all',
              }}
            />
            <TextAtom
              tag="span"
              text={dayjs(createdAt).fromNow()}
              cssStyle={{ color: configStyle.black, fontSize: '15px' }}
            />
          </DisplayFlexAtom>
        </DisplayFlexAtom>
      </Link>
      <DisplayFlexAtom
        cssStyle={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <DisplayFlexAtom cssStyle={{ alignItems: 'center' }}>
          <ReviewLike
            id={id}
            info={info}
            userLikeState={
              likes.find(likeUser => likeUser._id === loginUser) ? true : false
            }
          />
          <TextAtom
            tag="span"
            text={likes.length}
            cssStyle={{ marginLeft: '2px' }}
          />
        </DisplayFlexAtom>
        <DisplayFlexAtom
          displayColumn={true}
          cssStyle={{ alignItems: 'flex-end' }}
        >
          <Rating myRating={rating} readOnly={true} />
          <TextAtom
            tag="span"
            innerHtml={true}
            text={`강의 난이도 <strong>${translateToKorean(
              difficulty
            )}</strong>`}
            cssStyle={{ marginTop: '5px' }}
          />
        </DisplayFlexAtom>
      </DisplayFlexAtom>
    </StyledReviewUserInfo>
  );
};

export default ReviewUserInfo;
