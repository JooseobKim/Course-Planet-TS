import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import { RootState } from '../../../redux/reducers';
import { CourseDetailMenu, ReviewDisplay } from '.';
import { ReviewFence } from '../molecules';
import { CourseDetailRightContainerProps } from './interfaces';
import { StyledCourseDetailRightContainer } from './styles';

const CourseDetailRightContainer = (props: CourseDetailRightContainerProps) => {
  const { id, cssStyle } = props;

  const { token, myReview } = useSelector(
    (state: RootState) => ({
      token: state.auth.token,
      myReview: state.review.detail_course_reviews.some(item => {
        if (item.owner?._id === state.auth.user?._id) return true;
      }),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [sortCondition, setSortCondition] = useState('');

  const { getReviews } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getReviews({ courseId: id, sort: sortCondition });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sortCondition]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCondition(e.target.value);
  };

  const disableCreateReview = !token ? true : false;

  return (
    <StyledCourseDetailRightContainer cssStyle={{ flex: 1.8, ...cssStyle }}>
      <input
        id="review_fence"
        className="review_fence_toggler"
        type="checkbox"
        aria-hidden="true"
      />
      <ReviewFence
        disableCreateReview={disableCreateReview}
        btnId="review_fence"
      />
      <CourseDetailMenu
        myReview={myReview}
        disableCreateReview={disableCreateReview}
        handleSelectChange={handleSelectChange}
        cssStyle={{
          height: '44px',
          marginTop: '5px',
          padding: '0 5px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      />
      <ReviewDisplay />
    </StyledCourseDetailRightContainer>
  );
};

export default CourseDetailRightContainer;
