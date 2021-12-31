import { ReviewContainerProps } from './interfaces';
import { StyledReviewContainer } from './styles';

const ReviewContainer = (props: ReviewContainerProps) => {
  const { leftContainer, rightContainer, cssStyle } = props;

  return (
    <StyledReviewContainer cssStyle={cssStyle}>
      {leftContainer}
      {rightContainer}
    </StyledReviewContainer>
  );
};

export default ReviewContainer;
