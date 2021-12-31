import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
import { ReviewLikeProps } from './interfaces';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';

const ReviewLike = (props: ReviewLikeProps) => {
  const { id, info, userLikeState } = props;
  const { auth, courseInfo } = useSelector(
    (state: RootState) => ({
      auth: state.auth,
      courseInfo: state.course.get_course.find(item => item._id === id),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [likeState, setLikeState] = useState(userLikeState);

  // eslint-disable-next-line prettier/prettier
  const { likeReview, unlikeReview } = bindActionCreators(actionCreators, dispatch);

  const handleLike = () => {
    if (!courseInfo) return;
    if (!auth.token) return;

    likeReview({ review: info, auth, detailCourse: courseInfo });
    setLikeState(true);
  };

  const handleUnLike = () => {
    if (!courseInfo) return;
    if (!auth.token) return;

    unlikeReview({ review: info, auth, detailCourse: courseInfo });
    setLikeState(false);
  };
  return (
    <>
      {likeState ? (
        <AiTwotoneLike
          fontSize="17px"
          onClick={handleUnLike}
          style={{ cursor: auth.token && 'pointer' }}
        />
      ) : (
        <AiOutlineLike
          fontSize="17px"
          onClick={handleLike}
          style={{ cursor: auth.token && 'pointer' }}
        />
      )}
    </>
  );
};

export default ReviewLike;
