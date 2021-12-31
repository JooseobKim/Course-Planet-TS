import { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReviewContainer } from '.';
import { RootState } from '../../../redux/reducers';
import configStyle from '../../../utils/config/config.style';
import { ButtonAtom, DisplayFlexAtom, TextAtom } from '../atoms';
import { ReviewUserInfo, ReviewContent } from '../molecules';

const ReviewDisplay = () => {
  const { id }: { id: string } = useParams();
  const { reviews } = useSelector(
    (state: RootState) => ({
      reviews: state.review.detail_course_reviews,
    }),
    shallowEqual
  );

  const [sliceNum, setSliceNum] = useState(1);

  return (
    <>
      {reviews.length === 0 ? (
        <DisplayFlexAtom displayCenter={true} cssStyle={{ flex: 1 }}>
          <TextAtom tag="span" text="첫 번째 리뷰를 작성해보세요." />
        </DisplayFlexAtom>
      ) : (
        reviews.slice(0, sliceNum).map(review => (
          <ReviewContainer
            key={review._id}
            leftContainer={
              <ReviewUserInfo
                id={id}
                info={review}
                cssStyle={{ flex: 0.5, minWidth: '155px' }}
              />
            }
            rightContainer={
              <ReviewContent
                contentInfo={{ merit: review.merit, demerit: review.demerit }}
                review={review}
                cssStyle={{
                  flex: 1.5,
                  maxWidth: '645px',
                  padding: '0 5px',
                  '@media (max-width: 512px)': {
                    marginTop: '10px',
                  },
                }}
              />
            }
            cssStyle={{
              boxShadow: configStyle.boxShadow4,
              margin: '15px 0',
              padding: '10px',
              '@media (max-width: 512px)': {
                flexDirection: 'column',
              },
            }}
          />
        ))
      )}
      {sliceNum < reviews.length && (
        <ButtonAtom
          onClick={() => {
            if (sliceNum >= reviews.length) return;
            setSliceNum(sliceNum + 1);
          }}
          cssStyle={{ ':hover': { backgroundColor: '#efefef' } }}
        >
          <TextAtom tag="span" text="더보기" />
        </ButtonAtom>
      )}
    </>
  );
};

export default ReviewDisplay;
