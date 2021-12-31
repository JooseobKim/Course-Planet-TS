import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { Rating, ReviewContent } from '.';
import { translateToKorean } from '../../../utils/utils';
import { DisplayFlexAtom, TextAtom } from '../atoms';
import { ReviewRightContainerProps } from './interfaces';
import { StyledReviewRightContainer } from './styles';

dayjs.extend(relativeTime).locale('ko');

const ReviewRightContainer = (props: ReviewRightContainerProps) => {
  const {
    review: { merit, demerit, createdAt, difficulty, rating },
    cssStyle,
  } = props;

  return (
    <StyledReviewRightContainer cssStyle={cssStyle}>
      <ReviewContent review={props.review} contentInfo={{ merit, demerit }} />
      <DisplayFlexAtom
        cssStyle={{ justifyContent: 'space-between', marginTop: '10px' }}
      >
        <TextAtom tag="span" text={dayjs(createdAt).fromNow()} />
        <TextAtom tag="span" text={translateToKorean(difficulty)} />
        <Rating myRating={rating} readOnly={true} />
      </DisplayFlexAtom>
    </StyledReviewRightContainer>
  );
};

export default ReviewRightContainer;
