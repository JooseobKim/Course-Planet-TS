import { ButtonAtom, LabelAtom, TextAtom } from '../atoms';
import { ReviewModal } from '../organisms';
import { ReviewFenceProps } from './interfaces';
import { StyledReviewFence, StyledFence } from './styles';

const ReviewFence = (props: ReviewFenceProps) => {
  const { disableCreateReview, btnId, cssStyle } = props;

  return (
    <StyledReviewFence className="fence_wrapper" cssStyle={cssStyle}>
      <ReviewModal
        togglerId="right_container_review_toggler"
        disabledBtn={disableCreateReview}
        cssStyle={{ zIndex: 13 }}
      />
      <ButtonAtom cssStyle={{ zIndex: 12, marginTop: '5px', padding: 0 }}>
        <LabelAtom
          htmlFor={btnId}
          cssStyle={{
            display: 'inline-block',
            padding: '10px 16px',
            cursor: 'pointer',
          }}
        >
          <TextAtom tag="span" text="리뷰 조회하기" />
        </LabelAtom>
      </ButtonAtom>
      <StyledFence></StyledFence>
    </StyledReviewFence>
  );
};

export default ReviewFence;
