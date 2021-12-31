import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
import { ReviewContainer } from '.';
import { ButtonAtom, TextAtom } from '../atoms';
import { ReviewCourseInfo, ReviewRightContainer } from '../molecules';
import configStyle from '../../../utils/config/config.style';

const UserReviewDisplay = () => {
  const { username }: { username: string } = useParams();
  const { userReviews } = useSelector(
    (state: RootState) => ({
      userReviews: state.review.user_reviews.filter(
        review => review.owner.username === username
      ),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { getReviewsByUsername } = bindActionCreators(actionCreators, dispatch);

  const [sliceNum, setSliceNum] = useState(1);

  useEffect(() => {
    if (userReviews.every(review => review.owner.username !== username))
      getReviewsByUsername({ username });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userReviews.length === 0 ? (
        <TextAtom
          tag="span"
          text="아직 작성하신 리뷰가 없습니다."
          cssStyle={{ top: 0, bottom: 0, margin: 'auto', fontWeight: 500 }}
        />
      ) : (
        userReviews.slice(0, sliceNum).map(review => (
          <ReviewContainer
            key={review._id}
            leftContainer={
              <ReviewCourseInfo
                courseId={review.courseId}
                cssStyle={{
                  flex: 0.4,
                  padding: '0 5px 0 10px',
                  '@media (max-width: 512px)': {
                    marginBottom: '10px',
                  },
                }}
              />
            }
            rightContainer={
              <ReviewRightContainer
                review={review}
                cssStyle={{ flex: 0.6, padding: '0 10px 0 5px' }}
              />
            }
            cssStyle={{
              width: '95%',
              margin: '10px 0',
              padding: '12px 0',
              boxShadow: configStyle.boxShadow5,
              '@media (max-width: 512px)': {
                flexDirection: 'column',
              },
            }}
          />
        ))
      )}
      {sliceNum < userReviews.length && (
        <ButtonAtom
          onClick={() => {
            if (sliceNum >= userReviews.length) return;
            setSliceNum(prevNum => prevNum + 1);
          }}
          cssStyle={{
            marginTop: '5px',
            ':hover': { backgroundColor: '#efefef' },
          }}
        >
          <TextAtom tag="span" text="더보기" />
        </ButtonAtom>
      )}
    </>
  );
};

export default UserReviewDisplay;
